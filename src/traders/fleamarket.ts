import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { RagfairOfferHolder } from "@spt-aki/utils/RagfairOfferHolder";
import { ParentClasses } from "../utils/enums";
import { RagfairOfferGenerator } from "@spt-aki/generators/RagfairOfferGenerator";
import { RagfairServer } from "@spt-aki/servers/RagfairServer";
import { RagfairOfferService } from "@spt-aki/services/RagfairOfferService";
import { DependencyContainer } from "tsyringe";
import { Arrays } from "../utils/arrays";
import { IConfig } from "@spt-aki/models/eft/common/IGlobals";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

const custFleaConfig = require("../../db/traders/ragfair/flea_config.json");

export class FleaChangesPostDBLoad {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig, private fleaConf: IRagfairConfig) { }

    globalDB(): IConfig {
        return this.tables.globals.config;
    }

    public loadFleaGlobal() {
        if (this.modConfig.tiered_flea == true) {
            this.globalDB().RagFair.minUserLevel = 1;

            if (this.modConfig.disable_flea_blacklist == false) {
                this.fleaConf.dynamic.blacklist.custom = [];
                for (let i in this.tables.templates.items) {
                    if (this.tables.templates.items[i]._props.CanSellOnRagfair == false) {
                        this.fleaConf.dynamic.blacklist.custom.push(this.tables.templates.items[i]._id);
                    }
                }
            }
        }
    }
}


export class FleaChangesPreDBLoad {

    constructor(private logger: ILogger, private fleaConf: IRagfairConfig, private modConfig) { }

    public loadFleaConfig() {
        if (this.modConfig.disable_flea_blacklist == true) {
            this.fleaConf.dynamic.blacklist.enableBsgList = false;
            this.fleaConf.dynamic.blacklist.custom = [];
        }
        else if (this.modConfig.flea_changes == true) {
            this.fleaConf.dynamic.blacklist.enableBsgList = true;
            this.fleaConf.dynamic.blacklist.custom.push(
                "generic_debuff",
                "performance_debuff",
                "weight_debuff",
                "clotting_debuff",
                "damage_debuff",
                "adrenal_debuff",
                "regen_debuff"
            );
        }

        if (this.modConfig.flea_changes == true) {

            //disabled due to bizzare SPT changes
            // this.fleaConf.dynamic.condition = custFleaConfig.condition;

            this.fleaConf.ratingDecreaseCount = 0.12;
            this.fleaConf.ratingIncreaseCount = 0.1;

            this.fleaConf.dynamic.currencies = {
                "5449016a4bdc2d6f028b456f": 20,
                "5696686a4bdc2da3298b456a": 40,
                "569668774bdc2da2298b4568": 40
            }

            this.fleaConf.dynamic.offerItemCount.min = 0;
            this.fleaConf.dynamic.offerItemCount.max = 2;

            this.fleaConf.dynamic.priceRanges.default.min = 0.75;
            this.fleaConf.dynamic.priceRanges.default.max = 1.75;
            this.fleaConf.dynamic.priceRanges.preset.min = 0.75;
            this.fleaConf.dynamic.priceRanges.preset.max = 1.75;
            this.fleaConf.dynamic.priceRanges.pack.min = 0.75;
            this.fleaConf.dynamic.priceRanges.pack.max = 1.75;

            this.fleaConf.dynamic.endTimeSeconds.min = 600;
            this.fleaConf.dynamic.endTimeSeconds.max = 3600;

            this.fleaConf.dynamic.nonStackableCount.min = 1;
            this.fleaConf.dynamic.nonStackableCount.max = 2;

            this.fleaConf.dynamic.stackablePercent.min = 15
            this.fleaConf.dynamic.stackablePercent.max = 100

            if (this.modConfig.logEverything == true) {
                this.logger.info("Flea Changes Enabled");
            }
        }

        if (this.modConfig.logEverything == true) {
            this.logger.info("Fleamarket loaded");
        }
    }
}

export class TieredFlea {

