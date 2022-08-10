
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";


const medRevertCount = require("../db/saved/info.json");

const dir = __dirname;
const dirArray = dir.split("\\");
const modFolder = (`${dirArray[dirArray.length - 4]}/${dirArray[dirArray.length - 3]}/${dirArray[dirArray.length - 2]}/`);

export class Helper{

    constructor(private tables: IDatabaseTables, private arrays, private logger) { }

    // public array = new Arrays(this.tables);
    
    public itemDB = this.tables.templates.items;
    public array = this.arrays;
    public medItems = this.array.stash_meds;

    public correctMedItems(profileData, pmcEXP) {
        var inventProp = profileData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < profileData.Inventory.items.length; i++) {
                var itemProp = profileData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (profileData.Inventory.items[i]._tpl === this.medItems[j]
                            && profileData.Inventory.items[i].upd.MedKit.HpResource > this.itemDB[this.medItems[j]]._props.MaxHpResource) {
                                profileData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                        if (pmcEXP == 0 && profileData.Inventory.items[i]._tpl === this.medItems[j]) {
                            profileData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }

    public revertMedItems(profileData) {
        var inventProp = profileData?.Inventory;
        if (inventProp !== undefined) {
            for (var i = 0; i < profileData.Inventory.items.length; i++) {
                var itemProp = profileData.Inventory.items[i]?.upd?.MedKit?.HpResource;
                if (itemProp !== undefined) {
                    for (var j = 0; j < this.medItems.length; j++) {
                        if (profileData.Inventory.items[i]._tpl === this.medItems[j]) {
                            profileData.Inventory.items[i].upd.MedKit.HpResource = this.itemDB[this.medItems[j]]._props.MaxHpResource;
                        }
                    }
                }
            }
        }
    }

    public saveToJSONFile(data, filePath)
	{
		var fs = require('fs');
				fs.writeFile(modFolder + filePath, JSON.stringify(data, null, 4), function (err) {
				if (err) throw err;
			});
	}
	

}