"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCloning = void 0;
class ItemCloning {
    constructor(logger, tables, modConfig, jsonUtil, medItems, crafts) {
        this.logger = logger;
        this.tables = tables;
        this.modConfig = modConfig;
        this.jsonUtil = jsonUtil;
        this.medItems = medItems;
        this.crafts = crafts;
        this.itemDB = this.tables.templates.items;
        this.questDB = this.tables.templates.quests;
    }
    createCustomMedItems() {
        //Tier 1 Medkit
        this.cloneMedicalItem("5755356824597772cb798962", "TIER1MEDKIT", this.medItems.TIER1MEDKIT.MaxHpResource, this.medItems.TIER1MEDKIT.medUseTime, this.medItems.TIER1MEDKIT.hpResourceRate, "assets/content/items/barter/item_barter_meds_tools/item_barter_meds_tools.bundle", "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_container.bundle", "yellow ", this.medItems.TIER1MEDKIT.effects_damage);
        this.addToHandbook("TIER1MEDKIT", "5b47574386f77428ca22b338", 10000);
        this.addToLocale("TIER1MEDKIT", "Makeshift Medical Kit", "TIER1", "A makeshift medical kit used for healing minor wounds that have been already stabilized in the field. Not suitable for use in the field.");
        // this.addToHideout(this.crafts.Tier1Medkit);
        //Tier 2 Medkit
        this.cloneMedicalItem("5755356824597772cb798962", "TIER2MEDKIT", this.medItems.TIER2MEDKIT.MaxHpResource, this.medItems.TIER2MEDKIT.medUseTime, this.medItems.TIER2MEDKIT.hpResourceRate, "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_loot.bundle", "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_container.bundle", "blue", this.medItems.TIER2MEDKIT.effects_damage);
        this.addToHandbook("TIER2MEDKIT", "5b47574386f77428ca22b338", 20000);
        this.addToLocale("TIER2MEDKIT", "Improved Makeshift Medical Kit", "TIER2", "An improved makeshift medical kit used for healing wounds that have been already stabilized in the field. Not suitable for use in the field.");
        // this.addToHideout(this.crafts.Tier2Medkit);
        //Tier 3 Medkit
        this.cloneMedicalItem("5755356824597772cb798962", "TIER3MEDKIT", this.medItems.TIER3MEDKIT.MaxHpResource, this.medItems.TIER3MEDKIT.medUseTime, this.medItems.TIER3MEDKIT.hpResourceRate, "assets/content/weapons/usable_items/item_meds_survival_first_aid_rollup_kit/item_meds_survival_first_aid_rollup_kit_loot.bundle", "assets/content/weapons/usable_items/item_meds_survival_first_aid_rollup_kit/item_meds_survival_first_aid_rollup_kit_container.bundle", "violet", this.medItems.TIER3MEDKIT.effects_damage);
        this.addToHandbook("TIER3MEDKIT", "5b47574386f77428ca22b338", 30000);
        this.addToLocale("TIER3MEDKIT", "High-Grade Makeshift Medical Kit", "TIER3", "A high-grade makeshift medical kit used for healing more severe wounds that have been already stabilized in the field. Not suitable for use in the field.");
        // this.addToHideout(this.crafts.Tier3Medkit);
        //Makeshift Regen
        this.cloneMedicalItem("5c10c8fd86f7743d7d706df3", "SJ0", this.medItems.SJ0.MaxHpResource, this.medItems.SJ0.medUseTime, this.medItems.SJ0.hpResourceRate, "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle", "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle", "blue", this.medItems.SJ0.effects_damage);
        this.addToHandbook("SJ0", "5b47574386f77428ca22b33a", 30000);
        this.addToLocale("SJ0", "SJ0 TGLabs Combat Stimulant Injector", "SJ0", "TerraGroup Labs' first attempt at a combat stimulant with regenerative properties. Despite reports of initial trials being promising, in-theatre testing by USEC operatives proved disasterous due to extensive unreported side-effects. The stimulant was later recalled for disposal, but shady characters in the Tarkov region managed to intercept significant quanities of the product and still peddle it to this day, often resusing old Adrenaline injector casings or whatver they can get their hands on.");
        // this.addToHideout(this.crafts.Tier3Medkit);
        //SuperMedkit (for bots)
        // this.cloneMedicalItem(
        //     "590c678286f77426c9660122",
        //     "SUPERBOTMEDKIT",
        //     this.medItems.SUPERBOTMEDKIT.MaxHpResource,
        //     this.medItems.SUPERBOTMEDKIT.medUseTime,
        //     this.medItems.SUPERBOTMEDKIT.hpResourceRate,
        //     "assets/content/weapons/usable_items/item_ifak/item_ifak_loot.bundle",
        //     "assets/content/weapons/usable_items/item_ifak/item_ifak_container.bundle",
        //     "yellow",
        //     this.medItems.SUPERBOTMEDKIT.effects_damage
        // );
        // this.addToHandbook("SUPERBOTMEDKIT", "5b47574386f77428ca22b338", 1);
        // this.addToLocale("SUPERBOTMEDKIT", "Super Bot Medkit", "SUPERBOTMEDKIT", "Super medkit for bots, will only appear in their Secure Container.");
    }
    createCustomWeapons() {
        //Mechanic custom SKS
        this.cloneWeapons("574d967124597745970e7c94", "mechSKSv1", "violet");
        this.addToHandbook("mechSKSv1", "5b5f78e986f77447ed5636b1", 12500);
        this.addToLocale("mechSKSv1", "Mechanic's Custom SKS", "Mech SKS", "Mechanic has done custom work to this SKS: the trigger components have been polished and the springs lightened for a lighter and cleaner trigger pull. The gas system has been modified to make the rifle softer shooting, at the expense of reliability. Lightening cuts have reduced the weight of the rifle as well as improving balance.");
        this.addToMastering("mechSKSv1", "SKS");
        this.addCustomWeapsToQuests("", "mechSKSv1");
        //Mechanic custom OP-SKS
        this.cloneWeapons("587e02ff24597743df3deaeb", "mechOPSKSv1", "violet");
        this.addToHandbook("mechOPSKSv1", "5b5f78e986f77447ed5636b1", 15000);
        this.addToLocale("mechOPSKSv1", "Mechanic's Custom OP-SKS", "Mech OP-SKS", "Mechanic has done custom work to this OP-SKS: the trigger components have been polished and the springs lightened for a lighter and cleaner trigger pull. The gas system has been modified to make the rifle softer shooting, at the expense of reliability. Lightening cuts have reduced the weight of the rifle as well as improving balance. The rifle has also been accuraized as much as an SKS can be.");
        this.addToMastering("mechOPSKSv1", "SKS");
        this.addCustomWeapsToQuests("587e02ff24597743df3deaeb", "mechOPSKSv1");
        //Mechanic custom STM
        this.cloneWeapons("60339954d62c9b14ed777c06", "mechSTM9v1", "violet");
        this.addToHandbook("mechSTM9v1", "5b5f796a86f774093f2ed3c0", 15000);
        this.addToLocale("mechSTM9v1", "Mechanic's Custom STM-9", "Mech STM-9", "Mechanic has done custom work to this STM-9: a device that allows the STM to fire in full auto has been installed. However, due to the makeshift nature of the modifcation, it is now only capable of full auto fire and reliability has been decreased.");
        this.addToMastering("mechSTM9v1", "M4");
        this.addCustomWeapsToQuests("60339954d62c9b14ed777c06", "mechSTM9v1");
        //Mechanic custom Saiga12k
        this.cloneWeapons("576165642459773c7a400233", "mechSaiga12v1", "violet");
        this.addToHandbook("mechSaiga12v1", "5b5f794b86f77409407a7f92", 15000);
        this.addToLocale("mechSaiga12v1", "Mechanic's Custom Saiga 12k", "Mech Saiga12", "Mechanic has done custom work to this Saiga 12k: the guide rails have been polished, making the action cycle more smoothly which aids with recoil and reliability. The feedramp has been polished, further increasing reliability. The gas system and recoil spring have been modified, further reducing recoil.");
        this.addToMastering("mechSaiga12v1", "AKM");
        this.addCustomWeapsToQuests("576165642459773c7a400233", "mechSaiga12v1");
        //Mechanic custom Benelli M3
        this.cloneWeapons("6259b864ebedf17603599e88", "mechM3v1", "violet");
        this.addToHandbook("mechM3v1", "5b5f794b86f77409407a7f92", 20000);
        this.addToLocale("mechM3v1", "Mechanic's Custom Benelli M3", "Mech M3", "Mechanic has done custom work to this Benelli M3: the loading port has been modifed to make reloading easier and faster. The bolt carrier and trigger has been polished to allow smoother cycling and a faster rate of fire, which also makes manipulating the chamber faster. The recoil spring has been lightened to further increase the rate of fire. The gas system has also been modified to reduce the felt recoil and durability burn, at the cost of reliability.");
        this.addToMastering("mechM3v1", "MP153");
        this.addCustomWeapsToQuests("6259b864ebedf17603599e88", "mechM3v1");
        //Skier .366 Vepr
        this.cloneWeapons("59e6687d86f77411d949b251", "Skier209", "orange");
        this.addToHandbook("Skier209", "5b5f78e986f77447ed5636b1", 10000);
        this.addToLocale("Skier209", "Skier's Custom VPO-209", "Skier VPO-209", "Skier has crudely modified this VPO-209 to fire fully automatic. Due to the makeshift nature of this modification, the rifle is now full auto only and reliability is reduced.");
        this.addToMastering("Skier209", "AKM");
        this.addCustomWeapsToQuests("59e6687d86f77411d949b251", "Skier209");
    }
    createCustomAttachments() {
        //Mechanic custom ar15 260mm barrel
        this.cloneAttachments("55d35ee94bdc2d61338b4568", "mechAR15_260mm", "violet");
        this.addToHandbook("mechAR15_260mm", "5b5f75c686f774094242f19f", 10000);
        this.addToLocale("mechAR15_260mm", "Mechanic's Custom 260mm AR-15 Barrel", "Mech AR 260mm", "Mechanic imported a batch of barrel blanks from overseas before the conflict began, and has started putting them to use. This 260mm barrel has a precisiely machined crown, increasing precision. Most significantly, the gasport is not enlarged as most short AR-15 barrels typically do. This means reduced recoil and durability burn, at the expense of reduced realiabilty due to the short dwell time. To effecitvely use this barrel it should be paired with attachments that increase reliability.");
        this.pushAttToFilters("55d35ee94bdc2d61338b4568", "mechAR15_260mm");
        //366 AKM Muzzle Break Compensator
        this.cloneAttachments("59e61eb386f77440d64f5daf", "mechSlant_366", "violet");
        this.addToHandbook("mechSlant_366", "5b5f724c86f774093f2ecf15", 1000);
        this.addToLocale("mechSlant_366", "Mechanic's Custom .366 AKM-Style Muzzle Brake", ".366 TKM Brake", "Mechanic bored out this brake to accomodate .366 TKM.");
        this.pushAttToFilters("5a9fbb74a2750c0032157181", "mechSlant_366");
        //366 Spikes Tactical Comp
        this.cloneAttachments("5a9ea27ca2750c00137fa672", "mechSpikes_366", "violet");
        this.addToHandbook("mechSpikes_366", "5b5f724c86f774093f2ecf15", 6000);
        this.addToLocale("mechSpikes_366", "Mechanic's Custom .366 TKM Spikes Tactical Dynacomp", ".366 TKM Dynacomp", "Mechanic bored out this compensator to accomodate .366 TKM.");
        this.pushAttToFilters("5a9fbb74a2750c0032157181", "mechSpikes_366");
        //366 Zenit DTK Comp
        this.cloneAttachments("5649ab884bdc2ded0b8b457f", "mechDTK_366", "violet");
        this.addToHandbook("mechDTK_366", "5b5f724c86f774093f2ecf15", 8000);
        this.addToLocale("mechDTK_366", "Mechanic's Custom .366 TKM Zenit DTK-1", ".366 TKM DTK-1", "Mechanic bored out this compensator to accomodate .366 TKM.");
        this.pushAttToFilters("5a9fbb74a2750c0032157181", "mechDTK_366");
        //366 JMAC Comp
        this.cloneAttachments("5f633f68f5750b524b45f112", "mechJMAC_366", "violet");
        this.addToHandbook("mechJMAC_366", "5b5f724c86f774093f2ecf15", 16000);
        this.addToLocale("mechJMAC_366", "Mechanic's Custom .366 TKM JMac RRD-4C", ".366 TKM RRD-4C", "Mechanic bored out this compensator to accomodate .366 TKM.");
        this.pushAttToFilters("5a9fbb74a2750c0032157181", "mechJMAC_366");
    }
    addCustomWeapsToQuests(targetWeap, weapToAdd) {
        for (let quest in this.questDB) {
            let conditions = this.questDB[quest].conditions.AvailableForFinish[0];
            if (conditions._parent === "CounterCreator") {
                let killConditions = conditions._props.counter.conditions[0];
                if (killConditions._parent === "Kills" && killConditions._props?.weapon !== undefined) {
                    if (killConditions._props.weapon.includes(targetWeap)) {
                        killConditions._props.weapon.push(weapToAdd);
                    }
                }
            }
        }
    }
    addToMastering(id, masteringCat) {
        let mastering = this.tables.globals.config.Mastering;
        for (let cat in mastering) {
            if (mastering[cat].Name === masteringCat) {
                mastering[cat].Templates.push(id);
            }
        }
    }
    pushAttToFilters(orignalId, newID) {
        var itemDB = this.tables.templates.items;
        for (let item in itemDB) {
            for (let slot in itemDB[item]._props.Slots) {
                if (itemDB[item]._props.Slots[slot]._props?.filters !== undefined && itemDB[item]._props.Slots[slot]._props.filters[0].Filter.includes(orignalId)) {
                    itemDB[item]._props.Slots[slot]._props.filters[0].Filter.push(newID);
                }
            }
            if (itemDB[item]._props?.ConflictingItems !== undefined && itemDB[item]._props.ConflictingItems.includes(orignalId)) {
                itemDB[item]._props.ConflictingItems.push(newID);
            }
        }
    }
    cloneAttachments(itemToClone, newItemID, color) {
        this.cloneItem(itemToClone, newItemID);
        let itemID = this.itemDB[newItemID];
        itemID._props.BackgroundColor = color;
        if (this.modConfig.logEverything == true) {
            this.logger.info("Item " + itemID._id + " Added");
        }
    }
    cloneWeapons(itemToClone, newItemID, color) {
        this.cloneItem(itemToClone, newItemID);
        let itemID = this.itemDB[newItemID];
        itemID._props.BackgroundColor = color;
        if (this.modConfig.logEverything == true) {
            this.logger.info("Item " + itemID._id + " Added");
        }
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
            this.logger.info("Item " + itemID._id + " Added");
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
        const nameId = `${id}` + " Name";
        const shortnameId = `${id}` + " ShortName";
        const descriptionId = `${id}` + " Description";
        const locales = this.tables.locales.global;
        for (let lang in locales) {
            locales[lang][nameId] = name;
            locales[lang][shortnameId] = shortname;
            locales[lang][descriptionId] = description;
        }
    }
    cloneItem(itemtoClone, newitemID) {
        this.itemDB[newitemID] = this.jsonUtil.clone(this.itemDB[itemtoClone]);
        this.itemDB[newitemID]._id = newitemID;
        if (this.modConfig.logEverything == true) {
            this.logger.info(this.itemDB[itemtoClone]._name + " cloned");
        }
    }
    addToHideout(craft) {
        this.tables.hideout.production.push(craft);
    }
}
exports.ItemCloning = ItemCloning;
