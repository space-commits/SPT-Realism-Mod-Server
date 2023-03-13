"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirdropLootRequest = exports.AirdropLootgen = exports.Airdrops = void 0;
const enums_1 = require("./enums");
const LocationController_1 = require("C:/snapshot/project/obj/controllers/LocationController");
const helper_1 = require("./helper");
const arrays_1 = require("./arrays");
class Airdrops {
    constructor(logger, modConfig, airConf) {
        this.logger = logger;
        this.modConfig = modConfig;
        this.airConf = airConf;
    }
    loadAirdrops() {
        this.airConf.airdropChancePercent.bigmap = 15;
        this.airConf.airdropChancePercent.woods = 20;
        this.airConf.airdropChancePercent.lighthouse = 20;
        this.airConf.airdropChancePercent.shoreline = 20;
        this.airConf.airdropChancePercent.interchange = 10;
        this.airConf.airdropChancePercent.reserve = 10;
        this.airConf.airdropChancePercent.tarkovStreets = 15;
        this.airConf.planeVolume = 0.2;
        this.airConf.airdropMinStartTimeSeconds = 300;
        this.airConf.airdropMaxStartTimeSeconds = 1200;
        if (this.modConfig.logEverything == true) {
            this.logger.info("Airdrops Loaded");
        }
    }
}
exports.Airdrops = Airdrops;
class AirdropLootgen extends LocationController_1.LocationController {
    myGetAirdropLoot() {
        const modConfig = require("../config/config.json");
        const tables = this.databaseServer.getTables();
        const arrays = new arrays_1.Arrays(tables);
        const helper = new helper_1.Helper(tables, arrays);
        let weights = [];
        if (helper_1.RaidInfoTracker.TOD === "day") {
            weights = [65, 65, 40, 40, 40, 20, 15, 15, 1];
        }
        if (helper_1.RaidInfoTracker.TOD === "night") {
            weights = [10, 10, 15, 15, 20, 85, 75, 70, 1];
        }
        const airdropLoot = this.updateAirdropsLootPools(modConfig, helper, weights);
        const options = {
            presetCount: airdropLoot.presetCount,
            itemCount: airdropLoot.itemCount,
            itemWhitelist: airdropLoot.itemWhitelist,
            itemLimits: airdropLoot.itemLimits,
            itemStackLimits: airdropLoot.itemStackLimits
        };
        return this.createRandomAirdropLoot(options, helper);
    }
    updateAirdropsLootPools(modConfig, helper, weights) {
        const airdropLoot = require("../db/airdrops/airdrop_loot.json");
        var airdropLootArr = ["medical_loot", "provisions_loot", "materials_loot", "supplies_loot", "electronics_loot", "ammo_loot", "weapons_loot", "gear_loot", "tp"];
        var loot = helper.probabilityWeighter(airdropLootArr, weights);
        if (loot === "medical_loot") {
            return airdropLoot.medical_loot;
        }
        if (loot === "provisions_loot") {
            return airdropLoot.provisions_loot;
        }
        if (loot === "materials_loot") {
            return airdropLoot.materials_loot;
        }
        if (loot === "supplies_loot") {
            return airdropLoot.supplies_loot;
        }
        if (loot === "electronics_loot") {
            return airdropLoot.electronics_loot;
        }
        if (loot === "ammo_loot") {
            return airdropLoot.ammo_loot;
        }
        if (loot === "weapons_loot") {
            return airdropLoot.weapons_loot;
        }
        if (loot === "gear_loot") {
            return airdropLoot.gear_loot;
        }
        if (loot === "tp") {
            return airdropLoot.tp;
        }
        if (modConfig.logEverything == true) {
            this.logger.info("Aidrop Loot = " + loot);
            this.logger.info("Realism Mod: Airdrop Loot Has Been Reconfigured");
        }
        return airdropLoot.provisions_loot;
    }
    createRandomAirdropLoot(options, helper) {
        const result = [];
        const itemTypeCounts = this.initItemLimitCounter(options.itemLimits);
        const tables = this.databaseServer.getTables();
        // Get items from items.json that are in the whitelist
        const items = Object.entries(tables.templates.items).filter(x => options.itemWhitelist.includes(x[1]._id));
        const randomisedItemCount = helper.getInt(options.itemCount.min, options.itemCount.max);
        for (let index = 0; index < randomisedItemCount; index++) {
            if (!this.findAndAddRandomItemToAirdropLoot(items, itemTypeCounts, options, result, helper)) {
                index--;
            }
        }
        const globalDefaultPresets = Object.entries(tables.globals.ItemPresets).filter(x => x[1]._encyclopedia !== undefined);
        const randomisedPresetCount = helper.getInt(options.presetCount.min, options.presetCount.max);
        for (let index = 0; index < randomisedPresetCount; index++) {
            if (!this.findAndAddRandomPresetToAirdropLoot(globalDefaultPresets, itemTypeCounts, options.itemWhitelist, result, helper)) {
                index--;
            }
        }
        return result;
    }
    findAndAddRandomItemToAirdropLoot(items, itemTypeCounts, options, result, helper) {
        const randomItem = helper.getArrayValue(items)[1];
        const itemLimitCount = itemTypeCounts[randomItem._parent];
        if (itemLimitCount === undefined || itemLimitCount === null || itemLimitCount.current === undefined || itemLimitCount.current === null || itemLimitCount.max === undefined || itemLimitCount.max === null) {
            this.logger.error("No Item Limit Found For Item: " + randomItem._id + " Of Category " + randomItem._parent);
            return false;
        }
        if (randomItem._parent === enums_1.ParentClasses.SNIPER_RIFLE || randomItem._parent === enums_1.ParentClasses.MARKSMAN_RIFLE || randomItem._parent === enums_1.ParentClasses.ASSAULT_RIFLE || randomItem._parent === enums_1.ParentClasses.ASSAULT_CARBINE || randomItem._parent === enums_1.ParentClasses.SHOTGUN || randomItem._parent === enums_1.ParentClasses.PISTOL || randomItem._parent === enums_1.ParentClasses.SMG) {
            return false;
        }
        if (itemLimitCount && itemLimitCount.current >= itemLimitCount.max) {
            return false;
        }
        const newLootItem = {
            id: this.hashUtil.generate(),
            tpl: randomItem._id,
            isPreset: false,
            stackCount: 1
        };
        // Special case - handle items that need a stackcount > 1
        if (randomItem._props.StackMaxSize > 1) {
            newLootItem.stackCount = this.getRandomisedStackCountAirdrop(randomItem, options, helper);
        }
        newLootItem.tpl = randomItem._id;
        result.push(newLootItem);
        if (itemLimitCount) {
            // Increment item count as it's in limit array
            itemLimitCount.current++;
        }
        // Item added okay
        return true;
    }
    getRandomisedStackCountAirdrop(item, options, helper) {
        let min = item._props.StackMinRandom;
        let max = item._props.StackMaxSize;
        if (options.itemStackLimits[item._id]) {
            min = options.itemStackLimits[item._id].min;
            max = options.itemStackLimits[item._id].max;
        }
        return helper.getInt(min, max);
    }
    findAndAddRandomPresetToAirdropLoot(globalDefaultPresets, itemTypeCounts, itemWhitelist, result, helper) {
        // Choose random preset and get details from item.json using encyclopedia value (encyclopedia === tplId)
        const randomPreset = helper.getArrayValue(globalDefaultPresets)[1];
        const itemDetails = this.databaseServer.getTables().templates.items[randomPreset._encyclopedia];
        // Skip non-whitelisted items
        if (!itemWhitelist.includes(randomPreset._items[0]._tpl)) {
            return false;
        }
        // Some custom mod items are lacking a parent property
        if (!itemDetails._parent) {
            this.logger.error(this.localisationService.getText("loot-item_missing_parentid", itemDetails._name));
            return false;
        }
        // Check picked preset hasn't exceeded spawn limit
        const itemLimitCount = itemTypeCounts[itemDetails._parent];
        if (itemLimitCount && itemLimitCount.current > itemLimitCount.max) {
            return false;
        }
        const newLootItem = {
            tpl: randomPreset._items[0]._tpl,
            isPreset: true,
            stackCount: 1
        };
        result.push(newLootItem);
        if (itemLimitCount) {
            // increment item count as its in limit array
            itemLimitCount.current++;
        }
        // item added okay
        return true;
    }
    initItemLimitCounter(limits) {
        const itemTypeCounts = {};
        for (const x in limits) {
            itemTypeCounts[x] = {
                current: 0,
                max: limits[x]
            };
        }
        return itemTypeCounts;
    }
}
exports.AirdropLootgen = AirdropLootgen;
class AirdropLootRequest {
}
exports.AirdropLootRequest = AirdropLootRequest;
