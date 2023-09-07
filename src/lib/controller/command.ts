export enum ControllerCommand {
  beginInclusion = "controller.begin_inclusion",
  stopInclusion = "controller.stop_inclusion",
  beginExclusion = "controller.begin_exclusion",
  stopExclusion = "controller.stop_exclusion",
  removeFailedNode = "controller.remove_failed_node",
  replaceFailedNode = "controller.replace_failed_node",
  // Schema version < 32
  healNode = "controller.heal_node",
  // Schema version > 31
  rebuildNodeRoutes = "controller.rebuild_node_routes",
  // Schema version < 32
  beginHealingNetwork = "controller.begin_healing_network",
  // Schema version > 31
  beginRebuildingRoutes = "controller.begin_rebuilding_routes",
  // Schema version < 32
  stopHealingNetwork = "controller.stop_healing_network",
  // Schema version > 31
  stopRebuildingRoutes = "controller.stop_rebuilding_routes",
  isFailedNode = "controller.is_failed_node",
  getAssociationGroups = "controller.get_association_groups",
  getAssociations = "controller.get_associations",
  isAssociationAllowed = "controller.is_association_allowed",
  addAssociations = "controller.add_associations",
  removeAssociations = "controller.remove_associations",
  // Schema version < 3
  removeNodeFromAllAssocations = "controller.remove_node_from_all_assocations",
  // Schema version > 2
  removeNodeFromAllAssociations = "controller.remove_node_from_all_associations",
  getNodeNeighbors = "controller.get_node_neighbors",
  grantSecurityClasses = "controller.grant_security_classes",
  validateDSKAndEnterPIN = "controller.validate_dsk_and_enter_pin",
  provisionSmartStartNode = "controller.provision_smart_start_node",
  unprovisionSmartStartNode = "controller.unprovision_smart_start_node",
  getProvisioningEntry = "controller.get_provisioning_entry",
  getProvisioningEntries = "controller.get_provisioning_entries",
  supportsFeature = "controller.supports_feature",
  backupNVMRaw = "controller.backup_nvm_raw",
  restoreNVM = "controller.restore_nvm",
  setRFRegion = "controller.set_rf_region",
  getRFRegion = "controller.get_rf_region",
  setPowerlevel = "controller.set_powerlevel",
  getPowerlevel = "controller.get_powerlevel",
  getState = "controller.get_state",
  getKnownLifelineRoutes = "controller.get_known_lifeline_routes",
  getAnyFirmwareUpdateProgress = "controller.get_any_firmware_update_progress",
  isAnyOTAFirmwareUpdateInProgress = "controller.is_any_ota_firmware_update_in_progress",
  getAvailableFirmwareUpdates = "controller.get_available_firmware_updates",
  beginOTAFirmwareUpdate = "controller.begin_ota_firmware_update",
  firmwareUpdateOTA = "controller.firmware_update_ota",
  firmwareUpdateOTW = "controller.firmware_update_otw",
  isFirmwareUpdateInProgress = "controller.is_firmware_update_in_progress",
}
