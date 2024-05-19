"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonGen = void 0;
const enums_1 = require("../utils/enums");
const modConfig = require("../../config/config.json");
const armorTemplate = require("../../db/bots/loadouts/templates/armorMods.json");
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
const ammoTemplates = require("../../db/templates/ammo/ammoTemplates.json");
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
const allValidArmorSlots = [
    "front_plate",
    "back_plate",
    "left_side_plate",
    "right_side_plate",
    "soft_armor_front",
    "soft_armor_back",
    "soft_armor_left",
    "soft_armor_right",
    "collar",
    "shoulder_l",
    "shoulder_r",
    "groin",
    "groin_back",
    "helmet_top",
    "helmet_back",
    "helmet_ears",
    "helmet_eyes",
    "helmet_jaw"
];
class JsonGen {
    logger;
    tables;
    modConf;
    utils;
    arrays;
    constructor(logger, tables, modConf, utils, arrays) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.utils = utils;
        this.arrays = arrays;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    ammoTemplatesCodeGen() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._parent === enums_1.ParentClasses.AMMO || serverItem._parent === enums_1.ParentClasses.AMMO_BOX) {
                this.itemWriteToFile(ammoTemplates, "ammoTemplates", i, serverItem, "ammo", this.assignJSONToAmmo);
            }
        }
    }
    gearTemplatesCodeGen() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem?._props?.armorClass != undefined) {
                let armorLevl = typeof serverItem._props.armorClass === 'number' ? serverItem._props.armorClass : parseInt(serverItem._props.armorClass);
                if (serverItem._parent === enums_1.ParentClasses.CHESTRIG && armorLevl > 0) {
                    this.itemWriteToFile(armorChestrigTemplates, "armorChestrigTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if ((serverItem._parent === enums_1.ParentClasses.ARMOR_PLATE || serverItem._parent === enums_1.ParentClasses.BUILT_IN_ARMOR) && armorLevl > 0) {
                    this.itemWriteToFile(armorPlateTemplates, "armorPlateTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if (serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT && armorLevl > 0) {
                    this.itemWriteToFile(armorComponentsTemplates, "armorComponentsTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if (serverItem._parent === enums_1.ParentClasses.HEADWEAR && armorLevl > 0) {
                    this.itemWriteToFile(helmetTemplates, "helmetTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if (serverItem._parent === enums_1.ParentClasses.ARMORVEST && armorLevl > 0) {
                    this.itemWriteToFile(armorVestsTemplates, "armorVestsTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if (serverItem._parent === enums_1.ParentClasses.CHESTRIG && armorLevl === 0) {
                    this.itemWriteToFile(chestrigTemplates, "chestrigTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if (serverItem._parent === enums_1.ParentClasses.HEADSET) {
                    this.itemWriteToFile(headsetTemplates, "headsetTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if ((serverItem._parent === enums_1.ParentClasses.HEADWEAR || serverItem._parent === enums_1.ParentClasses.FACECOVER) && armorLevl <= 1) {
                    this.itemWriteToFile(cosmeticsTemplates, "cosmeticsTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
                if ((serverItem._parent === enums_1.ParentClasses.BACKPACK)) {
                    this.itemWriteToFile(bagTemplates, "bagTemplates", i, serverItem, "gear", this.assignJSONToGear, null);
                }
            }
        }
    }
    weapTemplatesCodeGen() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._props.RecolDispersion) {
                if (serverItem._props.weapClass === "assaultCarbine") {
                    this.itemWriteToFile(AssaultCarbineTemplates, "AssaultCarbineTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "assaultRifle") {
                    this.itemWriteToFile(AssaultRifleTemplates, "AssaultRifleTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "smg") {
                    this.itemWriteToFile(SMGTemplates, "SMGTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "machinegun") {
                    this.itemWriteToFile(MachinegunTemplates, "MachinegunTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "marksmanRifle") {
                    this.itemWriteToFile(MarksmanRifleTemplates, "MarksmanRifleTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "sniperRifle") {
                    this.itemWriteToFile(SniperRifleTemplates, "SniperRifleTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "pistol") {
                    this.itemWriteToFile(PistolTemplates, "PistolTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "shotgun") {
                    this.itemWriteToFile(ShotgunTemplates, "ShotgunTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "specialWeapon") {
                    this.itemWriteToFile(SpecialWeaponTemplates, "SpecialWeaponTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
                if (serverItem._props.weapClass === "grenadeLauncher") {
                    this.itemWriteToFile(GrenadeLauncherTemplates, "GrenadeLauncherTemplates", i, serverItem, "weapons", this.assignJSONToWeap, null);
                }
            }
        }
    }
    attTemplatesCodeGen() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                for (let value in this.arrays.modTypes) {
                    if (serverItem._parent === this.arrays.modTypes[value]) {
                        if (this.arrays.modTypes[value] === "550aa4bf4bdc2dd6348b456b" ||
                            this.arrays.modTypes[value] === "550aa4dd4bdc2dc9348b4569" ||
                            this.arrays.modTypes[value] === "550aa4cd4bdc2dd8348b456c") {
                            let id = "muzzle";
                            this.itemWriteToFile(MuzzleDeviceTemplates, "MuzzleDeviceTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "555ef6e44bdc2de9068b457e") {
                            let id = "barrel";
                            this.itemWriteToFile(BarrelTemplates, "BarrelTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818b224bdc2dde698b456f") {
                            let id = "mount";
                            this.itemWriteToFile(MountTemplates, "MountTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a304bdc2db5418b457d") {
                            let id = "receiver";
                            this.itemWriteToFile(ReceiverTemplates, "ReceiverTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a594bdc2db9688b456a") {
                            let id = "stock";
                            this.itemWriteToFile(StockTemplates, "StockTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a6f4bdc2db9688b456b") {
                            let id = "charging";
                            this.itemWriteToFile(ChargingHandleTemplates, "ChargingHandleTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818acf4bdc2dde698b456b" ||
                            this.arrays.modTypes[value] === "55818ad54bdc2ddc698b4569" ||
                            this.arrays.modTypes[value] === "55818add4bdc2d5b648b456f" ||
                            this.arrays.modTypes[value] === "55818ae44bdc2dde698b456c" ||
                            this.arrays.modTypes[value] === "55818aeb4bdc2ddc698b456a") {
                            let id = "scope";
                            this.itemWriteToFile(ScopeTemplates, "ScopeTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818ac54bdc2d5b648b456e") {
                            let id = "irons";
                            this.itemWriteToFile(IronSightTemplates, "IronSightTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "5448bc234bdc2d3c308b4569" ||
                            this.arrays.modTypes[value] === "610720f290b75a49ff2e5e25" ||
                            this.arrays.modTypes[value] === "627a137bf21bc425b06ab944") {
                            let id = "magazine";
                            this.itemWriteToFile(MagazineTemplates, "MagazineTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "5a74651486f7744e73386dd1" ||
                            this.arrays.modTypes[value] === "55818afb4bdc2dde698b456d") {
                            let id = "aux";
                            this.itemWriteToFile(AuxiliaryModTemplates, "AuxiliaryModTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818af64bdc2d5b648b4570") {
                            let id = "foregrip";
                            this.itemWriteToFile(ForegripTemplates, "ForegripTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a684bdc2ddd698b456d") {
                            let id = "pistolgrip";
                            this.itemWriteToFile(PistolGripTemplates, "PistolGripTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "56ea9461d2720b67698b456f") {
                            let id = "gasblock";
                            this.itemWriteToFile(GasblockTemplates, "GasblockTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818a104bdc2db9688b4569") {
                            let id = "handguard";
                            this.itemWriteToFile(HandguardTemplates, "HandguardTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                        if (this.arrays.modTypes[value] === "55818b084bdc2d5b648b4571" ||
                            this.arrays.modTypes[value] === "55818b164bdc2ddc698b456c") {
                            let id = "flashlight";
                            this.itemWriteToFile(FlashlightLaserTemplates, "FlashlightLaserTemplates", i, serverItem, "attatchments", this.assignJSONToMod, id);
                        }
                    }
                }
            }
        }
    }
    itemWriteToFile(filePathObj, fileStr, index, serverItem, folderStr, funJsonAssign, id) {
        let fileItem = filePathObj[index];
        filePathObj[index] = funJsonAssign(serverItem, fileItem, id);
        this.utils.writeConfigJSON(filePathObj, `db/templates/${folderStr}/${fileStr}.json`);
    }
    assignJSONToAmmo(serverItem, fileItem) {
        if (fileItem) {
            fileItem;
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let LoyaltyLevel = 2;
        let item = {
            ItemID,
            Name,
            LoyaltyLevel
        };
        return item;
    }
    assignJSONToGear(serverItem, fileItem) {
        if (fileItem) {
            fileItem;
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let AllowADS = true;
        let LoyaltyLevel = 2;
        let ReloadSpeedMulti = 1;
        let Price = 0;
        let Comfort = 1;
        let ArmorClass = "";
        let CanSpall = false;
        let SpallReduction = 1;
        // let BlocksMouth = false;
        // let dB = 0;
        let item = {
            ItemID,
            Name,
            AllowADS,
            LoyaltyLevel,
            Price,
            ReloadSpeedMulti,
            Comfort
        };
        return item;
    }
    assignJSONToWeap(serverItem, fileItem) {
        // new items properties can be added, and  property values can be replaced, by delcaring them in this if statement
        if (fileItem) {
            // fileItem.HeatFactor = serverItem._props.HeatFactor; You need to give it a value. If you set it to the server item's propety value, the new property will only appear if the server mod has that property
            fileItem.RecoilDamping = serverItem._props.RecoilDampingHandRotation;
            fileItem.RecoilHandDamping = serverItem._props.RecoilReturnPathDampingHandRotation;
            fileItem.OffsetRotation = serverItem._props.RecoilReturnPathOffsetHandRotation;
            fileItem.RecoilIntensity = serverItem._props.RecoilCategoryMultiplierHandRotation;
            fileItem;
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let WeapType = "";
        let OperationType = "";
        let WeapAccuracy = 0;
        let BaseTorque = 0;
        let RecoilDamping = serverItem._props.RecoilDampingHandRotation;
        let RecoilHandDamping = serverItem._props.RecoilReturnPathDampingHandRotation;
        let OffsetRotation = serverItem._props.RecoilReturnPathOffsetHandRotation;
        let RecoilIntensity = serverItem._props.RecoilCategoryMultiplierHandRotation;
        let HasShoulderContact = false;
        let WeaponAllowADS = false;
        let Ergonomics = serverItem._props.Ergonomics;
        let VerticalRecoil = serverItem._props.RecoilForceUp;
        let HorizontalRecoil = serverItem._props.RecoilForceBack;
        let Dispersion = serverItem._props.RecolDispersion;
        let CameraRecoil = serverItem._props.RecoilCamera;
        let VisualMulti = 1;
        let Convergence = serverItem._props.RecoilReturnSpeedHandRotation;
        let RecoilAngle = serverItem._props.RecoilAngle;
        let DurabilityBurnRatio = serverItem._props.DurabilityBurnRatio;
        let BaseMalfunctionChance = serverItem._props.BaseMalfunctionChance;
        let HeatFactorGun = serverItem._props.HeatFactorGun;
        let HeatFactorByShot = serverItem._props.HeatFactorByShot;
        let CoolFactorGun = serverItem._props.CoolFactorGun;
        let CoolFactorGunMods = serverItem._props.CoolFactorGunMods;
        let AllowOverheat = serverItem._props.AllowOverheat;
        let CenterOfImpact = serverItem._props.CenterOfImpact;
        let HipAccuracyRestorationDelay = serverItem._props.HipAccuracyRestorationDelay;
        let HipAccuracyRestorationSpeed = serverItem._props.HipAccuracyRestorationSpeed;
        let HipInnaccuracyGain = serverItem._props.HipInnaccuracyGain;
        let ShotgunDispersion = serverItem._props.ShotgunDispersion;
        let Velocity = serverItem._props.Velocity;
        let Weight = serverItem._props.Weight;
        let AutoROF = serverItem._props.bFirerate;
        let SemiROF = serverItem._props.SingleFireRate;
        let LoyaltyLevel = 2;
        let BaseReloadSpeedMulti = 1;
        let BaseChamberSpeedMulti = 1;
        let MaxChamberSpeed = 1.5;
        let MinChamberSpeed = 0.7;
        let IsManuallyOperated = false;
        let BaseChamberCheckSpeed = 1;
        let BaseFixSpeed = 1;
        let item = {
            ItemID,
            Name,
            WeapType,
            OperationType,
            WeapAccuracy,
            BaseTorque,
            RecoilDamping,
            RecoilHandDamping,
            OffsetRotation,
            RecoilIntensity,
            HasShoulderContact,
            WeaponAllowADS,
            Ergonomics,
            VerticalRecoil,
            HorizontalRecoil,
            Dispersion,
            CameraRecoil,
            VisualMulti,
            Convergence,
            RecoilAngle,
            DurabilityBurnRatio,
            BaseMalfunctionChance,
            HeatFactorGun,
            HeatFactorByShot,
            CoolFactorGun,
            CoolFactorGunMods,
            AllowOverheat,
            CenterOfImpact,
            HipAccuracyRestorationDelay,
            HipAccuracyRestorationSpeed,
            HipInnaccuracyGain,
            ShotgunDispersion,
            Velocity,
            Weight,
            AutoROF,
            SemiROF,
            LoyaltyLevel,
            BaseReloadSpeedMulti,
            BaseChamberSpeedMulti,
            MaxChamberSpeed,
            MinChamberSpeed,
            IsManuallyOperated,
            BaseChamberCheckSpeed,
            BaseFixSpeed
        };
        return item;
    }
    assignJSONToMod(serverItem, fileItem, ID) {
        //new items properties can be added, and  property values can be replaced, by delcaring them in this if statement
        if (fileItem) {
            // fileItem.HeatFactor = serverItem._props.HeatFactor; You need to give it a value. If you set it to the server item's propety value, the new property will only appear if the server mod has that property
            //    if(serverItem._props?.Recoil !== undefined){
            //     fileItem.VerticalRecoil = serverItem._props.Recoil;
            //     fileItem.HorizontalRecoil = serverItem._props.Recoil;
            //    }
            fileItem.Price = 0;
            fileItem.LoyaltyLevel = 0;
            return fileItem;
        }
        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let ModType = "";
        let VerticalRecoil = serverItem._props.Recoil;
        let HorizontalRecoil = serverItem._props.Recoil;
        let Dispersion = 0;
        let CameraRecoil = 0;
        let AutoROF = 0;
        let SemiROF = 0;
        let ModMalfunctionChance = 0;
        let ReloadSpeed = 0;
        let AimSpeed = 0;
        let Convergence = 0;
        let CanCycleSubs = false;
        let RecoilAngle = 0;
        let StockAllowADS = false;
        let FixSpeed = 0;
        let ChamberSpeed = 0;
        let ModShotDispersion = 0;
        let Ergonomics = serverItem._props.Ergonomics;
        let Accuracy = serverItem._props.Accuracy;
        let CenterOfImpact = serverItem._props.CenterOfImpact;
        let HeatFactor = serverItem._props.HeatFactor;
        let CoolFactor = serverItem._props.CoolFactor;
        let MagMalfunctionChance = serverItem._props.MalfunctionChance;
        let LoadUnloadModifier = serverItem._props.LoadUnloadModifier;
        let CheckTimeModifier = serverItem._props.CheckTimeModifier;
        let DurabilityBurnModificator = serverItem._props.DurabilityBurnModificator;
        let HasShoulderContact = serverItem._props.HasShoulderContact;
        let BlocksFolding = serverItem._props.BlocksFolding;
        let Velocity = serverItem._props.Velocity;
        let ConflictingItems = serverItem._props.ConflictingItems;
        let Weight = serverItem._props.Weight;
        let ShotgunDispersion = serverItem._props.ShotgunDispersion;
        let Loudness = serverItem._props.Loudness;
        let MalfChance = 0;
        let Price = 0;
        let LoyaltyLevel = 1;
        if (ID === "muzzle") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                CameraRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CanCycleSubs,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Velocity,
                RecoilAngle,
                ConflictingItems,
                Ergonomics,
                Weight,
                ModShotDispersion,
                Loudness,
                MalfChance,
                Convergence,
                Price,
                LoyaltyLevel
            };
            return item;
        }
        if (ID === "barrel") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                Convergence,
                Accuracy,
                CenterOfImpact,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Velocity,
                ConflictingItems,
                Ergonomics,
                Weight,
                ShotgunDispersion,
                Loudness,
                MalfChance
            };
            return item;
        }
        if (ID === "mount") {
            let item = {
                ItemID,
                Name,
                ModType,
                Ergonomics,
                Accuracy,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "receiver") {
            let item = {
                ItemID,
                Name,
                ModType,
                ModMalfunctionChance,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                ConflictingItems,
                Ergonomics,
                Weight,
                MalfChance
            };
            return item;
        }
        if (ID === "charging") {
            let item = {
                ItemID,
                Name,
                ModType,
                ReloadSpeed,
                ConflictingItems,
                FixSpeed,
                Ergonomics,
                Weight,
                ChamberSpeed
            };
            return item;
        }
        if (ID === "scope" || ID === "irons") {
            let item = {
                ItemID,
                Name,
                ModType,
                AimSpeed,
                Accuracy,
                ConflictingItems,
                Ergonomics,
                Weight
            };
            return item;
        }
        if (ID === "magazine") {
            let item = {
                ItemID,
                Name,
                ModType,
                ReloadSpeed,
                Ergonomics,
                MagMalfunctionChance,
                LoadUnloadModifier,
                CheckTimeModifier,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "aux") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                AimSpeed,
                ReloadSpeed,
                Ergonomics,
                Accuracy,
                ConflictingItems,
                FixSpeed,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Weight,
                MalfChance
            };
            return item;
        }
        if (ID === "foregrip" || ID === "pistolgrip") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AimSpeed,
                Ergonomics,
                Accuracy,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "stock") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CameraRecoil,
                AimSpeed,
                Ergonomics,
                Accuracy,
                HasShoulderContact,
                BlocksFolding,
                StockAllowADS,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "gasblock") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CanCycleSubs,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                ConflictingItems,
                Ergonomics,
                Weight,
                MalfChance
            };
            return item;
        }
        if (ID === "handguard") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AimSpeed,
                ChamberSpeed,
                Ergonomics,
                Accuracy,
                HeatFactor,
                CoolFactor,
                ConflictingItems,
                Weight
            };
            return item;
        }
        if (ID === "flashlight") {
            let item = {
                ItemID,
                Name,
                ModType,
                ConflictingItems,
                Ergonomics,
                Weight
            };
            return item;
        }
        if (ID === "unknown") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                CameraRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                ReloadSpeed,
                AimSpeed,
                ChamberSpeed,
                CanCycleSubs,
                Ergonomics,
                Accuracy,
                CenterOfImpact,
                HeatFactor,
                CoolFactor,
                MagMalfunctionChance,
                LoadUnloadModifier,
                CheckTimeModifier,
                DurabilityBurnModificator,
                HasShoulderContact,
                BlocksFolding,
                Velocity,
                RecoilAngle,
                ConflictingItems,
                FixSpeed,
                StockAllowADS,
                Weight,
                MalfChance
            };
            return item;
        }
    }
    genArmorMods() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._parent === enums_1.ParentClasses.ARMORVEST || serverItem._parent === enums_1.ParentClasses.CHESTRIG || serverItem._parent === enums_1.ParentClasses.HEADWEAR || serverItem._parent === enums_1.ParentClasses.FACECOVER) {
                this.armorModsWriteToFile(i, serverItem);
            }
        }
    }
    armorModsWriteToFile(index, serverItem) {
        armorTemplate[index] = this.writeArmorToFile(serverItem);
        this.utils.writeConfigJSON(armorTemplate, `db/bots/loadouts/templates/armorMods.json`);
    }
    writeArmorToFile(serverItem) {
        let armor = {};
        if (Array.isArray(serverItem._props.Slots)) {
            for (const slot of serverItem._props.Slots) {
                if (allValidArmorSlots.includes(slot._name.toLowerCase())) {
                    let slotItems = [];
                    for (const filter of slot._props.filters) {
                        for (const item of filter.Filter) {
                            slotItems.push(item);
                        }
                    }
                    armor[slot._name] = slotItems;
                }
            }
            return armor;
        }
    }
}
exports.JsonGen = JsonGen;
//# sourceMappingURL=json_gen.js.map