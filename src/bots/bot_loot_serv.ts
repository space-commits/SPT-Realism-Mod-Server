
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

export class MyBotLootCache {
    specialItems: ITemplateItem[]
    backpackLoot: ITemplateItem[]
    pocketLoot: ITemplateItem[]
    vestLoot: ITemplateItem[]
    combinedPoolLoot: ITemplateItem[]

    grenadeItems: ITemplateItem[]

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

    GRENADES = "Grenades",

    VEST_HEALING_ITEMS = "VestHealingItems",
    VEST_DRUG_ITEMS = "VestDrugItems",
    VEST_STIM_ITEMS = "VestStimItems",

    POCKET_HEALING_ITEMS = "PocketHealingItems",
    POCKET_DRUG_ITEMS = "PocketDrugItems",
    POCKET_STIM_ITEMS = "PocketStimItems",

    BAG_HEALING_ITEMS = "BagHealingItems",
    BAG_DRUG_ITEMS = "BagDrugItems",
    BAG_STIM_ITEMS = "BagStimItems",
}

// export const enum EquipmentSlots {
//     HEADWEAR = "Headwear",
//     EARPIECE = "Earpiece",
//     FACE_COVER = "FaceCover",
//     ARMOR_VEST = "ArmorVest",
//     EYEWEAR = "Eyewear",
//     ARM_BAND = "ArmBand",
//     TACTICAL_VEST = "TacticalVest",
//     POCKETS = "Pockets",
//     BACKPACK = "Backpack",
//     SECURED_CONTAINER = "SecuredContainer",
//     FIRST_PRIMARY_WEAPON = "FirstPrimaryWeapon",
//     SECOND_PRIMARY_WEAPON = "SecondPrimaryWeapon",
//     HOLSTER = "Holster",
//     SCABBARD = "Scabbard"
// }

export class BotLootGen extends BotLootGenerator {

    public genLoot(sessionId: string, botJsonTemplate: IBotType, isPmc: boolean, botRole: string, botInventory: PmcInventory, botLevel: number): void {

        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
        const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
        const itemCounts = botJsonTemplate.generation.items;

        const myGetLootCache = new MyLootCache(this.logger, jsonUtil, this.itemHelper, this.databaseServer, pmcLootGenerator, this.localisationService, ragfairPriceService);

        const bagItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.backpackLoot.weights);
        const pocketLootCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.pocketLoot.weights);
        const vestLootCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.vestLoot.weights);
        const specialLootItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
        const grenadeCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.grenades.weights);

        var vestHealingItemCount = 1;
        var pocketHealingItemCount = 1;
        var bagHealingItemCount = 1;

        var vestDrugItemCount = 1;
        var pocketDrugItemCount = 1;
        var bagDrugItemCount = 1;

        var vestStimItemCount = 1;
        var pocketStimItemCount = 1;
        var bagStimItemCount = 1;

        if (botRole.toLocaleLowerCase() === "assault" || botRole.toLocaleLowerCase() === "marskman") {
            vestHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
            pocketHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.healing.weights);
            bagHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);

            vestDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
            pocketDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.drugs.weights);
            bagDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);

            vestStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
            pocketStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.stims.weights);
            bagStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
        }
        else if (botRole.toLocaleLowerCase() === "sptbear" || botRole.toLocaleLowerCase() === "sptusec") {
            vestHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.vestLoot.weights);
            pocketHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.healing.weights);
            bagHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.pocketLoot.weights);

            vestDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
            pocketDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.drugs.weights);
            bagDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);

            vestStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
            pocketStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.stims.weights);
            bagStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.specialItems.weights);
        }
        else {
            vestHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.vestLoot.weights);
            pocketHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.healing.weights);
            bagHealingItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.pocketLoot.weights);

            vestDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.vestLoot.weights);
            pocketDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.drugs.weights);
            bagDrugItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.pocketLoot.weights);

            vestStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.vestLoot.weights);
            pocketStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.stims.weights);
            bagStimItemCount = this.weightedRandomHelper.getWeightedValue<number>(itemCounts.pocketLoot.weights);
        }

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
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.GRENADES, botJsonTemplate),
            [EquipmentSlots.POCKETS, EquipmentSlots.BACKPACK, EquipmentSlots.TACTICAL_VEST],
            grenadeCount,
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

            grenadeItems: [],

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
            case MyLootCacheType.GRENADES:
                return this.myLootCache[botRole].grenadeItems;
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

        const grenadeItems = vestLootTemplates.filter(template =>
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

        this.myLootCache[botRole].grenadeItems = grenadeItems;

        this.myLootCache[botRole].specialItems = specialLootItems;
        this.myLootCache[botRole].backpackLoot = backpackLootItems;
        this.myLootCache[botRole].pocketLoot = pocketLootItems;
        this.myLootCache[botRole].vestLoot = vestLootItems;
    }
}