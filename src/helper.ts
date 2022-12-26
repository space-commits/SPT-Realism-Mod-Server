
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { Arrays } from "./arrays";

const dir = __dirname;
const dirArray = dir.split("\\");
const modFolder = (`${dirArray[dirArray.length - 4]}/${dirArray[dirArray.length - 3]}/${dirArray[dirArray.length - 2]}/`);

export class Helper {

    constructor(private tables: IDatabaseTables, private arrays: Arrays) { }


    private itemDB = this.tables.templates.items;
    private medItems = this.arrays.stashMeds;

    public correctMedItems(playerData: IPmcData, pmcEXP: number) {
        var inventProp = playerData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < playerData.Inventory.items.length; i++) {
                var itemProp = playerData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (playerData.Inventory.items[i]._tpl === this.medItems[j]
                            && playerData.Inventory.items[i].upd.MedKit.HpResource > this.itemDB[this.medItems[j]]._props.MaxHpResource) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                        if (pmcEXP == 0 && playerData.Inventory.items[i]._tpl === this.medItems[j]) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }

    public revertMedItems(playerData: IPmcData) {
        var inventProp = playerData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < playerData.Inventory.items.length; i++) {
                var itemProp = playerData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (playerData.Inventory.items[i]._tpl === this.medItems[j]) {
                            playerData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }

    public probabilityWeighter(items, weights) {

        function add(a, b) { return a + b; }

        var botTiers = items;
        var weights = weights;
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
                    playerData.Inventory.items[i]._tpl === "TIER1MEDKI2" ||
                    playerData.Inventory.items[i]._tpl === "TIER1MEDKI3" ||
                    playerData.Inventory.items[i]._tpl === "SUPERBOTMEDKIT") {
                    playerData.Inventory.items[i]._tpl = "5755356824597772cb798962"
                    playerData.Inventory.items[i].upd.MedKit.HpResource = 100;
                }
            }
        }
    }

    public pickRandNumInRange(min: number, max: number) : number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public pickRandNumOneInTen() : number{
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }

    public saveToJSONFile(data, filePath) {
        var fs = require('fs');
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

export class EventTracker {
    static isChristmas: boolean = false;
}

export class RaidInfoTracker {
    static TOD: string = "";
    static mapType: string = "";
    static mapName: string = "";
    static mapNameUnreliable: string = "";
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
        if(botType === "bossknight" || botType === "followerbigpipe" || botType === "followerbirdeye"){
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