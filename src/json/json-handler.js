"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonHandler = void 0;
const enums_1 = require("../utils/enums");
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const modConfig = require("../../config/config.json");
const armorPlateTemplates = require("../../db/templates/gear/armorPlateTemplates.json");
const armorComponentsTemplates = require("../../db/templates/gear/armorComponentsTemplates.json");
const armorChestrigTemplates = require("../../db/templates/gear/armorChestrigTemplates.json");
const helmetTemplates = require("../../db/templates/gear/helmetTemplates.json");
const armorVestsTemplates = require("../../db/templates/gear/armorVestsTemplates.json");
const armorMasksTemplates = require("../../db/templates/gear/armorMasksTemplates.json");
const chestrigTemplates = require("../../db/templates/gear/chestrigTemplates.json");
const headsetTemplates = require("../../db/templates/gear/headsetTemplates.json");
const cosmeticsTemplates = require("../../db/templates/gear/cosmeticsTemplates.json");
const bagTemplates = require("../../db/templates/gear/bagTemplates.json");
const MuzzleDeviceTemplates = require("../../db/templates/attatchments/MuzzleDeviceTemplates.json");
const BarrelTemplates = require("../../db/templates/attatchments/BarrelTemplates.json");
const MountTemplates = require("../../db/templates/attatchments/MountTemplates.json");
const ReceiverTemplates = require("../../db/templates/attatchments/ReceiverTemplates.json");
const StockTemplates = require("../../db/templates/attatchments/StockTemplates.json");
const ChargingHandleTemplates = require("../../db/templates/attatchments/ChargingHandleTemplates.json");
const ScopeTemplates = require("../../db/templates/attatchments/ScopeTemplates.json");
const IronSightTemplates = require("../../db/templates/attatchments/IronSightTemplates.json");
const MagazineTemplates = require("../../db/templates/attatchments/MagazineTemplates.json");
const AuxiliaryModTemplates = require("../../db/templates/attatchments/AuxiliaryModTemplates.json");
const ForegripTemplates = require("../../db/templates/attatchments/ForegripTemplates.json");
const PistolGripTemplates = require("../../db/templates/attatchments/PistolGripTemplates.json");
const GasblockTemplates = require("../../db/templates/attatchments/GasblockTemplates.json");
const HandguardTemplates = require("../../db/templates/attatchments/HandguardTemplates.json");
const FlashlightLaserTemplates = require("../../db/templates/attatchments/FlashlightLaserTemplates.json");
const UBGLTempaltes = require("../../db/templates/attatchments/UBGLTempaltes.json");
const AssaultRifleTemplates = require("../../db/templates/weapons/AssaultRifleTemplates.json");
const AssaultCarbineTemplates = require("../../db/templates/weapons/AssaultCarbineTemplates.json");
const MachinegunTemplates = require("../../db/templates/weapons/MachinegunTemplates.json");
const MarksmanRifleTemplates = require("../../db/templates/weapons/MarksmanRifleTemplates.json");
const PistolTemplates = require("../../db/templates/weapons/PistolTemplates.json");
const ShotgunTemplates = require("../../db/templates/weapons/ShotgunTemplates.json");
const SMGTemplates = require("../../db/templates/weapons/SMGTemplates.json");
const SniperRifleTemplates = require("../../db/templates/weapons/SniperRifleTemplates.json");
const SpecialWeaponTemplates = require("../../db/templates/weapons/SpecialWeaponTemplates.json");
const GrenadeLauncherTemplates = require("../../db/templates/weapons/GrenadeLauncherTemplates.json");
class JsonHandler {
    tables;
    logger;
    constructor(tables, logger) {
        this.tables = tables;
        this.logger = logger;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    pushModsToServer() {
        this.callHelper(MuzzleDeviceTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(BarrelTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(MountTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(ReceiverTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(StockTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(ChargingHandleTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(ScopeTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(IronSightTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(MagazineTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(AuxiliaryModTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(ForegripTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(PistolGripTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(GasblockTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(HandguardTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(FlashlightLaserTemplates, this.itemDB(), this.modPusherHelper);
        this.callHelper(UBGLTempaltes, this.itemDB(), this.modPusherHelper);
    }
    pushWeaponsToServer() {
        this.callHelper(AssaultRifleTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(AssaultCarbineTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(MachinegunTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(MarksmanRifleTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(PistolTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(ShotgunTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(SMGTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(SniperRifleTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(SpecialWeaponTemplates, this.itemDB(), this.weapPusherHelper);
        this.callHelper(GrenadeLauncherTemplates, this.itemDB(), this.weapPusherHelper);
    }
    pushGearToServer() {
        this.callHelper(armorChestrigTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(armorComponentsTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(armorPlateTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(helmetTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(armorVestsTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(armorMasksTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(chestrigTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(cosmeticsTemplates, this.itemDB(), this.gearPusherHelper);
        this.callHelper(bagTemplates, this.itemDB(), this.gearPusherHelper);
        if (modConfig.headset_changes == true) {
            this.callHelper(headsetTemplates, this.itemDB(), this.gearPusherHelper);
        }
    }
    callHelper(template, serverTemplates, funPusherHelper) {
        for (let i in template) {
            let fileItem = template[i];
            funPusherHelper(fileItem, serverTemplates);
        }
    }
    gearPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;
            serverItem._props.speedPenaltyPercent = fileItem.speedPenaltyPercent;
            serverItem._props.mousePenalty = fileItem.mousePenalty;
            serverItem._props.weaponErgonomicPenalty = fileItem.weaponErgonomicPenalty;
            if (serverItem._props?.armorClass != undefined) {
                serverItem._props.armorClass = fileItem.ArmorLevel != undefined ? fileItem.ArmorLevel : serverItem._props.armorClass;
            }
            if (serverItem._props?.Durability != undefined) {
                serverItem._props.Durability = fileItem.Durability != undefined ? fileItem.Durability : serverItem._props.Durability;
            }
            if (serverItem._props?.MaxDurability != undefined) {
                serverItem._props.MaxDurability = fileItem.Durability != undefined ? fileItem.Durability : serverItem._props.MaxDurability;
            }
            if (serverItem._props?.BluntThroughput != undefined) {
                serverItem._props.BluntThroughput = fileItem.BluntThroughput != undefined ? fileItem.BluntThroughput : serverItem._props.BluntThroughput;
            }
            if (serverItem._props?.ArmorMaterial != undefined) {
                serverItem._props.ArmorMaterial = fileItem.ArmorMaterial != undefined ? fileItem.ArmorMaterial : serverItem._props.ArmorMaterial;
            }
            if (serverItem._props?.Weight != undefined) {
                serverItem._props.Weight = fileItem.Weight != undefined ? fileItem.Weight : serverItem._props.Weight;
            }
            let armorPropertyValues = ["SPTRM", fileItem?.AllowADS?.toString() || "true", fileItem?.ArmorClass?.toString() || "Unclassified", fileItem?.CanSpall?.toString() || "false", fileItem?.SpallReduction?.toString() || "1", fileItem?.ReloadSpeedMulti?.toString() || "1",
                fileItem?.MinVelocity?.toString() || "500", fileItem?.MinKE?.toString() || "2000", fileItem?.MinPen?.toString() || "50", fileItem?.BlocksMouth?.toString() || "false", fileItem?.HasSideArmor?.toString() || "false", fileItem?.HasStomachArmor?.toString() || "false",
                fileItem?.HasHitSecondaryArmor?.toString() || "false", fileItem?.HasNeckArmor?.toString() || "false", fileItem?.dB?.toString() || "1", fileItem?.Comfort?.toString() || 1, fileItem?.HasExtraArmor?.toString() || "false"];
            let combinedArr = armorPropertyValues.concat(serverConfItems);
            serverItem._props.ConflictingItems = combinedArr;
        }
    }
    ammoPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            serverItem._props.PenetrationPower = fileItem.PenetrationPower != undefined ? fileItem.PenetrationPower : serverItem._props.PenetrationPower;
            serverItem._props.Damage = fileItem.Damage != undefined ? fileItem.Damage : serverItem._props.Damage;
            serverItem._props.ArmorDamage = 1;
            serverItem._props.casingMass = 1;
        }
    }
    modPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;
            serverItem._props.Ergonomics = fileItem.Ergonomics != undefined ? fileItem.Ergonomics : 0;
            serverItem._props.Accuracy = fileItem.Accuracy != undefined ? fileItem.Accuracy : 0;
            serverItem._props.CenterOfImpact = fileItem.CenterOfImpact != undefined ? fileItem.CenterOfImpact : 0.05;
            serverItem._props.HeatFactor = fileItem.HeatFactor != undefined ? fileItem.HeatFactor : 1;
            serverItem._props.CoolFactor = fileItem.CoolFactor != undefined ? fileItem.CoolFactor : 1;
            serverItem._props.MalfunctionChance = fileItem.MalfunctionChance != undefined ? fileItem.MalfunctionChance : 0;
            // serverItem._props.LoadUnloadModifier = fileItem.LoadUnloadModifier;
            // serverItem._props.CheckTimeModifier = fileItem.CheckTimeModifier;
            serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator != undefined ? fileItem.DurabilityBurnModificator : 1;
            serverItem._props.BlocksFolding = fileItem.BlocksFolding != undefined ? fileItem.BlocksFolding : false;
            serverItem._props.Weight = fileItem.Weight != undefined ? fileItem.Weight : 0;
            serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion != undefined ? fileItem.ShotgunDispersion : 1;
            serverItem._props.Loudness = fileItem.Loudness != undefined ? fileItem.Loudness : 0;
            let isScope = serverItem._id === enums_1.ParentClasses.COLLIMATOR || serverItem._id === enums_1.ParentClasses.COMPACT_COLLIMATOR || serverItem._parent === enums_1.ParentClasses.ASSAULT_SCOPE || serverItem._parent === enums_1.ParentClasses.SPECIAL_SCOPE || serverItem._parent === enums_1.ParentClasses.OPTIC_SCOPE || serverItem._parent === enums_1.ParentClasses.THEMALVISION || serverItem._parent === enums_1.ParentClasses.NIGHTVISION;
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
            let modPropertyValues = ["SPTRM", fileItem?.ModType?.toString() || "undefined", fileItem?.VerticalRecoil?.toString() || "0", fileItem?.HorizontalRecoil?.toString() || "0", fileItem?.Dispersion?.toString() || "0", fileItem?.CameraRecoil?.toString() || "0",
                fileItem?.AutoROF?.toString() || "0", fileItem?.SemiROF?.toString() || "0", fileItem?.ModMalfunctionChance?.toString() || "0", fileItem?.ReloadSpeed?.toString() || "0", fileItem?.AimSpeed?.toString() || "0", fileItem?.ChamberSpeed?.toString() || "0",
                fileItem?.Convergence?.toString() || "0", fileItem?.CanCycleSubs?.toString() || "false", fileItem?.RecoilAngle?.toString() || "0", fileItem?.StockAllowADS?.toString() || "false", fileItem?.FixSpeed?.toString() || "0", fileItem?.ModShotDispersion?.toString() || "0",
                fileItem?.MeleeDamage?.toString() || "0", fileItem?.MeleePen?.toString() || "0"];
            let combinedArr = modPropertyValues.concat(serverConfItems);
            serverItem._props.ConflictingItems = combinedArr;
        }
    }
    weapPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;
            if (modConfig.malf_changes == true) {
                serverItem._props.BaseMalfunctionChance = fileItem.BaseMalfunctionChance;
                serverItem._props.HeatFactorGun = fileItem.HeatFactorGun;
                serverItem._props.HeatFactorByShot = fileItem.HeatFactorByShot;
                serverItem._props.CoolFactorGun = fileItem.CoolFactorGun;
                serverItem._props.CoolFactorGunMods = fileItem.CoolFactorGunMods;
                serverItem._props.DurabilityBurnRatio = fileItem.DurabilityBurnRatio;
                serverItem._props.AllowOverheat = fileItem.AllowOverheat;
            }
            if (modConfig.realistic_ballistics == true) {
                serverItem._props.Velocity = fileItem.Velocity;
            }
            if (modConfig.recoil_attachment_overhaul == true) {
                serverItem._props.Ergonomics = fileItem.Ergonomics;
                serverItem._props.RecoilForceUp = fileItem.VerticalRecoil;
                serverItem._props.RecoilForceBack = fileItem.HorizontalRecoil;
                serverItem._props.RecolDispersion = fileItem.Dispersion;
                serverItem._props.RecoilCamera = fileItem.CameraRecoil;
                serverItem._props.RecoilAngle = fileItem.RecoilAngle;
                serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                serverItem._props.HipAccuracyRestorationDelay = fileItem.HipAccuracyRestorationDelay;
                serverItem._props.HipAccuracyRestorationSpeed = fileItem.HipAccuracyRestorationSpeed;
                serverItem._props.HipInnaccuracyGain = fileItem.HipInnaccuracyGain;
                serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
                serverItem._props.shotgunDispersion = fileItem.ShotgunDispersion;
                serverItem._props.Weight = fileItem.Weight;
                serverItem._props.bFirerate = fileItem.AutoROF;
                serverItem._props.SingleFireRate = fileItem.SemiROF * 1.1;
                serverItem._props.DoubleActionAccuracyPenalty = fileItem.DoubleActionAccuracyPenalty;
                serverItem._props.RecoilReturnSpeedHandRotation = fileItem.Convergence;
                serverItem._props.RecoilDampingHandRotation = fileItem.RecoilDamping;
                serverItem._props.RecoilReturnPathDampingHandRotation = fileItem.RecoilHandDamping;
                serverItem._props.RecoilReturnPathOffsetHandRotation = fileItem.OffsetRotation;
                serverItem._props.RecoilCategoryMultiplierHandRotation = fileItem.RecoilIntensity;
                serverItem._props.CameraSnap = 1;
                serverItem._props.RecoilCenter = fileItem.RecoilCenter != null && fileItem.RecoilCenter != undefined ? fileItem.RecoilCenter : serverItem._props.RecoilCenter;
                serverItem._props.CanQueueSecondShot = fileItem.CanQueueSecondShot != null ? fileItem.CanQueueSecondShot : serverItem._props.CanQueueSecondShot;
                if (fileItem?.weapFireType !== undefined) {
                    serverItem._props.weapFireType = fileItem.weapFireType;
                }
                if (fileItem?.WeapType !== undefined && (fileItem.IsManuallyOperated == false || fileItem.OperationType === "tubefed-m")) {
                    serverItem._props.CanQueueSecondShot = true;
                }
                let weapPropertyValues = ["SPTRM", fileItem?.WeapType?.toString() || "undefined", fileItem?.BaseTorque?.toString() || "0", fileItem?.HasShoulderContact?.toString() || "false", fileItem?.BaseReloadSpeedMulti?.toString() || "1", fileItem?.OperationType?.toString() || "undefined", fileItem?.WeapAccuracy?.toString() || "0",
                    fileItem?.RecoilDamping?.toString() || "0.7", fileItem?.RecoilHandDamping?.toString() || "0.7", fileItem?.WeaponAllowADS?.toString() || "false", fileItem?.BaseChamberSpeedMulti?.toString() || "1", fileItem?.MaxChamberSpeed?.toString() || "1.5", fileItem?.MinChamberSpeed?.toString() || "0.7", fileItem?.IsManuallyOperated?.toString() || "false",
                    fileItem?.MaxReloadSpeed?.toString() || "1.2", fileItem?.MinReloadSpeed?.toString() || "0.7", fileItem?.BaseChamberCheckSpeed?.toString() || "1", fileItem?.BaseFixSpeed?.toString() || "1", fileItem?.VisualMulti?.toString() || "1"
                ];
                let combinedArr = weapPropertyValues.concat(serverConfItems);
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }
    async processUserJsonFiles(folderPath = path.join(__dirname, '..', '..', 'db', 'put_new_stuff_here')) {
        try {
            const files = await readdir(folderPath);
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stats = await stat(filePath);
                if (stats.isDirectory()) {
                    await this.processUserJsonFiles(filePath); // Recursively call self for subfolders
                }
                else if (file.endsWith('.json')) {
                    const data = await readFile(filePath, 'utf8');
                    const jsonData = JSON.parse(data);
                    for (let i in jsonData) {
                        if (jsonData[i].WeapType !== undefined || jsonData[i].TemplateType == "gun") {
                            this.weapPusherHelper(jsonData[i], this.itemDB());
                        }
                        if (jsonData[i].ModType !== undefined || jsonData[i].TemplateType == "mod") {
                            this.modPusherHelper(jsonData[i], this.itemDB());
                        }
                        if (jsonData[i].TemplateType == "gear") {
                            this.gearPusherHelper(jsonData[i], this.itemDB());
                        }
                        if (jsonData[i].TemplateType == "ammo") {
                            this.ammoPusherHelper(jsonData[i], this.itemDB());
                        }
                    }
                }
            }
        }
        catch (err) {
            this.logger.error(`Error processing files in directory ${folderPath}: ${err}`);
        }
    }
}
exports.JsonHandler = JsonHandler;
//# sourceMappingURL=json-handler.js.map