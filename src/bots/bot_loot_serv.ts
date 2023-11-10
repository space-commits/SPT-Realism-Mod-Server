
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Chances, IBotType, Inventory, Items, ModsChances } from "@spt-aki/models/eft/common/tables/IBotType";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { BotLootGenerator } from "@spt-aki/generators/BotLootGenerator";
import { Inventory as PmcInventory } from "@spt-aki/models/eft/common/tables/IBotBase";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { PMCLootGenerator } from "@spt-aki/generators/PMCLootGenerator";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { container, inject } from "tsyringe";
import { EquipmentSlots } from "@spt-aki/models/enums/EquipmentSlots";
import { BotTierTracker } from "../utils/utils";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";

const scavLO = require("../../db/bots/loadouts/scavs/scavLO.json");
const bearLO = require("../../db/bots/loadouts/PMCs/bearLO.json");
const usecLO = require("../../db/bots/loadouts/PMCs/usecLO.json");
const tier5LO = require("../../db/bots/loadouts/PMCs/tier5PMC.json");
const raiderLO = require("../../db/bots/loadouts/raiders_rogues/raiderLO.json");
const rogueLO = require("../../db/bots/loadouts/raiders_rogues/rogueLO.json");
const knightLO = require("../../db/bots/loadouts/bosses/goons/knightLO.json");
const bigpipeLO = require("../../db/bots/loadouts/bosses/goons/bigpipeLO.json");
const birdeyeLO = require("../../db/bots/loadouts/bosses/goons/birdeyeLO.json");
const killaLO = require("../../db/bots/loadouts/bosses/killaLO.json");
const tagillaLO = require("../../db/bots/loadouts/bosses/tagillaLO.json");
const saniLO = require("../../db/bots/loadouts/bosses/sanitar/sanitarLO.json");
const saniFollowerLO = require("../../db/bots/loadouts/bosses/sanitar/sanitarfollowerLO.json");
const reshLO = require("../../db/bots/loadouts/bosses/reshalla/reshallaLO.json");
const reshFollowerLO = require("../../db/bots/loadouts/bosses/reshalla/reshallafollowerLO.json");

export class MyBotLootCache {
    specialItems: ITemplateItem[]
    backpackLoot: ITemplateItem[]
    pocketLoot: ITemplateItem[]
    vestLoot: ITemplateItem[]
    combinedPoolLoot: ITemplateItem[]

    vestGrenadeItems: ITemplateItem[]
    pocketGrenadeItems: ITemplateItem[]

    vestHealingItems: ITemplateItem[]
    vestDrugItems: ITemplateItem[]
    vestStimItems: ITemplateItem[]

    pocketHealingItems: ITemplateItem[]
    pocketDrugItems: ITemplateItem[]
    pocketStimItems: ITemplateItem[]

    bagHealingItems: ITemplateItem[]
    bagDrugItems: ITemplateItem[]
    bagStimItems: ITemplateItem[]
}

export const enum MyLootCacheType {
    SPECIAL = "Special",
    BACKPACK = "Backpack",
    POCKET = "Pocket",
    VEST = "Vest",
    COMBINED = "Combined",

    VEST_GRENADE_ITEMS = "VestGrenadeItems",
    POCKET_GRENADE_ITEMS = "PocketGrenadeItems",

    VEST_HEALING_ITEMS = "VestHealingItems",
    VEST_DRUG_ITEMS = "VestDrugItems",
    VEST_STIM_ITEMS = "VestStimItems",

    POCKET_HEALING_ITEMS = "PocketHealingItems",
    POCKET_DRUG_ITEMS = "PocketDrugItems",
    POCKET_STIM_ITEMS = "PocketStimItems",

    BAG_HEALING_ITEMS = "BagHealingItems",
    BAG_DRUG_ITEMS = "BagDrugItems",
    BAG_STIM_ITEMS = "BagStimItems"
}

type BotGeneration = {
    [botName: string]: {
        [botTier: number]: any;
    };
};

