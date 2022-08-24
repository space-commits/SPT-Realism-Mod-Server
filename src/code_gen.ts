import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { Arrays } from "./arrays";
import { Helper } from "./helper";


const magazineJSON = require("../db/bots/loadouts/magazines.json");

const AttTemplatesFile = require("../db/templates/attatchments/AttatchmentTemplates.json");
const WepTemplatesFile = require("../db/templates/WeaponTemplates.json");
const FlashHiderTemplatesFile = require("../db/templates/attatchments/FlashHiderTemplatesFile.json");
const MuzzleComboTemplatesFile = require("../db/templates/attatchments/MuzzleComboTemplatesFile.json");
const SilencerTemplatesFile = require("../db/templates/attatchments/SilencerTemplatesFile.json");
const BarrelTemplatesFile = require("../db/templates/attatchments/BarrelTemplatesFile.json");
const MountTemplatesFile = require("../db/templates/attatchments/MountTemplatesFile.json");
const ReceiverTemplatesFile = require("../db/templates/attatchments/ReceiverTemplatesFile.json");
const StockTemplatesFile = require("../db/templates/attatchments/StockTemplatesFile.json");
const ChargeTemplatesFile = require("../db/templates/attatchments/ChargeTemplatesFile.json");
const CompactCollimatorTemplatesFile = require("../db/templates/attatchments/CompactCollimatorTemplatesFile.json");
const CollimatorTemplatesFile = require("../db/templates/attatchments/CollimatorTemplatesFile.json");
const AssaultScopeTemplatesFile = require("../db/templates/attatchments/AssaultScopeTemplatesFile.json");
const ScopeTemplatesFile = require("../db/templates/attatchments/ScopeTemplatesFile.json");
const IronSightTemplatesFile = require("../db/templates/attatchments/IronSightTemplatesFile.json");
const SpecialScopeTemplatesFile = require("../db/templates/attatchments/SpecialScopeTemplatesFile.json");
const MagazineTemplatesFile = require("../db/templates/attatchments/MagazineTemplatesFile.json");
const AuxiliaryModTemplatesFile = require("../db/templates/attatchments/AuxiliaryModTemplatesFile.json");
const ForegripTemplatesFile = require("../db/templates/attatchments/ForegripTemplatesFile.json");
const PistolGripTemplatesFile = require("../db/templates/attatchments/PistolGripTemplatesFile.json");
const GasblockTemplatesFile = require("../db/templates/attatchments/GasblockTemplatesFile.json");
const HandguardTemplatesFile = require("../db/templates/attatchments/HandguardTemplatesFile.json");
const BipodTemplatesFile = require("../db/templates/attatchments/BipodTemplatesFile.json");
const FlashlightTemplatesFile = require("../db/templates/attatchments/FlashlightTemplatesFile.json");
const TacticalComboTemplatesFile = require("../db/templates/attatchments/TacticalComboTemplatesFile.json");

