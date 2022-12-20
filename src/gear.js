"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gear = void 0;
const enums_1 = require("./enums");
class Gear {
    constructor(arrays, tables) {
        this.arrays = arrays;
        this.tables = tables;
        this.itemDB = this.tables.templates.items;
    }
    loadGearConflicts() {
        var confMasks = this.arrays.conflMasks;
        var confHats = this.arrays.conflHats;
        var confNVG = this.arrays.conflNVGomponents;
        var armorCompArr = [];
        for (let item in this.itemDB) {
            let serverItem = this.itemDB[item];
            if (serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT && serverItem._props.HasHinge == true) {
                armorCompArr.push(serverItem._id);
            }
        }
        for (let nvg in confNVG) {
            for (let item in this.itemDB) {
                let serverItem = this.itemDB[item];
                if (serverItem._id === confNVG[nvg]) {
                    let confItems = serverItem._props.ConflictingItems;
                    serverItem._props.ConflictingItems = confItems.concat(armorCompArr);
                }
            }
        }
        for (let hat in confHats) {
            for (let item in this.itemDB) {
                if (this.itemDB[item]._id === confHats[hat]) {
                    let confItems = this.itemDB[item]._props.ConflictingItems;
                    this.itemDB[item]._props.ConflictingItems = confMasks.concat(confItems);
                }
            }
        }
    }
}
exports.Gear = Gear;
