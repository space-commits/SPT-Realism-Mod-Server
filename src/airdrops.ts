
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { LootGenerator } from "@spt-aki/generators/LootGenerator";
import { DependencyContainer } from "tsyringe";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { LootRequest } from "@spt-aki/models/spt/services/LootRequest";
import { LootItem } from "@spt-aki/models/spt/services/LootItem";
import { MinMax } from "@spt-aki/models/common/MinMax";
import { ParentClasses } from "./enums";
import { Preset } from "@spt-aki/models/eft/common/IGlobals";
import { LocationController } from "@spt-aki/controllers/LocationController";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { ItemFilterService } from "@spt-aki/services/ItemFilterService";
import { container, inject } from "tsyringe";
import { Helper, RaidInfoTracker } from "./helper";
import { Arrays } from "./arrays";



export class Airdrops {
    constructor(private logger: ILogger, private modConfig, private airConf: IAirdropConfig) { }

    public loadAirdrops() {
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

export class AirdropLootgen extends LocationController {


    public myGetAirdropLoot(): LootItem[] {
        const modConfig = require("../config/config.json");
        const tables = this.databaseServer.getTables();
        const arrays = new Arrays(tables);
        const helper = new Helper(tables, arrays);
        let weights = [];

        if (RaidInfoTracker.TOD === "day") {
            weights = [65, 65, 40, 40, 40, 20, 15, 15, 1];
        }
        if (RaidInfoTracker.TOD === "night") {
            weights = [10, 10, 15, 15, 20, 85, 75, 70, 1];
        }
        const airdropLoot = this.updateAirdropsLootPools(modConfig, helper, weights);

        const options: AirdropLootRequest = {
            presetCount: airdropLoot.presetCount,
            itemCount: airdropLoot.itemCount,
            itemWhitelist: airdropLoot.itemWhitelist,
            itemLimits: airdropLoot.itemLimits,
            itemStackLimits: airdropLoot.itemStackLimits
        };

        return this.createRandomAirdropLoot(options, helper);
    }


    private updateAirdropsLootPools(modConfig, helper: Helper, weights: Array<number>) {


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


    private createRandomAirdropLoot(options: AirdropLootRequest, helper: Helper): LootItem[] {
        const result: LootItem[] = [];

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

    private findAndAddRandomItemToAirdropLoot(items: [string, ITemplateItem][], itemTypeCounts: Record<string, { current: number; max: number; }>, options: AirdropLootRequest, result: LootItem[], helper: Helper): boolean {
        const randomItem = helper.getArrayValue(items)[1];

        const itemLimitCount = itemTypeCounts[randomItem._parent];

        if (itemLimitCount === undefined || itemLimitCount === null || itemLimitCount.current === undefined || itemLimitCount.current === null || itemLimitCount.max === undefined || itemLimitCount.max === null) {
            this.logger.error("No Item Limit Found For Item: " + randomItem._id + " Of Category " + randomItem._parent);
            return false;
        }

        if (randomItem._parent === ParentClasses.SNIPER_RIFLE || randomItem._parent === ParentClasses.MARKSMAN_RIFLE || randomItem._parent === ParentClasses.ASSAULT_RIFLE || randomItem._parent === ParentClasses.ASSAULT_CARBINE || randomItem._parent === ParentClasses.SHOTGUN || randomItem._parent === ParentClasses.PISTOL || randomItem._parent === ParentClasses.SMG) {
            return false;
        }


        if (itemLimitCount && itemLimitCount.current >= itemLimitCount.max) {
            return false;
        }

        const newLootItem: LootItem = {
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

    private getRandomisedStackCountAirdrop(item: ITemplateItem, options: AirdropLootRequest, helper: Helper): number {
        let min = item._props.StackMinRandom;
        let max = item._props.StackMaxSize;

        if (options.itemStackLimits[item._id]) {
            min = options.itemStackLimits[item._id].min;
            max = options.itemStackLimits[item._id].max;
        }

        return helper.getInt(min, max);
    }

    private findAndAddRandomPresetToAirdropLoot(globalDefaultPresets: [string, Preset][], itemTypeCounts: Record<string, { current: number; max: number; }>, itemWhitelist: string[], result: LootItem[], helper): boolean {
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

        const newLootItem: LootItem = {
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

    private initItemLimitCounter(limits: Record<string, number>): Record<string, { current: number, max: number }> {
        const itemTypeCounts: Record<string, { current: number, max: number }> = {};

        for (const x in limits) {
            itemTypeCounts[x] = {
                current: 0,
                max: limits[x]
            };
        }

        return itemTypeCounts;
    }


}

export class AirdropLootRequest {
    presetCount: MinMax;
    itemCount: MinMax;
    itemWhitelist: string[];
    itemLimits: Record<string, number>;
    itemStackLimits: Record<string, MinMax>;
}



