import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { IBotType } from "@spt-aki/models/eft/common/tables/IBotType";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { BotLootGenerator } from "@spt-aki/generators/BotLootGenerator";
import { Inventory as PmcInventory } from "@spt-aki/models/eft/common/tables/IBotBase";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { PMCLootGenerator } from "@spt-aki/generators/PMCLootGenerator";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { container, inject } from "tsyringe";
import { EquipmentSlots } from "@spt-aki/models/enums/EquipmentSlots";

export class MyBotLootCache {
    specialItems: Record<string, number>;
    secureLoot: Record<string, number>;
    backpackLoot: Record<string, number>;
    pocketLoot: Record<string, number>;
    vestLoot: Record<string, number>;

    combinedPoolLoot: Record<string, number>;
    vestGrenadeItems: Record<string, number>;
    pocketGrenadeItems: Record<string, number>;

    vestHealingItems: Record<string, number>;
    vestDrugItems: Record<string, number>;
    vestStimItems: Record<string, number>;

    pocketHealingItems: Record<string, number>;
    pocketDrugItems: Record<string, number>;
    pocketStimItems: Record<string, number>;

    bagHealingItems: Record<string, number>;
    bagDrugItems: Record<string, number>;
    bagStimItems: Record<string, number>;

    foodItems: Record<string, number>;
    drinkItems: Record<string, number>;
    currencyItems: Record<string, number>;
}

export const enum MyLootCacheType {
    SPECIAL = "Special",
    SECURE = "SecuredContainer",
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
    BAG_STIM_ITEMS = "BagStimItems",

    FOOD_ITEMS = "FoodItems",
    DRINK_ITEMS = "DrinkItems",
    CURRENCY_ITEMS = "CurrencyItems"
}

export class BotLootGen extends BotLootGenerator {

