"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotTierTracker = exports.RaidInfoTracker = exports.EventTracker = exports.ConfigChecker = exports.ProfileTracker = exports.ModTracker = exports.Utils = void 0;
const path = __importStar(require("path"));
const fs = require('fs');
const modConfig = require("../../config/config.json");
class Utils {
    tables;
    arrays;
    constructor(tables, arrays) {
        this.tables = tables;
        this.arrays = arrays;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    medItems() {
        return this.arrays.stashMeds;
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
                    for (let j in this.medItems()) {
                        if (playerData.Inventory.items[i]._tpl === this.medItems()[j]) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB()[this.medItems()[j]]._props.MaxHpResource;
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
        for (let j in this.medItems()) {
            if (profileItem._tpl === this.medItems()[j]) {
                if ((profileItem.upd.MedKit.HpResource > this.itemDB()[this.medItems()[j]]._props.MaxHpResource) || (pmcEXP == 0 && profileItem._tpl === this.medItems[j])) {
                    profileItem.upd.MedKit.HpResource = this.itemDB()[this.medItems()[j]]._props.MaxHpResource;
                }
            }
        }
    }
    correctDuraHelper(profileItem, pmcEXP) {
        for (let j in this.itemDB()) {
            let serverItem = this.itemDB()[j];
            if (profileItem._tpl === serverItem._id && profileItem.upd.Repairable.Durability > serverItem._props.MaxDurability || (pmcEXP == 0 && profileItem._tpl === this.medItems[j])) {
                profileItem.upd.Repairable.Durability = serverItem._props.Durability;
                profileItem.upd.Repairable.MaxDurability = serverItem._props.MaxDurability;
            }
        }
    }
    probabilityWeighter(items, weights) {
        function add(a, b) { return a + b; }
        var totalWeight = weights.reduce(add, 0);
        var weighedElems = [];
        var currentElem = 0;
        while (currentElem < items.length) {
            for (let i = 0; i < weights[currentElem]; i++)
                weighedElems[weighedElems.length] = items[currentElem];
            currentElem++;
        }
        var randomTier = Math.floor(Math.random() * totalWeight);
        return weighedElems[randomTier];
    }
    removeCustomItems(playerData) {
        if (playerData?.Inventory !== undefined) {
            for (var i = 0; i < playerData.Inventory.items.length; i++) {
                if (playerData.Inventory.items[i]._tpl === "TIER1MEDKIT" ||
                    playerData.Inventory.items[i]._tpl === "TIER2MEDKIT" ||
                    playerData.Inventory.items[i]._tpl === "TIER3MEDKIT" ||
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
        const baseFolderPath = path.resolve(path.join(__dirname, '../../'));
        fs.writeFile(path.join(baseFolderPath, filePath), JSON.stringify(data, null, 4), function (err) {
            if (err) {
                console.log(`Trying to save the config to ${path.join(baseFolderPath, filePath)} failed:`);
                throw err;
            }
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
exports.Utils = Utils;
class ModTracker {
    static batteryModPresent = false;
    static sainPresent = false;
}
exports.ModTracker = ModTracker;
class ProfileTracker {
    static level = 1;
}
exports.ProfileTracker = ProfileTracker;
class ConfigChecker {
    static dllIsPresent = false;
}
exports.ConfigChecker = ConfigChecker;
class EventTracker {
    static isChristmas = false;
}
exports.EventTracker = EventTracker;
class RaidInfoTracker {
    static TOD = "";
    static mapType = "";
    static mapName = "";
}
exports.RaidInfoTracker = RaidInfoTracker;
class BotTierTracker {
    static scavTier = 1;
    static rogueTier = 1;
    static raiderTier = 1;
    static goonsTier = 1;
    static killaTier = 1;
    static tagillaTier = 1;
    static sanitarTier = 1;
    static reshallaTier = 1;
    getTier(botType) {
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
        if (botType === "bosssanitar" || botType === "followersanitar") {
            return BotTierTracker.sanitarTier;
        }
        if (botType === "bossbully" || botType === "followerbully") {
            return BotTierTracker.reshallaTier;
        }
        return 2;
    }
}
exports.BotTierTracker = BotTierTracker;
