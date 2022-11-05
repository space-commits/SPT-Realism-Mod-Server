"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const dir = __dirname;
const dirArray = dir.split("\\");
const modFolder = (`${dirArray[dirArray.length - 4]}/${dirArray[dirArray.length - 3]}/${dirArray[dirArray.length - 2]}/`);
class Helper {
    constructor(tables, arrays, logger) {
        this.tables = tables;
        this.arrays = arrays;
        this.logger = logger;
        this.itemDB = this.tables.templates.items;
        this.array = this.arrays;
        this.medItems = this.array.stash_meds;
    }
    correctMedItems(profileData, pmcEXP) {
        var inventProp = profileData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < profileData.Inventory.items.length; i++) {
                var itemProp = profileData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (profileData.Inventory.items[i]._tpl === this.medItems[j]
                            && profileData.Inventory.items[i].upd.MedKit.HpResource > this.itemDB[this.medItems[j]]._props.MaxHpResource) {
                            profileData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                        if (pmcEXP == 0 && profileData.Inventory.items[i]._tpl === this.medItems[j]) {
                            profileData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }
    revertMedItems(profileData) {
        var inventProp = profileData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < profileData.Inventory.items.length; i++) {
                var itemProp = profileData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (profileData.Inventory.items[i]._tpl === this.medItems[j]) {
                            profileData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }
    probabilityWeighter(items, weights) {
        function add(a, b) { return a + b; }
        var botTiers = items;
        var weights = weights;
        var totalWeight = weights.reduce(add, 0);
        var weighedElems = [];
        var currentElem = 0;
        while (currentElem < botTiers.length) {
            for (let i = 0; i < weights[currentElem]; i++)
                weighedElems[weighedElems.length] = botTiers[currentElem];
            currentElem++;
        }
        var randomTier = Math.floor(Math.random() * totalWeight);
        return weighedElems[randomTier];
    }
    removeCustomItems(profileData) {
        var inventProp = profileData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < profileData.Inventory.items.length; i++) {
                if (profileData.Inventory.items[i]._tpl === "TIER1MEDKIT" ||
                    profileData.Inventory.items[i]._tpl === "TIER1MEDKI2" ||
                    profileData.Inventory.items[i]._tpl === "TIER1MEDKI3" ||
                    profileData.Inventory.items[i]._tpl === "SUPERBOTMEDKIT") {
                    profileData.Inventory.items[i]._tpl = "5755356824597772cb798962";
                    profileData.Inventory.items[i].upd.MedKit.HpResource = 100;
                }
            }
        }
    }
    saveToJSONFile(data, filePath) {
        var fs = require('fs');
        fs.writeFile(modFolder + filePath, JSON.stringify(data, null, 4), function (err) {
            if (err)
                throw err;
        });
    }
}
exports.Helper = Helper;
