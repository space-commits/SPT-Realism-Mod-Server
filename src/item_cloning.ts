

import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../types/models/spt/utils/ILogger";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { IHideoutProduction } from "@spt-aki/models/eft/hideout/IHideoutProduction";

export class ItemCloning {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig, private jsonUtil: JsonUtil, private medItems, private crafts) { }

    private itemDB = this.tables.templates.items;
    private locales = this.tables.locales.global["en"];


    public createCustomMedItems() {
        //Tier 1 Medkit
        this.cloneMedicalItem(
            "5755356824597772cb798962",
            "TIER1MEDKIT",
            this.medItems.TIER1MEDKIT.MaxHpResource,
            this.medItems.TIER1MEDKIT.medUseTime,
            this.medItems.TIER1MEDKIT.hpResourceRate,
            "assets/content/items/barter/item_barter_meds_tools/item_barter_meds_tools.bundle",
            "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_container.bundle",
            "yellow ",
            this.medItems.TIER1MEDKIT.effects_damage
        );
        this.addToHandbook("TIER1MEDKIT", "5b47574386f77428ca22b338", 10000);
        this.addToLocale("TIER1MEDKIT", "Makeshift Medical Kit", "TIER1", "A makeshift medical kit used for healing minor wounds that have been already stabilized in the field. Not suitable for use in the field.");
        this.addToHideout(this.crafts.Tier1Medkit);
        //Tier 2 Medkit
        this.cloneMedicalItem(
            "5755356824597772cb798962",
            "TIER2MEDKIT",
            this.medItems.TIER2MEDKIT.MaxHpResource,
            this.medItems.TIER2MEDKIT.medUseTime,
            this.medItems.TIER2MEDKIT.hpResourceRate,
            "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_loot.bundle",
            "assets/content/weapons/usable_items/item_meds_core_medical_surgical_kit/item_meds_core_medical_surgical_kit_container.bundle",
            "blue",
            this.medItems.TIER2MEDKIT.effects_damage
        );
        this.addToHandbook("TIER2MEDKIT", "5b47574386f77428ca22b338", 20000);
        this.addToLocale("TIER2MEDKIT", "Improved Makeshift Medical Kit", "TIER2", "An improved makeshift medical kit used for healing wounds that have been already stabilized in the field. Not suitable for use in the field.");
        this.addToHideout(this.crafts.Tier2Medkit);
        //Tier 3 Medkit
        this.cloneMedicalItem(
            "5755356824597772cb798962",
            "TIER3MEDKIT",
            this.medItems.TIER3MEDKIT.MaxHpResource,
            this.medItems.TIER3MEDKIT.medUseTime,
            this.medItems.TIER3MEDKIT.hpResourceRate,
            "assets/content/weapons/usable_items/item_meds_survival_first_aid_rollup_kit/item_meds_survival_first_aid_rollup_kit_loot.bundle",
            "assets/content/weapons/usable_items/item_meds_survival_first_aid_rollup_kit/item_meds_survival_first_aid_rollup_kit_container.bundle",
            "violet",
            this.medItems.TIER3MEDKIT.effects_damage
        );
        this.addToHandbook("TIER3MEDKIT", "5b47574386f77428ca22b338", 30000);
        this.addToLocale("TIER3MEDKIT", "High-Grade Makeshift Medical Kit", "TIER3", "A high-grade makeshift medical kit used for healing more severe wounds that have been already stabilized in the field. Not suitable for use in the field.");
        this.addToHideout(this.crafts.Tier3Medkit);
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

    public createCustomWeapons() {
        //Mechanic custom SKS
        this.cloneWeapons("574d967124597745970e7c94", "mechSKSv1", "violet");
        this.addToHandbook("mechSKSv1", "5b5f78e986f77447ed5636b1", 25000);
        this.addToLocale("mechSKSv1", "Mechanic's Custom SKS", "Mech SKS", "Mechanic has done custom work to this SKS: the trigger components have been polished and the springs lightened for a lighter and cleaner trigger pull. The gas system has been modified to make the rifle softer shooting, at the expense of reliability. Lightening cuts have reduced the weight of the rifle as well as improving balance. \n\nSoviet semi-automatic carbine designed by Sergei Simonov for 7.62x39 cartridge and known abroad as SKS-45. Immensely popular both in CIS countries and in the West, this weapon is still in active service in some countries in form of various copies and modifications. This particular specimen comes from extended storage warehouses of Tula Arms Plant and haven't yet undergone the civilian weapon normalization procedure.");
        this.addToMastering("mechSKSv1", "SKS");

        //Mechanic custom OP-SKS
        this.cloneWeapons("587e02ff24597743df3deaeb", "mechOPSKSv1", "violet");
        this.addToHandbook("mechOPSKSv1", "5b5f78e986f77447ed5636b1", 30000);
        this.addToLocale("mechOPSKSv1", "Mechanic's Custom OP-SKS", "Mech OP-SKS", "Mechanic has done custom work to this OP-SKS: the trigger components have been polished and the springs lightened for a lighter and cleaner trigger pull. The gas system has been modified to make the rifle softer shooting, at the expense of reliability. Lightening cuts have reduced the weight of the rifle as well as improving balance. The rifle has also been accuraized as much as an SKS can be. \n\nMolot OP-SKS Carbine is designed for loading with 7.62x39 - the most popular ammunition. The weight and dimensions make the carbine ergonomic for shooters of any age and height. It has been used for all types of traditional Russian hunting for more than 50 years. Tested on predators in Africa, Southeast Asia, Central America, Middle East..");
        this.addToMastering("mechOPSKSv1", "SKS");

        //Mechanic custom STM
        this.cloneWeapons("60339954d62c9b14ed777c06", "mechSTM9v1", "violet");
        this.addToHandbook("mechSTM9v1", "5b5f796a86f774093f2ed3c0", 30000);
        this.addToLocale("mechSTM9v1", "Mechanic's Custom STM-9", "Mech STM-9", "Mechanic has done custom work to this STM-9: a device that allows the STM to fire in full auto has been installed. However, due to the makeshift nature of the modifcation, it is now only capable of full auto fire and reliability has been decreased.   \n\nA PCC carbine with excellent performance already \"out of the box\". Designed with the participation of world bronze medalist in Semi-Auto Rifle Vadim Mikhailov. Accuracy, speed, comfort of recoil.");
        this.addToMastering("mechSTM9v1", "M4");
    }

    private addToMastering(id: string, masteringCat: string) {
        let mastering = this.tables.globals.config.Mastering;
        for (let cat in mastering){
            if (mastering[cat].Name === masteringCat){
                mastering[cat].Templates.push(id);
            }
        }   
    }

    private cloneWeapons(itemToClone: string, newItemID: string, color: string) {
        this.cloneItem(itemToClone, newItemID);
        let itemID = this.itemDB[newItemID];
        itemID._props.BackgroundColor = color;
        if (this.modConfig.logEverything == true) {
            this.logger.info("Item " + itemID._id + " Added");
        }
    }


    private cloneMedicalItem(itemToClone: string, newItemID: string, maxHpResource: number, medUseTime: number, hpResourceRate: number, prefabePath: string, usePrefabPath: string, color: string, effectsDamage: JSON) {
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

    private addToHandbook(id: string, parentID: string, price: number) {

        this.tables.templates.handbook.Items.push(
            {
                "Id": id,
                "ParentId": parentID,
                "Price": price
            }
        );
    }
    private addToLocale(id: string, name: string, shortname: string, description: string) {

        const nameId = `${id}` + " Name";
        const shortnameId = `${id}` + " ShortName";
        const descriptionId = `${id}` + " Description";

        this.locales[nameId] = name;
        this.locales[shortnameId] = shortname;
        this.locales[descriptionId] = description;
    }

    private cloneItem(itemtoClone: string, newitemID: string) {
        this.itemDB[newitemID] = this.jsonUtil.clone(this.itemDB[itemtoClone])
        this.itemDB[newitemID]._id = newitemID;
        if (this.modConfig.logEverything == true) {
            this.logger.info(this.itemDB[itemtoClone]._name + " cloned");
        }
    }

    private addToHideout(craft: IHideoutProduction) {
        this.tables.hideout.production.push(
            craft
        );
    }

}