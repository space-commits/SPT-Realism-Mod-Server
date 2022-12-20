import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";

import { Arrays } from "./arrays";
import { ParentClasses } from "./enums";

export class Gear {
    constructor(private arrays: Arrays, private tables: IDatabaseTables) { }

    itemDB = this.tables.templates.items;

    public loadGearConflicts() {

        var confMasks = this.arrays.conflMasks;
        var confHats = this.arrays.conflHats;
        var confNVG = this.arrays.conflNVGomponents
        var armorCompArr = [];

        for (let item in this.itemDB) {
            let serverItem = this.itemDB[item];
            if (serverItem._parent === ParentClasses.ARMOREDEQUIPMENT && serverItem._props.HasHinge == true) {
                armorCompArr.push(serverItem._id);
            }
        }
        for (let nvg in confNVG) {
            for (let item in this.itemDB) {
                let serverItem = this.itemDB[item];
                if (serverItem._id === confNVG[nvg]) {
                    let confItems = serverItem._props.ConflictingItems;
                    serverItem._props.ConflictingItems = confItems.concat(armorCompArr)
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