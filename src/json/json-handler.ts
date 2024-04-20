import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ParentClasses } from "../utils/enums";
import { ConfigChecker } from "../utils/utils";

import * as fs from 'fs';
import * as path from 'path';

const modConfig = require("../../config/config.json");
const weapPath = modConfig.weap_preset;
const attPath = modConfig.att_preset;
const gearPath = modConfig.gear_preset;

const armorPlateTemplates = require("../../db/templates/gear/" + `${gearPath}` + "/armorPlateTemplates.json");
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


export class JsonHandler {
    constructor(private tables: IDatabaseTables, private logger: ILogger) { }

    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }

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
        if (modConfig.realistic_ballistics == true) {
            this.callHelper(armorChestrigTemplates, this.itemDB(), this.gearPusherHelper);
            this.callHelper(armorComponentsTemplates, this.itemDB(), this.gearPusherHelper);
            this.callHelper(armorPlateTemplates, this.itemDB(), this.gearPusherHelper);
            this.callHelper(helmetTemplates, this.itemDB(), this.gearPusherHelper);
            this.callHelper(armorVestsTemplates, this.itemDB(), this.gearPusherHelper);
            this.callHelper(armorMasksTemplates, this.itemDB(), this.gearPusherHelper);
            this.callHelper(chestrigTemplates, this.itemDB(), this.gearPusherHelper);
            this.callHelper(cosmeticsTemplates, this.itemDB(), this.gearPusherHelper);
        }
        if (modConfig.headset_changes == true) {
            this.callHelper(headsetTemplates, this.itemDB(), this.gearPusherHelper);
        }
        this.callHelper(bagTemplates, this.itemDB(), this.gearPusherHelper);
    }

    private callHelper(template: any, serverTemplates: Record<string, ITemplateItem>, funPusherHelper: Function) {
        for (let i in template) {
            let fileItem = template[i];
            funPusherHelper(fileItem, serverTemplates);
        }
    }

    private gearPusherHelper(fileItem: any, serverTemplates: Record<string, ITemplateItem>) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;
            let armorPropertyValues = ["SPTRM", fileItem?.AllowADS?.toString() || "true", fileItem?.ArmorClass?.toString() || "Unclassified", fileItem?.CanSpall?.toString() || "false", fileItem?.SpallReduction?.toString() || "1", fileItem?.ReloadSpeedMulti?.toString() || "1",
                fileItem?.MinVelocity?.toString() || "500", fileItem?.MinKE?.toString() || "2000", fileItem?.MinPen?.toString() || "50", fileItem?.BlocksMouth?.toString() || "false", fileItem?.HasSideArmor?.toString() || "false", fileItem?.HasStomachArmor?.toString() || "false",
                fileItem?.HasHitSecondaryArmor?.toString() || "false", fileItem?.HasNeckArmor?.toString() || "false", fileItem?.dB?.toString() || "1", fileItem?.Comfort?.toString() || 1, fileItem?.HasExtraArmor?.toString() || "false"];

            let combinedArr = armorPropertyValues.concat(serverConfItems)
            serverItem._props.ConflictingItems = combinedArr;
        }
    }

    private modPusherHelper(fileItem: any, serverTemplates: Record<string, ITemplateItem>) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;
            if (serverConfItems[0] !== "SPTRM") {

                serverItem._props.Ergonomics = fileItem.Ergonomics;
                serverItem._props.Accuracy = fileItem.Accuracy;
                serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
                serverItem._props.HeatFactor = fileItem.HeatFactor != null ? fileItem.HeatFactor : 1;
                serverItem._props.CoolFactor = fileItem.CoolFactor != null ? fileItem.CoolFactor : 1;
                serverItem._props.MalfunctionChance = fileItem.MagMalfunctionChance;
                // serverItem._props.LoadUnloadModifier = fileItem.LoadUnloadModifier;
                // serverItem._props.CheckTimeModifier = fileItem.CheckTimeModifier;
                serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator;
                serverItem._props.BlocksFolding = fileItem.BlocksFolding;
                serverItem._props.Weight = fileItem.Weight;
                serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
                serverItem._props.Loudness = fileItem.Loudness;

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
                    fileItem?.MeleeDamage?.toString() || "0", fileItem?.MeleePen?.toString() || "0"];

                let combinedArr = modPropertyValues.concat(serverConfItems)
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }

    private weapPusherHelper(fileItem: any, serverTemplates: Record<string, ITemplateItem>) {
        if (fileItem.ItemID in serverTemplates) {
            let serverItem = serverTemplates[fileItem.ItemID];
            let serverConfItems = serverItem._props.ConflictingItems;
            if (serverConfItems[0] !== "SPTRM") {

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
                    serverItem._props.CanQueueSecondShot = true;
                    serverItem._props.CameraSnap = 1;
                    serverItem._props.RecoilCenter = fileItem.RecoilCenter != null && fileItem.RecoilCenter != undefined ? fileItem.RecoilCenter : serverItem._props.RecoilCenter;

                    if (fileItem.weapFireType !== undefined) {
                        serverItem._props.weapFireType = fileItem.weapFireType;
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
    }

    public processUserJsonFiles(folderPath: string) {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(`Error reading directory ${folderPath}: ${err}`);
                return;
            }
            files.forEach((file) => {
                const filePath = path.join(folderPath, file);

                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error(`Error getting file stats for ${filePath}: ${err}`);
                        return;
                    }

                    if (stats.isDirectory()) {
                        // Recursively call self for subfolders
                        this.processUserJsonFiles(filePath);
                    } else if (file.endsWith('.json')) {
                        // Process JSON file
                        fs.readFile(filePath, 'utf8', (err, data) => {
                            if (err) {
                                console.error(`Error reading file ${filePath}: ${err}`);
                                return;
                            }
                            try {
                                const jsonData = JSON.parse(data);
                                for (let i in jsonData) {
                                    if (jsonData[i].WeapType) {
                                        this.weapPusherHelper(jsonData[i], this.itemDB());
                                    }
                                    if (jsonData[i].ModType) {
                                        this.modPusherHelper(jsonData[i], this.itemDB());
                                    }
                                }
                                console.log(jsonData);
                            } catch (err) {
                                console.error(`Error parsing JSON in file ${filePath}: ${err}`);
                            }
                        });
                    }
                });
            });
        });
    }
}