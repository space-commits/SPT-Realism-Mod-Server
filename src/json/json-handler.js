"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStatHandler = void 0;
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
class ItemStatHandler {
    tables;
    logger;
    hashUtils;
    constructor(tables, logger, hashUtils) {
        this.tables = tables;
        this.logger = logger;
        this.hashUtils = hashUtils;
        this.gearPusherHelper = this.gearPusherHelper.bind(this);
        this.ammoPusherHelper = this.ammoPusherHelper.bind(this);
        this.modPusherHelper = this.modPusherHelper.bind(this);
        this.weapPusherHelper = this.weapPusherHelper.bind(this);
    }
    static instance;
    static getInstance(tables, logger, hashUtils) {
        if (!ItemStatHandler.instance)
            ItemStatHandler.instance = new ItemStatHandler(tables, logger, hashUtils);
        return ItemStatHandler.instance;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    modifiedItems = {};
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
    addGasFilterSlot(item) {
        const id = this.hashUtils.generate();
        item._props.Slots.push({
            "_name": "mod_equipment",
            "_id": id,
            "_parent": item._id,
            "_props": {
                "filters": [
                    {
                        "Shift": 0,
                        "Filter": [
                            "590c595c86f7747884343ad7"
                        ]
                    }
                ]
            },
            "_required": false,
            "_mergeSlotWithChildren": false,
            "_proto": "55d30c4c4bdc2db4468b457e"
        });
    }
    handleMasks(fileItem, serverItem) {
        if (fileItem?.IsGasMask != null && fileItem?.IsGasMask === true && fileItem?.MaskToUse != null) {
            serverItem._props.FaceShieldComponent = true;
            serverItem._props.FaceShieldMask = "NoMask";
            serverItem._props.armorClass = 1;
            serverItem._props.armorColliders = ["Eyes", "HeadCommon", "ParietalHead", "Jaw"];
            serverItem._props.MaxDurability = 25;
            serverItem._props.RepairCost = 269;
            serverItem._props.Durability = serverItem._props.MaxDurability;
            if (modConfig.enable_hazard_zones) {
                this.addGasFilterSlot(serverItem);
            }
        }
        else if (fileItem?.MaskToUse != null) {
            if (fileItem.MaskToUse == "ronin") {
                serverItem._props.FaceShieldMask = "NoMask";
            }
            else {
                serverItem._props.FaceShieldMask = "Narrow";
            }
            serverItem._props.FaceShieldComponent = true;
        }
    }
    gearPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID]; //this will be the reskin item's stats, which I want to reset
            let baseItem = serverItem; //temp set it to server template
            if (fileItem.TemplateID != null) {
                baseItem = serverTemplates[fileItem.TemplateID]; //if it's a reskin, need the server stats of the item the skin is based on
                fileItem = this.modifiedItems[fileItem.TemplateID]; //if it's a reskin, need the realism specific stats of the item the skin is based on
            }
            this.modifiedItems[fileItem.ItemID] = fileItem; //store the item in an object to be used later for reskins
            serverItem._props.speedPenaltyPercent = fileItem.speedPenaltyPercent != null ? fileItem.speedPenaltyPercent : baseItem._props.speedPenaltyPercent;
            serverItem._props.mousePenalty = fileItem.mousePenalty != null ? fileItem.mousePenalty : baseItem._props.mousePenalty;
            serverItem._props.weaponErgonomicPenalty = fileItem.weaponErgonomicPenalty != null ? fileItem.weaponErgonomicPenalty : baseItem._props.weaponErgonomicPenalty;
            if (serverItem._props?.armorClass != null) {
                serverItem._props.armorClass = fileItem.ArmorLevel != null ? fileItem.ArmorLevel : serverItem._props.armorClass;
            }
            if (serverItem._props?.Durability != null) {
                serverItem._props.Durability = fileItem.Durability != null ? fileItem.Durability : serverItem._props.Durability;
            }
            if (serverItem._props?.MaxDurability != null) {
                serverItem._props.MaxDurability = fileItem.Durability != null ? fileItem.Durability : serverItem._props.MaxDurability;
            }
            if (serverItem._props?.BluntThroughput != null) {
                serverItem._props.BluntThroughput = fileItem.BluntThroughput != null ? fileItem.BluntThroughput : serverItem._props.BluntThroughput;
            }
            if (serverItem._props?.ArmorMaterial != null) {
                serverItem._props.ArmorMaterial = fileItem.ArmorMaterial != null ? fileItem.ArmorMaterial : serverItem._props.ArmorMaterial;
            }
            if (serverItem._props?.Weight != null) {
                serverItem._props.Weight = fileItem.Weight != null ? fileItem.Weight : serverItem._props.Weight;
            }
            if (modConfig.enable_hazard_zones || modConfig.realistic_ballistics) {
                this.handleMasks(fileItem, serverItem);
            }
        }
    }
    ammoPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID]; //this will be the reskin item's stats, which I want to reset
            let baseItem = serverItem; //temp set it to server template
            if (fileItem.TemplateID != null) {
                baseItem = serverTemplates[fileItem.TemplateID]; //if it's a reskin, need the server stats of the item the skin is based on
                fileItem = this.modifiedItems[fileItem.TemplateID]; //if it's a reskin, need the realism specific stats of the item the skin is based on
            }
            this.modifiedItems[fileItem.ItemID] = fileItem; //store the item in an object to be used later for reskins
            serverItem._props.PenetrationPower = fileItem.PenetrationPower != null ? fileItem.PenetrationPower : serverItem._props.PenetrationPower;
            serverItem._props.Weight = fileItem.Weight != null ? fileItem.Weight : serverItem._props.Weight;
            serverItem._props.InitialSpeed = fileItem.InitialSpeed != null ? fileItem.InitialSpeed : serverItem._props.InitialSpeed;
            serverItem._props.BulletMassGram = fileItem.BulletMassGram != null ? fileItem.BulletMassGram : serverItem._props.BulletMassGram;
            serverItem._props.BulletDiameterMilimeters = fileItem.BulletDiameterMilimeters != null ? fileItem.BulletDiameterMilimeters : serverItem._props.BulletDiameterMilimeters;
            serverItem._props.ammoAccr = fileItem.ammoAccr != null ? fileItem.ammoAccr : serverItem._props.ammoAccr;
            serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator != null ? fileItem.DurabilityBurnModificator : serverItem._props.DurabilityBurnModificator;
            serverItem._props.HeatFactor = fileItem.HeatFactor != null ? fileItem.HeatFactor : serverItem._props.HeatFactor;
            serverItem._props.Damage = fileItem.Damage != null ? fileItem.Damage : serverItem._props.Damage;
            serverItem._props.ArmorDamage = 1;
            serverItem._props.casingMass = 1;
        }
    }
    modPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID]; //this will be the reskin item's stats, which I want to reset
            let baseItem = serverItem; //temp set it to server template
            if (fileItem.TemplateID != null) {
                baseItem = serverTemplates[fileItem.TemplateID]; //if it's a reskin, need the server stats of the item the skin is based on
                fileItem = this.modifiedItems[fileItem.TemplateID]; //if it's a reskin, need the realism specific stats of the item the skin is based on
            }
            this.modifiedItems[fileItem.ItemID] = fileItem; //store the item in an object to be used later for reskins
            serverItem._props.Ergonomics = fileItem.Ergonomics != null ? fileItem.Ergonomics : 0;
            serverItem._props.Accuracy = fileItem.Accuracy != null ? fileItem.Accuracy : 0;
            serverItem._props.CenterOfImpact = fileItem.CenterOfImpact != null ? fileItem.CenterOfImpact : 0.05;
            serverItem._props.HeatFactor = fileItem.HeatFactor != null ? fileItem.HeatFactor : 1;
            serverItem._props.CoolFactor = fileItem.CoolFactor != null ? fileItem.CoolFactor : 1;
            serverItem._props.MalfunctionChance = fileItem.MalfunctionChance != null ? fileItem.MalfunctionChance : 0;
            // serverItem._props.CheckTimeModifier = fileItem.CheckTimeModifier;
            serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator != null ? fileItem.DurabilityBurnModificator : 1;
            serverItem._props.BlocksFolding = fileItem.BlocksFolding != null ? fileItem.BlocksFolding : false;
            serverItem._props.Weight = fileItem.Weight != null ? fileItem.Weight : 0;
            serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion != null ? fileItem.ShotgunDispersion : 1;
            serverItem._props.Loudness = fileItem.Loudness != null ? fileItem.Loudness : 0;
            let confFileItems = fileItem.ConflictingItems ?? [];
            serverItem._props.ConflictingItems = [...new Set([...serverItem._props.ConflictingItems, ...confFileItems])];
            ;
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
        }
    }
    weapPusherHelper(fileItem, serverTemplates) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID]; //this will be the reskin item's stats, which I want to reset
            let baseItem = serverItem; //temp set it to server template
            if (fileItem.TemplateID != null) {
                baseItem = serverTemplates[fileItem.TemplateID]; //if it's a reskin, need the server stats of the item the skin is based on
                fileItem = this.modifiedItems[fileItem.TemplateID]; //if it's a reskin, need the realism specific stats of the item the skin is based on
            }
            this.modifiedItems[fileItem.ItemID] = fileItem; //store the item in an object to be used later for reskins
            if (modConfig.malf_changes == true) {
                const malfChance = fileItem.BaseMalfunctionChance >= 0.1 ? fileItem.BaseMalfunctionChance * 0.01 : fileItem.BaseMalfunctionChance; //a lot of weapon patches are using old malf values
                serverItem._props.BaseMalfunctionChance = malfChance;
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
                serverItem._props.RecoilPosZMult = 1.5;
                serverItem._props.RecoilCenter = fileItem.RecoilCenter != null && fileItem.RecoilCenter != null ? fileItem.RecoilCenter : serverItem._props.RecoilCenter;
                serverItem._props.CanQueueSecondShot = fileItem.CanQueueSecondShot != null ? fileItem.CanQueueSecondShot : serverItem._props.CanQueueSecondShot;
                if (serverItem._props.weapClass != "pistol") {
                    serverItem._props.RecoilStableIndexShot = 1;
                    serverItem._props.ShotsGroupSettings[0].StartShotIndex = 1;
                }
                if (fileItem?.BurstShotsCount != null) {
                    serverItem._props.BurstShotsCount = fileItem.BurstShotsCount;
                }
                if (fileItem?.weapFireType != null) {
                    serverItem._props.weapFireType = fileItem.weapFireType;
                }
                if (fileItem?.WeapType != null && (fileItem.IsManuallyOperated == false || fileItem.OperationType === "tubefed-m")) {
                    serverItem._props.CanQueueSecondShot = true;
                }
                if (fileItem.MasteryCategory != null && modConfig.mastery_changes == true) {
                    this.tables.globals.config.Mastering.find(m => m.Name === fileItem.MasteryCategory).Templates.push(fileItem.ItemID);
                }
            }
        }
    }
    async processTemplateJson(isForClientDataRequest, folderPath = path.join(__dirname, '..', '..', 'db', 'templates', 'user_templates'), rawTemplateData = {}) {
        try {
            const files = await readdir(folderPath);
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stats = await stat(filePath);
                if (stats.isDirectory()) {
                    await this.processTemplateJson(isForClientDataRequest, filePath, rawTemplateData);
                }
                else if (file.endsWith('.json')) {
                    const data = await readFile(filePath, 'utf8');
                    const jsonData = JSON.parse(data);
                    for (let i in jsonData) {
                        const template = jsonData[i];
                        if (isForClientDataRequest) {
                            rawTemplateData[i] = template;
                            continue;
                        }
                        if ((modConfig.recoil_attachment_overhaul || modConfig.realistic_ballistics) && template.$type.includes("Gun")) {
                            this.weapPusherHelper(template, this.itemDB());
                        }
                        if (modConfig.recoil_attachment_overhaul && template.$type.includes("WeaponMod")) {
                            this.modPusherHelper(template, this.itemDB());
                        }
                        if (template.$type.includes("Gear")) {
                            this.gearPusherHelper(template, this.itemDB());
                        }
                        if (modConfig.realistic_ballistics && template.$type.includes("Ammo")) {
                            this.ammoPusherHelper(template, this.itemDB());
                        }
                    }
                }
            }
            return rawTemplateData;
        }
        catch (err) {
            this.logger.error(`Error processing files in directory ${folderPath}: ${err}`);
        }
    }
}
exports.ItemStatHandler = ItemStatHandler;
//# sourceMappingURL=json-handler.js.map