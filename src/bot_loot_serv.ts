import { DependencyContainer } from "tsyringe";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Items } from "@spt-aki/models/eft/common/tables/IBotType";
import { BotLootCacheService } from "@spt-aki/services/BotLootCacheService";
import { LootCacheType } from "@spt-aki/models/spt/bots/BotLootCache";



export declare class MyBotLootCache {
    backpackLoot: ITemplateItem[];
    pocketLoot: ITemplateItem[];
    vestLoot: ITemplateItem[];
    combinedPoolLoot: ITemplateItem[];
    specialItems: ITemplateItem[];
    healingItems: ITemplateItem[];
    drugItems: ITemplateItem[];
    stimItems: ITemplateItem[];
    grenadeItems: ITemplateItem[];
}

export declare enum MyLootCacheType {
    Special = "Special",
    Backpack = "Backpack",
    Pocket = "Pocket",
    Vest = "Vest",
    Combined = "Combined",
    HealingItems = "HealingItems",
    DrugItems = "DrugItems",
    StimItems = "StimItems",
    GrenadeItems = "GrenadeItems"
}


export class BotLootServer extends BotLootCacheService {

    private static container: DependencyContainer;




    public getLootCache(botRole: string, isPmc: boolean, lootType: LootCacheType, lootPool: Items): ITemplateItem[] {
        if (!this.botRoleExistsInCache(botRole)) {
            this.initCacheForBotRole(botRole)
            this.myAddLootToCache(botRole, isPmc, lootPool);
        }

        switch (lootType) {
            case LootCacheType.Special:
                return this.lootCache[botRole].specialItems;
            case LootCacheType.Backpack:
                return this.lootCache[botRole].backpackLoot;
            case LootCacheType.Pocket:
                return this.lootCache[botRole].pocketLoot;
            case LootCacheType.Vest:
                return this.lootCache[botRole].vestLoot;
            case LootCacheType.Combined:
                return this.lootCache[botRole].combinedPoolLoot;
            case LootCacheType.HealingItems:
                return this.lootCache[botRole].healingItems;
            case LootCacheType.GrenadeItems:
                return this.lootCache[botRole].grenadeItems;
            case LootCacheType.DrugItems:
                return this.lootCache[botRole].drugItems;
            case LootCacheType.StimItems:
                return this.lootCache[botRole].stimItems;
            default:
                this.logger.error(`loot cache failed for loot: ${lootType} on bot: ${botRole}, was a pmc: ${isPmc}`);
                break;
        }
    }

    public myAddLootToCache(botRole: string, isPmc: boolean, lootPool: Items): void
    {
        // Flatten all individual slot loot pools into one big pool, while filtering out potentially missing templates
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
            switch (slot.toLowerCase())
            {
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

            if (Object.keys(poolItems).length > 0)
            {
                combinedPoolTemplates.push(...poolItems.filter(x => !!x));
            }
        }

        // Sort all items by their worth
        specialLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        backpackLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        pocketLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        vestLootTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));
        combinedPoolTemplates.sort((a, b) => this.compareByValue(this.ragfairPriceService.getFleaPriceForItem(a._id), this.ragfairPriceService.getFleaPriceForItem(b._id)));

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