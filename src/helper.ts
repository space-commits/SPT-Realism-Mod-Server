import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ISearchRequestData } from "@spt-aki/models/eft/ragfair/ISearchRequestData";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { Arrays } from "./arrays";
import { ParentClasses } from "./enums";

const fs = require('fs');
const modConfig = require("../config/config.json");

export class Helper {

    constructor(private tables: IDatabaseTables, private arrays: Arrays) { }


    private itemDB = this.tables.templates.items;
    private medItems = this.arrays.stashMeds;

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
                    for (let j in this.medItems) {
                        if (playerData.Inventory.items[i]._tpl === this.medItems[j]) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }

    public correctItemResources(playerData: IPmcData, pmcEXP: number) {
        if (playerData?.Inventory !== undefined) {
            for (let i in playerData.Inventory.items) {
                let profileItem = playerData.Inventory.items[i];
                if (profileItem?.upd?.Repairable?.Durability !== undefined) {
                    this.correctDuraHelper(profileItem, pmcEXP);
                }
                if (modConfig.med_changes == true && profileItem?.upd?.MedKit?.HpResource !== undefined) {
                    this.correctMedicalRes(profileItem, pmcEXP);
                }
            }
        }
    }

    private correctMedicalRes(profileItem: Item, pmcEXP: number) {
        for (let j in this.medItems) {

            if (profileItem._tpl === this.medItems[j]) {
                if ((profileItem.upd.MedKit.HpResource > this.itemDB[this.medItems[j]]._props.MaxHpResource) || (pmcEXP == 0 && profileItem._tpl === this.medItems[j])) {
                    profileItem.upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                }
            }
        }
    }

    private correctDuraHelper(profileItem: Item,  pmcEXP: number) {
        for (let j in this.itemDB) {
            let serverItem = this.itemDB[j]
            if (profileItem._tpl === serverItem._id && profileItem.upd.Repairable.Durability > serverItem._props.MaxDurability || (pmcEXP == 0 && profileItem._tpl === this.medItems[j])) {
                profileItem.upd.Repairable.Durability = serverItem._props.Durability;
                profileItem.upd.Repairable.MaxDurability = serverItem._props.MaxDurability;
            }
        }
    }




    public probabilityWeighter(items: any, weights: number[]) {

        function add(a, b) { return a + b; }

        var botTiers = items;
        var totalWeight = weights.reduce(add, 0);

        var weighedElems = [];
        var currentElem = 0;

        while (currentElem < botTiers.length) {
            for (let i = 0; i < weights[currentElem]; i++)
                weighedElems[weighedElems.length] = botTiers[currentElem];
            currentElem++;
        }

        var randomTier = Math.floor(Math.random() * totalWeight);
        return weighedElems[randomTier];

    }

    public removeCustomItems(playerData: IPmcData) {
        if (playerData?.Inventory !== undefined) {
            for (var i = 0; i < playerData.Inventory.items.length; i++) {

                if (playerData.Inventory.items[i]._tpl === "TIER1MEDKIT" ||
                    playerData.Inventory.items[i]._tpl === "TIER2MEDKIT" ||
                    playerData.Inventory.items[i]._tpl === "TIER3MEDKIT" ||
                    playerData.Inventory.items[i]._tpl === "SUPERBOTMEDKIT") {
                    playerData.Inventory.items[i]._tpl = "5755356824597772cb798962"
                    playerData.Inventory.items[i].upd.MedKit.HpResource = 100;
                }
            }
        }
    }

    public pickRandNumInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public pickRandNumOneInTen(): number {
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }

    public saveToJSONFile(data: any, filePath: string) {

        let dir = __dirname;
        let dirArray = dir.split("\\");
        let modFolder = (`${dirArray[dirArray.length - 4]}/${dirArray[dirArray.length - 3]}/${dirArray[dirArray.length - 2]}/`);
        fs.writeFile(modFolder + filePath, JSON.stringify(data, null, 4), function (err) {
            if (err) throw err;
        });
    }

    public genId(): string {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 24; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export class ProfileTracker{
    static level: number = 1;
}

export class ConfigChecker {
    static dllIsPresent: boolean = false;
}

export class EventTracker {
    static isChristmas: boolean = false;
}

export class RaidInfoTracker {
    static TOD: string = "";
    static mapType: string = "";
    static mapName: string = "";
}

export class BotTierTracker {
    static usecTier: number = 1;
    static bearTier: number = 1;
    static scavTier: number = 1;
    static rogueTier: number = 1;
    static raiderTier: number = 1;
    static goonsTier: number = 1;
    static killaTier: number = 1;
    static tagillaTier: number = 1;


    public getTier(botType: string): number {
        if (botType === "sptusec") {
            return BotTierTracker.usecTier;
        }
        if (botType === "sptbear") {
            return BotTierTracker.bearTier;
        }
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
    }
}