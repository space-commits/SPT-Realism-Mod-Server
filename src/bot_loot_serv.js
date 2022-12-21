"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotLootServer = void 0;
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const BotLootCacheService_1 = require("C:/snapshot/project/obj/services/BotLootCacheService");
const BotLootCache_1 = require("C:/snapshot/project/obj/models/spt/bots/BotLootCache");
class BotLootServer extends BotLootCacheService_1.BotLootCacheService {
    getLootCache(botRole, isPmc, lootType, lootPool) {
        if (!this.botRoleExistsInCache(botRole)) {
            this.initCacheForBotRole(botRole);
            this.myAddLootToCache(botRole, isPmc, lootPool);
        }
        switch (lootType) {
            case BotLootCache_1.LootCacheType.SPECIAL:
                return this.lootCache[botRole].specialItems;
            case BotLootCache_1.LootCacheType.BACKPACK:
                return this.lootCache[botRole].backpackLoot;
            case BotLootCache_1.LootCacheType.POCKET:
                return this.lootCache[botRole].pocketLoot;
            case BotLootCache_1.LootCacheType.VEST:
                return this.lootCache[botRole].vestLoot;
            case BotLootCache_1.LootCacheType.COMBINED:
                return this.lootCache[botRole].combinedPoolLoot;
            case BotLootCache_1.LootCacheType.HEALING_ITEMS:
                return this.lootCache[botRole].healingItems;
            case BotLootCache_1.LootCacheType.GRENADE_ITEMS:
                return this.lootCache[botRole].grenadeItems;
            case BotLootCache_1.LootCacheType.DRUG_ITEMS:
                return this.lootCache[botRole].drugItems;
            case BotLootCache_1.LootCacheType.STIM_ITEMS:
                return this.lootCache[botRole].stimItems;
            default:
                this.logger.error(this.localisationService.getText("bot-loot_type_not_found", { lootType: lootType, botRole: botRole, isPmc: isPmc }));
                break;
        }
    }
    myAddLootToCache(botRole, isPmc, lootPool) {
        const specialLootTemplates = [];
        const backpackLootTemplates = [];
        const pocketLootTemplates = [];
        const vestLootTemplates = [];
        const combinedPoolTemplates = [];
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
        const healingItems = combinedPoolTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent !== BaseClasses_1.BaseClasses.STIMULATOR
            && template._parent !== BaseClasses_1.BaseClasses.DRUGS);
        const drugItems = combinedPoolTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.DRUGS);
        const stimItems = combinedPoolTemplates.filter(template => this.isMedicalItem(template._props)
            && template._parent === BaseClasses_1.BaseClasses.STIMULATOR);
        const grenadeItems = combinedPoolTemplates.filter(template => this.isGrenade(template._props));
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
        this.lootCache[botRole].healingItems = healingItems;
        this.lootCache[botRole].drugItems = drugItems;
        this.lootCache[botRole].stimItems = stimItems;
        this.lootCache[botRole].grenadeItems = grenadeItems;
        this.lootCache[botRole].specialItems = specialLootItems;
        this.lootCache[botRole].backpackLoot = backpackLootItems;
        this.lootCache[botRole].pocketLoot = pocketLootItems;
        this.lootCache[botRole].vestLoot = vestLootItems;
    }
}
exports.BotLootServer = BotLootServer;
