import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";

export class FleamarketGlobal {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig) { }

    public globalDB = this.tables.globals.config;

    public loadFleaGlobal() {
        if (this.modConfig.flea_changes == true && this.modConfig.tiered_flea != true) {
            this.globalDB.RagFair.minUserLevel = 20;
        }

        if (this.modConfig.tiered_flea == true) {
            this.globalDB.RagFair.minUserLevel = 1;
        }
    }
}


export class FleamarketConfig {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private fleaConf: IRagfairConfig, private modConfig, private custFleaConf) { }

    public loadFleaConfig() {

        // if (this.modConfig.flea_changes == true || this.modConfig.tiered_flea == true) {

        //     this.fleaConf.dynamic.blacklist.enableBsgList = false;
        //     this.fleaConf.dynamic.blacklist.custom = this.custFleaConf.blacklist.custom;
        // }

        if (this.modConfig.flea_changes == true) {

            this.fleaConf.sell.chance.base = 35;
            this.fleaConf.sell.time.base = 240;
            this.fleaConf.sell.time.min = 30;
            this.fleaConf.sell.time.max = 240;

            this.fleaConf.dynamic.currencies = {
                "5449016a4bdc2d6f028b456f": 20,
                "5696686a4bdc2da3298b456a": 40,
                "569668774bdc2da2298b4568": 40
            }

            this.fleaConf.dynamic.offerItemCount.min = 0;
            this.fleaConf.dynamic.offerItemCount.max = 1;

            this.fleaConf.dynamic.price.min = 1.5;
            this.fleaConf.dynamic.price.max = 3;
            this.fleaConf.dynamic.presetPrice.min = 2;
            this.fleaConf.dynamic.presetPrice.max = 3;

            this.fleaConf.runIntervalSeconds = 1
            this.fleaConf.dynamic.endTimeSeconds.min = 3600;
            this.fleaConf.dynamic.endTimeSeconds.max = 86400;

            this.fleaConf.dynamic.condition.conditionChance = 0.99;
            this.fleaConf.dynamic.condition.min = 0.45;
            this.fleaConf.dynamic.condition.max = 0.98;

            this.fleaConf.dynamic.nonStackableCount.min = 0;
            this.fleaConf.dynamic.nonStackableCount.max = 1;

            this.fleaConf.dynamic.stackablePercent.min = 10
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

    constructor(private tables: IDatabaseTables) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;

    public flea0() {
        this.canSellAll(false);

    }
    public flea1() {
        this.canSellAll(false);
        this.canSellShotgun(true);
    }
    public flea2() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
    }
    public flea3() {
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellSMG(true);
        this.canSellShotgun(true);
        this.canSellHelmet(true);
    }
    public flea4() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellBP(true);
        this.canSellHelmParts(true);
        this.canSellSnip(true);
    }
    public flea5() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellBP(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellSnip(true);
        this.canSellFood(true);
        this.canSellGear(true);
        this.canSellAmmo(true);
    }
    public flea6() {
        this.canSellAll(false);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellSnip(true);
        this.canSellBP(true);
        this.canSellInfo(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellAmmo(true);
        this.canSellDMR(true);
        this.canSellBarters(true);
        this.canSellFood(true);
        this.canSellMeds(true);
        this.canSellGear(true);
    }
    public fleaFullUnlock() {
        this.canSellAll(false);
        this.canSellMaps(true);
        this.canSellPistol(true);
        this.canSellShotgun(true);
        this.canSellSpecial(true);
        this.canSellSMG(true);
        this.canSellCarbine(true);
        this.canSellHelmet(true);
        this.canSellSnip(true);
        this.canSellBP(true);
        this.canSellInfo(true);
        this.canSellHelmParts(true);
        this.canSellArmor(true);
        this.canSellAmmo(true);
        this.canSellDMR(true);
        this.canSellBarters(true);
        this.canSellKeys(true);
        this.canSellAR(true);
        this.canSellMods(true);
        this.canSellGear(true);
        this.canSellRepairKit(true);
        this.canSellMaps(true);
    }
    public canSellAll(bool) {
        this.canSellMeds(bool);
        this.canSellStims(bool);
        this.canSellFood(bool);
        this.canSellArmor(bool);
        this.canSellHelmet(bool);
        this.canSellHelmParts(bool);
        this.canSellGear(bool);
        this.canSellBP(bool);
        this.canSellArm(bool);
        this.canSellKeys(bool);
        this.canSellBarters(bool);
        this.canSellFuel(bool);
        this.canSellInfo(bool);
        this.canSellSpecial(bool);
        this.canSellMaps(bool);
        this.canSellMods(bool);
        this.canSellAR(bool);
        this.canSellSnip(bool);
        this.canSellCarbine(bool);
        this.canSellShotgun(bool);
        this.canSellPistol(bool);
        this.canSellGrenades(bool);
        this.canSellMelee(bool);
        this.canSellDMR(bool);
        this.canSellSMG(bool);
        this.canSellAmmo(bool);
        this.canSellContainer(bool);
        this.canSellPouch(bool);
        this.canSellRepairKit(bool);
        this.canSellCustomMeds(bool);
    }
    public canSellContainer(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5795f317245977243854e041" || this.itemDB[i]._parent === "5671435f4bdc2d96058b4569") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellPouch(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448bf274bdc2dfc2f8b456a") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellMeds(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448f39d4bdc2d0a728b4568"
                || this.itemDB[i]._parent === "5448f3a14bdc2d27728b4569"
                || this.itemDB[i]._parent === "5448f3ac4bdc2dce718b4569"
            ) {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellStims(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448f3a64bdc2d60728b456a") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellFood(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._props.foodUseTime) {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellArmor(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448e54d4bdc2dcc718b4568"
                || this.itemDB[i]._parent === "5448e5284bdc2dcb718b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellHelmet(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5a341c4086f77401f2541505") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellGear(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5b432be65acfc433000ed01f"
                || this.itemDB[i]._parent === "5a341c4686f77469e155819e"
                || this.itemDB[i]._parent === "5a341c4086f77401f2541505"
                || this.itemDB[i]._parent === "5645bcb74bdc2ded0b8b4578"
                || this.itemDB[i]._parent === "5448e5724bdc2ddf718b4568"
            ) {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellBP(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448e53e4bdc2d60728b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellArm(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5b3f15d486f77432d0509248") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellHelmParts(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5a2c3a9486f774688b05e574"
                || this.itemDB[i]._parent === "57bef4c42459772e8d35a53b"
                || this.itemDB[i]._parent === "57bef4c42459772e8d35a53b") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }


    public canSellKeys(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5c99f98d86f7745c314214b3"
                || this.itemDB[i]._parent === "5c164d2286f774194c5e69fa") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellBarters(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "590c745b86f7743cc433c5f2"
                || this.itemDB[i]._parent === "57864ada245977548638de91"
                || this.itemDB[i]._parent === "57864bb7245977548b3b66c2"
                || this.itemDB[i]._parent === "57864a66245977548f04a81f"
                || this.itemDB[i]._parent === "57864e4c24597754843f8723"
                || this.itemDB[i]._parent === "57864ee62459775490116fc1"
                || this.itemDB[i]._parent === "57864c322459775490116fbf"
                || this.itemDB[i]._parent === "5448ecbe4bdc2d60728b4568"
                || this.itemDB[i]._parent === "57864a3d24597754843f8721"
                || this.itemDB[i]._parent === "57864c8c245977548867e7f1"

            ) {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellFuel(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5d650c3e815116009f6201d2") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellMods(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "55818af64bdc2d5b648b4570"
                || this.itemDB[i]._parent === "55818b164bdc2ddc698b456c"
                || this.itemDB[i]._parent === "56ea9461d2720b67698b456f"
                || this.itemDB[i]._parent === "555ef6e44bdc2de9068b457e"
                || this.itemDB[i]._parent === "55818a594bdc2db9688b456a"
                || this.itemDB[i]._parent === "55818a684bdc2ddd698b456d"
                || this.itemDB[i]._parent === "55818a304bdc2db5418b457d"
                || this.itemDB[i]._parent === "55818a6f4bdc2db9688b456b"
                || this.itemDB[i]._parent === "550aa4bf4bdc2dd6348b456b"
                || this.itemDB[i]._parent === "550aa4cd4bdc2dd8348b456c"
                || this.itemDB[i]._parent === "55818b224bdc2dde698b456f"
                || this.itemDB[i]._parent === "58d39b0386f77443380bf13c"
                || this.itemDB[i]._parent === "55818add4bdc2d5b648b456f"
                || this.itemDB[i]._parent === "550aa4154bdc2dd8348b456b"
                || this.itemDB[i]._parent === "55818b084bdc2d5b648b4571"
                || this.itemDB[i]._parent === "5b363e1b5acfc4771e1c5e80"
                || this.itemDB[i]._parent === "550aa4dd4bdc2dc9348b4569"
                || this.itemDB[i]._parent === "55818ad54bdc2ddc698b4569"
                || this.itemDB[i]._parent === "55818acf4bdc2dde698b456b"
                || this.itemDB[i]._parent === "55818ae44bdc2dde698b456c"
                || this.itemDB[i]._parent === "55818ac54bdc2d5b648b456e"
                || this.itemDB[i]._parent === "55818aeb4bdc2ddc698b456a"
                || this.itemDB[i]._parent === "5448bc234bdc2d3c308b4569"
                || this.itemDB[i]._parent === "5a74651486f7744e73386dd1"
                || this.itemDB[i]._parent === "55818a104bdc2db9688b4569"
                || this.itemDB[i]._parent === "55818afb4bdc2dde698b456d"
                || this.itemDB[i]._parent === "610720f290b75a49ff2e5e25"
                || this.itemDB[i]._parent === "5d21f59b6dbe99052b54ef83"
            ) {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellAR(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447a9cd4bdc2dbd208b4567"
                || this.itemDB[i]._parent === "5422acb9af1c889c16000029"
                || this.itemDB[i]._parent === "5447bed64bdc2d97278b4568") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellDMR(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447b6194bdc2d67278b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellSMG(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447b5e04bdc2d62278b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }
    public canSellMelee(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447e1d04bdc2dff2f8b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellSnip(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447b6254bdc2dc3278b4568") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }


    public canSellCarbine(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447b5f14bdc2d61278b4567"
                || this.itemDB[i]._parent === "5447b5fc4bdc2d87278b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellShotgun(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447b6094bdc2dc3278b4567"
                || this.itemDB[i]._id === "60db29ce99594040e04c4a27") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellPistol(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447b5cf4bdc2d65278b4567" || this.itemDB[i]._parent === "617f1ef5e8b54b0998387733") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellGrenades(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "543be6564bdc2df4348b4568") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }


    public canSellAmmo(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "543be5cb4bdc2deb348b4568"
                || this.itemDB[i]._parent === "5485a8684bdc2da71d8b4567") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }

    public canSellInfo(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5448ecbe4bdc2d60728b4568") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }
    public canSellRepairKit(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "616eb7aea207f41933308f46") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }
    public canSellSpecial(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "5447e0e74bdc2d3c308b4567"
                || this.itemDB[i]._parent === "5f4fbaaca5573a5ac31db429"
                || this.itemDB[i]._parent === "61605ddea09d851a0a0c1bbc") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }
    public canSellMaps(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "567849dd4bdc2d150f8b456e") {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }
    public canSellCustomMeds(bool) {
        for (let i in this.itemDB) {
            if (this.itemDB[i]._parent === "TIER1MEDKIT"
                || this.itemDB[i]._parent === "TIER2MEDKIT"
                || this.itemDB[i]._parent === "TIER3MEDKIT"
                || this.itemDB[i]._parent === "SUPERBOTMEDKIT"
            ) {
                this.itemDB[i]._props.CanSellOnRagfair = bool
            }
        }
    }
}