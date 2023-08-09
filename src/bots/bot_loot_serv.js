"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLootCache = exports.BotLooGen = exports.EquipmentSlots = exports.MyLootCacheType = exports.MyBotLootCache = void 0;
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const BotLootCacheService_1 = require("C:/snapshot/project/obj/services/BotLootCacheService");
const BotLootGenerator_1 = require("C:/snapshot/project/obj/generators/BotLootGenerator");
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
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
    MyLootCacheType["VEST_GRENADE_ITEMS"] = "VestGrenadeItems";
    MyLootCacheType["POCKET_GRENADE_ITEMS"] = "PocketGrenadeItems";
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
var EquipmentSlots;
(function (EquipmentSlots) {
    EquipmentSlots["HEADWEAR"] = "Headwear";
    EquipmentSlots["EARPIECE"] = "Earpiece";
    EquipmentSlots["FACE_COVER"] = "FaceCover";
    EquipmentSlots["ARMOR_VEST"] = "ArmorVest";
    EquipmentSlots["EYEWEAR"] = "Eyewear";
    EquipmentSlots["ARM_BAND"] = "ArmBand";
    EquipmentSlots["TACTICAL_VEST"] = "TacticalVest";
    EquipmentSlots["POCKETS"] = "Pockets";
    EquipmentSlots["BACKPACK"] = "Backpack";
    EquipmentSlots["SECURED_CONTAINER"] = "SecuredContainer";
    EquipmentSlots["FIRST_PRIMARY_WEAPON"] = "FirstPrimaryWeapon";
    EquipmentSlots["SECOND_PRIMARY_WEAPON"] = "SecondPrimaryWeapon";
    EquipmentSlots["HOLSTER"] = "Holster";
    EquipmentSlots["SCABBARD"] = "Scabbard";
})(EquipmentSlots || (exports.EquipmentSlots = EquipmentSlots = {}));
class BotLooGen extends BotLootGenerator_1.BotLootGenerator {
    genLoot(sessionId, botJsonTemplate, isPmc, botRole, botInventory, botLevel) {
        const jsonUtil = tsyringe_1.container.resolve("JsonUtil");
        const pmcLootGenerator = tsyringe_1.container.resolve("PMCLootGenerator");
        const ragfairPriceService = tsyringe_1.container.resolve("RagfairPriceService");
        const itemCounts = botJsonTemplate.generation.items;
        const myGetLootCache = new MyLootCache(this.logger, jsonUtil, this.itemHelper, this.databaseServer, pmcLootGenerator, this.localisationService, ragfairPriceService);
        const nValue = this.getBotLootNValueByRole(botRole);
        const looseLootMin = itemCounts.looseLoot.min;
        const looseLootMax = itemCounts.looseLoot.max;
        var healingTally = 0;
        var stimTally = 0;
        var drugTally = 0;
        var lootTally = 0;
        var grenadeTally = 0;
        const bagLootItemCount = this.getRandomisedCount(looseLootMin, looseLootMax, nValue);
        lootTally += bagLootItemCount;
        const pocketLootCount = lootTally >= looseLootMax ? 0 : this.getRandomisedCount(looseLootMin, looseLootMax, nValue);
        lootTally += pocketLootCount;
        const vestLootCount = lootTally >= looseLootMax ? 0 : this.getRandomisedCount(Math.round(looseLootMin / 2), Math.round(looseLootMax / 2), nValue); // Count is half what loose loot min/max is
        lootTally += vestLootCount;
        const specialLootItemCount = this.getRandomisedCount(itemCounts.specialItems.min, itemCounts.specialItems.max, nValue);
        const vestHealingItemCount = this.getRandomisedCount(itemCounts.healing.min, itemCounts.healing.max, 3);
        healingTally += vestHealingItemCount;
        const vestDrugItemCount = this.getRandomisedCount(itemCounts.drugs.min, itemCounts.drugs.max, 3);
        drugTally += vestDrugItemCount;
        const vestStimItemCount = this.getRandomisedCount(itemCounts.stims.min, itemCounts.stims.max, 3);
        stimTally += vestStimItemCount;
        const pocketHealingItemCount = healingTally >= itemCounts.healing.max ? 0 : this.getRandomisedCount(Math.max(0, Math.round(itemCounts.healing.min / 2)), Math.max(1, Math.round(itemCounts.healing.max / 2)), 3);
        healingTally += pocketHealingItemCount;
        const pocketDrugItemCount = drugTally >= itemCounts.drugs.max ? 0 : this.getRandomisedCount(Math.max(0, Math.round(itemCounts.drugs.min / 2)), Math.max(1, Math.round(itemCounts.drugs.max / 2)), 3);
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
        // Special items
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.SPECIAL, botJsonTemplate), [EquipmentSlots.POCKETS, EquipmentSlots.BACKPACK, EquipmentSlots.TACTICAL_VEST], specialLootItemCount, botInventory, botRole);
        ///////////////////////////////////////Meds//////////////////////////////////
        //Vest Meds
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_HEALING_ITEMS, botJsonTemplate), [EquipmentSlots.TACTICAL_VEST], vestHealingItemCount, botInventory, botRole, false, 0, isPmc);
        //Vest Drugs
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_DRUG_ITEMS, botJsonTemplate), [EquipmentSlots.TACTICAL_VEST], vestDrugItemCount, botInventory, botRole, false, 0, isPmc);
        //Vest Stims
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_STIM_ITEMS, botJsonTemplate), [EquipmentSlots.TACTICAL_VEST], vestStimItemCount, botInventory, botRole, true, 0, isPmc);
        //Pocket Meds
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_HEALING_ITEMS, botJsonTemplate), [EquipmentSlots.POCKETS], pocketHealingItemCount, botInventory, botRole, false, 0, isPmc);
        //Pocket Drugs
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_DRUG_ITEMS, botJsonTemplate), [EquipmentSlots.POCKETS], pocketDrugItemCount, botInventory, botRole, false, 0, isPmc);
        //Pocket Stims
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_STIM_ITEMS, botJsonTemplate), [EquipmentSlots.POCKETS], pocketStimItemCount, botInventory, botRole, true, 0, isPmc);
        //Bag Meds
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_HEALING_ITEMS, botJsonTemplate), [EquipmentSlots.BACKPACK], bagHealingItemCount, botInventory, botRole, false, 0, isPmc);
        //Bag Drugs
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_DRUG_ITEMS, botJsonTemplate), [EquipmentSlots.BACKPACK], bagDrugItemCount, botInventory, botRole, false, 0, isPmc);
        //Bag Stims
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BAG_STIM_ITEMS, botJsonTemplate), [EquipmentSlots.BACKPACK], bagStimItemCount, botInventory, botRole, true, 0, isPmc);
        /////////////////////////////////////////////////////////////////////////////////
        // Grenades
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST_GRENADE_ITEMS, botJsonTemplate), [EquipmentSlots.TACTICAL_VEST], vestGrenadeCount, botInventory, botRole, false, 0, isPmc);
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET_GRENADE_ITEMS, botJsonTemplate), [EquipmentSlots.POCKETS], pocketGrenadeCount, botInventory, botRole, false, 0, isPmc);
        if (isPmc && this.randomUtil.getChance100(this.botConfig.pmc.looseWeaponInBackpackChancePercent)) {
            this.addLooseWeaponsToInventorySlot(sessionId, botInventory, "Backpack", botJsonTemplate.inventory, botJsonTemplate.chances.mods, botRole, isPmc, botLevel);
        }
        // Backpack
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.BACKPACK, botJsonTemplate), [EquipmentSlots.BACKPACK], bagLootItemCount, botInventory, botRole, true, this.botConfig.pmc.maxBackpackLootTotalRub, isPmc);
        // Vest
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.VEST, botJsonTemplate), [EquipmentSlots.TACTICAL_VEST], vestLootCount, botInventory, botRole, true, this.botConfig.pmc.maxVestLootTotalRub, isPmc);
        // Pockets
        this.addLootFromPool(myGetLootCache.getLootCache(botRole, isPmc, MyLootCacheType.POCKET, botJsonTemplate), [EquipmentSlots.POCKETS], pocketLootCount, botInventory, botRole, true, this.botConfig.pmc.maxPocketLootTotalRub, isPmc);
    }
}
exports.BotLooGen = BotLooGen;
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
    myAddLootToCache(botRole, isPmc, botJsonTemplate) {
        const specialLootTemplates = [];
        const backpackLootTemplates = [];
        const pocketLootTemplates = [];
        const vestLootTemplates = [];
        const combinedPoolTemplates = [];
        const lootPool = botJsonTemplate.inventory.items;
        for (const [slot, pool] of Object.entries(lootPool)) {
            if (!pool || !pool.length) {
                continue;
            }
            let itemsToAdd = [];
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
        const vestGrenadeItems = vestLootTemplates.filter(template => this.isGrenade(template._props));
        const pocketGrenadeItems = pocketLootTemplates.filter(template => this.isGrenade(template._props));
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
        this.myLootCache[botRole].vestGrenadeItems = vestGrenadeItems;
        this.myLootCache[botRole].pocketGrenadeItems = pocketGrenadeItems;
        this.myLootCache[botRole].specialItems = specialLootItems;
        this.myLootCache[botRole].backpackLoot = backpackLootItems;
        this.myLootCache[botRole].pocketLoot = pocketLootItems;
        this.myLootCache[botRole].vestLoot = vestLootItems;
    }
}
exports.MyLootCache = MyLootCache;
