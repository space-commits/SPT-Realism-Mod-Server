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
exports.BotTierTracker = exports.RaidInfoTracker = exports.ConfigChecker = exports.ProfileTracker = exports.ModTracker = exports.Utils = void 0;
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
                    let templateItem = this.itemDB()[playerData.Inventory.items[i]._tpl];
                    if (templateItem !== null && templateItem !== undefined) {
                        playerData.Inventory.items[i].upd.MedKit.HpResource = templateItem._props.MaxHpResource;
                    }
                }
            }
        }
    }
    correctItemResources(playerData, playerXP, logger) {
        if (playerData?.Inventory !== undefined) {
            for (let i in playerData.Inventory.items) {
                let profileItem = playerData.Inventory.items[i];
                if (profileItem?.upd?.Repairable?.Durability !== undefined) {
                    this.correctDuraHelper(profileItem, playerXP);
                }
                if (modConfig.med_changes == true && profileItem?.upd?.MedKit?.HpResource !== undefined) {
                    this.correctMedicalRes(profileItem, playerXP, logger);
                }
                if (modConfig.food_changes == true && profileItem?.upd?.FoodDrink?.HpPercent !== undefined) {
                    this.correcProvisionRes(profileItem, playerXP, logger);
                }
            }
        }
    }
    correcProvisionRes(profileItem, playerXP, logger) {
        let templateItem = this.itemDB()[profileItem._tpl];
        if (templateItem !== null && templateItem !== undefined) {
            if (profileItem.upd.FoodDrink.HpPercent > templateItem._props.MaxResource || playerXP == 0) {
                profileItem.upd.FoodDrink.HpPercent = templateItem._props.MaxResource;
            }
        }
    }
    correctMedicalRes(profileItem, playerXP, logger) {
        let templateItem = this.itemDB()[profileItem._tpl];
        if (templateItem !== null && templateItem !== undefined) {
            if (profileItem.upd.MedKit.HpResource > templateItem._props.MaxHpResource || playerXP == 0) {
                profileItem.upd.MedKit.HpResource = templateItem._props.MaxHpResource;
            }
        }
    }
    correctDuraHelper(profileItem, playerXP) {
        for (let j in this.itemDB()) {
            let serverItem = this.itemDB()[j];
            if (profileItem._tpl === serverItem._id && profileItem.upd.Repairable.Durability > serverItem._props.MaxDurability || (playerXP == 0)) {
                profileItem.upd.Repairable.Durability = serverItem._props.Durability;
                profileItem.upd.Repairable.MaxDurability = serverItem._props.MaxDurability;
            }
        }
    }
    probabilityWeighter(items, weights) {
        function add(a, b) { return a + b; }
        let totalWeight = weights.reduce(add, 0);
        let weighedElems = [];
        let currentElem = 0;
        while (currentElem < items.length) {
            for (let i = 0; i < weights[currentElem]; i++)
                weighedElems[weighedElems.length] = items[currentElem];
            currentElem++;
        }
        let randomTier = Math.floor(Math.random() * totalWeight);
        return weighedElems[randomTier];
    }
    pickRandNumInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    pickRandNumOneInTen() {
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
    writeConfigJSON(data, filePath) {
        const baseFolderPath = path.resolve(path.join(__dirname, '../../'));
        fs.writeFile(path.join(baseFolderPath, filePath), JSON.stringify(data, null, 4), function (err) {
            if (err) {
                console.log(`Trying to save the config to ${path.join(baseFolderPath, filePath)} failed:`);
                throw err;
            }
        });
    }
    genId() {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 24; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
exports.Utils = Utils;
class ModTracker {
    static batteryModPresent = false;
    static sainPresent = false;
    static swagPresent = false;
    static qtbPresent = false;
    static alpPresent = false;
}
exports.ModTracker = ModTracker;
class ProfileTracker {
    static profileIds = [];
    static averagePlayerLevel = 1;
    static playerRecord = {};
}
exports.ProfileTracker = ProfileTracker;
class ConfigChecker {
    static dllIsPresent = false;
}
exports.ConfigChecker = ConfigChecker;
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
//# sourceMappingURL=utils.js.map