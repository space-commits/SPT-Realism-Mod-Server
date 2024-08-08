import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ParentClasses } from "../utils/enums";
import { ModTracker } from "../utils/utils";

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

export class ItemStatHandler {
    constructor(private tables: IDatabaseTables, private logger: ILogger) {
        this.gearPusherHelper = this.gearPusherHelper.bind(this);
        this.ammoPusherHelper = this.ammoPusherHelper.bind(this);
        this.modPusherHelper = this.modPusherHelper.bind(this);
        this.weapPusherHelper = this.weapPusherHelper.bind(this);
    }

    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }

    modifiedItems: { [key: string]: any } = {};

    public pushModsToServer() {
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

    public pushWeaponsToServer() {
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

    public pushGearToServer() {
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

    private callHelper(template: any, serverTemplates: Record<string, ITemplateItem>, funPusherHelper: Function) {
        for (let i in template) {
            let fileItem = template[i];
            funPusherHelper(fileItem, serverTemplates);
        }
    }

    private addGasFilterSlot(item: ITemplateItem) {
        item._props.Slots.push(
            {
                "_name": "mod_equipment",
                "_id": "6679dbe64276cec33ee8ff85",
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
            }
        );
    }

    private handleMasks(fileItem: any, serverItem: ITemplateItem){
        if (fileItem?.IsGasMask != undefined && fileItem?.IsGasMask === true && fileItem?.MaskToUse !== undefined) {
            serverItem._props.FaceShieldComponent = true;
            serverItem._props.FaceShieldMask = "NoMask";
            serverItem._props.armorClass = 1;
            serverItem._props.armorColliders = ["Eyes", "HeadCommon", "ParietalHead", "Jaw"];
            serverItem._props.MaxDurability = 25;
            serverItem._props.RepairCost = 200;
            serverItem._props.Durability = serverItem._props.MaxDurability;
            if(modConfig.enable_hazard_zones){
                this.addGasFilterSlot(serverItem);
            }
        }
        else if (fileItem?.MaskToUse !== undefined) {
            if (fileItem.MaskToUse == "ronin") {
                serverItem._props.FaceShieldMask = "NoMask";
            }
            else {
                serverItem._props.FaceShieldMask = "Narrow";
            }
            serverItem._props.FaceShieldComponent = true;
        }
    }

    private gearPusherHelper(fileItem: any, serverTemplates: Record<string, ITemplateItem>) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;

            if (serverConfItems.length > 0 && serverConfItems[0] === "SPTRM") {
                return;
            }

            if (fileItem.TemplateID != undefined) {
                fileItem = this.modifiedItems[fileItem.TemplateID];
            }

            this.modifiedItems[fileItem.ItemID] = fileItem;

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

            if (modConfig.enable_hazard_zones || modConfig.realistic_ballistics) {
                this.handleMasks(fileItem, serverItem);
            }

            if (serverConfItems.length > 0 && serverConfItems[0] === "SPTRM") {
                return;
            }

            if (fileItem.ItemID === "60363c0c92ec1c31037959f5" && ModTracker.tgcPresent) {
                fileItem.GasProtection = 0.95;
            }

            let armorPropertyValues = ["SPTRM", fileItem?.AllowADS?.toString() || "true", fileItem?.ArmorClass?.toString() || "Unclassified", fileItem?.CanSpall?.toString() || "false", fileItem?.SpallReduction?.toString() || "1", fileItem?.ReloadSpeedMulti?.toString() || "1",
                fileItem?.MinVelocity?.toString() || "500", fileItem?.MinKE?.toString() || "2000", fileItem?.MinPen?.toString() || "50", fileItem?.BlocksMouth?.toString() || "false", fileItem?.HasSideArmor?.toString() || "false", fileItem?.RadProtection?.toString() || "0",
                fileItem?.MaskToUse?.toString() || "", fileItem?.GasProtection?.toString() || "0", fileItem?.dB?.toString() || "1", fileItem?.Comfort?.toString() || 1, fileItem?.IsGasMask?.toString() || "false"];

            let combinedArr = armorPropertyValues.concat(serverConfItems)
            serverItem._props.ConflictingItems = combinedArr;
        }
    }

    private ammoPusherHelper(fileItem: any, serverTemplates: Record<string, ITemplateItem>) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];

            serverItem._props.PenetrationPower = fileItem.PenetrationPower != undefined ? fileItem.PenetrationPower : serverItem._props.PenetrationPower;
            serverItem._props.Damage = fileItem.Damage != undefined ? fileItem.Damage : serverItem._props.Damage;
            serverItem._props.ArmorDamage = 1;
            serverItem._props.casingMass = 1;
        }
    }

    private modPusherHelper(fileItem: any, serverTemplates: Record<string, ITemplateItem>) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;

            if (serverConfItems.length > 0 && serverConfItems[0] === "SPTRM") {
                return;
            }

            if (fileItem.TemplateID != undefined) {
                fileItem = this.modifiedItems[fileItem.TemplateID];
            }

            this.modifiedItems[fileItem.ItemID] = fileItem;

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

            let isScope = serverItem._id === ParentClasses.COLLIMATOR || serverItem._id === ParentClasses.COMPACT_COLLIMATOR || serverItem._parent === ParentClasses.ASSAULT_SCOPE || serverItem._parent === ParentClasses.SPECIAL_SCOPE || serverItem._parent === ParentClasses.OPTIC_SCOPE || serverItem._parent === ParentClasses.THEMALVISION || serverItem._parent === ParentClasses.NIGHTVISION;;
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
                fileItem?.MeleeDamage?.toString() || "0", fileItem?.MeleePen?.toString() || "0", fileItem?.Flash?.toString() || "0"];

            let combinedArr = modPropertyValues.concat(serverConfItems)
            serverItem._props.ConflictingItems = combinedArr;
        }
    }

    private weapPusherHelper(fileItem: any, serverTemplates: Record<string, ITemplateItem>) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;

            if (serverConfItems.length > 0 && serverConfItems[0] === "SPTRM") {
                return;
            }

            if (fileItem.TemplateID != undefined) {
                fileItem = this.modifiedItems[fileItem.TemplateID];
            }

            this.modifiedItems[fileItem.ItemID] = fileItem;

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
                serverItem._props.RecoilPosZMult = 1.5;
                serverItem._props.RecoilCenter = fileItem.RecoilCenter != null && fileItem.RecoilCenter != undefined ? fileItem.RecoilCenter : serverItem._props.RecoilCenter;
                serverItem._props.CanQueueSecondShot = fileItem.CanQueueSecondShot != null ? fileItem.CanQueueSecondShot : serverItem._props.CanQueueSecondShot;

                if (fileItem?.weapFireType !== undefined) {
                    serverItem._props.weapFireType = fileItem.weapFireType;
                }
                if (fileItem?.WeapType !== undefined && (fileItem.IsManuallyOperated == false || fileItem.OperationType === "tubefed-m")) {
                    serverItem._props.CanQueueSecondShot = true;
                }

                if (fileItem.MasteryCategory != undefined && modConfig.mastery_changes == true) {
                    this.tables.globals.config.Mastering.find(m => m.Name === fileItem.MasteryCategory).Templates.push(fileItem.ItemID);
                }

                let weapPropertyValues = ["SPTRM", fileItem?.WeapType?.toString() || "undefined", fileItem?.BaseTorque?.toString() || "0", fileItem?.HasShoulderContact?.toString() || "false", fileItem?.BaseReloadSpeedMulti?.toString() || "1", fileItem?.OperationType?.toString() || "undefined", fileItem?.WeapAccuracy?.toString() || "0",
                    fileItem?.RecoilDamping?.toString() || "0.7", fileItem?.RecoilHandDamping?.toString() || "0.7", fileItem?.WeaponAllowADS?.toString() || "false", fileItem?.BaseChamberSpeedMulti?.toString() || "1", fileItem?.MaxChamberSpeed?.toString() || "1.5", fileItem?.MinChamberSpeed?.toString() || "0.7", fileItem?.IsManuallyOperated?.toString() || "false",
                    fileItem?.MaxReloadSpeed?.toString() || "1.2", fileItem?.MinReloadSpeed?.toString() || "0.7", fileItem?.BaseChamberCheckSpeed?.toString() || "1", fileItem?.BaseFixSpeed?.toString() || "1", fileItem?.VisualMulti?.toString() || "1"
                ];

                let combinedArr = weapPropertyValues.concat(serverConfItems)
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }

    public async processUserJsonFiles(folderPath = path.join(__dirname, '..', '..', 'db', 'put_new_stuff_here')) {
        try {
            const files = await readdir(folderPath);
            for (const file of files) {
                const filePath = path.join(folderPath, file);
                const stats = await stat(filePath);

                if (stats.isDirectory()) {
                    await this.processUserJsonFiles(filePath); // Recursively call self for subfolders
                } else if (file.endsWith('.json')) {
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
        } catch (err) {
            this.logger.error(`Error processing files in directory ${folderPath}: ${err}`);
        }
    }
}