    public genLoot(sessionId: string, botJsonTemplate: IBotType, isPmc: boolean, botRole: string, botInventory: PmcInventory, pmcTier: number): void {

        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
        const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
        const myGetLootCache = new MyLootCache(this.logger, jsonUtil, this.itemHelper, this.databaseServer, pmcLootGenerator, this.localisationService, ragfairPriceService);

        const itemCounts = botJsonTemplate.generation.items;
        const botItemLimits = this.getItemSpawnLimitsForBot(botRole);

        const backpackLootCount = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.backpackLoot.weights));
        const pocketLootCount = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.pocketLoot.weights));
        const vestLootCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.vestLoot.weights);
        const specialLootItemCount = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights));

        const healingItemCountVest = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.healing.weights));
        const healingItemCountPocket = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.healing.weights));
        const healingItemCountBag = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.healing.weights));

        const drugItemCountVest = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.drugs.weights));
        const drugItemCountPocket = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.drugs.weights));
        const drugItemCountBag = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.drugs.weights));

        const stimItemCountVest = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.stims.weights));
        const stimItemCountPocket = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.stims.weights));
        const stimItemCountBag = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.stims.weights));

        const grenadeCountVest = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.grenades.weights));
        const grenadeCountPocket = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.grenades.weights));

        const foodItemCount = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.food.weights));
        const drinkItemCount = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.drink.weights));

        const currencyItemCount = Number(this.weightedRandomHelper.getWeightedValue<number>(itemCounts.currency.weights));

        const containersBotHasAvailable = this.getAvailableContainersBotCanStoreItemsIn(botInventory);
        const currenySlots = [EquipmentSlots.POCKETS];
        const provisionSlotsScav = [EquipmentSlots.POCKETS, EquipmentSlots.BACKPACK];
        const provisionSlots = [EquipmentSlots.BACKPACK];
        const provisionSlotsToUse = botRole === "assault" ? provisionSlotsScav : provisionSlots;
        const containersIdFull = new Set<string>();

        // Forced pmc healing loot
        if (isPmc && this.pmcConfig.forceHealingItemsIntoSecure) {
            this.addForcedMedicalItemsToPmcSecure(botInventory, botRole);
        }

        if (containersBotHasAvailable.includes(EquipmentSlots.BACKPACK)) {
            // Backpack Loot
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BACKPACK, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                backpackLootCount,
                botInventory,
                botRole,
                botItemLimits,
                this.pmcConfig.maxBackpackLootTotalRub,
                isPmc,
                containersIdFull,
            );

            //Bag Meds
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_HEALING_ITEMS, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                healingItemCountBag,
                botInventory,
                botRole,
                botItemLimits,
                0,
                isPmc,
                containersIdFull,
            );

            //Bag Drugs
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_DRUG_ITEMS, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                drugItemCountBag,
                botInventory,
                botRole,
                botItemLimits,
                0,
                isPmc,
                containersIdFull,
            );

            //Bag Stims
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_STIM_ITEMS, botJsonTemplate),
                [EquipmentSlots.BACKPACK],
                stimItemCountBag,
                botInventory,
                botRole,
                botItemLimits,
                0,
                isPmc,
                containersIdFull,
            );

        }
        if (containersBotHasAvailable.includes(EquipmentSlots.TACTICAL_VEST)) {
            //Vest Meds
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_HEALING_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                healingItemCountVest,
                botInventory,
                botRole,
                botItemLimits,
                0,
                isPmc,
                containersIdFull,
            );

            //Vest Drugs
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_DRUG_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                drugItemCountVest,
                botInventory,
                botRole,
                botItemLimits,
                0,
                isPmc,
                containersIdFull,
            );

            //Vest Stims
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_STIM_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                stimItemCountVest,
                botInventory,
                botRole,
                botItemLimits,
                0,
                isPmc,
                containersIdFull,
            );

            // Vest Loot
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                vestLootCount,
                botInventory,
                botRole,
                botItemLimits,
                this.pmcConfig.maxVestLootTotalRub,
                isPmc,
                containersIdFull,
            );

            //Vest Nades
            this.addLootFromPool(
                myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_GRENADE_ITEMS, botJsonTemplate),
                [EquipmentSlots.TACTICAL_VEST],
                grenadeCountVest,
                botInventory,
                botRole,
                botItemLimits,
                0,
                isPmc,
                containersIdFull,
            );
        }
        // Pocket Loot
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            pocketLootCount,
            botInventory,
            botRole,
            botItemLimits,
            this.pmcConfig.maxPocketLootTotalRub,
            isPmc,
            containersIdFull,
        );

        // Grenades
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_GRENADE_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            grenadeCountPocket,
            botInventory,
            botRole,
            botItemLimits,
            0,
            isPmc,
            containersIdFull,
        );

        // Special items
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.SPECIAL, botJsonTemplate),
            [EquipmentSlots.POCKETS, EquipmentSlots.BACKPACK, EquipmentSlots.TACTICAL_VEST],
            specialLootItemCount,
            botInventory,
            botRole,
            botItemLimits,
            undefined,
            undefined,
            containersIdFull,
        );

        //Pocket Meds
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_HEALING_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            healingItemCountPocket,
            botInventory,
            botRole,
            botItemLimits,
            0,
            isPmc,
            containersIdFull,
        );

        //Pocket Drugs
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_DRUG_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            drugItemCountPocket,
            botInventory,
            botRole,
            botItemLimits,
            0,
            isPmc,
            containersIdFull,
        );

        //Pocket Stims
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_STIM_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            stimItemCountPocket,
            botInventory,
            botRole,
            botItemLimits,
            0,
            isPmc,
            containersIdFull,
        );

        // Food
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.FOOD_ITEMS, botJsonTemplate),
            provisionSlotsToUse,
            foodItemCount,
            botInventory,
            botRole,
            null,
            0,
            isPmc,
            containersIdFull,
        );

        // Drink
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.DRINK_ITEMS, botJsonTemplate),
            provisionSlotsToUse,
            drinkItemCount,
            botInventory,
            botRole,
            null,
            0,
            isPmc,
            containersIdFull,
        );

        // Currency
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.CURRENCY_ITEMS, botJsonTemplate),
            currenySlots,
            currencyItemCount,
            botInventory,
            botRole,
            null,
            0,
            isPmc,
            containersIdFull,
        );
    }
}

export class MyLootCache extends BotLootCacheService {

    protected myLootCache: Record<string, MyBotLootCache> = {};

    private myBotRoleExistsInCache(botRole: string): boolean {
        return !!this.myLootCache[botRole];
    }

    private myInitCacheForBotRole(botRole: string): void {
        this.myLootCache[botRole] = {
            specialItems: {},
            secureLoot: {},
            backpackLoot: {},
            pocketLoot: {},
            vestLoot: {},
            combinedPoolLoot: {},
            vestGrenadeItems: {},
            pocketGrenadeItems: {},
            vestHealingItems: {},
            vestDrugItems: {},
            vestStimItems: {},
            pocketHealingItems: {},
            pocketDrugItems: {},
            pocketStimItems: {},
            bagHealingItems: {},
            bagDrugItems: {},
            bagStimItems: {},
            foodItems: {},
            drinkItems: {},
            currencyItems: {}
        };
    }

    public override clearCache(): void {
        this.myLootCache = {};
        this.lootCache = {};
    }


