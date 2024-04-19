

import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { IHideoutProduction } from "@spt-aki/models/eft/hideout/IHideoutProduction";
import { IQuest } from "@spt-aki/models/eft/common/tables/IQuest";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

export class ItemCloning {
    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConfig, private jsonUtil: JsonUtil, private medItems, private crafts) { }

    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }
    questDB(): Record<string, IQuest> {
        return this.tables.templates.quests;
    }

    public createCustomMedItems() {
        //SJO Regen
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "SJ0",
            this.medItems.SJ0.MaxHpResource,
            this.medItems.SJ0.medUseTime,
            this.medItems.SJ0.hpResourceRate,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            this.medItems.SJ0.effects_damage,
            {}
        );
        this.addToHandbook("SJ0", "5b47574386f77428ca22b33a", 30000);
        this.addToLocale("SJ0", "SJ0 TGLabs Combat Stimulant Injector", "SJ0", "TerraGroup Labs' first attempt at a combat stimulant with regenerative properties. Despite reports of initial trials being promising, in-theatre testing by USEC operatives proved disasterous due to extensive unreported side-effects. The stimulant was later recalled for disposal, but shady characters in the Tarkov region managed to intercept significant quanities of the product and still peddle it to this day, often resusing old Adrenaline injector casings or whatver they can get their hands on.");

        //Adrenal Debuffs
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "adrenal_debuff",
            0,
            2,
            0,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            {},
            {}
        );
        this.addToHandbook("adrenal_debuff", "5b47574386f77428ca22b33a", 1);
        this.addToLocale("adrenal_debuff", "Adrenal Debuff", "Adrenal", "If you are seeing this outside of the handbook, something has gone wrong.");

        //Regen Debuff
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "regen_debuff",
            0,
            2,
            0,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            {},
            {}
        );
        this.addToHandbook("regen_debuff", "5b47574386f77428ca22b33a", 1);
        this.addToLocale("regen_debuff", "Regen Debuff", "Regen", "If you are seeing this outside of the handbook, something has gone wrong.");

        //Clotting Debuffs
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "clotting_debuff",
            0,
            2,
            0,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            {},
            {}
        );
        this.addToHandbook("clotting_debuff", "5b47574386f77428ca22b33a", 1);
        this.addToLocale("clotting_debuff", "Clotting Debuff", "Clotting", "If you are seeing this outside of the handbook, something has gone wrong.");

        //Weight Debuffs
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "weight_debuff",
            0,
            2,
            0,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            {},
            {}
        );
        this.addToHandbook("weight_debuff", "5b47574386f77428ca22b33a", 1);
        this.addToLocale("weight_debuff", "Weight Debuff", "Weight", "If you are seeing this outside of the handbook, something has gone wrong.");

        //Performance Debuffs
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "performance_debuff",
            0,
            2,
            0,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            {},
            {}
        );
        this.addToHandbook("performance_debuff", "5b47574386f77428ca22b33a", 1);
        this.addToLocale("performance_debuff", "Performance Debuff", "Performance", "If you are seeing this outside of the handbook, something has gone wrong.");

        //Generic Debuffs
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "generic_debuff",
            0,
            2,
            0,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            {},
            {}
        );
        this.addToHandbook("generic_debuff", "5b47574386f77428ca22b33a", 1);
        this.addToLocale("generic_debuff", "Generic Debuff", "Generic", "If you are seeing this outside of the handbook, something has gone wrong.");

        //Damage Debuffs
        this.cloneMedicalItem(
            "5c10c8fd86f7743d7d706df3",
            "damage_debuff",
            0,
            2,
            0,
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_loot.bundle",
            "assets/content/weapons/usable_items/item_syringe/item_stimulator_adrenaline_container.bundle",
            "blue",
            {},
            {}
        );
        this.addToHandbook("damage_debuff", "5b47574386f77428ca22b33a", 1);
        this.addToLocale("damage_debuff", "Damage Debuff", "Damage", "If you are seeing this outside of the handbook, something has gone wrong.");
    }

    public createCustomWeapons() {
        //Mechanic custom SKS
        this.cloneGenericItem("574d967124597745970e7c94", "mechSKSv1", "violet");
        this.addToHandbook("mechSKSv1", "5b5f78e986f77447ed5636b1", 12500);
        this.addToLocale("mechSKSv1", "Mechanic's Custom SKS", "Mech SKS", "Mechanic has done custom work to this SKS: the trigger components have been polished and the springs lightened for a lighter and cleaner trigger pull. The gas system has been modified to make the rifle softer shooting, at the expense of reliability. Lightening cuts have reduced the weight of the rifle as well as improving balance.");
        this.addToMastering("mechSKSv1", "SKS");
        this.addCustomWeapsToQuests("", "mechSKSv1");

        //Mechanic custom OP-SKS
        this.cloneGenericItem("587e02ff24597743df3deaeb", "mechOPSKSv1", "violet");
        this.addToHandbook("mechOPSKSv1", "5b5f78e986f77447ed5636b1", 15000);
        this.addToLocale("mechOPSKSv1", "Mechanic's Custom OP-SKS", "Mech OP-SKS", "Mechanic has done custom work to this OP-SKS: the trigger components have been polished and the springs lightened for a lighter and cleaner trigger pull. The gas system has been modified to make the rifle softer shooting, at the expense of reliability. Lightening cuts have reduced the weight of the rifle as well as improving balance. The rifle has also been accuraized as much as an SKS can be.");
        this.addToMastering("mechOPSKSv1", "SKS");
        this.addCustomWeapsToQuests("587e02ff24597743df3deaeb", "mechOPSKSv1");

        //Mechanic custom STM
        this.cloneGenericItem("60339954d62c9b14ed777c06", "mechSTM9v1", "violet");
        this.addToHandbook("mechSTM9v1", "5b5f796a86f774093f2ed3c0", 15000);
        this.addToLocale("mechSTM9v1", "Mechanic's Custom STM-9", "Mech STM-9", "Mechanic has done custom work to this STM-9: a device that allows the STM to fire in full auto has been installed. However, due to the makeshift nature of the modifcation, it is now only capable of full auto fire and reliability has been decreased.");
        this.addToMastering("mechSTM9v1", "M4");
        this.addCustomWeapsToQuests("60339954d62c9b14ed777c06", "mechSTM9v1");

        //Mechanic custom Saiga12k
        this.cloneGenericItem("576165642459773c7a400233", "mechSaiga12v1", "violet");
        this.addToHandbook("mechSaiga12v1", "5b5f794b86f77409407a7f92", 15000);
        this.addToLocale("mechSaiga12v1", "Mechanic's Custom Saiga 12k", "Mech Saiga12", "Mechanic has done custom work to this Saiga 12k: the guide rails have been polished, making the action cycle more smoothly which aids with recoil and reliability. The feedramp has been polished, further increasing reliability. The gas system and recoil spring have been modified, further reducing recoil.");
        this.addToMastering("mechSaiga12v1", "AKM");
        this.addCustomWeapsToQuests("576165642459773c7a400233", "mechSaiga12v1");

        //Mechanic custom Benelli M3
        this.cloneGenericItem("6259b864ebedf17603599e88", "mechM3v1", "violet");
        this.addToHandbook("mechM3v1", "5b5f794b86f77409407a7f92", 20000);
        this.addToLocale("mechM3v1", "Mechanic's Custom Benelli M3", "Mech M3", "Mechanic has done custom work to this Benelli M3: the loading port has been modifed to make reloading easier and faster. The bolt carrier and trigger has been polished to allow smoother cycling and a faster rate of fire, which also makes manipulating the chamber faster. The recoil spring has been lightened to further increase the rate of fire. The gas system has also been modified to reduce the felt recoil and durability burn, at the cost of reliability.");
        this.addToMastering("mechM3v1", "MP153");
        this.addCustomWeapsToQuests("6259b864ebedf17603599e88", "mechM3v1");

        //Skier .366 Vepr
        this.cloneGenericItem("59e6687d86f77411d949b251", "Skier209", "orange");
        this.addToHandbook("Skier209", "5b5f78e986f77447ed5636b1", 10000);
        this.addToLocale("Skier209", "Skier's Custom VPO-209", "Skier VPO-209", "Skier has crudely modified this VPO-209 to fire fully automatic. Due to the makeshift nature of this modification, the rifle is now full auto only and reliability is reduced.");
        this.addToMastering("Skier209", "AKM");
        this.addCustomWeapsToQuests("59e6687d86f77411d949b251", "Skier209");

        //add shotguns to inventory slot filters because BSG:
        let defaultInventory = this.itemDB()["55d7217a4bdc2d86028b456d"]._props;
        defaultInventory.Slots[0]._props.filters[0].Filter.push("5447b6094bdc2dc3278b4567");
        defaultInventory.Slots[1]._props.filters[0].Filter.push("5447b6094bdc2dc3278b4567");
    }

    public createCustomPlates() {
        //XSAPI Chest Plate
        this.cloneGenericItem("64afdcb83efdfea28601d041", "xsapi_chest", "blue");
        this.addToHandbook("xsapi_chest", "5b5f704686f77447ec5d76d7", 95000);
        this.addToLocale("xsapi_chest", "XSAPI Ballistic Plate", "XSAPI", "An XSAPI plate, or Extra Small Arms Protective Insert plate, is designed to exceed the level of protection provided by SAPI and ESAPI");
        this.pushItemToSlots("64afdcb83efdfea28601d041", "xsapi_chest");

        //Osprey MK4 plates
        this.cloneGenericItem("64afdcb83efdfea28601d041", "mk4a_plate", "blue");
        this.addToHandbook("mk4a_plate", "5b5f704686f77447ec5d76d7", 70000);
        this.addToLocale("mk4a_plate", "Osprey MK4 Ballistic Plate", "Osprey MK4 Plate", "Plates designed for use with the Osrpey series of body armor, issued to the British Armed Forces.");
        this.pushItemToSlots("64afdcb83efdfea28601d041", "mk4a_plate");
    }


    public createCustomAttachments() {

        //Mechanic SKS .366 TKM Barrel
        this.cloneGenericItem("634f02331f9f536910079b51", "mechSKS_366", "violet");
        this.addToHandbook("mechSKS_366", "5b5f75c686f774094242f19f", 15000);
        this.addToLocale("mechSKS_366", "SKS .366 TKM 520mm barrel", "SKS .366 520mm", "A 520mm barrel for SKS rifle chambered in .366 TKM.");
        this.pushItemToSlots("634f02331f9f536910079b51", "mechSKS_366");

        //Mechanic VPO-215 23inch 7.62x39 Barrel
        this.cloneGenericItem("5de65547883dde217541644b", "mechVPO_23", "violet");
        this.addToHandbook("mechVPO_23", "5b5f75c686f774094242f19f", 15000);
        this.addToLocale("mechVPO_23", "VPO-215 \"Gornostay\" 7.62x39mm 23 inch barrel", "215 7.62x39 23\"", "A 23 inch (600mm) barrel for VPO-215 rifle chambered in 7.62x39mm.");
        this.pushItemToSlots("5de65547883dde217541644b", "mechVPO_23");

        //Mechanic RatWorx AUG .300 BLk Adapter
        this.cloneGenericItem("630f27f04f3f6281050b94d7", "mechRatWorx", "violet");
        this.addToHandbook("mechRatWorx", "5b5f724c86f774093f2ecf15", 15000);
        this.addToLocale("mechRatWorx", "Steyr AUG RAT Worx .300 BLK muzzle device adapter", "RatWorx .300BLK", "The RAT Worx adapter allows to install various AR-10 muzzle devices on .300 BLK AUG rifles. Manufactured by Research And Testing Worx.");

        //Mechanic AUG 406mm 300blk Barrel
        this.cloneGenericItem("5c48a2852e221602b21d5923", "mechMDR_406", "violet");
        this.addToHandbook("mechMDR_406", "5b5f75c686f774094242f19f", 15000);
        this.addToLocale("mechMDR_406", "MDR .300 BLK 16 inch barrel", "MDR 300BLK 16\"", "A 16 inch (406mm) barrel for MDR based weapons for .300 BLK ammo.");
        this.pushItemToSlots("5c48a2852e221602b21d5923", "mechMDR_406");

        //Mechanic MDR 406mm 300blk Barrel
        this.cloneGenericItem("630e39c3bd357927e4007c15", "mechAUG_417", "violet");
        this.addToHandbook("mechAUG_417", "5b5f75c686f774094242f19f", 15000);
        this.addToLocale("mechAUG_417", "Steyr AUG A3 .300 BLK 16 inch barrel", "A3 300BLK 16\"", "A barrel for Steyr AUG A3 designed for .300 BLK ammo, 16 inches (417mm) long.");
        this.pushItemToSlots("630e39c3bd357927e4007c15", "mechAUG_417");

        //Mechanic MCX 171mm 5.56 Barrel
        this.cloneGenericItem("5fbbfabed5cb881a7363194e", "mechMCX_171mm", "violet");
        this.addToHandbook("mechMCX_171mm", "5b5f75c686f774094242f19f", 15000);
        this.addToLocale("mechMCX_171mm", "MCX 5.56x45mm 171mm barrel", "MCX 171mm 5.56", "A 171mm barrel for MCX-based weapons, chambered in 5.56x45mm.");
        this.pushItemToSlots("5fbbfabed5cb881a7363194e", "mechMCX_171mm");

        //Mechanic MCX 229mm 5.56 Barrel
        this.cloneGenericItem("5fbbfacda56d053a3543f799", "mechMCX_229mm", "violet");
        this.addToHandbook("mechMCX_229mm", "5b5f75c686f774094242f19f", 15000);
        this.addToLocale("mechMCX_229mm", "MCX 5.56x45mm 229mm barrel", "MCX 229mm 5.56", "A 229mm barrel for MCX-based weapons, chambered in 5.56x45mm.");
        this.pushItemToSlots("5fbbfacda56d053a3543f799", "mechMCX_229mm");

        //Mechanic SPEAR 330mm .308 Barrel
        this.cloneGenericItem("652910565ae2ae97b80fdf35", "mechSpear_330mm", "violet");
        this.addToHandbook("mechSpear_330mm", "5b5f75c686f774094242f19f", 15000);
        this.addToLocale("mechSpear_330mm", "MCX SPEAR 7.62x51 330mm barrel", "SPEAR 330mm .308", "A 13 inch (330mm) barrel for the MCX SPEAR assault rifle chambered in 7.62x51 (.308 Winchester) ammo. Manufactured by SIG Sauer.");
        this.pushItemToSlots("652910565ae2ae97b80fdf35", "mechSpear_330mm");

        //Mechanic custom ar15 260mm barrel
        this.cloneGenericItem("55d35ee94bdc2d61338b4568", "mechAR15_260mm", "violet");
        this.addToHandbook("mechAR15_260mm", "5b5f75c686f774094242f19f", 10000);
        this.addToLocale("mechAR15_260mm", "Mechanic's Custom 260mm AR-15 Barrel", "Mech AR 260mm", "Mechanic imported a batch of barrel blanks from overseas before the conflict began, and has started putting them to use. This 260mm barrel has a precisiely machined crown, increasing precision. Most significantly, the gasport is not enlarged as most short AR-15 barrels typically do. This means reduced recoil and durability burn, at the expense of reduced realiabilty due to the short dwell time. To effecitvely use this barrel it should be paired with attachments that increase reliability.");
        this.pushItemToSlots("55d35ee94bdc2d61338b4568", "mechAR15_260mm");

        //366 AKM Muzzle Break Compensator
        this.cloneGenericItem("59e61eb386f77440d64f5daf", "mechSlant_366", "violet");
        this.addToHandbook("mechSlant_366", "5b5f724c86f774093f2ecf15", 3000);
        this.addToLocale("mechSlant_366", "Mechanic's Custom .366 AKM-Style Muzzle Brake", ".366 TKM Brake", "Mechanic bored out this brake to accomodate .366 TKM.");
        this.pushItemToSlots("5a9fbb74a2750c0032157181", "mechSlant_366");

        //366 Spikes Tactical Comp
        this.cloneGenericItem("5a9ea27ca2750c00137fa672", "mechSpikes_366", "violet");
        this.addToHandbook("mechSpikes_366", "5b5f724c86f774093f2ecf15", 8000);
        this.addToLocale("mechSpikes_366", "Mechanic's Custom .366 TKM Spikes Tactical Dynacomp", ".366 TKM Dynacomp", "Mechanic bored out this compensator to accomodate .366 TKM.");
        this.pushItemToSlots("5a9fbb74a2750c0032157181", "mechSpikes_366");

        //366 Zenit DTK Comp
        this.cloneGenericItem("5649ab884bdc2ded0b8b457f", "mechDTK_366", "violet");
        this.addToHandbook("mechDTK_366", "5b5f724c86f774093f2ecf15", 10000);
        this.addToLocale("mechDTK_366", "Mechanic's Custom .366 TKM Zenit DTK-1", ".366 TKM DTK-1", "Mechanic bored out this compensator to accomodate .366 TKM.");
        this.pushItemToSlots("5a9fbb74a2750c0032157181", "mechDTK_366");

        //366 JMAC Comp
        this.cloneGenericItem("5f633f68f5750b524b45f112", "mechJMAC_366", "violet");
        this.addToHandbook("mechJMAC_366", "5b5f724c86f774093f2ecf15", 20000);
        this.addToLocale("mechJMAC_366", "Mechanic's Custom .366 TKM JMac RRD-4C", ".366 TKM RRD-4C", "Mechanic bored out this compensator to accomodate .366 TKM.");
        this.pushItemToSlots("5a9fbb74a2750c0032157181", "mechJMAC_366");
    }


    private addCustomWeapsToQuests(originalWeapon: string, weapToAdd: string) {
        for (let q in this.questDB()) {
            let quest = this.questDB()[q];

            if (!quest?.conditions?.AvailableForFinish) continue;

            let availForFin = quest.conditions.AvailableForFinish;
            for (let r in availForFin) {
                let requirement = availForFin[r];

                if (requirement.conditionType !== "CounterCreator" || !requirement.counter?.conditions) continue;

                for (let c in requirement.counter.conditions) {
                    let subCondition = requirement.counter.conditions[c];
                    if (subCondition.conditionType == "Kills" && subCondition.weapon && subCondition.weapon.includes(originalWeapon)) {
                        subCondition.weapon.push(weapToAdd);
                    }
                }
            }
        }
    }

    private addToMastering(id: string, masteringCat: string) {
        let mastering = this.tables.globals.config.Mastering;
        for (let cat in mastering) {
            if (mastering[cat].Name === masteringCat) {
                mastering[cat].Templates.push(id);
            }
        }
    }

    private pushItemToSlots(orignalId: string, newID: string) {
        for (let item in this.itemDB()) {
            for (let slot in this.itemDB()[item]._props.Slots) {
                if (this.itemDB()[item]._props.Slots[slot]._props?.filters !== undefined && this.itemDB()[item]._props.Slots[slot]._props.filters[0].Filter.includes(orignalId)) {
                    this.itemDB()[item]._props.Slots[slot]._props.filters[0].Filter.push(newID);
                }
            }
            if (this.itemDB()[item]._props?.ConflictingItems !== undefined && this.itemDB()[item]._props.ConflictingItems.includes(orignalId)) {
                this.itemDB()[item]._props.ConflictingItems.push(newID);
            }
        }
    }

    private cloneGenericItem(itemToClone: string, newItemID: string, color: string) {
        this.cloneItem(itemToClone, newItemID);
        let itemID = this.itemDB()[newItemID];
        itemID._props.BackgroundColor = color;
        if (this.modConfig.logEverything == true) {
            this.logger.info("Item " + itemID._id + " Added");
        }
    }


    private cloneMedicalItem(itemToClone: string, newItemID: string, maxHpResource: number, medUseTime: number, hpResourceRate: number, prefabePath: string, usePrefabPath: string, color: string, effectsDamage: any, effectsHealth: any) {
        this.cloneItem(itemToClone, newItemID);
        let itemID = this.itemDB()[newItemID];
        itemID._props.MaxHpResource = maxHpResource;
        itemID._props.medUseTime = medUseTime;
        itemID._props.hpResourceRate = hpResourceRate;
        itemID._props.Prefab.path = prefabePath;
        itemID._props.UsePrefab.path = usePrefabPath;
        itemID._props.BackgroundColor = color;
        itemID._props.effects_damage = effectsDamage;
        itemID._props.effects_health = effectsHealth;
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

    public addToLocale(id: string, name: string, shortname: string, description: string) {

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

    private cloneItem(itemtoClone: string, newitemID: string) {
        this.itemDB()[newitemID] = this.jsonUtil.clone(this.itemDB()[itemtoClone])
        this.itemDB()[newitemID]._id = newitemID;
        if (this.modConfig.logEverything == true) {
            this.logger.info(this.itemDB()[itemtoClone]._name + " cloned");
        }
    }
}