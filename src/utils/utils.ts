import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { Arrays } from "./arrays";
import * as path from 'path';
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

const fs = require('fs');
const modConfig = require("../../config/config.json");

export class Utils {

    constructor(private tables: IDatabaseTables, private arrays: Arrays) { }


    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }
    
    public getInt(min: number, max: number): number
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (max > min) ? Math.floor(Math.random() * (max - min + 1) + min) : min;
    }
    
    public getArrayValue<T>(arr: T[]): T
    {
        return arr[this.getInt(0, arr.length - 1)];
    }

    public revertMedItems(playerData: IPmcData) {
        if (playerData?.Inventory !== undefined) {
            for (let i in playerData.Inventory.items) {
                if (playerData.Inventory.items[i]?.upd?.MedKit?.HpResource !== undefined) {
                    let templateItem = this.itemDB()[playerData.Inventory.items[i]._tpl];
                    if(templateItem !== null && templateItem !== undefined){
                        playerData.Inventory.items[i].upd.MedKit.HpResource = templateItem._props.MaxHpResource;
                    }
                }
            }
        }
    }

    public correctItemResources(playerData: IPmcData, playerXP: number, logger: ILogger) {
        if (playerData?.Inventory !== undefined) {
            for (let i in playerData.Inventory.items) {
                let profileItem = playerData.Inventory.items[i];
                if (profileItem?.upd?.Repairable?.Durability !== undefined) {
                    this.correctDuraHelper(profileItem, playerXP);
                }
                if (modConfig.med_changes == true && profileItem?.upd?.MedKit?.HpResource !== undefined) {
                    this.correctMedicalRes(profileItem, playerXP, logger);
                }
                if(modConfig.food_changes == true && profileItem?.upd?.FoodDrink?.HpPercent !== undefined){
                    this.correcProvisionRes(profileItem, playerXP, logger);
                }
            }
        }
    }

    private correcProvisionRes(profileItem: Item, playerXP: number, logger: ILogger) {
        let templateItem = this.itemDB()[profileItem._tpl];
        if(templateItem !== null && templateItem !== undefined){
            if(profileItem.upd.FoodDrink.HpPercent > templateItem._props.MaxResource || playerXP == 0 ){
                profileItem.upd.FoodDrink.HpPercent = templateItem._props.MaxResource;
            }
        }
    }


    private correctMedicalRes(profileItem: Item, playerXP: number, logger: ILogger) {

        let templateItem = this.itemDB()[profileItem._tpl];
        if(templateItem !== null && templateItem !== undefined){
            if(profileItem.upd.MedKit.HpResource > templateItem._props.MaxHpResource || playerXP == 0 ){
                profileItem.upd.MedKit.HpResource = templateItem._props.MaxHpResource;
            }
      
        }
    }

    private correctDuraHelper(profileItem: Item, playerXP: number) {
        for (let j in this.itemDB()) {
            let serverItem = this.itemDB()[j]
            if (profileItem._tpl === serverItem._id && profileItem.upd.Repairable.Durability > serverItem._props.MaxDurability || (playerXP == 0)) {
                profileItem.upd.Repairable.Durability = serverItem._props.Durability;
                profileItem.upd.Repairable.MaxDurability = serverItem._props.MaxDurability;
            }
        }
    }


    public probabilityWeighter(items: any, weights: number[]): any {
        function add(a, b) { return a + b; }
        let totalWeight = weights.reduce(add, 0);
        let weighedElems = [];
        let currentElem = 0;
        while (currentElem < items.length) {
            for (let i = 0; i < weights[currentElem]; i++)
                weighedElems[weighedElems.length] = items[currentElem];
            currentElem++;
        }
        let randomTier = Math.floor(Math.random() * totalWeight);
        return weighedElems[randomTier];
    }

    public pickRandNumInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public pickRandNumOneInTen(): number {
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }

    public saveToJSONFile(data: any, filePath: string) {
        const baseFolderPath = path.resolve(path.join(__dirname, '../../'));
        fs.writeFile(path.join(baseFolderPath, filePath), JSON.stringify(data, null, 4), function (err) {
            if (err) {
                console.log(`Trying to save the config to ${path.join(baseFolderPath, filePath)} failed:`);
                throw err;
            }
        });
    }

    public genId(): string {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < 24; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}


export class ModTracker{
    static batteryModPresent: boolean = false;
    static sainPresent: boolean = false;
    static swagPresent: boolean = false;
    static qtbPresent: boolean = false;
    static alpPresent: boolean = false;
}


export class ProfileTracker{
    static level: number = 1;
}

export class ConfigChecker {
    static dllIsPresent: boolean = false;
}


export class RaidInfoTracker {
    static TOD: string = "";
    static mapType: string = "";
    static mapName: string = "";
}

export class BotTierTracker {
    static scavTier: number = 1;
    static rogueTier: number = 1;
    static raiderTier: number = 1;
    static goonsTier: number = 1;
    static killaTier: number = 1;
    static tagillaTier: number = 1;
    static sanitarTier: number = 1;
    static reshallaTier: number = 1;

    public getTier(botType: string): number {
        if (botType === "assault") {
            return BotTierTracker.scavTier;
        }
        if (botType === "pmcbot") {
            return BotTierTracker.raiderTier;
        }
        if (botType === "exusec") {
            return BotTierTracker.rogueTier;
        }
        if (botType === "bossknight" || botType === "followerbigpipe" || botType === "followerbirdeye") {
            return BotTierTracker.goonsTier;
        }
        if (botType === "bosskilla") {
            return BotTierTracker.killaTier;
        }
        if (botType === "bosstagilla") {
            return BotTierTracker.tagillaTier;
        }
        if (botType === "bosssanitar" || botType === "followersanitar") {
            return BotTierTracker.sanitarTier;
        }
        if (botType === "bossbully" || botType === "followerbully") {
            return BotTierTracker.reshallaTier;
        }
        return 2;
    }
}