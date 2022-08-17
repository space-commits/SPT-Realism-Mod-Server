"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Items = void 0;
class _Items {
    constructor(logger, tables, modConfig, jsonUtil, medItems, crafts) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.jsonUtil = jsonUtil;
        this.medItems = medItems;
        this.crafts = crafts;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.config = this.modConfig;
    }
    loadItems() {
        this.globalDB["AllowSelectEntryPoint"] = true;
        if (this.config.all_examined == true) {
            for (let i in this.itemDB) {
                let fileData = this.itemDB[i];
                fileData._props.ExaminedByDefault = true;
            }
            if (this.config.logEverything == true) {
                this.logger.info("All Items Examined");
            }
        }
        if (this.config.remove_inraid_restrictions == true) {
            this.globalDB.RestrictionsInRaid = [];
            if (this.config.logEverything == true) {
                this.logger.info("In-Raid Restrictions Removed");
            }
        }
        if (this.config.logEverything == true) {
            this.logger.info("Items Loaded");
        }
        for (let item in this.itemDB) {
            if (this.itemDB[item]?._props?.DiscardLimit !== undefined) {
                this.itemDB[item]._props.DiscardLimit = -1;
            }
        }
    }
    createCustomMedItems() {
        //Tier 1 Medkit
        this.cloneMedicalItem("5755356824597772cb798962", "TIER1MEDKIT", this.medItems.TIER1MEDKIT.MaxHpResource, this.medItems.TIER1MEDKIT.medUseTime, this.medItems.TIER1MEDKIT.hpResourceRate, "assets/content/items/barter/item_barter_meds_tools/item_barter_meds_tools.bundle", "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_container.bundle", "yellow ", this.medItems.TIER1MEDKIT.effects_damage);
        this.addToHandbook("TIER1MEDKIT", "5b47574386f77428ca22b338", 10000);
        this.addToLocale("TIER1MEDKIT", "Makeshift Medical Kit", "TIER1", "A makeshift medical kit used for healing minor wounds that have been already stabilized in the field. Not suitable for use in the field.");
        this.addToHideout(this.crafts.Tier1Medkit);
        //Tier 2 Medkit
        this.cloneMedicalItem("5755356824597772cb798962", "TIER2MEDKIT", this.medItems.TIER2MEDKIT.MaxHpResource, this.medItems.TIER2MEDKIT.medUseTime, this.medItems.TIER2MEDKIT.hpResourceRate, "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_loot.bundle", "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_container.bundle", "blue", this.medItems.TIER2MEDKIT.effects_damage);
        this.addToHandbook("TIER2MEDKIT", "5b47574386f77428ca22b338", 20000);
        this.addToLocale("TIER2MEDKIT", "Improved Makeshift Medical Kit", "TIER2", "An improved makeshift medical kit used for healing wounds that have been already stabilized in the field. Not suitable for use in the field.");
        this.addToHideout(this.crafts.Tier2Medkit);
        //Tier 3 Medkit
        this.cloneMedicalItem("5755356824597772cb798962", "TIER3MEDKIT", this.medItems.TIER3MEDKIT.MaxHpResource, this.medItems.TIER3MEDKIT.medUseTime, this.medItems.TIER3MEDKIT.hpResourceRate, "assets/content/weapons/usable_items/item_meds_survival_first_aid_rollup_kit/item_meds_survival_first_aid_rollup_kit_loot.bundle", "assets/content/weapons/usable_items/item_meds_survival_first_aid_rollup_kit/item_meds_survival_first_aid_rollup_kit_container.bundle", "violet", this.medItems.TIER3MEDKIT.effects_damage);
        this.addToHandbook("TIER3MEDKIT", "5b47574386f77428ca22b338", 30000);
        this.addToLocale("TIER3MEDKIT", "High-Grade Makeshift Medical Kit", "TIER3", "A high-grade makeshift medical kit used for healing more severe wounds that have been already stabilized in the field. Not suitable for use in the field.");
        this.addToHideout(this.crafts.Tier3Medkit);
        //SuperMedkit (for bots)
        this.cloneMedicalItem("590c678286f77426c9660122", "SUPERBOTMEDKIT", this.medItems.SUPERBOTMEDKIT.MaxHpResource, this.medItems.SUPERBOTMEDKIT.medUseTime, this.medItems.SUPERBOTMEDKIT.hpResourceRate, "assets/content/weapons/usable_items/item_ifak/item_ifak_loot.bundle", "assets/content/weapons/usable_items/item_ifak/item_ifak_container.bundle", "yellow", this.medItems.SUPERBOTMEDKIT.effects_damage);
        this.addToHandbook("SUPERBOTMEDKIT", "5b47574386f77428ca22b338", 1);
        this.addToLocale("SUPERBOTMEDKIT", "Super Bot Medkit", "SUPERBOTMEDKIT", "Super medkit for bots, will only appear in their Secure Container.");
    }
    cloneMedicalItem(itemToClone, newItemID, maxHpResource, medUseTime, hpResourceRate, prefabePath, usePrefabPath, color, effectsDamage) {
        this.cloneItem(itemToClone, newItemID);
        let itemID = this.itemDB[newItemID];
        itemID._props.MaxHpResource = maxHpResource;
        itemID._props.medUseTime = medUseTime;
        itemID._props.hpResourceRate = hpResourceRate;
        itemID._props.Prefab.path = prefabePath;
        itemID._props.UsePrefab.path = usePrefabPath;
        itemID._props.BackgroundColor = color;
        itemID._props.effects_damage = effectsDamage;
        itemID._props.CanSellOnRagfair = false;
        if (this.modConfig.logEverything == true) {
            this.logger.warning("Item " + itemID._id + " Added");
        }
    }
    addToHandbook(id, parentID, price) {
        this.tables.templates.handbook.Items.push({
            "Id": id,
            "ParentId": parentID,
            "Price": price
        });
    }
    addToLocale(id, name, shortname, description) {
        const locales = this.tables.locales.global.en;
        locales.templates[id] =
            {
                "Name": name,
                "ShortName": shortname,
                "Description": description
            };
    }
    cloneItem(itemtoClone, newitemID) {
        this.itemDB[newitemID] = this.jsonUtil.clone(this.itemDB[itemtoClone]);
        this.itemDB[newitemID]._id = newitemID;
        if (this.modConfig.logEverything == true) {
            this.logger.warning(this.itemDB[itemtoClone]._name + " cloned");
        }
    }
    addToHideout(craft) {
        this.tables.hideout.production.push(craft);
    }
}
exports._Items = _Items;