    public getLootCache(botRole: string, isPmc: boolean, lootType: MyLootCacheType, botJsonTemplate: IBotType): Record<string, number> {

        if (!this.myBotRoleExistsInCache(botRole)) {
            this.myInitCacheForBotRole(botRole)
            this.myAddLootToCache(botRole, isPmc, botJsonTemplate);
        }

        let result = undefined;
        switch (lootType) {
            case MyLootCacheType.SECURE:
                result = this.myLootCache[botRole].secureLoot;
                break;
            case MyLootCacheType.SPECIAL:
                result = this.myLootCache[botRole].specialItems;
                break;
            case MyLootCacheType.BACKPACK:
                result = this.myLootCache[botRole].backpackLoot;
                break;
            case MyLootCacheType.POCKET:
                result = this.myLootCache[botRole].pocketLoot;
                break;
            case MyLootCacheType.VEST:
                result = this.myLootCache[botRole].vestLoot;
                break;
            case MyLootCacheType.COMBINED:
                result = this.myLootCache[botRole].combinedPoolLoot;
                break;
            case MyLootCacheType.VEST_GRENADE_ITEMS:
                result = this.myLootCache[botRole].vestGrenadeItems;
                break;
            case MyLootCacheType.POCKET_GRENADE_ITEMS:
                result = this.myLootCache[botRole].pocketGrenadeItems;
                break;
            case MyLootCacheType.VEST_HEALING_ITEMS:
                result = this.myLootCache[botRole].vestHealingItems;
                break;
            case MyLootCacheType.VEST_DRUG_ITEMS:
                result = this.myLootCache[botRole].vestDrugItems;
                break;
            case MyLootCacheType.VEST_STIM_ITEMS:
                result = this.myLootCache[botRole].vestStimItems;
                break;
            case MyLootCacheType.POCKET_HEALING_ITEMS:
                result = this.myLootCache[botRole].pocketHealingItems;
                break;
            case MyLootCacheType.POCKET_DRUG_ITEMS:
                result = this.myLootCache[botRole].pocketDrugItems;
                break;
            case MyLootCacheType.POCKET_STIM_ITEMS:
                result = this.myLootCache[botRole].pocketStimItems;
                break;
            case MyLootCacheType.BAG_HEALING_ITEMS:
                result = this.myLootCache[botRole].bagHealingItems;
                break;
            case MyLootCacheType.BAG_DRUG_ITEMS:
                result = this.myLootCache[botRole].bagDrugItems;
                break;
            case MyLootCacheType.BAG_STIM_ITEMS:
                result = this.myLootCache[botRole].bagStimItems;
                break;
            case MyLootCacheType.FOOD_ITEMS:
                result = this.myLootCache[botRole].foodItems;
                break;
            case MyLootCacheType.DRINK_ITEMS:
                result = this.myLootCache[botRole].drinkItems;
                break;
            case MyLootCacheType.CURRENCY_ITEMS:
                result = this.myLootCache[botRole].currencyItems;
                break;
            default:
                this.logger.error(
                    this.localisationService.getText("bot-loot_type_not_found", {
                        lootType: lootType,
                        botRole: botRole,
                        isPmc: isPmc,
                    }),
                );
                break;
        }
        return this.jsonUtil.clone(result);
    }

