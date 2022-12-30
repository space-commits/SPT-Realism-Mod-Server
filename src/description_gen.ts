import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ParentClasses } from "./enums";

export class DescriptionGen {

    constructor(private tables: IDatabaseTables) { }
  
    private itemDB = this.tables.templates.items;

    public descriptionGen() {
        let locale = this.tables.locales.global["en"];
        for (let templateItem in this.itemDB) {
            let item = this.itemDB[templateItem];
            if (item._props.ConflictingItems != undefined && item._props.ConflictingItems[0] === "SPTRM") {
                let modType = item._props.ConflictingItems[1];
                if (modType === "booster") {
                    locale[`${templateItem}` + " Description"] = "This muzzle device is a booster. It gives the full firerate stats on short barreled rifles, and a reduced amount on longer barreld rifles." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "muzzle_supp_adapter") {
                    locale[`${templateItem}` + " Description"] = "This muzzle device is an adapter, it will lose all its stats except accuracy if a suppressor is attached to it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "shot_pump_grip_adapt") {
                    locale[`${templateItem}` + " Description"] = "If a foregrip is attached to this pump grip there will be a bonus to chamber/pump speed." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "buffer_adapter" || modType === "stock_adapter" || modType === "grip_stock_adapter") {
                    locale[`${templateItem}` + " Description"] = "This adapater changes the recoil profile of the weapon by raising or lowering the stock in line with the barrel. It will not impart any stats unless a stock is attached. If it has a pistol grip slot, the pistol grip provides a bonus to ergo and recoil stats if attached." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "hydraulic_buffer") {
                    locale[`${templateItem}` + " Description"] = "This hydraulic buffer loses all its stats if not places on a shotgun, sniper rifle or assault carbine." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "buffer") {
                    locale[`${templateItem}` + " Description"] = "This buffer tube loses its recoil, firerate and durability burn stats if not placed on a weapon system that uses a recoil buffer (M4, ADAR, MK47, SR25, STM etc.)." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "buffer_stock") {
                    locale[`${templateItem}` + " Description"] = "This stock loses its firerate and durability burn stats if not placed on weapon system that uses a recoil buffer (M4, ADAR, MK47, SR25, STM etc.)." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "stock" && item._props.ConflictingItems[15] === "true") {
                    locale[`${templateItem}` + " Description"] = "This stock allows aiming down sights with any faceshield." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "foregrip_adapter") {
                    locale[`${templateItem}` + " Description"] = "This adapter will lose its negative ergo stat if a grip is attached to it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "scope") {
                    locale[`${templateItem}` + " Description"] = "ADS speed modifier only applies when this sight is in use." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._parent === ParentClasses.ARMOREDEQUIPMENT || item._parent === ParentClasses.HEADWEAR || item._parent === ParentClasses.FACECOVER) {
                    if (item._props.ConflictingItems[1] === "true") {
                        locale[`${templateItem}` + " Description"] = "This faceshield allows the use of sights while using any stock in the extended position." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                    if (item._props.ConflictingItems[1] === "false") {
                        locale[`${templateItem}` + " Description"] = "This faceshield does NOT allow the use of sights while using any stock in the extended position." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                }
            }

            if (item._parent === ParentClasses.AMMO) {
                if (item._props.Caliber === "Caliber20g") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a Toz-106." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber12g") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 610mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber23x75") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 700mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber46x30") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of an MP7." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber57x28") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a standard P90/264mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x18PM") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a Makarov." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x19PARA") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 254mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber1143x23ACP") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 254mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x33R") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 127mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x21") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a SR-1MP" + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x25TT") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a TT-30 Tokarev." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x35") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 229mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber9x39") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a VSS/AS VAL." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber366TKM") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AKM pattern rifle." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber556x45NATO") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 419mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber545x39") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AK-74 pattern rifle." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x39") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AKM pattern rifle." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x51") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 508mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber762x54R") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 508mm barrel" + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber127x55") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of the ASH-12." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.Caliber === "Caliber86x70") {
                    locale[`${templateItem}` + " Description"] = "Ammo stats are out of a 610mm barrel." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
            }
        }
    }
}