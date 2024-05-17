import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ParentClasses } from "../utils/enums";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

export class DescriptionGen {

    constructor(private tables: IDatabaseTables, private modConfig: any, private logger: ILogger) { }

    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }

    public descriptionGen() {
        for (let lang in this.tables.locales.global) {
            this.descriptionGenHelper(lang);
        }
    }

    private descriptionGenHelper(lang: string) {
        let locale = this.tables.locales.global[lang];
        for (let templateItem in this.itemDB()) {
            let item = this.itemDB()[templateItem];
            if (item._parent === ParentClasses.AMMO && item._props.ammoHear === 1) {
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
                if ((item._parent === ParentClasses.SILENCER || item._parent === ParentClasses.FLASH_HIDER || item._parent === ParentClasses.COMPENSATOR) && item._props.ConflictingItems[8] !== "0") {
                    locale[`${templateItem}` + " Description"] = "The malfunction reduction of this muzzle attachment does not affect manually operated firearms such as bolt action rifles." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if (item._props.ConflictingItems[13] === "true" && (item._parent === ParentClasses.SILENCER || item._parent === ParentClasses.GASBLOCK)) {
                    locale[`${templateItem}` + " Description"] = "This attachment allows the reliable cycling of subsonic ammunition." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                // if (modType === "gasblock_upgassed") {
                //     locale[`${templateItem}` + " Description"] = "This gasblock facilitates a large gas port opening on barrels that have one. If combined with such a barrel, the barrel's malfunction penalty is removed at the expense of more recoil and durability burn." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                // }
                // if (modType === "gasblock_downgassed") {
                //     locale[`${templateItem}` + " Description"] = "This gasblock makes the rifle under-gassed, reducing recoil but also reducing reliability. It has increased negative effects on short barreled rifles." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                // }
                if (modType === "short_barrel") {
                    locale[`${templateItem}` + " Description"] = "Short barrels benefit from muzzle boosters, improving reliability but at the cost of increased durability burn and increased rate of fire." + `\n\n${locale[`${templateItem}` + " Description"]}`;
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
                if ((item._parent === ParentClasses.ARMOREDEQUIPMENT || item._parent === ParentClasses.HEADWEAR || item._parent === ParentClasses.FACECOVER) && item._props.HasHinge == true) {
                    if (item._props.ConflictingItems[1] === "true") {
                        locale[`${templateItem}` + " Description"] = "This faceshield allows the use of sights while using any stock in the extended position." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                    else {
                        locale[`${templateItem}` + " Description"] = "This faceshield does NOT allow the use of sights while using a stock in the extended/unfolded position, unless the weapon/stock allows it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                    locale[`${templateItem}` + " Description"] = "This faceshield gives penalties to sprint speed if it is deployed. Ergo penalty only applies if deployed." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                }
                if ((item._parent === ParentClasses.ARMOREDEQUIPMENT || item._parent === ParentClasses.HEADWEAR || item._parent === ParentClasses.FACECOVER) && item._props.HasHinge == false) {
                    if (item._props.ConflictingItems[1] === "false") {
                        locale[`${templateItem}` + " Description"] = "This gear item blocks the use of sights while using a stock in the extended/unfolded position, unless the weapon/stock allows it." + `\n\n${locale[`${templateItem}` + " Description"]}`;
                    }
                }
            }

            if (item._parent === ParentClasses.STIMULATOR && this.modConfig.stim_changes === true) {
                //generic
                if (item._id === "5fca13ca637ee0341a484f46" || item._id === "637b612fb7afa97bfc3d7005" || item._id === "637b6251104668754b72f8f9") {
                    locale[`${templateItem}` + " Description"] = `\n\n${locale[`${templateItem}` + " Description"]}` + "\n\nWARNING: Adverse effects may include persistent pain, cerebral contusion or swelling of the brain, hand tremors, slowed metatbolism, increased levels of stress, weakened immune system, dyspnea, chronic inflammation, and overall reduced vitality.";
                }
                //regen
                if (item._id === "5c0e534186f7747fa1419867" || item._id === "5c0e530286f7747fa1419862" || item._id === "SJ0") {
                    locale[`${templateItem}` + " Description"] = `\n\n${locale[`${templateItem}` + " Description"]}` + "\n\nWARNING: Adverse effects may include persistent pain, hand tremors, and increased suspetibility to bruising, injury and tissue damage.";
                }
                //damage
                if (item._id === "5ed515ece452db0eb56fc028" || item._id === "637b6179104668754b72f8f5") {
                    locale[`${templateItem}` + " Description"] = `\n\n${locale[`${templateItem}` + " Description"]}` + "\n\nWARNING: Adverse effects may include cerebral contusion or swelling of the brain, hand tremors, reduced concentration, attention and perception, reduced vitality, rapid deterioration of organ function and necrosis.";
                }
                //adrenal
                if (item._id === "5c10c8fd86f7743d7d706df3" || item._id === "5ed515e03a40a50460332579" || item._id === "637b620db7afa97bfc3d7009") {
                    locale[`${templateItem}` + " Description"] = `\n\n${locale[`${templateItem}` + " Description"]}` + "\n\nWARNING: Adverse effects may include tunnel vision, hand tremors, dyspnea, chronic fatigue, asthenia and stress cardiomyopathy.";
                }
                //clotting
                if (item._id === "5ed515f6915ec335206e4152" || item._id === "5c0e533786f7747fa23f4d47") {
                    locale[`${templateItem}` + " Description"] = `${locale[`${templateItem}` + " Description"]}` + "\n\nWARNING: Adverse effects may include persistent pain, hand tremors, reduced concentration, attention and perception, dyspnea, chronic inflammation, and hematuria with clot retention.";
                }
                //weight
                if (item._id === "5ed51652f6c34d2cc26336a1") {
                    locale[`${templateItem}` + " Description"] = `${locale[`${templateItem}` + " Description"]}` + "\n\nWARNING: Adverse effects may include tunnel vision, hand tremors, reduced concentration, slowed metabolism, dyspnea, chronic fatigue, and asthenia.";
                }
                //performance
                if (item._id === "5ed5160a87bb8443d10680b5" || item._id === "5ed515c8d380ab312177c0fa" || item._id === "5c0e531d86f7747fa23f4d42" || item._id === "5c0e531286f7747fa54205c2") {
                    locale[`${templateItem}` + " Description"] = `${locale[`${templateItem}` + " Description"]}` + "\n\nWARNING: Adverse effects may include tunnel vision, hand tremors, increased levels of stress, dyspnea, and muscular dystrophy.";
                }
            }

            if (item._parent === ParentClasses.AMMO) {
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