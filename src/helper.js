"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotTierTracker = exports.RaidInfoTracker = exports.Helper = void 0;
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
    correctMedItems(proserverItem, pmcEXP) {
        var inventProp = proserverItem?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < proserverItem.Inventory.items.length; i++) {
                var itemProp = proserverItem.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (proserverItem.Inventory.items[i]._tpl === this.medItems[j]
                            && proserverItem.Inventory.items[i].upd.MedKit.HpResource > this.itemDB[this.medItems[j]]._props.MaxHpResource) {
                            proserverItem.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                        if (pmcEXP == 0 && proserverItem.Inventory.items[i]._tpl === this.medItems[j]) {
                            proserverItem.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }
    revertMedItems(proserverItem) {
        var inventProp = proserverItem?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < proserverItem.Inventory.items.length; i++) {
                var itemProp = proserverItem.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (proserverItem.Inventory.items[i]._tpl === this.medItems[j]) {
                            proserverItem.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
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
    removeCustomItems(proserverItem) {
        var inventProp = proserverItem?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < proserverItem.Inventory.items.length; i++) {
                if (proserverItem.Inventory.items[i]._tpl === "TIER1MEDKIT" ||
                    proserverItem.Inventory.items[i]._tpl === "TIER1MEDKI2" ||
                    proserverItem.Inventory.items[i]._tpl === "TIER1MEDKI3" ||
                    proserverItem.Inventory.items[i]._tpl === "SUPERBOTMEDKIT") {
                    proserverItem.Inventory.items[i]._tpl = "5755356824597772cb798962";
                    proserverItem.Inventory.items[i].upd.MedKit.HpResource = 100;
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
class RaidInfoTracker {
}
exports.RaidInfoTracker = RaidInfoTracker;
RaidInfoTracker.TOD = "";
RaidInfoTracker.mapType = "";
class BotTierTracker {
    getTier(botType) {
        if (botType === "usec") {
            return BotTierTracker.usecTier;
        }
        if (botType === "bear") {
            return BotTierTracker.bearTier;
        }
        if (botType === "assault") {
            return BotTierTracker.scavTier;
        }
        if (botType === "pmcbot") {
            return BotTierTracker.raiderTier;
        }
        if (botType === "exusec") {
            return BotTierTracker.rogueTier;
        }
    }
}
exports.BotTierTracker = BotTierTracker;
BotTierTracker.usecTier = 1;
BotTierTracker.bearTier = 1;
BotTierTracker.scavTier = 1;
BotTierTracker.rogueTier = 1;
BotTierTracker.raiderTier = 1;
