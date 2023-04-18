
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Chances, IBotType, Inventory, ItemMinMax, Items } from "@spt-aki/models/eft/common/tables/IBotType";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { BotLootGenerator } from "@spt-aki/generators/BotLootGenerator";
import { Inventory as PmcInventory } from "@spt-aki/models/eft/common/tables/IBotBase";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { PMCLootGenerator } from "@spt-aki/generators/PMCLootGenerator";
import { RagfairPriceService } from "@spt-aki/services/RagfairPriceService";
import { container, inject } from "tsyringe";

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
    BAG_STIM_ITEMS = "BagStimItems",
}

export const enum EquipmentSlots {
    HEADWEAR = "Headwear",
    EARPIECE = "Earpiece",
    FACE_COVER = "FaceCover",
    ARMOR_VEST = "ArmorVest",
    EYEWEAR = "Eyewear",
    ARM_BAND = "ArmBand",
    TACTICAL_VEST = "TacticalVest",
    POCKETS = "Pockets",
    BACKPACK = "Backpack",
    SECURED_CONTAINER = "SecuredContainer",
    FIRST_PRIMARY_WEAPON = "FirstPrimaryWeapon",
    SECOND_PRIMARY_WEAPON = "SecondPrimaryWeapon",
    HOLSTER = "Holster",
    SCABBARD = "Scabbard"
}

export class BotLooGen extends BotLootGenerator {


    public genLoot(sessionId: string, botJsonTemplate: IBotType, isPmc: boolean, botRole: string, botInventory: PmcInventory, botLevel: number): void {

        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const pmcLootGenerator = container.resolve<PMCLootGenerator>("PMCLootGenerator");
        const ragfairPriceService = container.resolve<RagfairPriceService>("RagfairPriceService");
        const itemCounts = botJsonTemplate.generation.items;

        const myGetLootCache = new MyLootCache(this.logger, jsonUtil, this.itemHelper, this.databaseServer, pmcLootGenerator, this.localisationService, ragfairPriceService);

        const nValue = this.getBotLootNValue(isPmc);
        const looseLootMin = itemCounts.looseLoot.min;
        const looseLootMax = itemCounts.looseLoot.max;

        var healingTally = 0;
        var stimTally = 0;
        var drugTally = 0;
        var lootTally = 0;
        var grenadeTally = 0;

        const bagLootItemCount = this.getRandomisedCount(looseLootMin, looseLootMax, nValue);
        lootTally += bagLootItemCount;
        const pocketLootCount = lootTally >= looseLootMax ? 0 : this.getRandomisedCount(1, 4, nValue);
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

        const bagHealingItemCount = healingTally >= itemCounts.healing.max ? 0 : this.getRandomisedCount(0, 1, 3);
        healingTally += bagHealingItemCount;
        const bagDrugItemCount = drugTally >= itemCounts.drugs.max ? 0 : this.getRandomisedCount(0, 1, 3);
        drugTally += bagDrugItemCount;
        const bagStimItemCount = stimTally >= itemCounts.stims.max ? 0 : this.getRandomisedCount(0, 1, 3);
        stimTally += bagStimItemCount;

        const vestGrenadeCount = this.getRandomisedCount(itemCounts.grenades.min, itemCounts.grenades.max, 4);
        grenadeTally += vestGrenadeCount;
        const porcketGrenadeCount = grenadeTally >= itemCounts.grenades.max ? 0 : this.getRandomisedCount(itemCounts.grenades.min, itemCounts.grenades.max, 4);
        grenadeTally += porcketGrenadeCount;

        // Special items
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.SPECIAL, botJsonTemplate),
            [EquipmentSlots.POCKETS, EquipmentSlots.BACKPACK, EquipmentSlots.TACTICAL_VEST],
            specialLootItemCount,
            botInventory,
            botRole);

        ///////////////////////////////////////Meds//////////////////////////////////
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


        /////////////////////////////////////////////////////////////////////////////////
        // Grenades
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_GRENADE_ITEMS, botJsonTemplate),
            [EquipmentSlots.TACTICAL_VEST],
            vestGrenadeCount,
            botInventory,
            botRole,
            false,
            0,
            isPmc);

        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_GRENADE_ITEMS, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            porcketGrenadeCount,
            botInventory,
            botRole,
            false,
            0,
            isPmc);


        if (isPmc && this.randomUtil.getChance100(this.botConfig.pmc.looseWeaponInBackpackChancePercent)) {
            this.addLooseWeaponsToInventorySlot(sessionId, botInventory, "Backpack", botJsonTemplate.inventory, botJsonTemplate.chances.mods, botRole, isPmc, botLevel);
        }

        // Backpack
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BACKPACK, botJsonTemplate),
            [EquipmentSlots.BACKPACK],
            bagLootItemCount,
            botInventory,
            botRole,
            true,
            this.botConfig.pmc.maxBackpackLootTotalRub,
            isPmc);

        // Vest
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST, botJsonTemplate),
            [EquipmentSlots.TACTICAL_VEST],
            vestLootCount,
            botInventory,
            botRole,
            true,
            this.botConfig.pmc.maxVestLootTotalRub,
            isPmc);

        // Pockets
        this.addLootFromPool(
            myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET, botJsonTemplate),
            [EquipmentSlots.POCKETS],
            pocketLootCount,
            botInventory,
            botRole,
            true,
            this.botConfig.pmc.maxPocketLootTotalRub,
            isPmc);
    }


}

export class MyLootCache extends BotLootCacheService {


    private myLootCache: Record<string, MyBotLootCache>;

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
            if (!pool || !pool.length) {
                continue;
            }

            let itemsToAdd: ITemplateItem[] = [];
            const items = this.databaseServer.getTables().templates.items;
            switch (slot.toLowerCase()) {
                case "specialloot":
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(specialLootTemplates, itemsToAdd);
                    break;
                case "pockets":
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(pocketLootTemplates, itemsToAdd);
                    break;
                case "tacticalvest":
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(vestLootTemplates, itemsToAdd);
                    break;
                case "securedcontainer":
                    // Don't add these items to loot pool
                    break;
                default:
                    itemsToAdd = pool.map(lootTpl => items[lootTpl]);
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
            && template._parent === BaseClasses.MEDKIT);

        const vestDrugItems = vestLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.DRUGS);

        const vestStimItems = vestLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.STIMULATOR);

        //pocket
        const pocketHealingItems = pocketLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.MEDKIT);

        const pocketDrugItems = pocketLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.DRUGS);

        const pocketStimItems = pocketLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.STIMULATOR);

        //bag
        const bagHealingItems = backpackLootTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.MEDKIT);

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