const botGenerations: BotGeneration = {
    "assault": {
        1: scavLO.scavLO1.generation,
        2: scavLO.scavLO2.generation,
        3: scavLO.scavLO3.generation
    },
    "sptusec": {
        1: usecLO.usecLO1.generation,
        2: usecLO.usecLO2.generation,
        3: usecLO.usecLO3.generation,
        4: usecLO.usecLO4.generation,
        5: tier5LO.tier5LO.generation
    },
    "sptbear": {
        1: bearLO.bearLO1.generation,
        2: bearLO.bearLO2.generation,
        3: bearLO.bearLO3.generation,
        4: bearLO.bearLO4.generation,
        5: tier5LO.tier5LO.generation
    },
    "bossbully": {
        1: reshLO.reshallaLO1.generation,
        2: reshLO.reshallaLO2.generation,
        3: reshLO.reshallaLO3.generation
    },
    "bosskilla": {
        1: killaLO.killaLO1.generation,
        2: killaLO.killaLO2.generation,
        3: killaLO.killaLO3.generation
    },
    "bossknight": {
        1: knightLO.knightLO1.generation,
        2: knightLO.knightLO2.generation,
        3: knightLO.knightLO3.generation
    },
    "bosssanitar": {
        1: saniLO.sanitarLO1.generation,
        2: saniLO.sanitarLO2.generation,
        3: saniLO.sanitarLO3.generation
    },
    "bosstagilla": {
        1: tagillaLO.tagillaLO1.generation,
        2: tagillaLO.tagillaLO2.generation,
        3: tagillaLO.tagillaLO3.generation
    },
    "exusec": {
        1: rogueLO.rogueLO1.generation,
        2: rogueLO.rogueLO2.generation,
        3: rogueLO.rogueLO3.generation
    },
    "pmcbot": {
        1: raiderLO.raiderLO1.generation,
        2: raiderLO.raiderLO2.generation,
        3: raiderLO.raiderLO3.generation
    },
    "followerbigpipe": {
        1: bigpipeLO.bigpipeLO1.generation,
        2: bigpipeLO.bigpipeLO2.generation,
        3: bigpipeLO.bigpipeLO3.generation
    },
    "followerbirdeye": {
        1: birdeyeLO.birdeyeLO1.generation,
        2: birdeyeLO.birdeyeLO2.generation,
        3: birdeyeLO.birdeyeLO3.generation
    },
    "followerbully": {
        1: reshFollowerLO.reshallafollowerLO1.generation,
        2: reshFollowerLO.reshallafollowerLO2.generation,
        3: reshFollowerLO.reshallafollowerLO3.generation
    },
    "followersanitar": {
        1: saniFollowerLO.sanitarfollowerLO1.generation,
        2: saniFollowerLO.sanitarfollowerLO2.generation,
        3: saniFollowerLO.sanitarfollowerLO3.generation
    }
};

export class BotLootGen extends BotLootGenerator {

