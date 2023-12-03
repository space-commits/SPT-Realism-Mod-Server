
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { LootItem } from "@spt-aki/models/spt/services/LootItem";
import { MinMax } from "@spt-aki/models/common/MinMax";
import { ParentClasses } from "../utils/enums";
import { IPreset } from "@spt-aki/models/eft/common/IGlobals";
import { LocationController } from "@spt-aki/controllers/LocationController";
import { Utils, RaidInfoTracker } from "../utils/utils";
import { Arrays } from "../utils/arrays";
import { IAirdropLootResult } from "@spt-aki/models/eft/location/IAirdropLootResult";
import { AirdropTypeEnum } from "@spt-aki/models/enums/AirdropType";
import { RandomUtil } from "@spt-aki/utils/RandomUtil";
import { container } from "tsyringe";



export class Airdrops {
    constructor(private logger: ILogger, private modConfig, private airConf: IAirdropConfig) { }

    public loadAirdrops() {
        this.airConf.airdropChancePercent.bigmap = 10;
        this.airConf.airdropChancePercent.woods = 15;
        this.airConf.airdropChancePercent.lighthouse = 15;
        this.airConf.airdropChancePercent.shoreline = 15;
        this.airConf.airdropChancePercent.interchange = 5;
        this.airConf.airdropChancePercent.reserve = 5;
        this.airConf.airdropChancePercent.tarkovStreets = 15;

        this.airConf.planeVolume = 0.2;

        this.airConf.airdropMinStartTimeSeconds = 300;
        this.airConf.airdropMaxStartTimeSeconds = 2400;


        if (this.modConfig.logEverything == true) {
            this.logger.info("Airdrops Loaded");
        }
    }
}

export class AirdropLootgen extends LocationController {


    public myGetAirdropLoot(): IAirdropLootResult {
        const randomUtil = container.resolve<RandomUtil>("RandomUtil");
        const modConfig = require("../../config/config.json");
        const tables = this.databaseServer.getTables();
        const arrays = new Arrays(tables);
        const utils = new Utils(tables, arrays);
        let weights = [];

        if (RaidInfoTracker.TOD === "day") {
            weights = [65, 65, 40, 40, 40, 20, 15, 15, 1];
        }
        if (RaidInfoTracker.TOD === "night") {
            weights = [10, 10, 15, 15, 20, 85, 75, 70, 1];
        }
        const airdropLoot = this.updateAirdropsLootPools(modConfig, utils, weights);

        const options: AirdropLootRequest = {
            presetCount: airdropLoot.presetCount,
            itemCount: airdropLoot.itemCount,
            itemWhitelist: airdropLoot.itemWhitelist,
            itemLimits: airdropLoot.itemLimits,
            itemStackLimits: airdropLoot.itemStackLimits,
            weaponCrateCount: airdropLoot.weaponCrateCount
        };

        return { dropType: AirdropTypeEnum.MIXED, loot: this.createRandomAirdropLoot(options, utils, randomUtil) };
    }


    private updateAirdropsLootPools(modConfig, utils: Utils, weights: Array<number>) {

        const airdropLoot = require("../../db/airdrops/airdrop_loot.json");
        let airdropLootArr = ["medical_loot", "provisions_loot", "materials_loot", "supplies_loot", "electronics_loot", "ammo_loot", "weapons_loot", "gear_loot", "tp"];
        let loot = utils.probabilityWeighter(airdropLootArr, weights);
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


    private createRandomAirdropLoot(options: AirdropLootRequest, utils: Utils, randomUtil: RandomUtil): LootItem[] {
        const result: LootItem[] = [];

        const itemTypeCounts = this.initItemLimitCounter(options.itemLimits);

        const tables = this.databaseServer.getTables();


        // Get items from items.json that are in the whitelist
        const items = Object.entries(tables.templates.items).filter(x => options.itemWhitelist.includes(x[1]._id));

        const randomisedItemCount = utils.getInt(options.itemCount.min, options.itemCount.max);
        for (let index = 0; index < randomisedItemCount; index++) {
            if (!this.findAndAddRandomItemToAirdropLoot(items, itemTypeCounts, options, result, utils)) {
                index--;
            }
        }

        const globalDefaultPresets = Object.entries(tables.globals.ItemPresets).filter(x => x[1]._encyclopedia !== undefined);
        const randomisedPresetCount = utils.getInt(options.presetCount.min, options.presetCount.max);
        for (let index = 0; index < randomisedPresetCount; index++) {
            if (!this.findAndAddRandomWeaponPresetToAirdropLoot(globalDefaultPresets, itemTypeCounts, options.itemWhitelist, result, utils)) {
                index--;
            }
        }

        const desiredWeaponCrateCount = randomUtil.getInt(options.weaponCrateCount.min, options.weaponCrateCount.max);
        if (desiredWeaponCrateCount > 0)
        {
            // Get list of all sealed containers from db
            const sealedWeaponContainerPool = Object.values(tables.templates.items).filter(x => x._name.includes("event_container_airdrop"));
            for (let index = 0; index < desiredWeaponCrateCount; index++)
            {
                // Choose one at random + add to results array
                const chosenSealedContainer = randomUtil.getArrayValue(sealedWeaponContainerPool);
                result.push({
                    id: this.hashUtil.generate(),
                    tpl: chosenSealedContainer._id,
                    isPreset: false,
                    stackCount: 1
                });
            }
        }

        return result;
    }

    private findAndAddRandomItemToAirdropLoot(items: [string, ITemplateItem][], itemTypeCounts: Record<string, { current: number; max: number; }>, options: AirdropLootRequest, result: LootItem[], utils: Utils): boolean {
        const randomItem = utils.getArrayValue(items)[1];

        const itemLimitCount = itemTypeCounts[randomItem._parent];

        if (itemLimitCount === undefined || itemLimitCount === null || itemLimitCount.current === undefined || itemLimitCount.current === null || itemLimitCount.max === undefined || itemLimitCount.max === null) {
            this.logger.warning("No Item Limit Found For Item: " + randomItem._id + " Of Category " + randomItem._parent);
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
            newLootItem.stackCount = this.getRandomisedStackCountAirdrop(randomItem, options, utils);
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

    private getRandomisedStackCountAirdrop(item: ITemplateItem, options: AirdropLootRequest, utils: Utils): number {
        let min = item._props.StackMinRandom;
        let max = item._props.StackMaxSize;

        if(item._parent === "5485a8684bdc2da71d8b4567"){
            min = max / 2;           
        }

        if (options.itemStackLimits[item._id]) {
            min = options.itemStackLimits[item._id].min;
            max = options.itemStackLimits[item._id].max;
        }

        return utils.getInt(min, max);
    }

    private findAndAddRandomWeaponPresetToAirdropLoot(globalDefaultPresets: [string, IPreset][], itemTypeCounts: Record<string, { current: number; max: number; }>, itemWhitelist: string[], result: LootItem[], utils: Utils): boolean {
        // Choose random preset and get details from item.json using encyclopedia value (encyclopedia === tplId)
        const randomPreset = utils.getArrayValue(globalDefaultPresets)[1];
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
    weaponCrateCount: MinMax;
}



