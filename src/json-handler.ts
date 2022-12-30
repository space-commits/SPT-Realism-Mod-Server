import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ParentClasses } from "./enums";
import { ConfigChecker } from "./helper";

const FaceShieldTemplates = require("../db/templates/armor/FaceShieldTemplates.json");
const armorComponentsTemplates = require("../db/templates/armor/armorComponentsTemplates.json");
const armorChestrigTemplates = require("../db/templates/armor/armorChestrigTemplates.json");
const helmetTemplates = require("../db/templates/armor/helmetTemplates.json");
const armorVestsTemplates = require("../db/templates/armor/armorVestsTemplates.json");

const MuzzleDeviceTemplates = require("../db/templates/attatchments/MuzzleDeviceTemplates.json");
const BarrelTemplates = require("../db/templates/attatchments/BarrelTemplates.json");
const MountTemplates = require("../db/templates/attatchments/MountTemplates.json");
const ReceiverTemplates = require("../db/templates/attatchments/ReceiverTemplates.json");
const StockTemplates = require("../db/templates/attatchments/StockTemplates.json");
const ChargingHandleTemplates = require("../db/templates/attatchments/ChargingHandleTemplates.json");
const ScopeTemplates = require("../db/templates/attatchments/ScopeTemplates.json");
const IronSightTemplates = require("../db/templates/attatchments/IronSightTemplates.json");
const MagazineTemplates = require("../db/templates/attatchments/MagazineTemplates.json");
const AuxiliaryModTemplates = require("../db/templates/attatchments/AuxiliaryModTemplates.json");
const ForegripTemplates = require("../db/templates/attatchments/ForegripTemplates.json");
const PistolGripTemplates = require("../db/templates/attatchments/PistolGripTemplates.json");
const GasblockTemplates = require("../db/templates/attatchments/GasblockTemplates.json");
const HandguardTemplates = require("../db/templates/attatchments/HandguardTemplates.json");
const FlashlightLaserTemplates = require("../db/templates/attatchments/FlashlightLaserTemplates.json");

const AssaultRifleTemplates = require("../db/templates/weapons/AssaultRifleTemplates.json");
const AssaultCarbineTemplates = require("../db/templates/weapons/AssaultCarbineTemplates.json");
const MachinegunTemplates = require("../db/templates/weapons/MachinegunTemplates.json");
const MarksmanRifleTemplates = require("../db/templates/weapons/MarksmanRifleTemplates.json");
const PistolTemplates = require("../db/templates/weapons/PistolTemplates.json");
const ShotgunTemplates = require("../db/templates/weapons/ShotgunTemplates.json");
const SMGTemplates = require("../db/templates/weapons/SMGTemplates.json");
const SniperRifleTemplates = require("../db/templates/weapons/SniperRifleTemplates.json");
const SpecialWeaponTemplates = require("../db/templates/weapons/SpecialWeaponTemplates.json");
const GrenadeLauncherTemplates = require("../db/templates/weapons/GrenadeLauncherTemplates.json");


export class JsonHandler {

    constructor(private tables: IDatabaseTables, private modConf: any) { }

    itemDB = this.tables.templates.items;

