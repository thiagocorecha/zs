import {
  FirmwareUpdateCapabilities,
  FirmwareUpdateResult,
  LifelineHealthCheckSummary,
  RouteHealthCheckSummary,
  SetValueResult,
  TranslatedValueID,
  ValueMetadata,
} from "zwave-js";
import { MaybeNotKnown, SecurityClass } from "@zwave-js/core";
import { NodeCommand } from "./command";
import { NodeState } from "../state";

export interface NodeResultTypes {
  [NodeCommand.setValue]:
    | { result: SetValueResult } // schemaVersion >= 29
    | { success: boolean }; // schemaVersion < 29
  [NodeCommand.refreshInfo]: Record<string, never>;
  [NodeCommand.getDefinedValueIDs]: { valueIds: TranslatedValueID[] };
  [NodeCommand.getValueMetadata]: ValueMetadata;
  [NodeCommand.beginFirmwareUpdate]:
    | { result: FirmwareUpdateResult } // schemaVersion >= 29
    | { success: boolean }; // schemaVersion < 29
  [NodeCommand.updateFirmware]:
    | { result: FirmwareUpdateResult } // schemaVersion >= 29
    | { success: boolean }; // schemaVersion < 29
  [NodeCommand.abortFirmwareUpdate]: Record<string, never>;
  [NodeCommand.getFirmwareUpdateCapabilities]: {
    capabilities: FirmwareUpdateCapabilities;
  };
  [NodeCommand.getFirmwareUpdateCapabilitiesCached]: {
    capabilities: FirmwareUpdateCapabilities;
  };
  [NodeCommand.pollValue]: { value: any | undefined };
  [NodeCommand.setRawConfigParameterValue]: Record<string, never>;
  [NodeCommand.refreshValues]: Record<string, never>;
  [NodeCommand.refreshCCValues]: Record<string, never>;
  [NodeCommand.ping]: { responded: boolean };
  [NodeCommand.hasSecurityClass]: { hasSecurityClass: MaybeNotKnown<boolean> };
  [NodeCommand.getHighestSecurityClass]: {
    highestSecurityClass: SecurityClass | undefined;
  };
  [NodeCommand.testPowerlevel]: { framesAcked: number };
  [NodeCommand.checkLifelineHealth]: { summary: LifelineHealthCheckSummary };
  [NodeCommand.checkRouteHealth]: { summary: RouteHealthCheckSummary };
  [NodeCommand.getValue]: { value?: any };
  [NodeCommand.getEndpointCount]: { count: number };
  [NodeCommand.interviewCC]: Record<string, never>;
  [NodeCommand.getState]: { state: NodeState };
  [NodeCommand.setName]: Record<string, never>;
  [NodeCommand.setLocation]: Record<string, never>;
  [NodeCommand.setKeepAwake]: Record<string, never>;
  [NodeCommand.getFirmwareUpdateProgress]: { progress: boolean };
  [NodeCommand.isFirmwareUpdateInProgress]: { progress: boolean };
  [NodeCommand.waitForWakeup]: Record<string, never>;
  [NodeCommand.interview]: Record<string, never>;
  [NodeCommand.getValueTimestamp]: { timestamp?: number };
  [NodeCommand.manuallyIdleNotificationValue]: Record<string, never>;
  [NodeCommand.setDateAndTime]: { success: boolean };
}
