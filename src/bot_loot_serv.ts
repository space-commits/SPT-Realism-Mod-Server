
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Items } from "@spt-aki/models/eft/common/tables/IBotType";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { LootCacheType } from "@spt-aki/models/spt/bots/BotLootCache";

export class BotLootServer extends BotLootCacheService {

    public getLootCache(botRole: string, isPmc: boolean, lootType: LootCacheType, lootPool: Items): ITemplateItem[] {
         
        if (!this.botRoleExistsInCache(botRole))
        {
            this.initCacheForBotRole(botRole)
            this.myAddLootToCache(botRole, isPmc, lootPool);   
        }

        switch (lootType)
        {
            case LootCacheType.SPECIAL:
                return this.lootCache[botRole].specialItems;
            case LootCacheType.BACKPACK:
                return this.lootCache[botRole].backpackLoot;
            case LootCacheType.POCKET:
                return this.lootCache[botRole].pocketLoot;
            case LootCacheType.VEST:
                return this.lootCache[botRole].vestLoot;
            case LootCacheType.COMBINED:
                return this.lootCache[botRole].combinedPoolLoot;
            case LootCacheType.HEALING_ITEMS:
                return this.lootCache[botRole].healingItems;
            case LootCacheType.GRENADE_ITEMS:
                return this.lootCache[botRole].grenadeItems;
            case LootCacheType.DRUG_ITEMS:
                return this.lootCache[botRole].drugItems;
            case LootCacheType.STIM_ITEMS:
                return this.lootCache[botRole].stimItems;
            default:
                this.logger.error(`loot cache failed for loot: ${lootType} on bot: ${botRole}, was a pmc: ${isPmc}`);
                break;
        }
    }

    private myAddLootToCache(botRole: string, isPmc: boolean, lootPool: Items): void
    {
        const specialLootTemplates: ITemplateItem[] = [];
        const backpackLootTemplates: ITemplateItem[] = [];
        const pocketLootTemplates: ITemplateItem[] = [];
        const vestLootTemplates: ITemplateItem[] = [];
        const combinedPoolTemplates: ITemplateItem[] = [];

        for (const [slot, pool] of Object.entries(lootPool))
        {
            if (!pool || !pool.length)
            {
                continue;
            }

            let poolItems: ITemplateItem[] = [];
            const items = this.databaseServer.getTables().templates.items;
            switch (slot.toLowerCase())
            {
                case "specialloot":
                    poolItems = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(specialLootTemplates, poolItems);
                    break;
                case "pockets":
                    poolItems = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(pocketLootTemplates, poolItems);
                    break;
                case "tacticalvest":
                    poolItems = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(vestLootTemplates, poolItems);
                    break;
                case "securedcontainer":
                    // Don't add these items to loot pool
                    break;
                default:
                    poolItems = pool.map(lootTpl => items[lootTpl]);
                    this.addUniqueItemsToPool(backpackLootTemplates, poolItems);
            }
            
            // Add items to combined pool if any exist
            if (Object.keys(poolItems).length > 0)
            {
                this.addUniqueItemsToPool(combinedPoolTemplates, poolItems);
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

        const healingItems = combinedPoolTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent !== BaseClasses.STIMULATOR
            && template._parent !== BaseClasses.DRUGS);

        const drugItems = combinedPoolTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.DRUGS);

        const stimItems = combinedPoolTemplates.filter(template =>
            this.isMedicalItem(template._props)
            && template._parent === BaseClasses.STIMULATOR);

        const grenadeItems = combinedPoolTemplates.filter(template =>
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