    public pushModsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                // for (let i in MuzzleDeviceTemplates) {
                //     let fileItem = MuzzleDeviceTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in BarrelTemplates) {
                //     let fileItem = BarrelTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in MountTemplates) {
                //     let fileItem = MountTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in ReceiverTemplates) {
                //     let fileItem = ReceiverTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in StockTemplates) {
                //     let fileItem = StockTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in ChargingHandleTemplates) {
                //     let fileItem = ChargingHandleTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in ScopeTemplates) {
                //     let fileItem = ScopeTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in IronSightTemplates) {
                //     let fileItem = IronSightTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in MagazineTemplates) {
                //     let fileItem = MagazineTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in AuxiliaryModTemplates) {
                //     let fileItem = AuxiliaryModTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in ForegripTemplates) {
                //     let fileItem = ForegripTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in PistolGripTemplates) {
                //     let fileItem = PistolGripTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in GasblockTemplates) {
                //     let fileItem = GasblockTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in HandguardTemplates) {
                //     let fileItem = HandguardTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                // for (let i in FlashlightLaserTemplates) {
                //     let fileItem = FlashlightLaserTemplates[i];
                //     this.modPusherHelper(serverItem, fileItem);
                // }
                this.callHelper(MuzzleDeviceTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(BarrelTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(MountTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(ReceiverTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(StockTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(ChargingHandleTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(ScopeTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(IronSightTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(MagazineTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(AuxiliaryModTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(ForegripTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(PistolGripTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(GasblockTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(HandguardTemplates, serverItem, this.weapPusherHelper);
                this.callHelper(FlashlightLaserTemplates, serverItem, this.weapPusherHelper);
            }
        }
    }

    public pushWeaponsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.RecolDispersion) {
                // for (let i in AssaultRifleTemplates) {
                //     let fileItem = AssaultRifleTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in AssaultCarbineTemplates) {
                //     let fileItem = AssaultCarbineTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in MachinegunTemplates) {
                //     let fileItem = MachinegunTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in MarksmanRifleTemplates) {
                //     let fileItem = MarksmanRifleTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in PistolTemplates) {
                //     let fileItem = PistolTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in ShotgunTemplates) {
                //     let fileItem = ShotgunTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in SMGTemplates) {
                //     let fileItem = SMGTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in SniperRifleTemplates) {
                //     let fileItem = SniperRifleTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in SpecialWeaponTemplates) {
                //     let fileItem = SpecialWeaponTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
                // for (let i in GrenadeLauncherTemplates) {
                //     let fileItem = GrenadeLauncherTemplates[i];
                //     this.weapPusherHelper(serverItem, fileItem);
                // }
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
    }

    public pushArmorToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === ParentClasses.ARMOREDEQUIPMENT || serverItem._parent === ParentClasses.HEADWEAR || serverItem._parent === ParentClasses.FACECOVER) {
                this.callHelper(FaceShieldTemplates, serverItem, this.armorPusherHelper);
            }
        }
    }

    private callHelper(template: any, serverItem: ITemplateItem, funPusherHelper: Function) {
        for (let i in template) {
            let fileItem = template[i];
            funPusherHelper(serverItem, fileItem);
        }
    }

    private armorPusherHelper(serverItem: any, fileItem: any) {

        if (serverItem._id === fileItem.ItemID) {

            var serverConfItems = serverItem._props.ConflictingItems;
            var armorPropertyValues = ["SPTRM", fileItem?.AllowADS?.toString() || "true"];

            var combinedArr = armorPropertyValues.concat(serverConfItems)
            serverItem._props.ConflictingItems = combinedArr;
        }
    }

    private modPusherHelper(serverItem: any, fileItem: any) {


        if (this.modConf.recoil_attachment_overhaul == true && this.modConf.legacy_recoil_changes != true && ConfigChecker.dllIsPresent == true) {
            if (serverItem._id === fileItem.ItemID) {
                serverItem._props.Ergonomics = fileItem.Ergonomics;
                serverItem._props.Accuracy = fileItem.Accuracy;
                serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                serverItem._props.HeatFactor = fileItem.HeatFactor;
                serverItem._props.CoolFactor = fileItem.CoolFactor;
                serverItem._props.MalfunctionChance = fileItem.MagMalfunctionChance;
                serverItem._props.LoadUnloadModifier = fileItem.LoadUnloadModifier;
                serverItem._props.CheckTimeModifier = fileItem.CheckTimeModifier;
                serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator;
                serverItem._props.HasShoulderContact = fileItem.HasShoulderContact;
                serverItem._props.BlocksFolding = fileItem.BlocksFolding;
                serverItem._props.Velocity = fileItem.Velocity;
                serverItem._props.Weight = fileItem.Weight;
                serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;

                var serverConfItems = serverItem._props.ConflictingItems;
                // var modConfItems = fileItem.ConflictingItems;
                var modPropertyValues = ["SPTRM", fileItem?.ModType?.toString() || "undefined", fileItem?.VerticalRecoil?.toString() || "0", fileItem?.HorizontalRecoil?.toString() || "0", fileItem?.Dispersion?.toString() || "0", fileItem?.CameraRecoil?.toString() || "0",
                    fileItem?.AutoROF?.toString() || "0", fileItem?.SemiROF?.toString() || "0", fileItem?.ModMalfunctionChance?.toString() || "0", fileItem?.ReloadSpeed?.toString() || "0", fileItem?.AimSpeed?.toString() || "0", fileItem?.ChamberSpeed?.toString() || "0",
                    fileItem?.Length?.toString() || "0", fileItem?.CanCylceSubs?.toString() || "false", fileItem?.RecoilAngle?.toString() || "0", fileItem?.StockAllowADS?.toString() || "false", fileItem?.FixSpeed?.toString() || "0", fileItem?.ModShotDispersion?.toString() || "0"];

                // for (let j in modPropertyValues) {
                //     serverConfItems[j] = modPropertyValues[j];
                // }

                var combinedArr = modPropertyValues.concat(serverConfItems)
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }

    private weapPusherHelper(serverItem: any, fileItem: any) {
        if (serverItem._id === fileItem.ItemID) {

            if (this.modConf.malf_changes == true) {
                serverItem._props.BaseMalfunctionChance = fileItem.BaseMalfunctionChance;
                serverItem._props.HeatFactorGun = fileItem.HeatFactorGun;
                serverItem._props.HeatFactorByShot = fileItem.HeatFactorByShot;
                serverItem._props.CoolFactorGun = fileItem.CoolFactorGun;
                serverItem._props.CoolFactorGunMods = fileItem.CoolFactorGunMods;
            }

            if (this.modConf.recoil_attachment_overhaul == true && this.modConf.legacy_recoil_changes != true && ConfigChecker.dllIsPresent == true) {
                serverItem._props.Ergonomics = fileItem.Ergonomics;
                serverItem._props.RecoilForceUp = fileItem.VerticalRecoil;
                serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                serverItem._props.HeatFactor = fileItem.HeatFactor;
                serverItem._props.RecoilForceBack = fileItem.HorizontalRecoil;
                serverItem._props.RecolDispersion = fileItem.Dispersion;
                serverItem._props.CameraRecoil = fileItem.CameraRecoil;
                serverItem._props.CameraSnap = fileItem.CameraSnap;
                serverItem._props.Convergence = fileItem.Convergence;
                serverItem._props.DurabilityBurnRatio = fileItem.DurabilityBurnRatio;
                serverItem._props.RecoilAngle = fileItem.RecoilAngle;
                serverItem._props.AllowOverheat = fileItem.AllowOverheat;
                serverItem._props.HipAccuracyRestorationDelay = fileItem.HipAccuracyRestorationDelay;
                serverItem._props.HipAccuracyRestorationSpeed = fileItem.HipAccuracyRestorationSpeed;
                serverItem._props.HipInnaccuracyGain = fileItem.HipInnaccuracyGain;
                serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
                serverItem._props.Velocity = fileItem.Velocity;
                serverItem._props.Weight = fileItem.Weight;
                serverItem._props.bFirerate = fileItem.AutoROF;
                serverItem._props.SingleFireRate = fileItem.SemiROF;
                serverItem._props.DoubleActionAccuracyPenalty = fileItem.DoubleActionAccuracyPenalty;

                if (fileItem.weapFireType !== undefined) {
                    serverItem._props.weapFireType = fileItem.weapFireType;
                }

                var serverConfItems = serverItem._props.ConflictingItems;
                var weapPropertyValues = ["SPTRM", fileItem?.WeapType?.toString() || "undefined", fileItem?.BaseTorque?.toString() || "0", fileItem?.HasShoulderContact?.toString() || "false", "unused", fileItem?.OperationType?.toString() || "undefined", fileItem?.WeapAccuracy?.toString() || "0",
                    fileItem?.RecoilDamping?.toString() || "70", fileItem?.RecoilHandDamping?.toString() || "65", fileItem?.WeaponAllowADS?.toString() || "false"];


                var combinedArr = weapPropertyValues.concat(serverConfItems)
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }

}