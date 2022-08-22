"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGen = void 0;
const attTempaltesFile = require("../db/AttatchmentTemplates.json");
const wepTempaltesFile = require("../db/WeaponTemplates.json");
const magazineJSON = require("../db/bots/loadouts/magazines.json");
class CodeGen {
    constructor(logger, tables, modConf, helper) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.helper = helper;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
    }
    magsToJSON() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === "5448bc234bdc2d3c308b4569" || serverItem._parent === "610720f290b75a49ff2e5e25") {
                this.logger.info("Found Parent");
                let fileItem = magazineJSON[i];
                magazineJSON[i] = this.doAssignJSONMagazine(fileItem);
                this.helper.saveToJSONFile(magazineJSON, '/db/bots/loadouts/magazines.json');
            }
        }
    }
    codeGen() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                let fileItem = attTempaltesFile[i];
                attTempaltesFile[i] = this.doAssignJsonItemMod(serverItem, fileItem);
                this.helper.saveToJSONFile(attTempaltesFile, 'db/AttatchmentTemplates.json');
            }
            if (serverItem._props.RecolDispersion) {
                let fileItem = wepTempaltesFile[i];
                wepTempaltesFile[i] = this.doAssignJsonItemWep(serverItem, fileItem);
                this.helper.saveToJSONFile(wepTempaltesFile, 'db/WeaponTemplates.json');
            }
        }
        this.logger.info("Running Code Gen");
    }
    doConfictingArrayWep(serverItem, fileItem) {
        //let arr = serverItem._props.ConflictingItems;
        // var ca = ["a","b", serverItem._props.Caliber.toString()]; 
        // let recoil = (serverItem._props.Recoil).toString();
        let ca = ["1", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        let sa = serverItem._props.ConflictingItems;
        return ca.concat(sa);
    }
    doConfictingArrayMod(serverItem, fileItem) {
        //let arr = serverItem._props.ConflictingItems;
        // var ca = ["a","b", serverItem._props.Caliber.toString()]; 
        // let recoil = (serverItem._props.Recoil).toString();
        let ca = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        let sa = serverItem._props.ConflictingItems;
        return ca.concat(sa);
    }
    doAssignJSONMagazine(fileItem) {
        if (fileItem) {
            fileItem;
            return fileItem;
        }
        let item = {
            "cartridges": []
        };
        return item;
    }
    doAssignJsonItemMod(serverItem, fileItem) {
        if (fileItem) {
            // fileItem.nthRun = fileItem.nthRun + 1;
            // fileItem.ConflictingItems = this.doConfictingArray(serverItem);
            fileItem;
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
    doAssignJsonItemWep(serverItem, fileItem) {
        if (fileItem) {
            // fileItem.nthRun = fileItem.nthRun + 1;
            // fileItem.ConflictingItems = this.doConfictingArray(serverItem);
            fileItem;
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
}
exports.CodeGen = CodeGen;
