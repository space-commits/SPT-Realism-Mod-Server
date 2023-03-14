"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotTierTracker = exports.RaidInfoTracker = exports.EventTracker = exports.ConfigChecker = exports.Helper = void 0;
const fs = require('fs');
const modConfig = require("../config/config.json");
class Helper {
    constructor(tables, arrays) {
        this.tables = tables;
        this.arrays = arrays;
        this.itemDB = this.tables.templates.items;
        this.medItems = this.arrays.stashMeds;
    }
    getInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (max > min) ? Math.floor(Math.random() * (max - min + 1) + min) : min;
    }
    getArrayValue(arr) {
        return arr[this.getInt(0, arr.length - 1)];
    }
    revertMedItems(playerData) {
        if (playerData?.Inventory !== undefined) {
            for (let i in playerData.Inventory.items) {
                if (playerData.Inventory.items[i]?.upd?.MedKit?.HpResource !== undefined) {
                    for (let j in this.medItems) {
                        if (playerData.Inventory.items[i]._tpl === this.medItems[j]) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }
    correctItemResources(playerData, pmcEXP) {
        if (playerData?.Inventory !== undefined) {
            for (let i in playerData.Inventory.items) {
                let profileItem = playerData.Inventory.items[i];
                if (profileItem?.upd?.Repairable?.Durability !== undefined) {
                    this.correctDuraHelper(profileItem, pmcEXP);
                }
                if (modConfig.med_changes == true && profileItem?.upd?.MedKit?.HpResource !== undefined) {
                    this.correctMedicalRes(profileItem, pmcEXP);
                }
            }
        }
    }
    correctMedicalRes(profileItem, pmcEXP) {
        for (let j in this.medItems) {
            if (profileItem._tpl === this.medItems[j]) {
                if ((profileItem.upd.MedKit.HpResource > this.itemDB[this.medItems[j]]._props.MaxHpResource) || (pmcEXP == 0 && profileItem._tpl === this.medItems[j])) {
                    profileItem.upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                }
            }
        }
    }
    correctDuraHelper(profileItem, pmcEXP) {
        for (let j in this.itemDB) {
            let serverItem = this.itemDB[j];
            if (profileItem._tpl === serverItem._id && profileItem.upd.Repairable.Durability > serverItem._props.MaxDurability || (pmcEXP == 0 && profileItem._tpl === this.medItems[j])) {
                profileItem.upd.Repairable.Durability = serverItem._props.Durability;
                profileItem.upd.Repairable.MaxDurability = serverItem._props.MaxDurability;
            }
        }
    }
    probabilityWeighter(items, weights) {
        function add(a, b) { return a + b; }
        var botTiers = items;
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
        let dir = __dirname;
        let dirArray = dir.split("\\");
        let modFolder = (`${dirArray[dirArray.length - 4]}/${dirArray[dirArray.length - 3]}/${dirArray[dirArray.length - 2]}/`);
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
}
exports.Helper = Helper;
class ConfigChecker {
}
exports.ConfigChecker = ConfigChecker;
ConfigChecker.dllIsPresent = false;
class EventTracker {
}
exports.EventTracker = EventTracker;
EventTracker.isChristmas = false;
class RaidInfoTracker {
}
exports.RaidInfoTracker = RaidInfoTracker;
RaidInfoTracker.TOD = "";
RaidInfoTracker.mapType = "";
RaidInfoTracker.mapName = "";
class BotTierTracker {
    getTier(botType) {
        if (botType === "sptusec") {
            return BotTierTracker.usecTier;
        }
        if (botType === "sptbear") {
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
        if (botType === "bossknight" || botType === "followerbigpipe" || botType === "followerbirdeye") {
            return BotTierTracker.goonsTier;
        }
        if (botType === "bosskilla") {
            return BotTierTracker.killaTier;
        }
        if (botType === "bosstagilla") {
            return BotTierTracker.tagillaTier;
        }
    }
}
exports.BotTierTracker = BotTierTracker;
BotTierTracker.usecTier = 1;
BotTierTracker.bearTier = 1;
BotTierTracker.scavTier = 1;
BotTierTracker.rogueTier = 1;
BotTierTracker.raiderTier = 1;
BotTierTracker.goonsTier = 1;
BotTierTracker.killaTier = 1;
BotTierTracker.tagillaTier = 1;
