"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotTierTracker = exports.RaidInfoTracker = exports.Helper = void 0;
const dir = __dirname;
const dirArray = dir.split("\\");
const modFolder = (`${dirArray[dirArray.length - 4]}/${dirArray[dirArray.length - 3]}/${dirArray[dirArray.length - 2]}/`);
class Helper {
    constructor(tables, arrays) {
        this.tables = tables;
        this.arrays = arrays;
        this.itemDB = this.tables.templates.items;
        this.medItems = this.arrays.stashMeds;
    }
    correctMedItems(playerData, pmcEXP) {
        var inventProp = playerData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < playerData.Inventory.items.length; i++) {
                var itemProp = playerData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (playerData.Inventory.items[i]._tpl === this.medItems[j]
                            && playerData.Inventory.items[i].upd.MedKit.HpResource > this.itemDB[this.medItems[j]]._props.MaxHpResource) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                        if (pmcEXP == 0 && playerData.Inventory.items[i]._tpl === this.medItems[j]) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }
    revertMedItems(playerData) {
        var inventProp = playerData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < playerData.Inventory.items.length; i++) {
                var itemProp = playerData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (playerData.Inventory.items[i]._tpl === this.medItems[j]) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
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
    removeCustomItems(playerData) {
        if (playerData?.Inventory !== undefined) {
            for (var i = 0; i < playerData.Inventory.items.length; i++) {
                if (playerData.Inventory.items[i]._tpl === "TIER1MEDKIT" ||
                    playerData.Inventory.items[i]._tpl === "TIER1MEDKI2" ||
                    playerData.Inventory.items[i]._tpl === "TIER1MEDKI3" ||
                    playerData.Inventory.items[i]._tpl === "SUPERBOTMEDKIT") {
                    playerData.Inventory.items[i]._tpl = "5755356824597772cb798962";
                    playerData.Inventory.items[i].upd.MedKit.HpResource = 100;
                }
            }
        }
    }
    pickRandNumInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    pickRandNumOneInTen() {
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
    saveToJSONFile(data, filePath) {
        var fs = require('fs');
        fs.writeFile(modFolder + filePath, JSON.stringify(data, null, 4), function (err) {
            if (err)
                throw err;
        });
    }
    genId() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 24; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    loopItemDBAndRun(fun, itemDB) {
        for (let item in itemDB) {
            let serverItem = this.itemDB[item];
            {
                fun(serverItem, item);
            }
        }
    }
}
exports.Helper = Helper;
class RaidInfoTracker {
}
exports.RaidInfoTracker = RaidInfoTracker;
RaidInfoTracker.TOD = "";
RaidInfoTracker.mapType = "";
RaidInfoTracker.mapName = "";
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