    public genLoot(sessionId: string, botJsonTemplate: IBotType, isPmc: boolean, botRole: string, botInventory: PmcInventory, pmcTier: number): void {

        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
        const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
        const tierChecker = new BotTierTracker();
        let tier = botRole === "sptbear" || botRole === "sptusec" ? pmcTier : tierChecker.getTier(botRole);
       
        var itemCounts = botGenerations[botRole]?.[tier]?.items;
        if (itemCounts === null || itemCounts === undefined) {
            itemCounts = raiderLO.raiderLO3.generation.items;
        }
        const myGetLootCache = new MyLootCache(this.logger, jsonUtil, this.itemHelper, this.databaseServer, pmcLootGenerator, this.localisationService, ragfairPriceService);

        const nValue = this.getBotLootNValueByRole(botRole);
        const looseLootMin = itemCounts.looseLoot.min;
        const looseLootMax = itemCounts.looseLoot.max;

        var healingTally = 0;
        var stimTally = 0;
        var drugTally = 0;
        var lootTally = 0;
        var grenadeTally = 0;

        const bagItemCount = this.getRandomisedCount(looseLootMin, looseLootMax, nValue);
        lootTally += bagItemCount;
        const pocketLootCount = lootTally >= looseLootMax ? 0 : this.getRandomisedCount(looseLootMin, looseLootMax, nValue);
        lootTally += pocketLootCount;
        const vestLootCount = lootTally >= looseLootMax ? 0 : this.getRandomisedCount(Math.round(looseLootMin / 2), Math.round(looseLootMax / 2), nValue); // Count is half what loose loot min/max is
        lootTally += vestLootCount;
        const specialLootItemCount = this.getRandomisedCount(itemCounts.specialItems.min, itemCounts.specialItems.max, nValue);

        const vestHealingItemCount = this.getRandomisedCount(itemCounts.healing.min, itemCounts.healing.max, 3);
        healingTally += vestHealingItemCount;
        const vestDrugItemCount = this.getRandomisedCount(itemCounts.drugs.min, itemCounts.drugs.max, 3)
        drugTally += vestDrugItemCount;
        const vestStimItemCount = this.getRandomisedCount(itemCounts.stims.min, itemCounts.stims.max, 3);
        stimTally += vestStimItemCount;

        const pocketHealingItemCount = healingTally >= itemCounts.healing.max ? 0 : this.getRandomisedCount(Math.max(0, Math.round(itemCounts.healing.min / 2)), Math.max(1, Math.round(itemCounts.healing.max / 2)), 3);
        healingTally += pocketHealingItemCount;
        const pocketDrugItemCount = drugTally >= itemCounts.drugs.max ? 0 : this.getRandomisedCount(Math.max(0, Math.round(itemCounts.drugs.min / 2)), Math.max(1, Math.round(itemCounts.drugs.max / 2)), 3)
        drugTally += pocketDrugItemCount;
        const pocketStimItemCount = stimTally >= itemCounts.stims.max ? 0 : this.getRandomisedCount(Math.max(0, Math.round(itemCounts.stims.min / 2)), Math.max(1, Math.round(itemCounts.stims.max / 2)), 3);
        stimTally += pocketStimItemCount;

        const bagHealingItemCount = healingTally >= itemCounts.healing.max ? 0 : this.getRandomisedCount(itemCounts.healing.min, itemCounts.healing.max, 3);
        healingTally += bagHealingItemCount;
        const bagDrugItemCount = drugTally >= itemCounts.drugs.max ? 0 : this.getRandomisedCount(itemCounts.drugs.min, itemCounts.drugs.max, 3);

        drugTally += bagDrugItemCount;
        const bagStimItemCount = stimTally >= itemCounts.stims.max ? 0 : this.getRandomisedCount(itemCounts.stims.min, itemCounts.stims.max, 3);
        stimTally += bagStimItemCount;

        const vestGrenadeCount = this.getRandomisedCount(itemCounts.grenades.min, itemCounts.grenades.max, 4);
        grenadeTally += vestGrenadeCount;
        const pocketGrenadeCount = grenadeTally >= itemCounts.grenades.max ? 0 : this.getRandomisedCount(itemCounts.grenades.min, itemCounts.grenades.max, 4);
        grenadeTally += pocketGrenadeCount;


        const containersBotHasAvailable = this.getAvailableContainersBotCanStoreItemsIn(botInventory);

        // Forced pmc healing loot
        if (isPmc && this.pmcConfig.forceHealingItemsIntoSecure) {
            this.addForcedMedicalItemsToPmcSecure(botInventory, botRole);
        }

        if (containersBotHasAvailable.includes(EquipmentSlots.BACKPACK)) {
            // if (isPmc && this.randomUtil.getChance100(this.pmcConfig.looseWeaponInBackpackChancePercent)) {
            //     this.addLooseWeaponsToInventorySlot(sessionId, botInventory, "Backpack", botJsonTemplate.inventory, botJsonTemplate.chances.mods, botRole, isPmc, botLevel);
            // }
            // Backpack Loot
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BACKPACK, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                bagItemCount,
                botInventory,
                botRole,
                true,
                this.pmcConfig.maxBackpackLootTotalRub,
                isPmc);

            //Bag Meds
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_HEALING_ITEMS, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                bagHealingItemCount,
                botInventory,
                botRole,
                false,
                0,
                isPmc);

            //Bag Drugs
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_DRUG_ITEMS, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                bagDrugItemCount,
                botInventory,
                botRole,
                false,
                0,
                isPmc);

            //Bag Stims
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_STIM_ITEMS, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                bagStimItemCount,
                botInventory,
                botRole,
                true,
                0,
                isPmc);

        }
        if (containersBotHasAvailable.includes(EquipmentSlots.TACTICAL_VEST)) {
            //Vest Meds
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_HEALING_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                vestHealingItemCount,
                botInventory,
                botRole,
                false,
                0,
                isPmc);

            //Vest Drugs
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_DRUG_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                vestDrugItemCount,
                botInventory,
                botRole,
                false,
                0,
                isPmc);

            //Vest Stims
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_STIM_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                vestStimItemCount,
                botInventory,
                botRole,
                true,
                0,
                isPmc);

            // Vest Loot
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                vestLootCount,
                botInventory,
                botRole,
                true,
                this.pmcConfig.maxVestLootTotalRub,
                isPmc);

            //Vest Nades
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_GRENADE_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                vestGrenadeCount,
                botInventory,
                botRole,
                false,
                0,
                isPmc);

        }
        // Pocket Loot
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            pocketLootCount,
            botInventory,
            botRole,
            true,
            this.pmcConfig.maxPocketLootTotalRub,
            isPmc);

        // Grenades
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_GRENADE_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            pocketGrenadeCount,
            botInventory,
            botRole,
            false,
            0,
            isPmc);

        // Special items
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.SPECIAL, botJsonTemplate),
            [EquipmentSlots.POCKETS, EquipmentSlots.BACKPACK, EquipmentSlots.TACTICAL_VEST],
            specialLootItemCount,
            botInventory,
            botRole);

        //Pocket Meds
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_HEALING_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            pocketHealingItemCount,
            botInventory,
            botRole,
            false,
            0,
            isPmc);

        //Pocket Drugs
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_DRUG_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            pocketDrugItemCount,
            botInventory,
            botRole,
            false,
            0,
            isPmc);

        //Pocket Stims
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_STIM_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            pocketStimItemCount,
            botInventory,
            botRole,
            true,
            0,
            isPmc);
    }
}

