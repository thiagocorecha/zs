import { InclusionGrant, InclusionUserCallbacks } from "zwave-js";
import { createDeferredPromise } from "alcalzone-shared/deferred-promise";
import { Client, ClientsController } from "./server";

export const inclusionUserCallbacks = (
  clientsController: ClientsController,
  client?: Client
): InclusionUserCallbacks => {
  return {
    grantSecurityClasses: (requested: InclusionGrant) => {
      clientsController.grantSecurityClassesPromise = createDeferredPromise();
      clientsController.grantSecurityClassesPromise.catch(() => {});
      clientsController.grantSecurityClassesPromise.finally(() => {
        if (clientsController.grantSecurityClassesPromise !== undefined) {
          delete clientsController.grantSecurityClassesPromise;
        }
      });
      if (client !== undefined) {
        client.sendEvent({
          source: "controller",
          event: "grant security classes",
          requested: requested as any,
        });
      } else {
        clientsController.clients.forEach((client) => {
          if (client.isConnected && client.receiveEvents) {
            client.sendEvent({
              source: "controller",
              event: "grant security classes",
              requested: requested as any,
            });
          }
        });
      }

      return clientsController.grantSecurityClassesPromise;
    },
    validateDSKAndEnterPIN: (dsk: string) => {
      clientsController.validateDSKAndEnterPinPromise = createDeferredPromise();
      clientsController.validateDSKAndEnterPinPromise.catch(() => {});
      clientsController.validateDSKAndEnterPinPromise.finally(() => {
        if (clientsController.validateDSKAndEnterPinPromise != undefined) {
          delete clientsController.validateDSKAndEnterPinPromise;
        }
      });
      if (client !== undefined) {
        client.sendEvent({
          source: "controller",
          event: "validate dsk and enter pin",
          dsk,
        });
      } else {
        clientsController.clients.forEach((client) => {
          if (client.isConnected && client.receiveEvents) {
            client.sendEvent({
              source: "controller",
              event: "validate dsk and enter pin",
              dsk,
            });
          }
        });
      }
      return clientsController.validateDSKAndEnterPinPromise;
    },
    abort: () => {
      delete clientsController.grantSecurityClassesPromise;
      delete clientsController.validateDSKAndEnterPinPromise;
      if (client !== undefined) {
        client.sendEvent({
          source: "controller",
          event: "inclusion aborted",
        });
      } else {
        clientsController.clients.forEach((client) => {
          if (client.isConnected && client.receiveEvents) {
            client.sendEvent({
              source: "controller",
              event: "inclusion aborted",
            });
          }
        });
      }
    },
  };
};
