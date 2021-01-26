import {
  ControllerEvents,
  Driver,
  NodeStatus,
  ZWaveNode,
  ZWaveNodeEvents,
  ZWaveNodeValueNotificationArgs,
  ValueMetadata,
} from "zwave-js";
import { OutgoingEvent } from "./outgoing_message";
import { dumpNode, dumpValue } from "./state";

interface ValueNotificationState
  extends Partial<ZWaveNodeValueNotificationArgs> {
  metadata: ValueMetadata;
  ccVersion: number;
}

export class EventForwarder {
  /**
   * Only load this once the driver is ready.
   *
   * @param driver
   * @param forwardEvent
   */
  constructor(
    public driver: Driver,
    public forwardEvent: (data: OutgoingEvent) => void
  ) {}

  start() {
    this.driver.once("all nodes ready", () =>
      this.forwardEvent({
        source: "driver",
        event: "all nodes ready",
      })
    );

    this.driver.controller.nodes.forEach((node) => this.setupNode(node));

    // Bind to all controller events
    // https://github.com/zwave-js/node-zwave-js/blob/master/packages/zwave-js/src/lib/controller/Controller.ts#L112
    this.driver.controller.on("node added", (node: ZWaveNode) => {
      this.forwardEvent({
        source: "controller",
        event: "node added",
        node: dumpNode(node),
      });
      this.setupNode(node);
    });

    {
      const events: ControllerEvents[] = [
        "inclusion failed",
        "exclusion failed",
        "exclusion started",
        "inclusion stopped",
        "exclusion stopped",
      ];
      for (const event of events) {
        this.driver.controller.on(event, () =>
          this.forwardEvent({
            source: "controller",
            event,
          })
        );
      }
    }

    this.driver.controller.on("inclusion started", (secure) =>
      this.forwardEvent({
        source: "controller",
        event: "inclusion started",
        secure,
      })
    );
    this.driver.controller.on("node removed", (node) =>
      this.forwardEvent({
        source: "controller",
        event: "node removed",
        node: dumpNode(node),
      })
    );
    this.driver.controller.on("heal network progress", (progress) =>
      this.forwardEvent({
        source: "controller",
        event: "heal network progress",
        progress,
      })
    );
    this.driver.controller.on("heal network done", (result) =>
      this.forwardEvent({
        source: "controller",
        event: "heal network done",
        result,
      })
    );
  }

  setupNode(node: ZWaveNode) {
    // Bind to all node events
    // https://github.com/zwave-js/node-zwave-js/blob/master/packages/zwave-js/src/lib/node/Types.ts#L84-L103
    const notifyNode = (node: ZWaveNode, event: string, extra = {}) =>
      this.forwardEvent({
        source: "node",
        event,
        nodeId: node.nodeId,
        ...extra,
      });

    {
      const events: ZWaveNodeEvents[] = ["interview completed", "ready"];
      for (const event of events) {
        node.on(event, (changedNode: ZWaveNode) => {
          const nodeState = dumpNode(changedNode);
          notifyNode(changedNode, event, { nodeState });
        });
      }
    }

    {
      const events: ZWaveNodeEvents[] = ["wake up", "sleep", "dead", "alive"];
      for (const event of events) {
        node.on(event, (changedNode: ZWaveNode, oldStatus: NodeStatus) =>
          notifyNode(changedNode, event, { oldStatus })
        );
      }
    }

    {
      const events: ZWaveNodeEvents[] = ["value removed", "interview failed"];
      for (const event of events) {
        node.on(event, (changedNode: ZWaveNode, args: any) => {
          notifyNode(changedNode, event, { args });
        });
      }
    }

    {
      const events: ZWaveNodeEvents[] = ["value updated", "value added"];
      for (const event of events) {
        node.on(event, (changedNode: ZWaveNode, args: any) => {
          // only forward value events for ready nodes
          if (!changedNode.ready) return;
          notifyNode(changedNode, event, { args });
        });
      }
    }

    node.on(
      "value notification",
      (changedNode: ZWaveNode, args: ZWaveNodeValueNotificationArgs) => {
        const valueState = dumpValue(changedNode, args);
        notifyNode(changedNode, "value notification", { valueState });
      }
    );

    node.on("notification", (changedNode, notificationLabel, parameters) =>
      notifyNode(changedNode, "notification", { notificationLabel, parameters })
    );

    node.on(
      "firmware update progress",
      (changedNode, sentFragments, totalFragments) =>
        notifyNode(changedNode, "firmware update progress", {
          sentFragments,
          totalFragments,
        })
    );

    node.on("firmware update finished", (changedNode, status, waitTime) =>
      notifyNode(changedNode, "firmware update finished", { status, waitTime })
    );
  }
}