export class MyLootCache extends BotLootCacheService {

    protected myLootCache: Record<string, MyBotLootCache> = {};

    private myBotRoleExistsInCache(botRole: string): boolean {
        return !!this.myLootCache[botRole];
    }

    private myInitCacheForBotRole(botRole: string): void {
        this.myLootCache[botRole] = {
            backpackLoot: [],
            pocketLoot: [],
            vestLoot: [],
            combinedPoolLoot: [],
            specialItems: [],

            vestGrenadeItems: [],
            pocketGrenadeItems: [],

            vestHealingItems: [],
            vestDrugItems: [],
            vestStimItems: [],

            pocketHealingItems: [],
            pocketDrugItems: [],
            pocketStimItems: [],

            bagHealingItems: [],
            bagDrugItems: [],
            bagStimItems: []
        };
    }

    public override clearCache(): void {
        this.myLootCache = {};
        this.lootCache = {};
    }


    public getLootCache(botRole: string, isPmc: boolean, lootType: MyLootCacheType, botJsonTemplate: IBotType): ITemplateItem[] {


        if (!this.myBotRoleExistsInCache(botRole)) {
            this.myInitCacheForBotRole(botRole)
            this.myAddLootToCache(botRole, isPmc, botJsonTemplate);
        }

        switch (lootType) {
            case MyLootCacheType.SPECIAL:
                return this.myLootCache[botRole].specialItems;
            case MyLootCacheType.BACKPACK:
                return this.myLootCache[botRole].backpackLoot;
            case MyLootCacheType.POCKET:
                return this.myLootCache[botRole].pocketLoot;
            case MyLootCacheType.VEST:
                return this.myLootCache[botRole].vestLoot;
            case MyLootCacheType.COMBINED:
                return this.myLootCache[botRole].combinedPoolLoot;
            case MyLootCacheType.VEST_GRENADE_ITEMS:
                return this.myLootCache[botRole].vestGrenadeItems;
            case MyLootCacheType.POCKET_GRENADE_ITEMS:
                return this.myLootCache[botRole].pocketGrenadeItems;
            case MyLootCacheType.VEST_HEALING_ITEMS:
                return this.myLootCache[botRole].vestHealingItems;
            case MyLootCacheType.VEST_DRUG_ITEMS:
                return this.myLootCache[botRole].vestDrugItems;
            case MyLootCacheType.VEST_STIM_ITEMS:
                return this.myLootCache[botRole].vestStimItems;
            case MyLootCacheType.POCKET_HEALING_ITEMS:
                return this.myLootCache[botRole].pocketHealingItems;
            case MyLootCacheType.POCKET_DRUG_ITEMS:
                return this.myLootCache[botRole].pocketDrugItems;
            case MyLootCacheType.POCKET_STIM_ITEMS:
                return this.myLootCache[botRole].pocketStimItems;
            case MyLootCacheType.BAG_HEALING_ITEMS:
                return this.myLootCache[botRole].bagHealingItems;
            case MyLootCacheType.BAG_DRUG_ITEMS:
                return this.myLootCache[botRole].bagDrugItems;
            case MyLootCacheType.BAG_STIM_ITEMS:
                return this.myLootCache[botRole].bagStimItems;
            default:
                this.logger.error(this.localisationService.getText("bot-loot_type_not_found", { lootType: lootType, botRole: botRole, isPmc: isPmc }));
                break;
        }
    }

