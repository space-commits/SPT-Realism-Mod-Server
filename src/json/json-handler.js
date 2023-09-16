"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonHandler = void 0;
const enums_1 = require("../utils/enums");
const utils_1 = require("../utils/utils");
const modConfig = require("../../config/config.json");
const weapPath = modConfig.weap_preset;
const attPath = modConfig.att_preset;
const gearPath = modConfig.gear_preset;
const armorComponentsTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorComponentsTemplates.json");
const armorChestrigTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorChestrigTemplates.json");
const helmetTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/helmetTemplates.json");
const armorVestsTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorVestsTemplates.json");
const armorMasksTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorMasksTemplates.json");
const chestrigTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/chestrigTemplates.json");
const headsetTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/headsetTemplates.json");
const cosmeticsTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/cosmeticsTemplates.json");
const bagTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/bagTemplates.json");
const ammoTemplates = require("../../db/templates/ammo/ammoTemplates.json");
const MuzzleDeviceTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/MuzzleDeviceTemplates.json");
const BarrelTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/BarrelTemplates.json");
const MountTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/MountTemplates.json");
const ReceiverTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/ReceiverTemplates.json");
const StockTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/StockTemplates.json");
const ChargingHandleTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/ChargingHandleTemplates.json");
const ScopeTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/ScopeTemplates.json");
const IronSightTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/IronSightTemplates.json");
const MagazineTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/MagazineTemplates.json");
const AuxiliaryModTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/AuxiliaryModTemplates.json");
const ForegripTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/ForegripTemplates.json");
const PistolGripTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/PistolGripTemplates.json");
const GasblockTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/GasblockTemplates.json");
const HandguardTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/HandguardTemplates.json");
const FlashlightLaserTemplates = require("../../db/templates/attatchments/" + `${attPath}` + "/FlashlightLaserTemplates.json");
const UBGLTempaltes = require("../../db/templates/attatchments/" + `${attPath}` + "/UBGLTempaltes.json");
const AssaultRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/AssaultRifleTemplates.json");
const AssaultCarbineTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/AssaultCarbineTemplates.json");
const MachinegunTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/MachinegunTemplates.json");
const MarksmanRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/MarksmanRifleTemplates.json");
const PistolTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/PistolTemplates.json");
const ShotgunTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/ShotgunTemplates.json");
const SMGTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SMGTemplates.json");
const SniperRifleTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SniperRifleTemplates.json");
const SpecialWeaponTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/SpecialWeaponTemplates.json");
const GrenadeLauncherTemplates = require("../../db/templates/weapons/" + `${weapPath}` + "/GrenadeLauncherTemplates.json");
class JsonHandler {
    constructor(tables, logger) {
        this.tables = tables;
        this.logger = logger;
        this.itemDB = this.tables.templates.items;
        this.loggerz = this.logger;
    }
    pushModsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                this.callHelper(MuzzleDeviceTemplates, serverItem, this.modPusherHelper);
                this.callHelper(BarrelTemplates, serverItem, this.modPusherHelper);
                this.callHelper(MountTemplates, serverItem, this.modPusherHelper);
                this.callHelper(ReceiverTemplates, serverItem, this.modPusherHelper);
                this.callHelper(StockTemplates, serverItem, this.modPusherHelper);
                this.callHelper(ChargingHandleTemplates, serverItem, this.modPusherHelper);
                this.callHelper(ScopeTemplates, serverItem, this.modPusherHelper);
                this.callHelper(IronSightTemplates, serverItem, this.modPusherHelper);
                this.callHelper(MagazineTemplates, serverItem, this.modPusherHelper);
                this.callHelper(AuxiliaryModTemplates, serverItem, this.modPusherHelper);
                this.callHelper(ForegripTemplates, serverItem, this.modPusherHelper);
                this.callHelper(PistolGripTemplates, serverItem, this.modPusherHelper);
                this.callHelper(GasblockTemplates, serverItem, this.modPusherHelper);
                this.callHelper(HandguardTemplates, serverItem, this.modPusherHelper);
                this.callHelper(FlashlightLaserTemplates, serverItem, this.modPusherHelper);
                this.callHelper(UBGLTempaltes, serverItem, this.modPusherHelper);
            }
        }
    }
    pushWeaponsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.RecolDispersion) {
                this.callHelper(AssaultRifleTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(AssaultCarbineTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(MachinegunTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(MarksmanRifleTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(PistolTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(ShotgunTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(SMGTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(SniperRifleTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(SpecialWeaponTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(GrenadeLauncherTemplates, serverItem, this.weapPusherHelper);
            }
        }
        //catch any modded weapons not in templates
        if (modConfig.recoil_attachment_overhaul == true && modConfig.legacy_recoil_changes != true && utils_1.ConfigChecker.dllIsPresent == true) {
            for (let j in this.itemDB) {
                let serverItem = this.itemDB[j];
                let serverConfItems = serverItem._props.ConflictingItems;
                if (serverItem._parent == enums_1.ParentClasses.SMG || serverItem._parent == enums_1.ParentClasses.ASSAULT_CARBINE || serverItem._parent == enums_1.ParentClasses.ASSAULT_RIFLE || serverItem._parent == enums_1.ParentClasses.MARKSMAN_RIFLE || serverItem._parent == enums_1.ParentClasses.SNIPER_RIFLE || serverItem._parent == enums_1.ParentClasses.PISTOL || serverItem._parent == enums_1.ParentClasses.SHOTGUN || serverItem._parent == enums_1.ParentClasses.MACHINE_GUN) {
                    if (serverConfItems !== undefined && serverConfItems.length > 0 && serverConfItems[0] === "SPTRM") {
                        continue;
                    }
                    if (serverConfItems === undefined) {
                        serverItem._props.ConflictingItems = [];
                        serverConfItems = serverItem._props.ConflictingItems;
                    }
                    if (serverItem._parent == enums_1.ParentClasses.PISTOL) {
                        serverItem._props.Ergonomics = 70;
                        serverItem._props.RecoilForceUp *= 0.5;
                        serverItem._props.RecoilForceBack *= 1.5;
                        serverItem._props.RecolDispersion = Math.round(serverItem._props.RecolDispersion * 1.5);
                        serverItem._props.Convergence *= 4;
                        serverItem._props.RecoilAngle = 90;
                        serverItem._props.CameraRecoil = 0.01;
                        let weapPropertyValues = ["SPTRM", "undefined", "0", "false", "1", "undefined", "0", "0.67", "0.68", "false", "1", "1.5", "0.7", "false", "1.2", "0.7", "1", "1", "0.1"];
                        let combinedArr = weapPropertyValues.concat(serverConfItems);
                        serverItem._props.ConflictingItems = combinedArr;
                    }
                    else {
                        serverItem._props.Ergonomics = 80;
                        serverItem._props.RecoilForceUp *= 0.5;
                        serverItem._props.RecoilForceBack *= 0.3;
                        serverItem._props.RecolDispersion = Math.round(serverItem._props.RecolDispersion * 1.5);
                        serverItem._props.Convergence *= 10;
                        serverItem._props.RecoilAngle = 90;
                        serverItem._props.CameraRecoil *= 0.9;
                        let weapPropertyValues = ["SPTRM", "undefined", "0", "true", "1", "undefined", "0", "0.67", "0.68", "false", "1", "1.5", "0.7", "false", "1.2", "0.7", "1", "1", "0.1"];
                        let combinedArr = weapPropertyValues.concat(serverConfItems);
                        serverItem._props.ConflictingItems = combinedArr;
                    }
                }
            }
        }
    }
    pushGearToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props?.armorClass !== null && serverItem._props?.armorClass !== undefined) {
                this.callHelper(armorChestrigTemplates, serverItem, this.gearPusherHelper);
                this.callHelper(armorComponentsTemplates, serverItem, this.gearPusherHelper);
                this.callHelper(helmetTemplates, serverItem, this.gearPusherHelper);
                this.callHelper(armorVestsTemplates, serverItem, this.gearPusherHelper);
                this.callHelper(armorMasksTemplates, serverItem, this.gearPusherHelper);
                this.callHelper(chestrigTemplates, serverItem, this.gearPusherHelper);
                this.callHelper(cosmeticsTemplates, serverItem, this.gearPusherHelper);
            }
            if (serverItem._parent === enums_1.ParentClasses.HEADSET) {
                this.callHelper(headsetTemplates, serverItem, this.gearPusherHelper);
            }
            if (serverItem._parent === enums_1.ParentClasses.BACKPACK) {
                this.callHelper(bagTemplates, serverItem, this.gearPusherHelper);
            }
        }
    }
    callHelper(template, serverItem, funPusherHelper) {
        for (let i in template) {
            let fileItem = template[i];
            funPusherHelper(serverItem, fileItem);
        }
    }
    gearPusherHelper(serverItem, fileItem) {
        if (serverItem._id === fileItem.ItemID) {
            var serverConfItems = serverItem._props.ConflictingItems;
            var armorPropertyValues = ["SPTRM", fileItem?.AllowADS?.toString() || "true", fileItem?.ArmorClass?.toString() || "Unclassified", fileItem?.CanSpall?.toString() || "false", fileItem?.SpallReduction?.toString() || "1", fileItem?.ReloadSpeedMulti?.toString() || "1",
                fileItem?.MinVelocity?.toString() || "500", fileItem?.MinKE?.toString() || "2000", fileItem?.MinPen?.toString() || "50", fileItem?.BlocksMouth?.toString() || "false", fileItem?.HasSideArmor?.toString() || "false", fileItem?.HasStomachArmor?.toString() || "false",
                fileItem?.HasHitSecondaryArmor?.toString() || "false", fileItem?.HasNeckArmor?.toString() || "false", fileItem?.dB?.toString() || "1", fileItem?.Comfort?.toString() || 1];
            var combinedArr = armorPropertyValues.concat(serverConfItems);
            serverItem._props.ConflictingItems = combinedArr;
        }
    }
    modPusherHelper(serverItem, fileItem) {
        if (modConfig.recoil_attachment_overhaul == true && modConfig.legacy_recoil_changes != true && utils_1.ConfigChecker.dllIsPresent == true) {
            if (serverItem._id === fileItem.ItemID) {
                var serverConfItems = serverItem._props.ConflictingItems;
                if (serverConfItems[0] !== "SPTRM") {
                    serverItem._props.Ergonomics = fileItem.Ergonomics;
                    serverItem._props.Accuracy = fileItem.Accuracy;
                    serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                    serverItem._props.HeatFactor = fileItem.HeatFactor;
                    serverItem._props.CoolFactor = fileItem.CoolFactor;
                    serverItem._props.MalfunctionChance = fileItem.MagMalfunctionChance;
                    serverItem._props.LoadUnloadModifier = fileItem.LoadUnloadModifier;
                    serverItem._props.CheckTimeModifier = fileItem.CheckTimeModifier;
                    serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator;
                    serverItem._props.BlocksFolding = fileItem.BlocksFolding;
                    serverItem._props.Weight = fileItem.Weight;
                    serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
                    serverItem._props.Loudness = fileItem.Loudness;
                    var isScope = serverItem._id === enums_1.ParentClasses.COLLIMATOR || serverItem._id === enums_1.ParentClasses.COMPACT_COLLIMATOR || serverItem._parent === enums_1.ParentClasses.ASSAULT_SCOPE || serverItem._parent === enums_1.ParentClasses.SPECIAL_SCOPE || serverItem._parent === enums_1.ParentClasses.OPTIC_SCOPE || serverItem._parent === enums_1.ParentClasses.THEMALVISION || serverItem._parent === enums_1.ParentClasses.NIGHTVISION;
                    ;
                    if (isScope != true) {
                        serverItem._props.HasShoulderContact = fileItem.HasShoulderContact;
                    }
                    if (modConfig.realistic_ballistics == true && isScope != true) {
                        serverItem._props.Velocity = fileItem.Velocity;
                    }
                    if (fileItem.ModType === "Stock") {
                        serverItem._parent = "55818a594bdc2db9688b456a";
                    }
                    var modPropertyValues = ["SPTRM", fileItem?.ModType?.toString() || "undefined", fileItem?.VerticalRecoil?.toString() || "0", fileItem?.HorizontalRecoil?.toString() || "0", fileItem?.Dispersion?.toString() || "0", fileItem?.CameraRecoil?.toString() || "0",
                        fileItem?.AutoROF?.toString() || "0", fileItem?.SemiROF?.toString() || "0", fileItem?.ModMalfunctionChance?.toString() || "0", fileItem?.ReloadSpeed?.toString() || "0", fileItem?.AimSpeed?.toString() || "0", fileItem?.ChamberSpeed?.toString() || "0",
                        fileItem?.Convergence?.toString() || "0", fileItem?.CanCycleSubs?.toString() || "false", fileItem?.RecoilAngle?.toString() || "0", fileItem?.StockAllowADS?.toString() || "false", fileItem?.FixSpeed?.toString() || "0", fileItem?.ModShotDispersion?.toString() || "0",
                        fileItem?.ModShotDispersion?.toString() || "0"];
                    var combinedArr = modPropertyValues.concat(serverConfItems);
                    serverItem._props.ConflictingItems = combinedArr;
                }
            }
        }
    }
    weapPusherHelper(serverItem, fileItem) {
        if (serverItem._id === fileItem.ItemID) {
            let serverConfItems = serverItem._props.ConflictingItems;
            if (serverConfItems[0] !== "SPTRM") {
                if (modConfig.malf_changes == true) {
                    serverItem._props.BaseMalfunctionChance = fileItem.BaseMalfunctionChance;
                    serverItem._props.HeatFactorGun = fileItem.HeatFactorGun;
                    serverItem._props.HeatFactorByShot = fileItem.HeatFactorByShot;
                    serverItem._props.CoolFactorGun = fileItem.CoolFactorGun;
                    serverItem._props.CoolFactorGunMods = fileItem.CoolFactorGunMods;
                }
                if (modConfig.realistic_ballistics == true) {
                    serverItem._props.Velocity = fileItem.Velocity;
                }
                if (modConfig.recoil_attachment_overhaul == true && modConfig.legacy_recoil_changes != true && utils_1.ConfigChecker.dllIsPresent == true) {
                    serverItem._props.Ergonomics = fileItem.Ergonomics;
                    serverItem._props.RecoilForceUp = fileItem.VerticalRecoil;
                    serverItem._props.RecoilForceBack = fileItem.HorizontalRecoil;
                    serverItem._props.RecolDispersion = fileItem.Dispersion;
                    serverItem._props.CameraRecoil = fileItem.CameraRecoil;
                    serverItem._props.Convergence = fileItem.Convergence;
                    serverItem._props.RecoilAngle = fileItem.RecoilAngle;
                    serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                    serverItem._props.HeatFactor = fileItem.HeatFactor;
                    serverItem._props.DurabilityBurnRatio = fileItem.DurabilityBurnRatio;
                    serverItem._props.AllowOverheat = fileItem.AllowOverheat;
                    serverItem._props.HipAccuracyRestorationDelay = fileItem.HipAccuracyRestorationDelay;
                    serverItem._props.HipAccuracyRestorationSpeed = fileItem.HipAccuracyRestorationSpeed;
                    serverItem._props.HipInnaccuracyGain = fileItem.HipInnaccuracyGain;
                    serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
                    serverItem._props.Weight = fileItem.Weight;
                    serverItem._props.bFirerate = fileItem.AutoROF;
                    serverItem._props.SingleFireRate = fileItem.SemiROF;
                    serverItem._props.DoubleActionAccuracyPenalty = fileItem.DoubleActionAccuracyPenalty;
                    if (fileItem.weapFireType !== undefined) {
                        serverItem._props.weapFireType = fileItem.weapFireType;
                    }
                    let weapPropertyValues = ["SPTRM", fileItem?.WeapType?.toString() || "undefined", fileItem?.BaseTorque?.toString() || "0", fileItem?.HasShoulderContact?.toString() || "false", fileItem?.BaseReloadSpeedMulti?.toString() || "1", fileItem?.OperationType?.toString() || "undefined", fileItem?.WeapAccuracy?.toString() || "0",
                        fileItem?.RecoilDamping?.toString() || "0.7", fileItem?.RecoilHandDamping?.toString() || "0.7", fileItem?.WeaponAllowADS?.toString() || "false", fileItem?.BaseChamberSpeedMulti?.toString() || "1", fileItem?.MaxChamberSpeed?.toString() || "1.5", fileItem?.MinChamberSpeed?.toString() || "0.7", fileItem?.IsManuallyOperated?.toString() || "false",
                        fileItem?.MaxReloadSpeed?.toString() || "1.2", fileItem?.MinReloadSpeed?.toString() || "0.7", fileItem?.BaseChamberCheckSpeed?.toString() || "1", fileItem?.BaseFixSpeed?.toString() || "1", fileItem?.CameraSnap?.toString() || "0.1"
                    ];
                    let combinedArr = weapPropertyValues.concat(serverConfItems);
                    serverItem._props.ConflictingItems = combinedArr;
                }
            }
        }
    }
}
exports.JsonHandler = JsonHandler;