    private myAddLootToCache(botRole: string, isPmc: boolean, botJsonTemplate: IBotType): void {
        const lootPool = botJsonTemplate.inventory.items;

        const specialLootPool: Record<string, number> = {};
        const backpackLootPool: Record<string, number> = {};
        const pocketLootPool: Record<string, number> = {};
        const vestLootPool: Record<string, number> = {};
        const secureLootTPool: Record<string, number> = {};
        const combinedLootPool: Record<string, number> = {};

        for (const [slot, pool] of Object.entries(lootPool)) {

            // No items to add, skip
            if (Object.keys(pool).length === 0) {
                continue;
            }

            // Sort loot pool into separate buckets
            switch (slot.toLowerCase()) {
                case "specialloot":
                    this.addItemsToPool(specialLootPool, pool);
                    break;
                case "pockets":
                    this.addItemsToPool(pocketLootPool, pool);
                    break;
                case "tacticalvest":
                    this.addItemsToPool(vestLootPool, pool);
                    break;
                case "securedcontainer":
                    this.addItemsToPool(secureLootTPool, pool);
                    break;
                case "backpack":
                    this.addItemsToPool(backpackLootPool, pool);
                    break;
                default:
                    this.logger.warning(`How did you get here ${slot}`);
            }

            // Add all items (if any) to combined pool (excluding secure)
            if (Object.keys(pool).length > 0 && slot.toLowerCase() !== "securedcontainer") {
                this.addItemsToPool(combinedLootPool, pool);
            }
        }

        // Assign whitelisted special items to bot if any exist
        const specialLootItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.specialItems.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.specialItems.whitelist
                : {};

        if (Object.keys(specialLootItems).length === 0) {
            for (const [tpl, weight] of Object.entries(specialLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (!(this.isBulletOrGrenade(itemTemplate._props) || this.isMagazine(itemTemplate._props))) {
                    specialLootItems[tpl] = weight;
                }
            }
        }
        /////////////////////Meds//////////////////////////////
        ////Healing////
        // Assign whitelisted healing items to bot if any exist
        const vestHealingItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.healing.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.healing.whitelist
                : {};

        // No whitelist, find and assign from combined item pool
        if (Object.keys(vestHealingItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (
                    this.isMedicalItem(itemTemplate._props)
                    && itemTemplate._parent !== BaseClasses.STIMULATOR
                    && itemTemplate._parent !== BaseClasses.DRUGS
                ) {
                    vestHealingItems[tpl] = weight;
                }
            }
        }
        // Assign whitelisted healing items to bot if any exist
        const pocketHealingItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.healing.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.healing.whitelist
                : {};

        // No whitelist, find and assign from combined item pool
        if (Object.keys(pocketHealingItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (
                    this.isMedicalItem(itemTemplate._props)
                    && itemTemplate._parent !== BaseClasses.STIMULATOR
                    && itemTemplate._parent !== BaseClasses.DRUGS
                ) {
                    pocketHealingItems[tpl] = weight;
                }
            }
        }
        // Assign whitelisted healing items to bot if any exist
        const bagHealingItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.healing.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.healing.whitelist
                : {};

        // No whitelist, find and assign from combined item pool
        if (Object.keys(bagHealingItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (
                    this.isMedicalItem(itemTemplate._props)
                    && itemTemplate._parent !== BaseClasses.STIMULATOR
                    && itemTemplate._parent !== BaseClasses.DRUGS
                ) {
                    bagHealingItems[tpl] = weight;
                }
            }
        }
        ////Drugs////
        // Assign whitelisted drugs to bot if any exist
        const vestDrugItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.drugs.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.drugs.whitelist
                : {};

        // no whitelist, find and assign from combined item pool
        if (Object.keys(vestDrugItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isMedicalItem(itemTemplate._props) && itemTemplate._parent === BaseClasses.DRUGS) {
                    vestDrugItems[tpl] = weight;
                }
            }
        }
        // Assign whitelisted drugs to bot if any exist
        const pocketDrugItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.drugs.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.drugs.whitelist
                : {};

        // no whitelist, find and assign from combined item pool
        if (Object.keys(pocketDrugItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isMedicalItem(itemTemplate._props) && itemTemplate._parent === BaseClasses.DRUGS) {
                    pocketDrugItems[tpl] = weight;
                }
            }
        }
        // Assign whitelisted drugs to bot if any exist
        const bagDrugItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.drugs.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.drugs.whitelist
                : {};

