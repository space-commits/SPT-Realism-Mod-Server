"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionGen = void 0;
const enums_1 = require("../utils/enums");
class DescriptionGen {
    tables;
    modConfig;
    logger;
    statHandler;
    constructor(tables, modConfig, logger, statHandler) {
        this.tables = tables;
        this.modConfig = modConfig;
        this.logger = logger;
        this.statHandler = statHandler;
    }
    itemDB() {
        return this.tables.templates.items;
    }
    descriptionGen() {
        for (let lang in this.tables.locales.global) {
            this.descriptionGenHelper(lang);
        }
    }
    descriptionGenHelper(lang) {
        let locale = this.tables.locales.global[lang];
        for (let i in this.statHandler.modifiedItems) {
            const fileItem = this.statHandler.modifiedItems[i];
            this.attachmentDescription(fileItem, locale);
            this.gunDescription(fileItem, locale);
            this.gearDescription(fileItem, locale);
        }
        for (let templateId in this.itemDB()) {
            const item = this.itemDB()[templateId];
            this.medDescription(item, locale, templateId);
            this.ammoDescriptions(item, locale, templateId);
        }
    }
    gunDescription(fileItem, locale) {
        if (fileItem.$type.includes("Gun")) {
            let type = fileItem.WeapType;
            let templateId = fileItem.ItemID;
            if (type === "DI") {
                locale[`${templateId}` + " Description"] = "This weapon uses a direct impingement gas system, therefore mounted suppressors have increased durabiltiy burn." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "short_AK") {
                locale[`${templateId}` + " Description"] = "This weapon has a short barrel with a low dwell time, and therefore has reduced reliability. It is recommended to use this weapon with a booster attached, or at least a suppressor." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
        }
    }
    gearDescription(fileItem, locale) {
        if (fileItem.$type.includes("Gear")) {
            let templateId = fileItem.ItemID;
            let serverItem = this.itemDB()[templateId];
            if ((serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || serverItem._parent === enums_1.ParentClasses.HEADWEAR || serverItem._parent === enums_1.ParentClasses.FACECOVER) && serverItem._props.HasHinge == true) {
                if (fileItem.AllowADS == true) {
                    locale[`${templateId}` + " Description"] = "This faceshield allows the use of sights while using any stock in the extended position." + `\n\n${locale[`${templateId}` + " Description"]}`;
                }
                else {
                    locale[`${templateId}` + " Description"] = "This faceshield does NOT allow the use of sights while using a stock in the extended/unfolded position, unless the weapon/stock allows it." + `\n\n${locale[`${templateId}` + " Description"]}`;
                }
                locale[`${templateId}` + " Description"] = "This faceshield gives additional penalties to movement speed when deployed deployed. Ergo penalty only applies when deployed." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if ((serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT || serverItem._parent === enums_1.ParentClasses.HEADWEAR || serverItem._parent === enums_1.ParentClasses.FACECOVER) && serverItem._props.HasHinge == false) {
                if (fileItem.AllowADS == false) {
                    locale[`${templateId}` + " Description"] = "This gear item blocks the use of sights while using a stock in the extended/unfolded position, unless the weapon/stock allows it." + `\n\n${locale[`${templateId}` + " Description"]}`;
                }
            }
        }
    }
    attachmentDescription(fileItem, locale) {
        if (fileItem.$type.includes("WeaponMod")) {
            let type = fileItem.ModType;
            let templateId = fileItem.ItemID;
            let serverItem = this.itemDB()[templateId];
            if (type === "bipod") {
                locale[`${templateId}` + " Description"] = "Bipods give increased cover detection range, as well as stability and recoil control when mounting." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "DI") {
                locale[`${templateId}` + " Description"] = "This weapon uses a direct impingement gas system, therefore mounted suppressors have increased durabiltiy burn." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "short_AK") {
                locale[`${templateId}` + " Description"] = "This weapon has a short barrel with a low dwell time, and therefore has reduced reliability. It is recommended to use this weapon with a booster attached, or at least a suppressor." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if ((serverItem._parent === enums_1.ParentClasses.SILENCER || serverItem._parent === enums_1.ParentClasses.FLASH_HIDER || serverItem._parent === enums_1.ParentClasses.COMPENSATOR) && fileItem.ModMalfunctionChance !== 0) {
                locale[`${templateId}` + " Description"] = "The malfunction reduction of this muzzle attachment does not affect manually operated firearms such as bolt action rifles." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (fileItem.CanCycleSubs == true && (serverItem._parent === enums_1.ParentClasses.SILENCER || serverItem._parent === enums_1.ParentClasses.GASBLOCK)) {
                locale[`${templateId}` + " Description"] = "This attachment allows the reliable cycling of subsonic ammunition." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "short_barrel") {
                locale[`${templateId}` + " Description"] = "Short barrels benefit from muzzle boosters, improving reliability but at the cost of increased durability burn and increased rate of fire." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "gas") {
                locale[`${templateId}` + " Description"] = "This charging handle reduces gas/smoke when firing suppressed." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "booster") {
                locale[`${templateId}` + " Description"] = "This muzzle device is a booster. It gives the full firerate, malfunction and durabiltiy burn stats on short barreled rifles, and a reduced amount on longer barreled rifles." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "muzzle_supp_adapter" || type === "sig_taper_brake" || type === "barrel_2slot") {
                locale[`${templateId}` + " Description"] = "This muzzle device is an adapter, it will lose all its stats except accuracy if a suppressor is attached to it." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "shot_pump_grip_adapt") {
                locale[`${templateId}` + " Description"] = "If a foregrip is attached to this pump grip there will be a bonus to chamber/pump speed." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "buffer_adapter" || type === "stock_adapter" || type === "grip_stock_adapter") {
                locale[`${templateId}` + " Description"] = "This adapater changes the recoil profile of the weapon by raising or lowering the stock in line with the barrel. It will not impart any stats unless a stock is attached. If it has a pistol grip slot, the pistol grip provides a bonus to ergo, recoil and chamber/pump/bolt speed stats if attached." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "hydraulic_buffer") {
                locale[`${templateId}` + " Description"] = "This hydraulic buffer loses all its stats recoil reduction stats if not places on a shotgun, sniper rifle or assault carbine. The malfunction chance stat only applies to non-manually operated firearms." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "buffer") {
                locale[`${templateId}` + " Description"] = "This buffer tube loses its recoil, firerate and durability burn stats if not placed on a weapon system that uses a recoil buffer (M4, ADAR, MK47, SR25, STM etc.)." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "buffer_stock") {
                locale[`${templateId}` + " Description"] = "This stock loses its firerate and durability burn stats if not placed on weapon system that uses a recoil buffer (M4, ADAR, MK47, SR25, STM etc.)." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "stock" && fileItem.StockAllowADS == true) {
                locale[`${templateId}` + " Description"] = "This stock allows aiming down sights with any faceshield." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "foregrip_adapter") {
                locale[`${templateId}` + " Description"] = "This adapter will lose its negative ergo stat if a grip is attached to it." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "sight") {
                locale[`${templateId}` + " Description"] = "ADS speed and accuracy modifiers only apply when this sight is in use." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
            if (type === "mount") {
                locale[`${templateId}` + " Description"] = "Accuracy modifier only applies when the sight mounted to it is in use." + `\n\n${locale[`${templateId}` + " Description"]}`;
            }
        }
    }
    medDescription(item, locale, templateId) {
        if (item._parent === enums_1.ParentClasses.STIMULATOR && this.modConfig.stim_changes === true) {
            //generic
            if (item._id === "5fca13ca637ee0341a484f46" || item._id === "637b612fb7afa97bfc3d7005" || item._id === "637b6251104668754b72f8f9") {
                locale[`${templateId}` + " Description"] = `\n\n${locale[`${templateId}` + " Description"]}` + "\n\nWARNING: Adverse effects may include persistent pain, cerebral contusion or swelling of the brain, hand tremors, slowed metatbolism, increased levels of stress, weakened immune system, dyspnea, chronic inflammation, and overall reduced vitality.";
            }
            //regen
            if (item._id === "5c0e534186f7747fa1419867" || item._id === "5c0e530286f7747fa1419862" || item._id === "6783aca07b1449bd298b10f8") {
                locale[`${templateId}` + " Description"] = `\n\n${locale[`${templateId}` + " Description"]}` + "\n\nWARNING: Adverse effects may include persistent pain, hand tremors, and increased suspetibility to bruising, injury and tissue damage.";
            }
            //damage
            if (item._id === "5ed515ece452db0eb56fc028" || item._id === "637b6179104668754b72f8f5") {
                locale[`${templateId}` + " Description"] = `\n\n${locale[`${templateId}` + " Description"]}` + "\n\nWARNING: Adverse effects may include cerebral contusion or swelling of the brain, hand tremors, reduced concentration, attention and perception, reduced vitality, rapid deterioration of organ function and necrosis.";
            }
            //adrenal
            if (item._id === "5c10c8fd86f7743d7d706df3" || item._id === "5ed515e03a40a50460332579" || item._id === "637b620db7afa97bfc3d7009") {
                locale[`${templateId}` + " Description"] = `\n\n${locale[`${templateId}` + " Description"]}` + "\n\nWARNING: Adverse effects may include tunnel vision, hand tremors, dyspnea, chronic fatigue, asthenia and stress cardiomyopathy.";
            }
            //clotting
            if (item._id === "5ed515f6915ec335206e4152" || item._id === "5c0e533786f7747fa23f4d47") {
                locale[`${templateId}` + " Description"] = `${locale[`${templateId}` + " Description"]}` + "\n\nWARNING: Adverse effects may include persistent pain, hand tremors, reduced concentration, attention and perception, dyspnea, chronic inflammation, and hematuria with clot retention.";
            }
            //weight
            if (item._id === "5ed51652f6c34d2cc26336a1" || item._id === "66507eabf5ddb0818b085b68") {
                locale[`${templateId}` + " Description"] = `${locale[`${templateId}` + " Description"]}` + "\n\nWARNING: Adverse effects may include tunnel vision, hand tremors, reduced concentration, slowed metabolism, dyspnea, chronic fatigue, and asthenia.";
            }
            //performance
            if (item._id === "5ed5160a87bb8443d10680b5" || item._id === "5ed515c8d380ab312177c0fa" || item._id === "5c0e531d86f7747fa23f4d42" || item._id === "5c0e531286f7747fa54205c2") {
                locale[`${templateId}` + " Description"] = `${locale[`${templateId}` + " Description"]}` + "\n\nWARNING: Adverse effects may include tunnel vision, hand tremors, increased levels of stress, dyspnea, and muscular dystrophy.";
            }
        }
    }
    ammoDescriptions(item, locale, tempalteId) {
        if (item._parent === enums_1.ParentClasses.AMMO && item._props.ammoHear === 1) {
            locale[`${tempalteId}` + " Description"] = "This ammunition is subsonic and is in a calibre that requires special attachments or modifications in order to be cycled reliably." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
        }
        if (item._parent === enums_1.ParentClasses.AMMO) {
            if (item._id === "56dff4ecd2720b5f5a8b4568" || item._id === "59e4d24686f7741776641ac7") {
                locale[`${tempalteId}` + " Description"] = "This ammunition is subsonic and will not cycle reliably without modification or use of special suppressors such as the PBS suppressors." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber20g") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a Toz-106." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber12g") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 610mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber23x75") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 700mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber46x30") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of an MP7." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber57x28") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a standard P90/264mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber9x18PM") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a Makarov." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber9x19PARA") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 254mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber1143x23ACP") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 254mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber9x33R") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 127mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber9x21") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a SR-1MP" + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber762x25TT") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a TT-30 Tokarev." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber762x35") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 229mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber9x39") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a VSS/AS VAL." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber366TKM") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AKM pattern rifle." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber556x45NATO") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 419mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber545x39") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AK-74 pattern rifle." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber762x39") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 415mm barrel/standard AKM pattern rifle." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber762x51") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 508mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber762x54R") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 508mm barrel" + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber127x55") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of the ASH-12." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
            if (item._props.Caliber === "Caliber86x70") {
                locale[`${tempalteId}` + " Description"] = "Ammo stats are out of a 610mm barrel." + `\n\n${locale[`${tempalteId}` + " Description"]}`;
            }
        }
    }
}
exports.DescriptionGen = DescriptionGen;
//# sourceMappingURL=description_gen.js.map