export class CodeGen {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private helper: Helper, private arrays: Arrays) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;

    public magsToJSON() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === "5448bc234bdc2d3c308b4569" || serverItem._parent === "610720f290b75a49ff2e5e25") {
                let fileItem = magazineJSON[i];
                magazineJSON[i] = this.doAssignJSONMagazine(fileItem);
                this.helper.saveToJSONFile(magazineJSON, '/db/bots/loadouts/magazines.json');
            }
        }
    }

    public fullTemplateCodeGen() {

        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                let fileItem = AttTemplatesFile[i];
                AttTemplatesFile[i] = this.doAssignJsonItemMod(serverItem, fileItem)
                this.helper.saveToJSONFile(AttTemplatesFile, 'db/AttatchmentTemplates.json');

            }
            if (serverItem._props.RecolDispersion) {
                let fileItem = WepTemplatesFile[i];
                WepTemplatesFile[i] = this.doAssignJsonItemWep(serverItem, fileItem)
                this.helper.saveToJSONFile(WepTemplatesFile, 'db/WeaponTemplates.json');
            }
        }
    }

    public attTemplatesCodeGen() {


        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                for (let key in this.arrays.mod_types) {
                    if (serverItem._parent === this.arrays.mod_types[key]) {
                        this.logger.info("Match Found: " + serverItem._parent + " = " + this.arrays.mod_types[key] + "Key = " + key);
                        if (this.arrays.mod_types[key] === "550aa4bf4bdc2dd6348b456b") {
                            this.doAttFileWrite(FlashHiderTemplatesFile, "FlashHiderTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "550aa4dd4bdc2dc9348b4569") {
                            this.doAttFileWrite(MuzzleComboTemplatesFile, "MuzzleComboTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "550aa4cd4bdc2dd8348b456c") {
                            this.doAttFileWrite(SilencerTemplatesFile, "SilencerTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "555ef6e44bdc2de9068b457e") {
                            this.doAttFileWrite(BarrelTemplatesFile, "BarrelTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818b224bdc2dde698b456f") {
                            this.doAttFileWrite(MountTemplatesFile, "MountTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818a304bdc2db5418b457d") {
                            this.doAttFileWrite(ReceiverTemplatesFile, "ReceiverTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818a594bdc2db9688b456a") {
                            this.doAttFileWrite(StockTemplatesFile, "StockTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818a6f4bdc2db9688b456b") {
                            this.doAttFileWrite(ChargeTemplatesFile, "ChargeTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818acf4bdc2dde698b456b") {
                            this.doAttFileWrite(CompactCollimatorTemplatesFile, "CompactCollimatorTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818ad54bdc2ddc698b4569") {
                            this.doAttFileWrite(CollimatorTemplatesFile, "CollimatorTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818add4bdc2d5b648b456f") {
                            this.doAttFileWrite(AssaultScopeTemplatesFile, "AssaultScopeTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818ae44bdc2dde698b456c") {
                            this.doAttFileWrite(ScopeTemplatesFile, "ScopeTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818ac54bdc2d5b648b456e") {
                            this.doAttFileWrite(IronSightTemplatesFile, "IronSightTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818aeb4bdc2ddc698b456a") {
                            this.doAttFileWrite(SpecialScopeTemplatesFile, "SpecialScopeTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "5448bc234bdc2d3c308b4569") {
                            this.doAttFileWrite(MagazineTemplatesFile, "MagazineTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "5a74651486f7744e73386dd1") {
                            this.doAttFileWrite(AuxiliaryModTemplatesFile, "AuxiliaryModTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818af64bdc2d5b648b4570") {
                            this.doAttFileWrite(ForegripTemplatesFile, "ForegripTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818a684bdc2ddd698b456d") {
                            this.doAttFileWrite(PistolGripTemplatesFile, "PistolGripTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "56ea9461d2720b67698b456f") {
                            this.doAttFileWrite(GasblockTemplatesFile, "GasblockTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818a104bdc2db9688b4569") {
                            this.doAttFileWrite(HandguardTemplatesFile, "HandguardTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818afb4bdc2dde698b456d") {
                            this.doAttFileWrite(BipodTemplatesFile, "BipodTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818b084bdc2d5b648b4571") {
                            this.doAttFileWrite(FlashlightTemplatesFile, "FlashlightTemplatesFile", i, serverItem);
                        }
                        if (this.arrays.mod_types[key] === "55818b164bdc2ddc698b456c") {
                            this.doAttFileWrite(TacticalComboTemplatesFile, "TacticalComboTemplatesFile", i, serverItem);
                        }
                    }
                }
            }
        }
    }

    private doAttFileWrite(filePathObj: object, filePathStr: string, index: string, serverItem: ITemplateItem) {
        let fileItem = filePathObj[index];
        filePathObj[index] = this.doAssignJsonItemMod(serverItem, fileItem)
        this.helper.saveToJSONFile(filePathObj, `db/templates/attatchments/${filePathStr}.json`);
    }

    private doConfictingArrayWep(serverItem: ITemplateItem, fileItem: any): any {

        //let arr = serverItem._props.ConflictingItems;
        // var ca = ["a","b", serverItem._props.Caliber.toString()]; 
        // let recoil = (serverItem._props.Recoil).toString();
        let ca = ["1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        let sa = serverItem._props.ConflictingItems;
        return ca.concat(sa);

    }

    private doConfictingArrayMod(serverItem: ITemplateItem, fileItem: any): any {

        //let arr = serverItem._props.ConflictingItems;
        // var ca = ["a","b", serverItem._props.Caliber.toString()]; 
        // let recoil = (serverItem._props.Recoil).toString();
        let ca = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        let sa = serverItem._props.ConflictingItems;
        return ca.concat(sa);

    }

    private doAssignJSONMagazine(fileItem: any) {
        if (fileItem) {
            fileItem
            return fileItem;
        }

        let item = {
            "cartridges": []
        }

        return item;
    }

    private doAssignJsonItemMod(serverItem: ITemplateItem, fileItem: any) {


        if (fileItem) {
            // fileItem.nthRun = fileItem.nthRun + 1;
            // fileItem.ConflictingItems = this.doConfictingArray(serverItem);
            fileItem
            return fileItem;
        }

        let ID = serverItem._id;
        let ModType = "";
        let VerticalRecoil = serverItem._props.Recoil / 2;
        let HorizontalRecoil = serverItem._props.Recoil / 2;
        let Dispersion = 0;
        let CameraRecoil = 0;
        let AutoROF = 0;
        let SemiROF = 0;
        let MalfunctionChance = 0;
        let ReloadSpeed = 0;
        let AimSpeed = 0;
        let DrawSpeed = 0;
        let Length = 0;
        let CanCylceSubs = false;

        let item = {
            ID,
            ModType,
            VerticalRecoil,
            HorizontalRecoil,
            Dispersion,
            CameraRecoil,
            AutoROF,
            SemiROF,
            MalfunctionChance,
            ReloadSpeed,
            AimSpeed,
            DrawSpeed,
            Length,
            CanCylceSubs
        };
        return item;
    }

    private doAssignJsonItemWep(serverItem: ITemplateItem, fileItem: any) {


        if (fileItem) {
            // fileItem.nthRun = fileItem.nthRun + 1;
            // fileItem.ConflictingItems = this.doConfictingArray(serverItem);
            fileItem
            return fileItem;
        }

        let ID = serverItem._id;
        let WeaponType = serverItem._props.weapClass;
        let BaseTorque = 0;

        let item = {
            ID,
            WeaponType,
            BaseTorque
        };
        return item;
    }

    // public pushModsToServer() {
    //     for (let i in this.itemDB) {
    //         let fileData = this.itemDB[i];
    //         if (fileData._props.ToolModdable == true || fileData._props.ToolModdable == false) {
    //             for (let j in testFile) {
    //                 if (fileData._id === testFile[j].ID) {
    //                     fileData._props.ConflictingItems = testFile[j].ConflictingItems;
    //                 }
    //             }
    //         }
    //     }
    //     this.logger.info("Pushing Mod Stats to server");
    // }

    // public pushWepsToServer() {
    //     for (let i in this.itemDB) {
    //         let fileData = this.itemDB[i];
    //         if (fileData._props.RecolDispersion) {
    //             for (let j in testFile) {
    //                 if (fileData._id === testFile[j].ID) {
    //                     fileData._props.ConflictingItems = testFile[j].ConflictingItems;
    //                 }
    //             }
    //         }
    //     }
    //     this.logger.info("Pushing Weapon Stats to server");
    // }


}