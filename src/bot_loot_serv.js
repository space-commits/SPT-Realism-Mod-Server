"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotLootServer = void 0;
const BaseClasses_1 = require("../../../../Aki_data/Server/lib/models/enums/BaseClasses");
const BotLootCacheService_1 = require("../../../../Aki_data/Server/lib/services/BotLootCacheService");
const BotLootCache_1 = require("../../../../Aki_data/Server/lib/models/spt/bots/BotLootCache");
class BotLootServer extends BotLootCacheService_1.BotLootCacheService {
    getLootCache(botRole, isPmc, lootType, lootPool) {
        if (!this.botRoleExistsInCache(botRole)) {
            this.initCacheForBotRole(botRole);
            this.myAddLootToCache(botRole, isPmc, lootPool);
        }
        switch (lootType) {
            case BotLootCache_1.LootCacheType.Special:
                return this.lootCache[botRole].specialItems;
            case BotLootCache_1.LootCacheType.Backpack:
                return this.lootCache[botRole].backpackLoot;
            case BotLootCache_1.LootCacheType.Pocket:
                return this.lootCache[botRole].pocketLoot;
            case BotLootCache_1.LootCacheType.Vest:
                return this.lootCache[botRole].vestLoot;
            case BotLootCache_1.LootCacheType.Combined:
                return this.lootCache[botRole].combinedPoolLoot;
            case BotLootCache_1.LootCacheType.HealingItems:
                return this.lootCache[botRole].healingItems;
            case BotLootCache_1.LootCacheType.GrenadeItems:
                return this.lootCache[botRole].grenadeItems;
            case BotLootCache_1.LootCacheType.DrugItems:
                return this.lootCache[botRole].drugItems;
            case BotLootCache_1.LootCacheType.StimItems:
                return this.lootCache[botRole].stimItems;
            default:
                this.logger.error(`loot cache failed for loot: ${lootType} on bot: ${botRole}, was a pmc: ${isPmc}`);
                break;
        }
    }
    myAddLootToCache(botRole, isPmc, lootPool) {
        // Flatten all individual slot loot pools into one big pool, while filtering out potentially missing templates
        const specialLootTemplates = [];
        const backpackLootTemplates = [];
        const pocketLootTemplates = [];
        const vestLootTemplates = [];
        const combinedPoolTemplates = [];
        for (const [slot, pool] of Object.entries(lootPool)) {
            if (!pool || !pool.length) {
                continue;
            }
            let poolItems = [];
            switch (slot.toLowerCase()) {
                case "specialloot":
                    poolItems = pool.map(lootTpl => this.databaseServer.getTables().templates.items[lootTpl]);
                    specialLootTemplates.push(...poolItems.filter(x => !!x));
                    break;
                case "pockets":
                    poolItems = pool.map(lootTpl => this.databaseServer.getTables().templates.items[lootTpl]);
                    pocketLootTemplates.push(...poolItems.filter(x => !!x));
                    break;
                case "tacticalvest":
                    poolItems = pool.map(lootTpl => this.databaseServer.getTables().templates.items[lootTpl]);
                    vestLootTemplates.push(...poolItems.filter(x => !!x));
                    break;
                case "securedcontainer":
                    // Don't add these items to loot pool
                    break;
                default:
                    poolItems = pool.map(lootTpl => this.databaseServer.getTables().templates.items[lootTpl]);
                    backpackLootTemplates.push(...poolItems.filter(x => !!x));
            }
            if (Object.keys(poolItems).length > 0) {
                combinedPoolTemplates.push(...poolItems.filter(x => !!x));
            }
        }
        // Sort all items by their worth
        specialLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        backpackLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        pocketLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        vestLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        combinedPoolTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
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