    private myAddLootToCache(botRole: string, isPmc: boolean, botJsonTemplate: IBotType): void {
        const specialLootTemplates: ITemplateItem[] = [];
        const backpackLootTemplates: ITemplateItem[] = [];
        const pocketLootTemplates: ITemplateItem[] = [];
        const vestLootTemplates: ITemplateItem[] = [];
        const combinedPoolTemplates: ITemplateItem[] = [];

        const lootPool = botJsonTemplate.inventory.items;

        for (const [slot, pool] of Object.entries(lootPool)) {

            if (!pool?.length) {
                continue;
            }

            // Sort loot pool into separate buckets
            let itemsToAdd: ITemplateItem[] = [];
            const items = this.databaseServer.getTables().templates.items;
            switch (slot.toLowerCase()) {
                case "specialloot":
                    itemsToAdd = pool.map((lootTpl: string) => items[lootTpl]);
                    this.addUniqueItemsToPool(specialLootTemplates, itemsToAdd);
                    break;
                case "pockets":
                    itemsToAdd = pool.map((lootTpl: string) => items[lootTpl]);
                    this.addUniqueItemsToPool(pocketLootTemplates, itemsToAdd);
                    break;
                case "tacticalvest":
                    itemsToAdd = pool.map((lootTpl: string) => items[lootTpl]);
                    this.addUniqueItemsToPool(vestLootTemplates, itemsToAdd);
                    break;
                case "securedcontainer":
                    // Don't add these items to loot pool
                    break;
                default:
                    itemsToAdd = pool.map((lootTpl: string) => items[lootTpl]);
                    this.addUniqueItemsToPool(backpackLootTemplates, itemsToAdd);
            }

            // Add items to combined pool if any exist
            if (Object.keys(itemsToAdd).length > 0) {
                this.addUniqueItemsToPool(combinedPoolTemplates, itemsToAdd);
            }
        }

        // Sort all items by their worth
        this.sortPoolByRagfairPrice(specialLootTemplates);
        this.sortPoolByRagfairPrice(backpackLootTemplates);
        this.sortPoolByRagfairPrice(pocketLootTemplates);
        this.sortPoolByRagfairPrice(vestLootTemplates);
        this.sortPoolByRagfairPrice(combinedPoolTemplates);

        const specialLootItems = specialLootTemplates.filter(template =>
            !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props));


        /////////////////////Meds//////////////////////////////
        //vest
        const vestHealingItems = vestLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.MEDKIT
            || template._parent === BaseClasses.MEDICAL);

        const vestDrugItems = vestLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.DRUGS);

        const vestStimItems = vestLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.STIMULATOR);

        //pocket
        const pocketHealingItems = pocketLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.MEDKIT
            || template._parent === BaseClasses.MEDICAL);

        const pocketDrugItems = pocketLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.DRUGS);

        const pocketStimItems = pocketLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.STIMULATOR);

        //bag
        const bagHealingItems = backpackLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.MEDKIT
            || template._parent === BaseClasses.MEDICAL);

        const bagDrugItems = backpackLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.DRUGS);

        const bagStimItems = backpackLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.STIMULATOR);
        ///////////////////////////////////////////////////////

        const vestGrenadeItems = vestLootTemplates.filter(template =>
            this.isGrenade(template._props));
        const pocketGrenadeItems = pocketLootTemplates.filter(template =>
            this.isGrenade(template._props));

        // Get loot items (excluding magazines, bullets, grenades and healing items)
        const backpackLootItems = backpackLootTemplates.filter(template =>
            !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props));

        // Get pocket loot
        const pocketLootItems = pocketLootTemplates.filter(template =>
            !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props)
            && ("Height" in template._props)
            && ("Width" in template._props));

        // Get vest loot items
        const vestLootItems = vestLootTemplates.filter(template =>
            !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props));

        this.myLootCache[botRole].vestHealingItems = vestHealingItems;
        this.myLootCache[botRole].vestDrugItems = vestDrugItems;
        this.myLootCache[botRole].vestStimItems = vestStimItems;

        this.myLootCache[botRole].pocketHealingItems = pocketHealingItems;
        this.myLootCache[botRole].pocketDrugItems = pocketDrugItems;
        this.myLootCache[botRole].pocketStimItems = pocketStimItems;

        this.myLootCache[botRole].bagHealingItems = bagHealingItems;
        this.myLootCache[botRole].bagDrugItems = bagDrugItems;
        this.myLootCache[botRole].bagStimItems = bagStimItems;

        this.myLootCache[botRole].vestGrenadeItems = vestGrenadeItems;
        this.myLootCache[botRole].pocketGrenadeItems = pocketGrenadeItems;

        this.myLootCache[botRole].specialItems = specialLootItems;
        this.myLootCache[botRole].backpackLoot = backpackLootItems;
        this.myLootCache[botRole].pocketLoot = pocketLootItems;
        this.myLootCache[botRole].vestLoot = vestLootItems;
    }
}