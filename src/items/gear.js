"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gear = void 0;
const arrays_1 = require("../utils/arrays");
const enums_1 = require("../utils/enums");
class Gear {
    tables;
    logger;
    modConfig;
    constructor(tables, logger, modConfig) {
        this.tables = tables;
        this.logger = logger;
        this.modConfig = modConfig;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    addResourceToGasMaskFilters() {
        //gas mask filter
        this.itemDB()["590c595c86f7747884343ad7"]._props.MaxResource = 100;
        this.itemDB()["590c595c86f7747884343ad7"]._props.Resource = 100;
    }
    loadSpecialSlotChanges() {
        let itemsToAdd = [...arrays_1.StaticArrays.hazardDetectionDevices, ...arrays_1.StaticArrays.gasMasks, "59e7715586f7742ee5789605"]; //respirator
        this.itemDB()["627a4e6b255f7527fb05a0f6"]._props.Slots.forEach(slot => {
            slot._props.filters[0].Filter.push(...itemsToAdd);
        });
        this.itemDB()["65e080be269cbd5c5005e529"]._props.Slots.forEach(slot => {
            slot._props.filters[0].Filter.push(...itemsToAdd);
        });
        //SVM pockets compatbility
        if (this.itemDB()["a8edfb0bce53d103d3f62b9b"]) {
            this.itemDB()["a8edfb0bce53d103d3f62b9b"]._props.Slots.forEach(slot => {
                slot._props.filters[0].Filter.push(...itemsToAdd);
            });
        }
    }
    loadGearConflicts() {
        let faceShieldArray = [];
        const faceCoversWithOverlay = [...arrays_1.StaticArrays.gasMasks, ...arrays_1.StaticArrays.confMaskOverlays];
        //remove certain helmets from GP7 conflicts
        this.itemDB()["60363c0c92ec1c31037959f5"]._props.ConflictingItems = this.itemDB()["60363c0c92ec1c31037959f5"]._props.ConflictingItems.filter(i => i !== "5e4bfc1586f774264f7582d3");
        for (let item in this.itemDB()) {
            let serverItem = this.itemDB()[item];
            //gas masks need lvl 1 armor min to have durability, so 269 repair cost is the only alternative identifier
            if (serverItem._props.FaceShieldComponent == true && serverItem._props?.armorClass && Number(serverItem._props.armorClass) > 0 && serverItem._props?.RepairCost != 269) {
                faceShieldArray.push(serverItem._id);
            }
            if (this.modConfig.headgear_conflicts == true) {
                //remove headset conflicts from helmets
                if (serverItem._parent === enums_1.ParentClasses.HEADWEAR) {
                    for (let c in serverItem._props.ConflictingItems) {
                        let confItem = serverItem._props.ConflictingItems[c];
                        if (this.itemDB()[confItem] != null && this.itemDB()[confItem]._parent === enums_1.ParentClasses.HEADSET) {
                            serverItem._props.ConflictingItems[c] = "6783e75078238c95771864ea"; //needs to be a valid mongoid, so use random placeholder id
                        }
                    }
                }
            }
        }
        //custom mask overlays will bug out if using actual faceshield at the same time
        if ((this.modConfig.realistic_ballistics == true || this.modConfig.enable_hazard_zones == true)) {
            for (const i of faceCoversWithOverlay) {
                const item = this.itemDB()[i];
                if (item == null)
                    continue;
                item._props.ConflictingItems = item._props.ConflictingItems.concat(faceShieldArray);
            }
        }
        //make sure NVGs and FS conflict
        arrays_1.StaticArrays.conflNVGomponents.forEach(element => {
            const item = this.itemDB()[element];
            item._props.ConflictingItems = item._props.ConflictingItems.concat(faceShieldArray);
        });
    }
}
exports.Gear = Gear;
//# sourceMappingURL=gear.js.map