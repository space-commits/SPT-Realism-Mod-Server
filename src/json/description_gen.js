"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionGen = void 0;
const enums_1 = require("../utils/enums");
class DescriptionGen {
    constructor(tables) {
        this.tables = tables;
        this.itemDB = this.tables.templates.items;
    }
    descriptionGen() {
        for (let lang in this.tables.locales.global) {
            this.descriptionGenHelper(lang);
        }
    }
    descriptionGenHelper(lang) {
        let locale = this.tables.locales.global[lang];
        for (let templateItem in this.itemDB) {
            let item = this.itemDB[templateItem];
            if (item._parent === enums_1.ParentClasses.AMMO && item._props.ammoHear === 1) {
                locale[`${templateItem}` + " Description"] = "This ammunition is subsonic and is in a calibre that requires special attachments or modifications in order to be cycled reliably." + `\n\n${locale[`${templateItem}` + " Description"]}`;
            }
            if (item._props.ConflictingItems != undefined && item._props.ConflictingItems[0] === "SPTRM") {
                let modType = item._props.ConflictingItems[1];
                if (modType === "DI") {
                    locale[`${templateItem}` + " Description"] = "This weapon uses a direct impingement gas system, therefore mounted suppressors have increased durabiltiy burn." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "short_AK") {
                    locale[`${templateItem}` + " Description"] = "This weapon has a short barrel with a low dwell time, and therefore has reduced reliability. It is recommended to use this weapon with a booster attached, or at least a suppressor." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if ((item._parent === enums_1.ParentClasses.SILENCER || item._parent === enums_1.ParentClasses.FLASH_HIDER || item._parent === enums_1.ParentClasses.COMPENSATOR) && item._props.ConflictingItems[8] !== "0") {
                    locale[`${templateItem}` + " Description"] = "The malfunction reduction of this muzzle attachment does not affect manually operated firearms such as bolt action rifles." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.ConflictingItems[13] === "true" && (item._parent === enums_1.ParentClasses.SILENCER || item._parent === enums_1.ParentClasses.GASBLOCK)) {
                    locale[`${templateItem}` + " Description"] = "This attachment allows the reliable cycling of subsonic ammunition." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "gasblock_upgassed") {
                    locale[`${templateItem}` + " Description"] = "This gasblock facilitates a large gas port opening on barrels that have one. If combined with such a barrel, the barrel's malfunction penalty is removed at the expense of more recoil and durability burn." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "gasblock_downgassed") {
                    locale[`${templateItem}` + " Description"] = "This gasblock makes the rifle under-gassed, reducing recoil but also reducing reliability. It has increased negative effects on short barreled rifles." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "short_barrel") {
                    locale[`${templateItem}` + " Description"] = "This barrel has a large gas port and requires a gas block that facilitates this in order for the rifle to cycle reliably. If the right gas block is used the increased malfunction chance penatly of this barrel is removed, but recoil, firerate and durabiltiy burn is increased" + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "booster") {
                    locale[`${templateItem}` + " Description"] = "This muzzle device is a booster. It gives the full firerate, malfunction and durabiltiy burn stats on short barreled rifles, and a reduced amount on longer barreled rifles." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "muzzle_supp_adapter" || modType === "sig_taper_brake" || modType === "barrel_2slot") {
                    locale[`${templateItem}` + " Description"] = "This muzzle device is an adapter, it will lose all its stats except accuracy if a suppressor is attached to it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "shot_pump_grip_adapt") {
                    locale[`${templateItem}` + " Description"] = "If a foregrip is attached to this pump grip there will be a bonus to chamber/pump speed." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "buffer_adapter" || modType === "stock_adapter" || modType === "grip_stock_adapter") {
                    locale[`${templateItem}` + " Description"] = "This adapater changes the recoil profile of the weapon by raising or lowering the stock in line with the barrel. It will not impart any stats unless a stock is attached. If it has a pistol grip slot, the pistol grip provides a bonus to ergo, recoil and chamber/pump/bolt speed stats if attached." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "hydraulic_buffer") {
                    locale[`${templateItem}` + " Description"] = "This hydraulic buffer loses all its stats recoil reduction stats if not places on a shotgun, sniper rifle or assault carbine. The malfunction chance stat only applies to non-manually operated firearms." + `\n\n${locale[`${templateItem}` + " Description"]}`;
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
                if (modType === "sight") {
                    locale[`${templateItem}` + " Description"] = "ADS speed and accuracy modifiers only apply when this sight is in use." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (modType === "mount") {
                    locale[`${templateItem}` + " Description"] = "Accuracy modifier only applies when the sight mounted to it is in use." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if ((item._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || item._parent === enums_1.ParentClasses.HEADWEAR || item._parent === enums_1.ParentClasses.FACECOVER) && item._props.HasHinge == true) {
                    if (item._props.ConflictingItems[1] === "true") {
                        locale[`${templateItem}` + " Description"] = "This faceshield allows the use of sights while using any stock in the extended position." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                    if (item._props.ConflictingItems[1] === "false") {
                        locale[`${templateItem}` + " Description"] = "This faceshield does NOT allow the use of sights while using a stock in the extended/unfolded position, unless the weapon/stock allows it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                }
                if (item._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || item._parent === enums_1.ParentClasses.HEADWEAR || item._parent === enums_1.ParentClasses.FACECOVER) {
                    if (item._props.ConflictingItems[1] === "false") {
                        locale[`${templateItem}` + " Description"] = "This gear item blocks the use of sights while using a stock in the extended/unfolded position, unless the weapon/stock allows it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                }
            }
            if (item._parent === enums_1.ParentClasses.AMMO) {
                if (item._id === "56dff4ecd2720b5f5a8b4568" || item._id === "59e4d24686f7741776641ac7") {
                    locale[`${templateItem}` + " Description"] = "This ammunition is subsonic and will not cycle reliably without modification or use of special suppressors such as the PBS suppressors." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
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
exports.DescriptionGen = DescriptionGen;