    constructor(private tables: IDatabaseTables, private fleaConf: IRagfairConfig) { }

    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }

    private fleaHelper(fetchTier: Function, ragfairOfferGen: RagfairOfferGenerator, container: DependencyContainer) {

        const offers = container.resolve<RagfairOfferService>("RagfairOfferService").getOffers();
        const ragfairServer = container.resolve<RagfairServer>("RagfairServer");
        const traders: string[] = (ragfairServer as any).getUpdateableTraders();

        for (let o in offers) {
            container.resolve<RagfairOfferService>("RagfairOfferService").removeOfferById(offers[o]._id);
        }

        fetchTier();
        ragfairOfferGen.generateDynamicOffers();
        for (let traderID in traders) {
            if(this.tables.traders[traders[traderID]]?.assort){
                ragfairOfferGen.generateFleaOffersForTrader(traders[traderID]);
            }
        }
    }

    public updateFlea(logger: ILogger, ragfairOfferGen: RagfairOfferGenerator, container: DependencyContainer, arrays: Arrays, level: number) {
        if (level === undefined) {
            this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
            logger.info("Realism Mod: Fleamarket Tier Set To Default  (tier 0)");
        }
        if (level !== undefined) {
            if (level < 5) {
                this.fleaHelper(this.flea0.bind(this), ragfairOfferGen, container);
                logger.info("Realism mod: Fleamarket Locked At Tier 0");
            }
            else if (level <= 10) {
                this.fleaHelper(this.flea1.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 1 Unlocked");
            }
            else if (level <= 15) {
                this.fleaHelper(this.flea2.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 2 Unlocked");
            }
            else if (level <= 20) {
                this.fleaHelper(this.flea3.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 3 Unlocked");
            }
            else if (level <= 25) {
                this.fleaHelper(this.flea4.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 4 Unlocked");
            }
            else if (level <= 30) {
                this.fleaHelper(this.flea5.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 5 Unlocked");
            }
            else if (level <= 35) {
                this.fleaHelper(this.flea6.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 6 Unlocked");
            }
            else if (level <= 40) {
                this.fleaHelper(this.flea7.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Tier 7 Unlocked");
            }
            else {
                this.fleaHelper(this.fleaFullUnlock.bind(this), ragfairOfferGen, container);
                logger.info("Realism Mod: Fleamarket Unlocked");
            }
        }
    }

    public flea0() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
        }
    }
    public flea1() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellMounts(true, serverItem);
        }
    }

    public flea2() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }

    public flea3() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }

    public flea4() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }

    public flea5() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellSnip(true, serverItem);
            this.canSellGrenades(true, serverItem);
            this.canSellAmmoBox(true, serverItem);
            this.canSellHandguards(true, serverItem);
            this.canSellBarrels(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellTools(true, serverItem);
            this.canSellHelmet(true, serverItem);
            this.canSellSMG(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }

    public flea6() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellSnip(true, serverItem);
            this.canSellGrenades(true, serverItem);
            this.canSellAmmoBox(true, serverItem);
            this.canSellHandguards(true, serverItem);
            this.canSellBarrels(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellTools(true, serverItem);
            this.canSellHelmet(true, serverItem);
            this.canSellHelmParts(true, serverItem);
            this.canSellPlates(true, serverItem);
            this.canSellSMG(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellHouseholdGoods(true, serverItem);
            this.canSellBuildingMats(true, serverItem);
            this.canSellBags(true, serverItem);
            this.canSellArmorVest(true, serverItem);
            this.canSellGrips(true, serverItem);
            this.canSellStocks(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellJewelry(true, serverItem);
            this.canSellElectronics(true, serverItem);
            this.canSellDMR(true, serverItem)
            this.canSellIrons(true, serverItem);
        }
    }

    public flea7() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            this.canSellAll(false, serverItem);
            this.canSellMaps(true, serverItem);
            this.canSellPistol(true, serverItem);
            this.canSellShotgun(true, serverItem);
            this.canSellSpecial(true, serverItem);
            this.canSellOtherLoot(true, serverItem);
            this.canSellMounts(true, serverItem);
            this.canSellCarbine(true, serverItem);
            this.canSellParts(true, serverItem);
            this.canSellRigs(true, serverItem);
            this.canSellGear(true, serverItem);
            this.canSellArmbands(true, serverItem);
            this.canSellLube(true, serverItem);
            this.canSellSnip(true, serverItem);
            this.canSellGrenades(true, serverItem);
            this.canSellAmmoBox(true, serverItem);
            this.canSellHandguards(true, serverItem);
            this.canSellBarrels(true, serverItem);
            this.canSellMedicalSupplies(true, serverItem);
            this.canSellTools(true, serverItem);
            this.canSellHelmet(true, serverItem);
            this.canSellHelmParts(true, serverItem);
            this.canSellPlates(true, serverItem);
            this.canSellSMG(true, serverItem);
            this.canSellMelee(true, serverItem);
            this.canSellHouseholdGoods(true, serverItem);
            this.canSellBuildingMats(true, serverItem);
            this.canSellBags(true, serverItem);
            this.canSellArmorVest(true, serverItem);
            this.canSellGrips(true, serverItem);
            this.canSellStocks(true, serverItem);
            this.canSellAR(true, serverItem);
            this.canSellFlare(true, serverItem);
            this.canSellMagazines(true, serverItem);
            this.canSellReddots(true, serverItem);
            this.canSellAssaultScopes(true, serverItem);
            this.canSellMagnifiedScopes(true, serverItem);
            this.canSellLights(true, serverItem);
            this.canSellSupps(true, serverItem);
            this.canSellNVGScopes(true, serverItem);
            this.canSellJewelry(true, serverItem);
            this.canSellElectronics(true, serverItem);
            this.canSellMeds(true, serverItem);
            this.canSellAmmo(true, serverItem);
            this.canSellInfo(true, serverItem);
            this.canSellKeys(true, serverItem);
            this.canSellIrons(true, serverItem);
        }
    }

    public fleaFullUnlock() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (this.checkIfBanned(serverItem._id)) {
                serverItem._props.CanSellOnRagfair = false;
            }
            else {
                serverItem._props.CanSellOnRagfair = true;
            }
        }
    }

    private canSellAll(bool: boolean, serverItem: ITemplateItem) {
        this.canSellIrons(bool, serverItem);
        this.canSellSecureContainer(bool, serverItem);
        this.canSellMeds(bool, serverItem);
        this.canSellStims(bool, serverItem);
        this.canSellFood(bool, serverItem);
        this.canSellPlates(bool, serverItem);
        this.canSellArmorVest(bool, serverItem);
        this.canSellRigs(bool, serverItem);
        this.canSellHelmet(bool, serverItem);
        this.canSellGear(bool, serverItem);
        this.canSellBags(bool, serverItem);
        this.canSellArmbands(bool, serverItem);
        this.canSellHelmParts(bool, serverItem);
        this.canSellKeys(bool, serverItem);
        this.canSellKeyCards(bool, serverItem);
        this.canSellOtherLoot(bool, serverItem);
        this.canSellFuel(bool, serverItem);
        this.canSellBuildingMats(bool, serverItem);
        this.canSellTools(bool, serverItem);
        this.canSellElectronics(bool, serverItem);
        this.canSellLube(bool, serverItem);
        this.canSellHouseholdGoods(bool, serverItem);
        this.canSellJewelry(bool, serverItem);
        this.canSellMedicalSupplies(bool, serverItem);
        this.canSellMounts(bool, serverItem);
        this.canSellReddots(bool, serverItem);
        this.canSellAssaultScopes(bool, serverItem);
        this.canSellMagnifiedScopes(bool, serverItem);
        this.canSellThermalScopes(bool, serverItem);
        this.canSellNVGScopes(bool, serverItem);
        this.canSellNVG(bool, serverItem);
        this.canSellThermal(bool, serverItem);
        this.canSellMagazines(bool, serverItem);
        this.canSellParts(bool, serverItem);
        this.canSellHandguards(bool, serverItem);
        this.canSellBarrels(bool, serverItem);
        this.canSellStocks(bool, serverItem);
        this.canSellGrips(bool, serverItem);
        this.canSellLights(bool, serverItem);
        this.canSellSupps(bool, serverItem);
        this.canSellMuzzleDevices(bool, serverItem);
        this.canSellSpecWeap(bool, serverItem);
        this.canSellFlare(bool, serverItem);
        this.canSellNadeLauncher(bool, serverItem);
        this.canSellAR(bool, serverItem);
        this.canSellSMG(bool, serverItem);
        this.canSellMelee(bool, serverItem);
        this.canSellSnip(bool, serverItem);
        this.canSellCarbine(bool, serverItem);
        this.canSellShotgun(bool, serverItem);
        this.canSellPistol(bool, serverItem);
        this.canSellGrenades(bool, serverItem);
        this.canSellAmmoBox(bool, serverItem);
        this.canSellAmmo(bool, serverItem);
        this.canSellInfo(bool, serverItem);
        this.canSellRepairKit(bool, serverItem);
        this.canSellSpecial(bool, serverItem);
        this.canSellMaps(bool, serverItem);
        this.canSellContainer(bool, serverItem);
        this.canSellDMR(bool, serverItem)
    }

    private checkIfBanned(itemId: string): boolean {
        return this.fleaConf.dynamic.blacklist.custom.includes(itemId);
    }

    private canSellContainer(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.SIMPLE_CONTAINER || serverItem._parent === ParentClasses.LOCKABLE_CONTAINER) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellSecureContainer(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.SECURE_CONTAINER) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellMeds(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.MEDKIT
            || serverItem._parent === ParentClasses.DRUGS
            || serverItem._parent === ParentClasses.MEDICAL
        ) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellStims(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.STIMULATOR) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellFood(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._props.foodUseTime) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellPlates(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ARMOR_PLATE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellArmorVest(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ARMORVEST) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellRigs(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.CHESTRIG) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellHelmet(bool: boolean, serverItem: ITemplateItem) {
        let armorLevl: number = typeof serverItem._props.armorClass === 'number' ? serverItem._props.armorClass : parseInt(serverItem._props.armorClass as string);
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if ((serverItem._parent === ParentClasses.HEADWEAR || serverItem._parent === ParentClasses.FACECOVER) && armorLevl > 0) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellGear(bool: boolean, serverItem: ITemplateItem) {
        let armorLevl: number = typeof serverItem._props.armorClass === 'number' ? serverItem._props.armorClass : parseInt(serverItem._props.armorClass as string);
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if ((serverItem._parent === ParentClasses.FACECOVER && armorLevl <= 0)
            || (serverItem._parent === ParentClasses.HEADWEAR && armorLevl <= 0)
            || serverItem._parent === ParentClasses.HEADSET) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellBags(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.BACKPACK) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellArmbands(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ARMBAND) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellHelmParts(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ARMOREDEQUIPMENT || serverItem._parent === ParentClasses.VISORS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }


    private canSellKeys(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.KEY_MECHANICAL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellKeyCards(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.KEYCARD) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellOtherLoot(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.OTHER) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellFuel(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.FUEL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellBuildingMats(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.BUILDING_MATERIAL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellTools(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.TOOL) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellElectronics(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ELECTRONICS || serverItem._parent === ParentClasses.BATTERY) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellLube(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.LUBRICANT) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellHouseholdGoods(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.HOUSEHOLD_GOODS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellJewelry(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.JEWELRY) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellMedicalSupplies(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.MEDICAL_SUPPLIES) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellMounts(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.MOUNT) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellReddots(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.COMPACT_COLLIMATOR || serverItem._parent === ParentClasses.COLLIMATOR) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellIrons(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.IRON_SIGHTS) {
        }
    }

    private canSellAssaultScopes(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ASSAULT_SCOPE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellMagnifiedScopes(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.OPTIC_SCOPE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellThermalScopes(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.SPECIAL_SCOPE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellNVGScopes(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._id === "5b3b6e495acfc4330140bd88" || serverItem._id === "5a7c74b3e899ef0014332c29") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellNVG(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.NIGHTVISION) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellThermal(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.THEMALVISION) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellMagazines(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.MAGAZINE || serverItem._parent === ParentClasses.CYLINDER_MAGAZINE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }


    private canSellParts(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818afb4bdc2dde698b456d" ||
            serverItem._parent === "5a74651486f7744e73386dd1" ||
            serverItem._parent === "55818a6f4bdc2db9688b456b" ||
            serverItem._parent === "55818a304bdc2db5418b457d" ||
            serverItem._parent === "56ea9461d2720b67698b456f") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellHandguards(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.HANDGUARDS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellBarrels(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.BARRELS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellStocks(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818a594bdc2db9688b456a") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellGrips(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818af64bdc2d5b648b4570" || serverItem._parent === "55818a684bdc2ddd698b456d") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellLights(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "55818b164bdc2ddc698b456c" || serverItem._parent === "55818b084bdc2d5b648b4571") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellSupps(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "550aa4cd4bdc2dd8348b456c") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellMuzzleDevices(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "550aa4bf4bdc2dd6348b456b" || serverItem._parent === "550aa4dd4bdc2dc9348b4569") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellSpecWeap(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.SPECIAL_WEAPON) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellFlare(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._id === "6217726288ed9f0845317459" || serverItem._id === "62178be9d0050232da3485d9" || serverItem._id === "62178c4d4ecf221597654e3d") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellNadeLauncher(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.GRENADE_LAUNCHER || serverItem._parent === "55818b014bdc2ddc698b456b") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellAR(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ASSAULT_RIFLE || serverItem._parent === ParentClasses.MACHINE_GUN) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellDMR(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.MARKSMAN_RIFLE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellSMG(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.SMG) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    private canSellMelee(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.KNIFE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellSnip(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.SNIPER_RIFLE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }


    private canSellCarbine(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.ASSAULT_CARBINE) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellShotgun(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.SHOTGUN
            || serverItem._id === "60db29ce99594040e04c4a27") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellPistol(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if ((serverItem._parent === ParentClasses.PISTOL || serverItem._parent === "617f1ef5e8b54b0998387733") && serverItem._id !== "6275303a9f372d6ea97f9ec7") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellGrenades(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.THROW_WEAPON) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellAmmoBox(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.AMMO_BOX) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellAmmo(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.AMMO) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellInfo(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.INFO) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    private canSellRepairKit(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.REPAIRKITS) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }
    private canSellSpecial(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === "5447e0e74bdc2d3c308b4567"
            || serverItem._parent === "5f4fbaaca5573a5ac31db429"
            || serverItem._parent === "61605ddea09d851a0a0c1bbc") {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

    private canSellMaps(bool: boolean, serverItem: ITemplateItem) {
        if (this.checkIfBanned(serverItem._id)) {
            serverItem._props.CanSellOnRagfair = false;
        }
        else if (serverItem._parent === ParentClasses.MAP) {
            serverItem._props.CanSellOnRagfair = bool;
        }
    }

}
