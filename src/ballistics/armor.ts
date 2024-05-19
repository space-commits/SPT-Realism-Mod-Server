import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ParentClasses } from "../utils/enums";
import { IArmorMaterials, IConfig } from "@spt-aki/models/eft/common/IGlobals";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

const validHelmetSlots = [
    "helmet_top",
    "helmet_back",
    "helmet_ears",
    "helmet_eyes",
    "helmet_jaw"
];

export class Armor {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf) { }

    globalDB(): IConfig {
        return this.tables.globals.config;
    }
    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }
    armMat(): IArmorMaterials {
        return this.globalDB().ArmorMaterials;
    }

    public loadArmorStats() {

        //Armor Destructibility values
        this.armMat().Glass.Destructibility = 0.45;
        this.armMat().Aramid.Destructibility = 0.33;
        this.armMat().Ceramic.Destructibility = 0.3;
        this.armMat().Combined.Destructibility = 0.225;
        this.armMat().UHMWPE.Destructibility = 0.255
        this.armMat().Aluminium.Destructibility = 0.2;
        this.armMat().Titan.Destructibility = 0.15;
        this.armMat().ArmoredSteel.Destructibility = 0.375; //steel no longer becomes more likely to pen with dura loss, so represents loss of anti-spall coating

        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];

            this.loadBodyArmor(serverItem);
            this.modifySoftArmorCollidors(serverItem);
            this.loadIntegratedSoftArmor(serverItem);
            this.loadHelmets(serverItem, this.tables);
            this.loadGlasses(serverItem);
            this.loadArmorMods(serverItem);
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Armour loaded");
        }
    }

    //change the hitboxes used by armor slots
    private modifyCarrierColidors(serverItem: ITemplateItem) {
        const validSlots = [
            "front_plate",
            "back_plate",
            "left_side_plate",
            "right_side_plate",
            "soft_armor_front",
            "soft_armor_back",
            "soft_armor_left",
            "soft_armor_right",
        ];

        if ((serverItem._parent === ParentClasses.ARMORVEST || serverItem._parent === ParentClasses.CHESTRIG) && serverItem?._props?.Slots) {
            for (const slot of serverItem._props.Slots) {
                if (!validSlots.includes(slot._name.toLowerCase())) continue;
                for (const filter of slot._props.filters) {
                    if (!filter.armorPlateColliders || filter.armorPlateColliders.length === 0 || filter.Filter.length !== 1 || this.itemDB()[filter.Filter[0]]._props.ArmorMaterial !== "Aramid") continue;
                    for (const col of filter.armorPlateColliders) {
                        if (filter.armorColliders != undefined) {
                            let plateCollidor = col.toLowerCase();
                            if (plateCollidor === "plate_granit_sapi_chest") {
                                filter.armorColliders.push("RibcageUp");
                            }
                            if (plateCollidor === "plate_granit_sapi_back") {
                                filter.armorColliders.push("SpineTop");
                            }
                            if (plateCollidor === "plate_korund_chest") {
                                filter.armorColliders.push("RibcageUp", "RibcageLow");
                            }
                            if (plateCollidor === "plate_6B13_back") {
                                filter.armorColliders.push("SpineTop", "SpineDown");
                            }
                            if (plateCollidor.includes("left")) {
                                filter.armorColliders.push("LeftSideChestDown");
                            }
                            if (plateCollidor.includes("right")) {
                                filter.armorColliders.push("RightSideChestDown");
                            }
                        }
                    }
                    filter.armorPlateColliders = [];
                }
            }
        }
    }

    //change the hitboxes protected by integrated armors
    private modifyArmorInsertCollidors(serverItem: ITemplateItem) {

        if (serverItem._parent === ParentClasses.BUILT_IN_ARMOR && serverItem._props.ArmorMaterial === "Aramid" && serverItem._props.armorPlateColliders.length > 0) {
            for (const item of serverItem._props.armorPlateColliders) {
                let plateCollidor = item.toLowerCase();
                if (plateCollidor.includes("chest")) {
                    serverItem._props.armorColliders.push("RibcageUp");
                    break;
                }
                if (plateCollidor.includes("back")) {
                    serverItem._props.armorColliders.push("SpineTop");
                    break;
                }
                if (plateCollidor.includes("left")) {
                    serverItem._props.armorColliders.push("LeftSideChestDown");
                }
                if (plateCollidor.includes("right")) {
                    serverItem._props.armorColliders.push("RightSideChestDown");
                }
            }
            serverItem._props.armorPlateColliders = [];
        }
    }

    //make all aramid cover hitboxes rather than use plate collidor, as otherwise plate carriers are useless.
    private modifySoftArmorCollidors(serverItem: ITemplateItem) {

        this.modifyCarrierColidors(serverItem);
        this.modifyArmorInsertCollidors(serverItem);
    }

    private modifyAramid(serverItem: ITemplateItem, newClass: number, durability: number, blunt: number) {
        for (const slot of serverItem._props.Slots) {
            for (const filter of slot._props.filters) {
                if (filter?.Plate && this.itemDB()[filter?.Plate]._props.ArmorMaterial === "Aramid") {
                    let item = this.itemDB()[filter.Plate];
                    let armorColliders = item._props.armorColliders;
                    if (armorColliders.filter(str => str.toLowerCase().includes("neck")).length) {
                        item._props.Durability = durability * 0.4;
                        item._props.MaxDurability = item._props.Durability;
                        item._props.armorClass = newClass;
                        item._props.BluntThroughput = blunt * 1.2;
                    }
                    else if (armorColliders.filter(str => str.toLowerCase().includes("arm")).length) {
                        item._props.Durability = durability * 0.45;
                        item._props.MaxDurability = item._props.Durability;
                        item._props.armorClass = newClass;
                        item._props.BluntThroughput = blunt * 0.85;
                    }
                    else if (armorColliders.filter(str => str.toLowerCase().includes("side")).length) {
                        item._props.Durability = durability * 0.5;
                        item._props.MaxDurability = item._props.Durability;
                        item._props.armorClass = newClass;
                        item._props.BluntThroughput = blunt * 1.1;
                    }
                    else if (armorColliders.filter(str => str.toLowerCase().includes("pelvis")).length) {
                        item._props.Durability = durability * 0.75;
                        item._props.MaxDurability = item._props.Durability;
                        item._props.armorClass = newClass;
                        item._props.BluntThroughput = blunt * 0.8;
                    }
                    else {
                        item._props.Durability = durability;
                        item._props.MaxDurability = item._props.Durability;
                        item._props.armorClass = newClass;
                        item._props.BluntThroughput = blunt;
                    }
                }
            }
        }
    }

    private changeDefaultPlate(serverItem: ITemplateItem, carrierId: string, newPlateId: string) {
        serverItem._props.Slots.forEach(s => {
            if (s._name.toLowerCase().includes("front_plate") || s._name.toLowerCase().includes("back_plate")) {
                s._props.filters[0].Plate = newPlateId;
            }
        });

        for (let presetId in this.tables.globals.ItemPresets) {
            let preset = this.tables.globals.ItemPresets[presetId];
            if (preset._items.length > 0 && preset._items[0]._tpl === carrierId) {
                for (let slot in preset._items) {
                    if (preset._items[slot]?.slotId && (preset._items[slot].slotId.toLowerCase().includes("front_plate") || preset._items[slot].slotId.toLowerCase().includes("back_plate"))) {
                        preset._items[slot]._tpl = newPlateId;
                    }
                }
            }
        }
    }

    private loadIntegratedSoftArmor(serverItem: ITemplateItem) {
        //the rest
        let carriers =
            [
                "5c0e746986f7741453628fe5",
                "5d5d87f786f77427997cfaef",
                "5ab8dced86f774646209ec87",
                "5c0e722886f7740458316a57",
                "628b9c7d45122232a872358f",
                "5e4ac41886f77406a511c9a8",
                "5b44cad286f77402a54ae7e5"
            ];
        let carriersSlim =
            [
                "64a5366719bab53bd203bf33",
                "628cd624459354321c4b7fa2",
                "628b9784bcf6e2659e09b8a2",
                "64a536392d2c4e6e970f4121",
                "61bc85697113f767765c7fe7",
                "639343fce101f4caa40a4ef3",
                "609e860ebd219504d8507525",
                "5e4abb5086f77406975c9342",
                "6038b4b292ec1c3103795a0b",
                "5fd4c474dd870108a754b241"
            ];
        if (carriersSlim.includes(serverItem._id)) {
            this.modifyAramid(serverItem, 3, 50, 0.25);
        }
        if (carriers.includes(serverItem._id)) {
            this.modifyAramid(serverItem, 3, 70, 0.2);
        }
        //Module
        if (serverItem._id === "59e7635f86f7742cbf2c1095") {
            this.modifyAramid(serverItem, 4, 80, 0.25);
        }
        //PACA
        if (serverItem._id === "5648a7494bdc2d9d488b4583" || serverItem._id === "607f20859ee58b18e41ecd90" || serverItem._id === "62a09d79de7ac81993580530") {
            this.modifyAramid(serverItem, 4, 100, 0.35);
        }
        //Press
        if (serverItem._id === "5c0e5edb86f77461f55ed1f7") {
            this.modifyAramid(serverItem, 4, 100, 0.45);
        }
        //Strandhogg
        if (serverItem._id === "61bcc89aef0f505f0c6cd0fc") {
            this.modifyAramid(serverItem, 4, 95, 0.3);
        }
        //AVS
        if (serverItem._id === "544a5caa4bdc2d1a388b4568") {
            this.modifyAramid(serverItem, 4, 105, 0.28);
        }
        //Kirasa
        if (serverItem._id === "5b44d22286f774172b0c9de8") {
            this.modifyAramid(serverItem, 5, 100, 0.4);
        }
        //Thor concealable
        if (serverItem._id === "609e8540d5c319764c2bc2e9") {
            this.modifyAramid(serverItem, 5, 100, 0.35);
        }
        //Trooper 
        if (serverItem._id === "5c0e655586f774045612eeb2") {
            this.modifyAramid(serverItem, 5, 90, 0.35);
        }
        //Hexatec
        if (serverItem._id === "63737f448b28897f2802b874") {
            this.modifyAramid(serverItem, 5, 75, 0.3);
        }
        //Ghzel + Zhuk 6A
        if (serverItem._id === "5ab8e79e86f7742d8b372e78" || serverItem._id === "5c0e625a86f7742d77340f62") {
            this.modifyAramid(serverItem, 5, 90, 0.35);
        }
        //6B23-1 + 2
        if (serverItem._id === "5c0e5bab86f77461f55ed1f3" || serverItem._id === "5c0e57ba86f7747fa141986d") {
            this.modifyAramid(serverItem, 5, 110, 0.38);
        }
        //6B13 + Korund
        if (serverItem._id === "5f5f41476bdad616ad46d631" || serverItem._id === "5c0e53c886f7747fa54205c7" || serverItem._id === "5c0e541586f7747fa54205c9") {
            this.modifyAramid(serverItem, 5, 100, 0.36);
        }
        //Fort
        if (serverItem._id === "5ca2151486f774244a3b8d30" || serverItem._id === "5e9dacf986f774054d6b89f4" || serverItem._id === "5ca21c6986f77479963115a7") {
            this.modifyAramid(serverItem, 5, 105, 0.32);
        }
        //6b43
        if (serverItem._id === "545cdb794bdc2d3a198b456a") {
            this.modifyAramid(serverItem, 5, 110, 0.35);
        }
        //Thor carrier
        if (serverItem._id === "60a283193cb70855c43a381d") {
            this.modifyAramid(serverItem, 5, 120, 0.25);
        }
        //IOTV
        if (serverItem._id === "5b44cf1486f77431723e3d05" || serverItem._id === "5b44d0de86f774503d30cba8" || serverItem._id === "5b44cd8b86f774503d30cba2") {
            this.modifyAramid(serverItem, 5, 110, 0.28);
            this.changeDefaultPlate(serverItem, "5b44cf1486f77431723e3d05", "xsapi_chest");
            this.changeDefaultPlate(serverItem, "5b44d0de86f774503d30cba8", "xsapi_chest");
            this.changeDefaultPlate(serverItem, "5b44cd8b86f774503d30cba2", "xsapi_chest");
        }
        //OTV
        if (serverItem._id === "64abd93857958b4249003418") {
            this.modifyAramid(serverItem, 5, 100, 0.3);
            this.changeDefaultPlate(serverItem, "64abd93857958b4249003418", "64afdcb83efdfea28601d041");
        }
        //Osprey
        if (serverItem._id === "60a3c70cde5f453f634816a3" || serverItem._id === "60a3c68c37ea821725773ef5") {
            this.modifyAramid(serverItem, 5, 90, 0.25);
            this.changeDefaultPlate(serverItem, "60a3c70cde5f453f634816a3", "mk4a_plate");
            this.changeDefaultPlate(serverItem, "60a3c68c37ea821725773ef5", "mk4a_plate");
        }
        //RBAV
        if (serverItem._id === "628dc750b910320f4c27a732") {
            this.modifyAramid(serverItem, 5, 100, 0.3);
        }
        //Bagariy
        if (serverItem._id === "628d0618d1ba6e4fa07ce5a4") {
            this.modifyAramid(serverItem, 5, 105, 0.33);
        }
    }

    private loadBodyArmor(serverItem: ITemplateItem) {

        //UN Armor front/back
        if (serverItem._id === "657045741bd9beedc40b7299" || serverItem._id === "657044e971369562b300ce9b") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 6;
            serverItem._props.BluntThroughput = 0.34;
            serverItem._props.ArmorMaterial = 'Aluminium';
        }
        //UN Armor sides
        if (serverItem._id === "657045b97e80617cee095bda" || serverItem._id === "6570460471369562b300ce9f") {
            serverItem._props.Durability = 38;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4;
            serverItem._props.BluntThroughput = 0.4;
            serverItem._props.ArmorMaterial = 'Aramid';
        }

        //6B3TM front
        if (serverItem._id === "65764e1e2bc38ef78e076489") {
            serverItem._props.Durability = 135;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 6;
            serverItem._props.BluntThroughput = 0.06;
            serverItem._props.ArmorMaterial = 'Titan';
        }
        //6B3TM back
        if (serverItem._id === "65764fae2bc38ef78e07648d") {
            serverItem._props.Durability = 100;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 3;
            serverItem._props.BluntThroughput = 0.3;
            serverItem._props.ArmorMaterial = 'Aramid';
        }
        //6B3TM groin
        if (serverItem._id === "6576500f526e320fbe03577f" || serverItem._id === "6576504b526e320fbe035783") {
            serverItem._props.Durability = 38;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 3;
            serverItem._props.BluntThroughput = 0.3;
            serverItem._props.ArmorMaterial = 'Aramid';
        }

        //6B5 Uley 16 front/back
        if (serverItem._id === "65764a4cd8537eb26a0355ee" || serverItem._id === "65764bc22bc38ef78e076485") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 6;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
        }
        //6B5 Uley 16 groin
        if (serverItem._id === "65764c6b526e320fbe03577b") {
            serverItem._props.Durability = 38;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4;
            serverItem._props.BluntThroughput = 0.4;
            serverItem._props.ArmorMaterial = 'Aramid';
        }
        //6B5 Uley 16 neck
        if (serverItem._id === "65764c39526e320fbe035777") {
            serverItem._props.Durability = 32;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4;
            serverItem._props.BluntThroughput = 0.4;
            serverItem._props.ArmorMaterial = 'Aramid';
        }

        //6B5 Uley 15 front/back
        if (serverItem._id === "657087577f6d4590ac0d2109" || serverItem._id === "6570880f4a747dbb63005ee5") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
        }
        //6B5 Uley 15 groin
        if (serverItem._id === "65708b4c4a747dbb63005ef3") {
            serverItem._props.Durability = 38;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4;
            serverItem._props.BluntThroughput = 0.4;
            serverItem._props.ArmorMaterial = 'Aramid';
        }
        //6B5 Uley 15 neck
        if (serverItem._id === "65708afe4a747dbb63005eee") {
            serverItem._props.Durability = 32;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4;
            serverItem._props.BluntThroughput = 0.4;
            serverItem._props.ArmorMaterial = 'Aramid';
        }

        //Kulon front/back
        if (serverItem._id === "6570495b45d573133d0d6adb" || serverItem._id === "657049d23425b19bbc0502f0") {
            serverItem._props.Durability = 90;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
        }

        //6B2 Flora front/back
        if (serverItem._id === "656fd89bf5a9631d4e042575" || serverItem._id === "656fd7c32668ef0402028fb9") {
            serverItem._props.Durability = 105;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
        }

        ////////Plates//////////
        //Titanium NIJ III (BSG's bullshit)
        if (serverItem._id === "656fa25e94b480b8a500c0e0") {
            serverItem._props.Durability = 110;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.08;
            serverItem._props.ArmorMaterial = 'Titan';
            serverItem._props.speedPenaltyPercent = -1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -2;
        }
        //Titanium NIJ III+ (BSG's bullshit)
        if (serverItem._id === "656fa99800d62bcd2e024088") {
            serverItem._props.Durability = 130;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.08;
            serverItem._props.ArmorMaterial = 'Titan';
            serverItem._props.speedPenaltyPercent = -1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -2;
        }
        //Steel NIJ III
        if (serverItem._id === "656f9d5900d62bcd2e02407c" || serverItem._id === "656fa76500d62bcd2e024080") {
            serverItem._props.Durability = 100;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.025;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -2;
        }
        //Steel NIJ III+
        if (serverItem._id === "656fa8d700d62bcd2e024084" || serverItem._id === "656fa0fb498d1b7e3e071d9c") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.015
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -2;
        }

        //UHMWPE NIJ III
        if (serverItem._id === "656fae5f7c2d57afe200c0d7" || serverItem._id === "656fac30c6baea13cd07e10c") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.16;
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.speedPenaltyPercent = -2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }
        //UHMWPE NIJ III+
        if (serverItem._id === "656faf0ca0dce000a2020f77" || serverItem._id === "656fad8c498d1b7e3e071da0") {
            serverItem._props.Durability = 135;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.16;
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.speedPenaltyPercent = -2.25;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5.5;
        }
        //UHMWPE NIJ IV (BSG bullshit, not sure if this is even a thing IRL)
        if (serverItem._id === "656fafe3498d1b7e3e071da4") {
            serverItem._props.Durability = 110;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.16;
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -6;
        }

        //Combined NIJ III
        if (serverItem._id === "656f9fa0498d1b7e3e071d98") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Prefab.path = "assets/content/items/equipment/plate_pgd_esapi_iv_sa_medium/item_equipment_plate_pgd_esapi_iv_sa_medium.bundle"
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }
        //Combined NIJ III+
        if (serverItem._id === "656fa61e94b480b8a500c0e8") {
            serverItem._props.Durability = 135;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Prefab.path = "assets/content/items/equipment/plate_pgd_esapi_iv_sa_medium/item_equipment_plate_pgd_esapi_iv_sa_medium.bundle"
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }
        //Combined NIJ IV
        if (serverItem._id === "656fa53d94b480b8a500c0e4") {
            serverItem._props.Durability = 145;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Prefab.path = "assets/content/items/equipment/plate_pgd_esapi_iv_sa_medium/item_equipment_plate_pgd_esapi_iv_sa_medium.bundle"
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }

        //Ceramic NIJ III
        if (serverItem._id === "656fb21fa0dce000a2020f7c") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }
        //Ceramic NIJ III+
        if (serverItem._id === "656fb0bd7c2d57afe200c0dc") {
            serverItem._props.Durability = 135;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }
        //Ceramic NIJ IV
        if (serverItem._id === "") {
            serverItem._props.Durability = 145;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }

        //SAPI
        if (serverItem._id === "655746010177119f4a097ff7") {
            serverItem._props.Durability = 140;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }
        //SSAPI Side
        if (serverItem._id === "6557458f83942d705f0c4962") {
            serverItem._props.Durability = 50;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.speedPenaltyPercent = -0.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
        }

        //ESAPI
        if (serverItem._id === "64afdcb83efdfea28601d041") {
            serverItem._props.Durability = 150;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }
        //ESBI Side
        if (serverItem._id === "64afdb577bb3bfe8fe03fd1d") {
            serverItem._props.Durability = 60;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.speedPenaltyPercent = -0.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
        }
        //XSAPI
        if (serverItem._id === "xsapi_chest") {
            serverItem._props.Durability = 160;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 10;
            serverItem._props.BluntThroughput = 0.14;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }

        //Osprey MK4A Plate
        if (serverItem._id === "mk4a_plate") {
            serverItem._props.Durability = 100;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.1;
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
        }

        //6B12 (used by 6B23-1, should be class 8 with taking aramid into account)
        if (serverItem._id === "654a4dea7c17dec2f50cc86a") {
            serverItem._props.Durability = 120;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -7.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }

        //6B13 (back)
        if (serverItem._id === "656efd66034e8e01c407f35c") {
            serverItem._props.Durability = 115;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -1.75;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
        }

        //6B33 (used by 6B13)
        if (serverItem._id === "656f603f94b480b8a500c0d6") {
            serverItem._props.Durability = 145;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }

        //6B23-2 (back)
        if (serverItem._id === "657b22485f444d6dff0c6c2f") {
            serverItem._props.Durability = 140;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
        }

        //Granit 4 Front
        if (serverItem._id === "656f611f94b480b8a500c0db") {
            serverItem._props.Durability = 130;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }
        //Granit 4 Back
        if (serverItem._id === "656efaf54772930db4031ff5") {
            serverItem._props.Durability = 125;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -1.75;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0
        }

        //Granit BR4
        if (serverItem._id === "65573fa5655447403702a816") {
            serverItem._props.Durability = 150;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 9;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -3.5;
        }

        //Granit 4RS Front
        if (serverItem._id === "656f63c027aed95beb08f62c") {
            serverItem._props.Durability = 140;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 10;
            serverItem._props.BluntThroughput = 0.125;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }
        //Granit 4RS Back
        if (serverItem._id === "654a4a964b446df1ad03f192") {
            serverItem._props.Durability = 130;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 10;
            serverItem._props.BluntThroughput = 0.15;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -1.75;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0
        }

        //Granit BR5
        if (serverItem._id === "64afc71497cf3a403c01ff38") {
            serverItem._props.Durability = 140;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 10;
            serverItem._props.BluntThroughput = 0.12;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -3.5;
        }
        //Granit Side
        if (serverItem._id === "64afd81707e2cf40e903a316") {
            serverItem._props.Durability = 50;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 10;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -0.75;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
        }

        //korund VM Front
        if (serverItem._id === "656f664200d62bcd2e024077") {
            serverItem._props.Durability = 120;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -7.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }
        //korund VM Back
        if (serverItem._id === "657b2797c3dbcb01d60c35ea") {
            serverItem._props.Durability = 115;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
        }
        //korund VM Side
        if (serverItem._id === "654a4f8bc721968a4404ef18") {
            serverItem._props.Durability = 45;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 8;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -0.85;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
        }

        //korund VM-K Front
        if (serverItem._id === "656f66b5c6baea13cd07e108") {
            serverItem._props.Durability = 135;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 10;
            serverItem._props.BluntThroughput = 0.12;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -7.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }
        //korund VM-K Back
        if (serverItem._id === "657b28d25f444d6dff0c6c77") {
            serverItem._props.Durability = 130;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 10;
            serverItem._props.BluntThroughput = 0.13;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0
        }

        //Zhuk-3 Front
        if (serverItem._id === "656f57dc27aed95beb08f628") {
            serverItem._props.Durability = 80;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 6;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.speedPenaltyPercent = -3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
        }
    }

    private loadGlasses(serverItem: ITemplateItem) {
        /////// Eyewear //////
        //6b34
        if (serverItem._id === "5b432be65acfc433000ed01f") {
            serverItem._props.Durability = 30;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 2;
            serverItem._props.BluntThroughput = 0.025;
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.armorColliders = ['Eyes'];
        }
        //yellow goggles
        if (serverItem._id === "59e770b986f7742cbd762754") {
            serverItem._props.Durability = 15;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 1;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.armorColliders = ['Eyes'];
        }
        //oakley SIM
        if (serverItem._id === "5c1a1cc52e221602b3136e3d") {
            serverItem._props.Durability = 17;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 1;
            serverItem._props.BluntThroughput = 0.1;
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.armorColliders = ['Eyes'];
        }
        //oakley SIM
        if (serverItem._id === "62a61c988ec41a51b34758d5") {
            serverItem._props.Durability = 15;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 1;
            serverItem._props.BluntThroughput = 0.12;
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.armorColliders = ['Eyes'];
        }
        //pyramex
        if (serverItem._id === "5c0d32fcd174af02a1659c75") {
            serverItem._props.Durability = 12;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 1;
            serverItem._props.BluntThroughput = 0.1;
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.armorColliders = ['Eyes'];
        }
        //crossbow
        if (serverItem._id === "5d5fca1ea4b93635fd598c07") {
            serverItem._props.Durability = 10;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 1;
            serverItem._props.BluntThroughput = 0.15;
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.armorColliders = ['Eyes'];
        }
    }

    private loadArmorMods(serverItem: ITemplateItem) {
        const classModifier = this.modConf.buff_helmets === true ? 1 : 0;
        const duraModifier = this.modConf.buff_helmets === true ? 1.25 : 1;
        const bluntModifier = this.modConf.buff_helmets === true ? 0.85 : 1;

        //// Helmet Accesories ////
        //// Class 1 ////


        //// Class 2 ////
        //K1S Visor
        if (serverItem._id === "5ac4c50d5acfc40019262e87") {
            serverItem._props.Durability = 30 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 2 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -16;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 1;
        }
        //Ops-Core FAST Visor
        if (serverItem._id === "5a16b672fcdbcb001912fa83") {
            serverItem._props.Durability = 20 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 2 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.35;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.2;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 0.35;
        }
        //Caiman Fixed Arm Visor
        if (serverItem._id === "5f60bf4558eff926626a60f2") {
            serverItem._props.Durability = 20 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 2 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.38;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 0.38;
        }
        //// Class 3 ////
        //Heavy Trooper mask
        if (serverItem._id === "5ea058e01dbce517f324b3e2") {
            serverItem._props.Durability = 20 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 3 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.4;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -9;
            serverItem._props.BluntThroughput = 0.04 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.4;
        }
        //Kiver face shield
        if (serverItem._id === "5b46238386f7741a693bcf9c") {
            serverItem._props.Durability = 25 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 3 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.22;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -14;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 1.22;
        }
        //TW EXFIL Visor Black
        if (serverItem._id === "5e00cdd986f7747473332240") {
            serverItem._props.Durability = 22 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 3 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.252;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -13;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 0.252;
        }
        //TW EXFIL Visor Coyote
        if (serverItem._id === "5e01f37686f774773c6f6c15") {
            serverItem._props.Durability = 22 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 3 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.252;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -13;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 0.252;
        }
        //// Class 4 ////
        //Zsh Visor
        if (serverItem._id === "5aa7e3abe5b5b000171d064d") {
            serverItem._props.Durability = 25 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -12;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 1.1;
        }
        //Tor-2 Visor
        if (serverItem._id === "65719f9ef392ad76c50a2ec8") {
            serverItem._props.Durability = 35 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.15;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -10;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 1.15;
        }
        //Novasteel/Neosteel Mandible
        if (serverItem._id === "6570a88c8f221f3b210353b7") {
            serverItem._props.Durability = 20 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -14;
            serverItem._props.BluntThroughput = 0.01 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 1.2;
        }
        //FAST Mandible
        if (serverItem._id === "5a16ba61fcdbcb098008728a") {
            serverItem._props.Durability = 40 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.8;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -10;
            serverItem._props.BluntThroughput = 0.05;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 0.8;
        }
        //Altyn Visor
        if (serverItem._id === "5aa7e373e5b5b000137b76f0") {
            serverItem._props.Durability = 35 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.4;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -20;
            serverItem._props.BluntThroughput = 0.03 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Weight = 1.4;
        }
        //Rys-T Visor
        if (serverItem._id === "5f60c85b58eff926626a60f7") {
            serverItem._props.Durability = 30 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -18;
            serverItem._props.BluntThroughput = 0.03;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Weight = 1.2;
        }
        //FAST Side Armor
        if (serverItem._id === "5a16badafcdbcb001865f72d") {
            serverItem._props.Durability = 14 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.08 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.3;
        }
        //TW EXFIL Ear Covers Black
        if (serverItem._id === "5e00cfa786f77469dc6e5685") {
            serverItem._props.Durability = 8 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.172;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.08 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.172;
        }
        //TW EXFIL Ear Covers Coyote
        if (serverItem._id === "5e01f31d86f77465cf261343") {
            serverItem._props.Durability = 8 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.172;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.08 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.172;
        }
        //// Class 5 ////
        //Caiman Mandible
        if (serverItem._id === "5f60c076f2bcbb675b00dac2") {
            serverItem._props.Durability = 25 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.65;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -8;
            serverItem._props.BluntThroughput = 0.025 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.65;
        }
        //LSHZ-2DTM Aventail
        if (serverItem._id === "5d6d3be5a4b9361bc73bc763") {
            serverItem._props.Durability = 40 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.025 * bluntModifier;
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.2;
        }
        //LSHZ Visor
        if (serverItem._id === "5d6d3829a4b9361bc8618943") {
            serverItem._props.Durability = 20 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -8;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 1;
        }
        //Vulkan-5 Visor
        if (serverItem._id === "5ca2113f86f7740b2547e1d2") {
            serverItem._props.Durability = 35 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.8;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -14;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 1.8;
        }
        //Ops-Core Multi-Hit Visor
        if (serverItem._id === "5a16b7e1fcdbcb00165aa6c9") {
            serverItem._props.Durability = 60 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.33;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -18;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Glass';
            serverItem._props.Weight = 1.33;
        }
        //Maska Visor
        if (serverItem._id === "5c0919b50db834001b7ce3b9") {
            serverItem._props.Durability = 30 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -28;
            serverItem._props.BluntThroughput = 0.02 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 1.1;
        }
        //Maska Killa Visor
        if (serverItem._id === "5c0e842486f77443a74d2976") {
            serverItem._props.Durability = 30 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -1.1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -28;
            serverItem._props.BluntThroughput = 0.02 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 1.1;
        }
        //Crye Airframe Chops
        if (serverItem._id === "5c178a942e22164bef5ceca3") {
            serverItem._props.Durability = 25 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.76;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -7;
            serverItem._props.BluntThroughput = 0.04 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.76;
        }
        //Crye Airframe Ears
        if (serverItem._id === "5c1793902e221602b21d3de2") {
            serverItem._props.Durability = 15 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.25;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.08 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.25;
        }
        //Caiman Hybrid Ballistic Applique
        if (serverItem._id === "5f60b85bbdb8e27dee3dc985") {
            serverItem._props.Durability = 30 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.59;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.12 * bluntModifier;
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.59;
        }
        //// Class 7 ////
        //SLAAP armor Plate
        if (serverItem._id === "5c0e66e2d174af02a96252f4") {
            serverItem._props.Durability = 32 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.45;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.12 * bluntModifier;
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.45;
        }

        //Diamond Age Armor Plate
        if (serverItem._id === "5ea18c84ecf1982c7712d9a2") {
            serverItem._props.Durability = 36 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 7 + classModifier;
            serverItem._props.speedPenaltyPercent = -0.99;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.07 * bluntModifier;
            serverItem._props.ArmorMaterial = 'Ceramic';
            serverItem._props.Weight = 0.99;
        }
    }


    private modifySubArmor(serverItem: ITemplateItem, tables: IDatabaseTables, validSlots: string[], durability: number, armorClass: number, blunt: number, armorMat: string) {

        //make sure item has slots array
        if (Array.isArray(serverItem._props.Slots)) {
            for (const slot of serverItem._props.Slots) {
                //check if slot is of valid type
                if (validSlots.includes(slot._name.toLowerCase())) {
                    //iterate filters array
                    for (const filter of slot._props.filters) {
                        //iterate over items contained in filters array
                        for (const item of filter.Filter) {
                            let subArmor = tables.templates.items[item];
                            subArmor._props.armorClass = armorClass;
                            subArmor._props.Durability = durability;
                            subArmor._props.MaxDurability = durability;
                            if (slot._name.toLowerCase().includes("eyes")) {
                                subArmor._props.ArmorMaterial = 'Glass';
                            }

                            if (subArmor._props.ArmorMaterial.toLocaleLowerCase() !== "glass") {
                                subArmor._props.ArmorMaterial = armorMat;
                                subArmor._props.BluntThroughput = blunt;
                            }
                            //Ronin is a special case
                            else {
                                subArmor._props.BluntThroughput = 0;
                                if (armorClass === 5) {
                                    subArmor._props.armorClass = 3;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    private loadHelmets(serverItem: ITemplateItem, tables: IDatabaseTables) {

        const classModifier = this.modConf.buff_helmets === true ? 1 : 0;
        const duraModifier = this.modConf.buff_helmets === true ? 1.25 : 1;
        const bluntModifier = this.modConf.buff_helmets === true ? 0.65 : 0.75;

        ///// HELMETS //////
        //// Class 0 ////
        //Beanie
        if (serverItem._id === "60bf74184a63fc79b60c57f6") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = 2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 5;
            serverItem._props.BluntThroughput = 0.0;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.armorColliders = [
                "ParietalHead"
            ];
        }
        //Tank Crew Helmet
        if (serverItem._id === "5df8a58286f77412631087ed") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = 0;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';

            this.modifySubArmor(serverItem, tables, validHelmetSlots, 20 * duraModifier, 1 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //// Class 1 ////
        //Knight Mask
        if (serverItem._id === "62963c18dbc8ab5f0d382d0b") {
            serverItem._props.Durability = 40 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 1 + classModifier;
            serverItem._props.speedPenaltyPercent = -5.78;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
            serverItem._props.BluntThroughput = 0.14 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.armorColliders = [
                "HeadCommon"
            ];
        }
        //Kolpak
        if (serverItem._id === "59e7711e86f7746cae05fbe1") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.9;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
            serverItem._props.BluntThroughput = 0.1 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 1.9;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 80 * duraModifier, 1 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //SHPM Firefighter
        if (serverItem._id === "5c08f87c0db8340019124324") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -8;
            serverItem._props.BluntThroughput = 0.15 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 1.5;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 70 * duraModifier, 1 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //Fast MT Helmet Replica
        if (serverItem._id === "5ea05cf85ad9772e6624305d") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.45;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.2;
            serverItem._props.BluntThroughput = 0.25 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.45;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 40 * duraModifier, 1 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //// Class 2 ////
        //Glorious E Mask
        if (serverItem._id === "62a09e08de7ac81993580532") {
            serverItem._props.Durability = 80 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 2 + classModifier;
            serverItem._props.speedPenaltyPercent = -10.28;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -10;
            serverItem._props.BluntThroughput = 0.25 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.armorColliders = [
                "ParietalHead",
                "Ears",
                "Jaws",
                "HeadCommon"
            ];
        }
        //Djeta
        if (serverItem._id === "5c0d2727d174af02a012cf58") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.3;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -9;
            serverItem._props.BluntThroughput = 0.16 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 1.3;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 76 * duraModifier, 2 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //// Class 3 ////
        //Shattered Facemask
        if (serverItem._id === "5b432b2f5acfc4771e1c6622") {
            serverItem._props.Durability = 100 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 3 + classModifier;
            serverItem._props.speedPenaltyPercent = -9.8;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -9;
            serverItem._props.BluntThroughput = 0.35 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.8;
            serverItem._props.armorColliders = [
                "Jaw",
                "Ears",
                "ParietalHead",
                "HeadCommon"
            ];
        }
        //UN Helmet
        if (serverItem._id === "5aa7d03ae5b5b00016327db5") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -2.2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -2;
            serverItem._props.BluntThroughput = 0.22 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 2.2;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 90 * duraModifier, 3 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //Kiver
        if (serverItem._id === "5645bc214bdc2d363b8b4571") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4.5;
            serverItem._props.BluntThroughput = 0.28 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.2;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 70 * duraModifier, 3 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //LZSh
        if (serverItem._id === "5b432d215acfc4771e1c6624") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.95;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.18;
            serverItem._props.BluntThroughput = 0.3 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 0.95;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 52 * duraModifier, 3 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //SSh-68
        if (serverItem._id === "5c06c6a80db834001b735491") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -2;
            serverItem._props.BluntThroughput = 0.075 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 1.5;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 40 * duraModifier, 3 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //Ratnik-BSh 6B47
        if (serverItem._id === "5a7c4850e899ef00150be885") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.95;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.5;
            serverItem._props.BluntThroughput = 0.26 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 0.95;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 60 * duraModifier, 3 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //Ratnik-BSh Covered 6B47
        if (serverItem._id === "5aa7cfc0e5b5b00015693143") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.96;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.5;
            serverItem._props.BluntThroughput = 0.26 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 0.96;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 60 * duraModifier, 3 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //// Class 4 ////
        //Tagilla's Welding Mask "UBEY"
        if (serverItem._id === "60a7ad2a2198820d95707a2e") {
            serverItem._props.Durability = 64 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -15.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -20;
            serverItem._props.BluntThroughput = 0.07 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Weight = 1.5;
            serverItem._props.armorColliders = [
                "Eyes",
                "Jaw",
                "Ears",
                "ParietalHead",
                "HeadCommon"
            ];
        }
        //Tagilla's Welding Mask "Gorilla"
        if (serverItem._id === "60a7ad3a0c5cb24b0134664a") {
            serverItem._props.Durability = 68 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -15.8;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -20;
            serverItem._props.BluntThroughput = 0.07 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Weight = 1.8;
            serverItem._props.armorColliders = [
                "Eyes",
                "Jaw",
                "Ears",
                "ParietalHead",
                "HeadCommon"
            ];
        }
        //NFM HJELM
        if (serverItem._id === "61bca7cda0eae612383adf57") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.8;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0;
            serverItem._props.BluntThroughput = 0.23 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.8;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 40 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //Sfera
        if (serverItem._id === "5aa7d193e5b5b000171d063f") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -3.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4.5;
            serverItem._props.BluntThroughput = 0.07 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 3.5;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 30 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //Ops-Core Fast MT Tan
        if (serverItem._id === "5ac8d6885acfc400180ae7b0") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.9;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.35;
            serverItem._props.BluntThroughput = 0.21 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.9;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 50 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //Ops-Core Fast MT Black
        if (serverItem._id === "5a154d5cfcdbcb001a3b00da") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.9;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.35;
            serverItem._props.BluntThroughput = 0.21 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.9;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 50 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //Crye Airframe
        if (serverItem._id === "5c17a7ed2e2216152142459c") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.88;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.45;
            serverItem._props.BluntThroughput = 0.19 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 0.88;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 60 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //Caiman
        if (serverItem._id === "5f60b34a41e30a4ab12a6947") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.12;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.2;
            serverItem._props.BluntThroughput = 0.18 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 1.12;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 55 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //TC-2001
        if (serverItem._id === "5d5e7d28a4b936645d161203") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.4;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.25;
            serverItem._props.BluntThroughput = 0.14 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.4;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 100 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //TC-2002
        if (serverItem._id === "5d5e9c74a4b9364855191c40") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.42;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.25;
            serverItem._props.BluntThroughput = 0.14 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.42;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 110 * duraModifier, 4 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //Death Shadow mask
        if (serverItem._id === "6570aead4d84f81fd002a033") {
            serverItem._props.Durability = 60 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 4 + classModifier;
            serverItem._props.speedPenaltyPercent = -10.1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -10;
            serverItem._props.BluntThroughput = 0.4 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 2.1;
            serverItem._props.armorColliders = [
                "Eyes",
                "HeadCommon"
            ];
        }
        //// Class 5 ////
        //Atomic Defense ballistic mask
        if (serverItem._id === "657089638db3adca1009f4ca") {
            serverItem._props.Durability = 120 * duraModifier;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 5 + classModifier;
            serverItem._props.speedPenaltyPercent = -13.1;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -15;
            serverItem._props.BluntThroughput = 0.5 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 2.1;
            serverItem._props.armorColliders = [
                "Jaw",
                "HeadCommon"
            ];
        }
        //Ronin
        if (serverItem._id === "5b4329f05acfc47a86086aa1") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -8.6;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -9;
            serverItem._props.BluntThroughput = 0.24 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.6;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 80 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //BNTI LSHZ-2DTM
        if (serverItem._id === "5d6d3716a4b9361bc8618872") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -2.4;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -4;
            serverItem._props.BluntThroughput = 0.23 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 2.4;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 100 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //ULACH Black
        if (serverItem._id === "5b40e1525acfc4771e1c6611") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.9;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.75;
            serverItem._props.BluntThroughput = 0.13 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.9;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 140 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //ULACH Tan
        if (serverItem._id === "5b40e2bc5acfc40016388216") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.9;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.75;
            serverItem._props.BluntThroughput = 0.13 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.9;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 140 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //ACHHC Black
        if (serverItem._id === "5b40e3f35acfc40016388218") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.5;
            serverItem._props.BluntThroughput = 0.145 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.5;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 125 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //ACHHC Olive
        if (serverItem._id === "5b40e4035acfc47a87740943") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.5;
            serverItem._props.BluntThroughput = 0.145 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 1.5;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 125 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //NPP KIASS Tor-2
        if (serverItem._id === "65719f0775149d62ce0a670b") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -2.4;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.25;
            serverItem._props.BluntThroughput = 0.165 * bluntModifier;
            serverItem._props.DeafStrength = "Low";
            serverItem._props.ArmorMaterial = 'Aramid';
            serverItem._props.Weight = 2.4;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 150 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Aramid');
        }
        //Team Wendy Exfil Black
        if (serverItem._id === "5e00c1ad86f774747333222c") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.18;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.15;
            serverItem._props.BluntThroughput = 0.195 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 1.18;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 55 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //Team Wendy Exfil Coyote
        if (serverItem._id === "5e01ef6886f77445f643baa4") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.18;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -0.15;
            serverItem._props.BluntThroughput = 0.195 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 1.18;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 55 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //TC 800
        if (serverItem._id === "5e4bfc1586f774264f7582d3") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.17;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0.5;
            serverItem._props.BluntThroughput = 0.19 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'UHMWPE';
            serverItem._props.Weight = 1.17;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 65 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'UHMWPE');
        }
        //Diamond Age
        if (serverItem._id === "5ea17ca01412a1425304d1c0") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -0.96;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 0.7;
            serverItem._props.BluntThroughput = 0.18 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Weight = 0.96;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 60 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Combined');
        }
        //Diamond Age NeoSteel/Nova Steel
        if (serverItem._id === "65709d2d21b9f815e208ff95") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -1.2;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = 1;
            serverItem._props.BluntThroughput = 0.085 * bluntModifier;
            serverItem._props.DeafStrength = "None";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 1.2;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 24 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //ZSh
        if (serverItem._id === "5aa7e454e5b5b0214e506fa2") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -3.7;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
            serverItem._props.BluntThroughput = 0.099 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 3.7;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 30 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //ZSh Black
        if (serverItem._id === "5aa7e4a4e5b5b000137b76f2") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -3.7;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -1.85;
            serverItem._props.BluntThroughput = 0.099 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 3.7;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 30 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //Altyn
        if (serverItem._id === "5aa7e276e5b5b000171d0647") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -2.8;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -6;
            serverItem._props.BluntThroughput = 0.072 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 2.8;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 40 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //Rys-T
        if (serverItem._id === "5f60c74e3b85f6263c145586") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -2.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -5;
            serverItem._props.BluntThroughput = 0.085 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Titan';
            serverItem._props.Weight = 2.5;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 40 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'Titan');
        }
        //Maska
        if (serverItem._id === "5c091a4e0db834001d5addc8") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -2.6;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -7;
            serverItem._props.BluntThroughput = 0.05 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 2.6;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 44 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //Maska Killa
        if (serverItem._id === "5c0e874186f7745dc7616606") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -2.6;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -7;
            serverItem._props.BluntThroughput = 0.05 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'ArmoredSteel';
            serverItem._props.Weight = 2.6;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 44 * duraModifier, 5 + classModifier, serverItem._props.BluntThroughput, 'ArmoredSteel');
        }
        //// Class 8 ////
        //Vulkan-5
        if (serverItem._id === "5ca20ee186f774799474abc2") {
            serverItem._props.Durability = 0;
            serverItem._props.MaxDurability = serverItem._props.Durability;
            serverItem._props.armorClass = 0;
            serverItem._props.speedPenaltyPercent = -4.5;
            serverItem._props.mousePenalty = 0;
            serverItem._props.weaponErgonomicPenalty = -8;
            serverItem._props.BluntThroughput = 0.14 * bluntModifier;
            serverItem._props.DeafStrength = "High";
            serverItem._props.ArmorMaterial = 'Combined';
            serverItem._props.Weight = 4.5;
            this.modifySubArmor(serverItem, tables, validHelmetSlots, 60 * duraModifier, 8 + classModifier, serverItem._props.BluntThroughput, 'Combined');
        }
    }
}