"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLootCache = exports.BotLootGen = exports.MyLootCacheType = exports.MyBotLootCache = void 0;
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const BotLootCacheService_1 = require("C:/snapshot/project/obj/services/BotLootCacheService");
const BotLootGenerator_1 = require("C:/snapshot/project/obj/generators/BotLootGenerator");
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const EquipmentSlots_1 = require("C:/snapshot/project/obj/models/enums/EquipmentSlots");
class MyBotLootCache {
}
exports.MyBotLootCache = MyBotLootCache;
var MyLootCacheType;
(function (MyLootCacheType) {
    MyLootCacheType["SPECIAL"] = "Special";
    MyLootCacheType["BACKPACK"] = "Backpack";
    MyLootCacheType["POCKET"] = "Pocket";
    MyLootCacheType["VEST"] = "Vest";
    MyLootCacheType["COMBINED"] = "Combined";
    MyLootCacheType["GRENADES"] = "Grenades";
    MyLootCacheType["VEST_HEALING_ITEMS"] = "VestHealingItems";
    MyLootCacheType["VEST_DRUG_ITEMS"] = "VestDrugItems";
    MyLootCacheType["VEST_STIM_ITEMS"] = "VestStimItems";
    MyLootCacheType["POCKET_HEALING_ITEMS"] = "PocketHealingItems";
    MyLootCacheType["POCKET_DRUG_ITEMS"] = "PocketDrugItems";
    MyLootCacheType["POCKET_STIM_ITEMS"] = "PocketStimItems";
    MyLootCacheType["BAG_HEALING_ITEMS"] = "BagHealingItems";
    MyLootCacheType["BAG_DRUG_ITEMS"] = "BagDrugItems";
    MyLootCacheType["BAG_STIM_ITEMS"] = "BagStimItems";
})(MyLootCacheType || (exports.MyLootCacheType = MyLootCacheType = {}));
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
class BotLootGen extends BotLootGenerator_1.BotLootGenerator {
    genLoot(sessionId, botJsonTemplate, isPmc, botRole, botInventory, botLevel) {
        const jsonUtil = tsyringe_1.container.resolve("JsonUtil");
        const pmcLootGenerator = tsyringe_1.container.resolve("PMCLootGenerator");
        const ragfairPriceService = tsyringe_1.container.resolve("RagfairPriceService");
        const itemCounts = botJsonTemplate.generation.items;
        const myGetLootCache = new MyLootCache(this.logger, jsonUtil, this.itemHelper, this.databaseServer, pmcLootGenerator, this.localisationService, ragfairPriceService);
        const bagItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.backpackLoot.weights);
        const pocketLootCount = this.weightedRandomHelper.getWeightedValue(itemCounts.pocketLoot.weights);
        const vestLootCount = this.weightedRandomHelper.getWeightedValue(itemCounts.vestLoot.weights);
        const specialLootItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.specialItems.weights);
        const grenadeCount = this.weightedRandomHelper.getWeightedValue(itemCounts.grenades.weights);
        const vestHealingItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.vestLoot.weights);
        const pocketHealingItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.healing.weights);
        const bagHealingItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.pocketLoot.weights);
        const vestDrugItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.vestLoot.weights);
        const pocketDrugItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.drugs.weights);
        const bagDrugItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.pocketLoot.weights);
        const vestStimItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.vestLoot.weights);
        const pocketStimItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.stims.weights);
        const bagStimItemCount = this.weightedRandomHelper.getWeightedValue(itemCounts.pocketLoot.weights);
        const containersBotHasAvailable = this.getAvailableContainersBotCanStoreItemsIn(botInventory);
        // Forced pmc healing loot
        if (isPmc && this.pmcConfig.forceHealingItemsIntoSecure) {
            this.addForcedMedicalItemsToPmcSecure(botInventory, botRole);
        }
        if (containersBotHasAvailable.includes(EquipmentSlots_1.EquipmentSlots.BACKPACK)) {
            if (isPmc && this.randomUtil.getChance100(this.pmcConfig.looseWeaponInBackpackChancePercent)) {
                this.addLooseWeaponsToInventorySlot(sessionId, botInventory, "Backpack", botJsonTemplate.inventory, botJsonTemplate.chances.mods, botRole, isPmc, botLevel);
            }
            // Backpack Loot
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BACKPACK, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.BACKPACK], bagItemCount, botInventory, botRole, true, this.pmcConfig.maxBackpackLootTotalRub, isPmc);
            //Bag Meds
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_HEALING_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.BACKPACK], bagHealingItemCount, botInventory, botRole, false, 0, isPmc);
            //Bag Drugs
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_DRUG_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.BACKPACK], bagDrugItemCount, botInventory, botRole, false, 0, isPmc);
            //Bag Stims
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_STIM_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.BACKPACK], bagStimItemCount, botInventory, botRole, true, 0, isPmc);
        }
        if (containersBotHasAvailable.includes(EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST)) {
            //Vest Meds
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_HEALING_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST], vestHealingItemCount, botInventory, botRole, false, 0, isPmc);
            //Vest Drugs
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_DRUG_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST], vestDrugItemCount, botInventory, botRole, false, 0, isPmc);
            //Vest Stims
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_STIM_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST], vestStimItemCount, botInventory, botRole, true, 0, isPmc);
            // Vest Loot
            this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST], vestLootCount, botInventory, botRole, true, this.pmcConfig.maxVestLootTotalRub, isPmc);
        }
        // Pocket Loot
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.POCKETS], pocketLootCount, botInventory, botRole, true, this.pmcConfig.maxPocketLootTotalRub, isPmc);
        // Grenades
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.GRENADES, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.POCKETS, EquipmentSlots_1.EquipmentSlots.BACKPACK, EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST], grenadeCount, botInventory, botRole, false, 0, isPmc);
        // Special items
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.SPECIAL, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.POCKETS, EquipmentSlots_1.EquipmentSlots.BACKPACK, EquipmentSlots_1.EquipmentSlots.TACTICAL_VEST], specialLootItemCount, botInventory, botRole);
        //Pocket Meds
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_HEALING_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.POCKETS], pocketHealingItemCount, botInventory, botRole, false, 0, isPmc);
        //Pocket Drugs
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_DRUG_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.POCKETS], pocketDrugItemCount, botInventory, botRole, false, 0, isPmc);
        //Pocket Stims
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_STIM_ITEMS, botJsonTemplate), [EquipmentSlots_1.EquipmentSlots.POCKETS], pocketStimItemCount, botInventory, botRole, true, 0, isPmc);
    }
}
exports.BotLootGen = BotLootGen;
class MyLootCache extends BotLootCacheService_1.BotLootCacheService {
    myBotRoleExistsInCache(botRole) {
        return !!this.myLootCache[botRole];
    }
    myInitCacheForBotRole(botRole) {
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
    clearCache() {
        this.myLootCache = {};
    }
    getLootCache(botRole, isPmc, lootType, botJsonTemplate) {
        if (!this.myBotRoleExistsInCache(botRole)) {
            this.myInitCacheForBotRole(botRole);
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
    myAddLootToCache(botRole, isPmc, botJsonTemplate) {
        const specialLootTemplates = [];
        const backpackLootTemplates = [];
        const pocketLootTemplates = [];
        const vestLootTemplates = [];
        const combinedPoolTemplates = [];
        const lootPool = botJsonTemplate.inventory.items;
        for (const [slot, pool] of Object.entries(lootPool)) {
            if (!pool?.length) {
                continue;
            }
            // Sort loot pool into separate buckets
            let itemsToAdd = [];
            const items = this.databaseServer.getTables().templates.items;
            switch (slot.toLowerCase()) {
                case "specialloot":
                    itemsToAdd = pool.map((lootTpl) => items[lootTpl]);
                    this.addUniqueItemsToPool(specialLootTemplates, itemsToAdd);
                    break;
                case "pockets":
                    itemsToAdd = pool.map((lootTpl) => items[lootTpl]);
                    this.addUniqueItemsToPool(pocketLootTemplates, itemsToAdd);
                    break;
                case "tacticalvest":
                    itemsToAdd = pool.map((lootTpl) => items[lootTpl]);
                    this.addUniqueItemsToPool(vestLootTemplates, itemsToAdd);
                    break;
                case "securedcontainer":
                    // Don't add these items to loot pool
                    break;
                default:
                    itemsToAdd = pool.map((lootTpl) => items[lootTpl]);
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
        const specialLootItems = specialLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props));
        /////////////////////Meds//////////////////////////////
        //vest
        const vestHealingItems = vestLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.MEDKIT
            || template._parent === BaseClasses_1.BaseClasses.MEDICAL);
        const vestDrugItems = vestLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.DRUGS);
        const vestStimItems = vestLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.STIMULATOR);
        //pocket
        const pocketHealingItems = pocketLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.MEDKIT
            || template._parent === BaseClasses_1.BaseClasses.MEDICAL);
        const pocketDrugItems = pocketLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.DRUGS);
        const pocketStimItems = pocketLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.STIMULATOR);
        //bag
        const bagHealingItems = backpackLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.MEDKIT
            || template._parent === BaseClasses_1.BaseClasses.MEDICAL);
        const bagDrugItems = backpackLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.DRUGS);
        const bagStimItems = backpackLootTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.STIMULATOR);
        ///////////////////////////////////////////////////////
        const grenadeItems = vestLootTemplates.filter(template => this.isGrenade(template._props));
        // Get loot items (excluding magazines, bullets, grenades and healing items)
        const backpackLootItems = backpackLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props));
        // Get pocket loot
        const pocketLootItems = pocketLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
            && !this.isMagazine(template._props)
            && !this.isMedicalItem(template._props)
            && !this.isGrenade(template._props)
            && ("Height" in template._props)
            && ("Width" in template._props));
        // Get vest loot items
        const vestLootItems = vestLootTemplates.filter(template => !this.isBulletOrGrenade(template._props)
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
exports.MyLootCache = MyLootCache;