        // no whitelist, find and assign from combined item pool
        if (Object.keys(bagDrugItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isMedicalItem(itemTemplate._props) && itemTemplate._parent === BaseClasses.DRUGS) {
                    bagDrugItems[tpl] = weight;
                }
            }
        }
        ////Stims////
        // Assign whitelisted stims to bot if any exist
        const vestStimItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.stims.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.stims.whitelist
                : {};

        // No whitelist, find and assign from combined item pool
        if (Object.keys(vestStimItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isMedicalItem(itemTemplate._props) && itemTemplate._parent === BaseClasses.STIMULATOR) {
                    vestStimItems[tpl] = weight;
                }
            }
        }
        // Assign whitelisted stims to bot if any exist
        const pocketStimItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.stims.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.stims.whitelist
                : {};

        // No whitelist, find and assign from combined item pool
        if (Object.keys(pocketStimItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isMedicalItem(itemTemplate._props) && itemTemplate._parent === BaseClasses.STIMULATOR) {
                    pocketStimItems[tpl] = weight;
                }
            }
        }
        // Assign whitelisted stims to bot if any exist
        const bagStimItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.stims.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.stims.whitelist
                : {};

        // No whitelist, find and assign from combined item pool
        if (Object.keys(bagStimItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isMedicalItem(itemTemplate._props) && itemTemplate._parent === BaseClasses.STIMULATOR) {
                    bagStimItems[tpl] = weight;
                }
            }
        }
        //////////////////Grenades/////////////////
        // Assign whitelisted grenades to bot if any exist
        const vestGrenadeItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.grenades.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.grenades.whitelist
                : {};

        // no whitelist, find and assign from combined item pool
        if (Object.keys(vestGrenadeItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isGrenade(itemTemplate._props)) {
                    vestGrenadeItems[tpl] = weight;
                }
            }
        }
        const pocketGrenadeItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.grenades.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.grenades.whitelist
                : {};

        // no whitelist, find and assign from combined item pool
        if (Object.keys(pocketGrenadeItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.isGrenade(itemTemplate._props)) {
                    pocketGrenadeItems[tpl] = weight;
                }
            }
        }
        // Assign whitelisted food to bot if any exist
        const foodItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.food.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.food.whitelist
                : {};

        // No food whitelist, find and assign from combined item pool
        if (Object.keys(foodItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.itemHelper.isOfBaseclass(itemTemplate._id, BaseClasses.FOOD)) {
                    foodItems[tpl] = weight;
                }
            }
        }

        // Assign whitelisted drink to bot if any exist
        const drinkItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.food.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.food.whitelist
                : {};

        // No drink whitelist, find and assign from combined item pool
        if (Object.keys(drinkItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.itemHelper.isOfBaseclass(itemTemplate._id, BaseClasses.DRINK)) {
                    drinkItems[tpl] = weight;
                }
            }
        }

        // Assign whitelisted currency to bot if any exist
        const currencyItems: Record<string, number> =
            (Object.keys(botJsonTemplate.generation.items.currency.whitelist)?.length > 0)
                ? botJsonTemplate.generation.items.currency.whitelist
                : {};

        // No currency whitelist, find and assign from combined item pool
        if (Object.keys(currencyItems).length === 0) {
            for (const [tpl, weight] of Object.entries(combinedLootPool)) {
                const itemTemplate = this.itemHelper.getItem(tpl)[1];
                if (this.itemHelper.isOfBaseclass(itemTemplate._id, BaseClasses.MONEY)) {
                    currencyItems[tpl] = weight;
                }
            }
        }

        //////////////////Loot/////////////////
        // Get backpack loot (excluding magazines, bullets, grenades and healing items)
        const filteredBackpackItems = {};
        for (const itemKey of Object.keys(backpackLootPool)) {
            const itemResult = this.itemHelper.getItem(itemKey);
            if (!itemResult[0]) {
                continue;
            }
            const itemTemplate = itemResult[1];
            if (
                this.isBulletOrGrenade(itemTemplate._props)
                || this.isMagazine(itemTemplate._props)
                || this.isMedicalItem(itemTemplate._props)
                || this.isGrenade(itemTemplate._props)
            ) {
                // Is type we dont want as backpack loot, skip
                continue;
            }

            filteredBackpackItems[itemKey] = backpackLootPool[itemKey];
        }

        // Get pocket loot (excluding magazines, bullets, grenades, medical and healing items)
        const filteredPocketItems = {};
        for (const itemKey of Object.keys(pocketLootPool)) {
            const itemResult = this.itemHelper.getItem(itemKey);
            if (!itemResult[0]) {
                continue;
            }
            const itemTemplate = itemResult[1];
            if (
                this.isBulletOrGrenade(itemTemplate._props)
                || this.isMagazine(itemTemplate._props)
                || this.isMedicalItem(itemTemplate._props)
                || this.isGrenade(itemTemplate._props)
                || !("Height" in itemTemplate._props) // lacks height
                || !("Width" in itemTemplate._props) // lacks width
            ) {
                continue;
            }

            filteredPocketItems[itemKey] = pocketLootPool[itemKey];
        }

        // Get vest loot (excluding magazines, bullets, grenades, medical and healing items)
        const filteredVestItems = {};
        for (const itemKey of Object.keys(vestLootPool)) {
            const itemResult = this.itemHelper.getItem(itemKey);
            if (!itemResult[0]) {
                continue;
            }
            const itemTemplate = itemResult[1];
            if (
                this.isBulletOrGrenade(itemTemplate._props)
                || this.isMagazine(itemTemplate._props)
                || this.isMedicalItem(itemTemplate._props)
                || this.isGrenade(itemTemplate._props)
            ) {
                continue;
            }

            filteredVestItems[itemKey] = vestLootPool[itemKey];
        }

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
        this.myLootCache[botRole].backpackLoot = filteredBackpackItems;
        this.myLootCache[botRole].pocketLoot = filteredPocketItems;
        this.myLootCache[botRole].vestLoot = filteredVestItems;

        this.myLootCache[botRole].foodItems = foodItems;
        this.myLootCache[botRole].drinkItems = drinkItems;
        this.myLootCache[botRole].currencyItems = currencyItems;
    }
}