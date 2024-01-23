import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { ParentClasses } from "../utils/enums";
import { IArmorMaterials, IConfig } from "@spt-aki/models/eft/common/IGlobals";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

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

    public revertHelmetZones() {
        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._parent === ParentClasses.HEADWEAR) {
                for (let i = 0; i < serverItem._props.Slots.length; i++) {
                    if (serverItem._props.Slots[i]._name.toLowerCase().includes("helmet_")) {
                        serverItem._props.Slots.splice(i, i);
                    }
                }
            }
        }
    }


    public loadArmor() {

        //Armor Destructibility values
        this.armMat().Glass.Destructibility = 0.6;

        this.armMat().Aramid.Destructibility = 0.24;

        this.armMat().Ceramic.Destructibility = 0.18;

        this.armMat().Combined.Destructibility = 0.16;

        this.armMat().UHMWPE.Destructibility = 0.13;

        this.armMat().Titan.Destructibility = 0.06;

        this.armMat().ArmoredSteel.Destructibility = 0.2; //steel no longer becomes more likely to pen with dura loss, so represetns loss of anti-spall coating

        //add item ids of all aramid build-in armor
        const class3Aramid = [];
        const class4Aramid = [];
        const class5Aramid = [];

        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            let armorColliders = serverItem._props.armorColliders;
            let plateColliders = serverItem._props.armorPlateColliders;

            ///Built-In Aramid///
            if (class3Aramid.includes(serverItem)) {
                if (armorColliders.filter(str => str.includes("neck"))) {
                    serverItem._props.Durability = 25;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 3;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.45;
                }
                else if (armorColliders.filter(str => str.includes("arm"))) {
                    serverItem._props.Durability = 35;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 3;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.45;
                }
                else if (armorColliders.filter(str => str.includes("side"))) {
                    serverItem._props.Durability = 35;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 3;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.45;
                }
                else if (armorColliders.filter(str => str.includes("pelvis"))) {
                    serverItem._props.Durability = 40;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 3;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.6;
                }
                else {
                    serverItem._props.Durability = 100;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 3;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.45;
                }
            }
            if (class4Aramid.includes(serverItem)) {
                if (armorColliders.filter(str => str.includes("neck"))) {
                    serverItem._props.Durability = 25;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 4;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.5;
                }
                else if (armorColliders.filter(str => str.includes("arm"))) {
                    serverItem._props.Durability = 35;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 4;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.5;
                }
                else if (armorColliders.filter(str => str.includes("side"))) {
                    serverItem._props.Durability = 35;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 4;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.5;
                }
                else if (armorColliders.filter(str => str.includes("pelvis"))) {
                    serverItem._props.Durability = 40;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 4;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.6;
                }
                else {
                    serverItem._props.Durability = 100;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 4;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.5;
                }
            }
            if (class5Aramid.includes(serverItem)) {
                if (armorColliders.filter(str => str.includes("neck"))) {
                    serverItem._props.Durability = 25;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 5;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.6;
                }
                else if (armorColliders.filter(str => str.includes("arm"))) {
                    serverItem._props.Durability = 35;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 5;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.6;
                }
                else if (armorColliders.filter(str => str.includes("side"))) {
                    serverItem._props.Durability = 35;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 5;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.6;
                }
                else if (armorColliders.filter(str => str.includes("pelvis"))) {
                    serverItem._props.Durability = 40;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 5;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.6;
                }
                else {
                    serverItem._props.Durability = 100;
                    serverItem._props.MaxDurability = serverItem._props.Durability;
                    serverItem._props.armorClass = 5;
                    serverItem._props.ArmorMaterial = 'Aramid';
                    serverItem._props.BluntThroughput = 0.6;
                }
            }


            ////////Body Armor//////////
            //UN Armor front/back
            if (serverItem._id === "657045741bd9beedc40b7299" || serverItem._id === "657044e971369562b300ce9b") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 6;
                serverItem._props.BluntThroughput = 0.34;
                serverItem._props.ArmorMaterial = 'Aluminium';
            }
            //UN Armor sides
            if (serverItem._id === "657045b97e80617cee095bda" || serverItem._id === "6570460471369562b300ce9f") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.BluntThroughput = 0.5;
                serverItem._props.ArmorMaterial = 'Aramid';
            }

            //6B3TM front
            if (serverItem._id === "65764e1e2bc38ef78e076489") {
                serverItem._props.Durability = 110;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Titan';
            }
            //6B3TM back
            if (serverItem._id === "65764fae2bc38ef78e07648d") {
                serverItem._props.Durability = 80;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.BluntThroughput = 0.4;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 9.2;
            }
            //6B3TM groin
            if (serverItem._id === "6576500f526e320fbe03577f" || serverItem._id === "6576504b526e320fbe035783") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.BluntThroughput = 0.4;
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 9.2;
            }

            //6B5 Uley 16 front/back
            if (serverItem._id === "65764a4cd8537eb26a0355ee" || serverItem._id === "65764bc22bc38ef78e076485") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 6;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }
            //6B5 Uley 16 groin
            if (serverItem._id === "65764c6b526e320fbe03577b") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.BluntThroughput = 0.45;
                serverItem._props.ArmorMaterial = 'Aramid';
            }
            //6B5 Uley 16 neck
            if (serverItem._id === "65764c39526e320fbe035777") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.BluntThroughput = 0.5;
                serverItem._props.ArmorMaterial = 'Aramid';
            }

            //6B5 Uley 15 front/back
            if (serverItem._id === "657087577f6d4590ac0d2109" || serverItem._id === "6570880f4a747dbb63005ee5") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.BluntThroughput = 0.14;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }
            //6B5 Uley 15 groin
            if (serverItem._id === "65708b4c4a747dbb63005ef3") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.BluntThroughput = 0.45;
                serverItem._props.ArmorMaterial = 'Aramid';
            }
            //6B5 Uley 15 neck
            if (serverItem._id === "65708afe4a747dbb63005eee") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.BluntThroughput = 0.5;
                serverItem._props.ArmorMaterial = 'Aramid';
            }

            //6B2 Flora front/back
            if (serverItem._id === "656fd89bf5a9631d4e042575" || serverItem._id === "656fd7c32668ef0402028fb9") {
                serverItem._props.Durability = 85;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.BluntThroughput = 0.35;
                serverItem._props.ArmorMaterial = 'Titan';
            }

            //Steel NIJ III
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.BluntThroughput = 0.025;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }
            //Steel NIJ III+
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.015
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }


            //UHMWPE NIJ III
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.BluntThroughput = 0.2;
                serverItem._props.ArmorMaterial = 'UHMWPE';
            }
            //UHMWPE NIJ III+
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.2;
                serverItem._props.ArmorMaterial = 'UHMWPE';
            }

            //Combined NIJ III
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'Combined';
            }
            //Combined NIJ III+
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'Combined';
            }
            //Ceramic NIJ IV
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'Combined';
            }

            //Ceramic NIJ III
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }
            //Ceramic NIJ III+
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }
            //Ceramic NIJ IV
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }

            //SAPI
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Combined';
            }
            //SSAPI Side
            if (serverItem._id === "") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.14;
                serverItem._props.ArmorMaterial = 'Combined';
            }

            //ESAPI
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.ArmorMaterial = 'Combined';
            }
            //ESBI Side
            if (serverItem._id === "") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Combined';
            }

            //XSAPI
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Combined';
            }

            //Osprey MK4A
            if (serverItem._id === "") {
                serverItem._props.Durability = 105;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Combined';
            }

            //6B12 (used by 6B23-1, should be class 8 while taking aramid into account)
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }

            //6B13 (back)
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }

            //6B33 (used by 6B13)
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }

            //6B23-2 (back)
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }

            //Granit 4 Front
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.BluntThroughput = 0.3;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }

            //Granit 4 Back
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.BluntThroughput = 0.3;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }

            //Granit BR4
            if (serverItem._id === "") {
                serverItem._props.Durability = 110;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }

            //Granit 4RS Front
            if (serverItem._id === "") {
                serverItem._props.Durability = 80;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }
            //Granit 4RS Back
            if (serverItem._id === "") {
                serverItem._props.Durability = 70;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }

            //Granit BR5
            if (serverItem._id === "") {
                serverItem._props.Durability = 115;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }
            //Granit Side
            if (serverItem._id === "") {
                serverItem._props.Durability = 35;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }

            //Korund VM Front
            if (serverItem._id === "") {
                serverItem._props.Durability = 115;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.08;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }
            //Korund VM Back
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.08;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }
            //Korund VM Side
            if (serverItem._id === "") {
                serverItem._props.Durability = 40;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }

            //Korund VM-K Front
            if (serverItem._id === "") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }
            //Korund VM-K Back
            if (serverItem._id === "") {
                serverItem._props.Durability = 80;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.ArmorMaterial = 'Ceramic';
            }

            //Zhuk-3 Front
            if (serverItem._id === "") {
                serverItem._props.Durability = 80;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 6;
                serverItem._props.BluntThroughput = 0.2;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
            }


            /////// Eyewear //////
            //6b34
            if (serverItem._id === "5b432be65acfc433000ed01f") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 2;
                serverItem._props.BluntThroughput = 0.25;
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.armorColliders = ['Eyes'];
            }
            //yellow goggles
            if (serverItem._id === "59e770b986f7742cbd762754") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.20;
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.armorColliders = ['Eyes'];
            }
            //oakley SIM
            if (serverItem._id === "5c1a1cc52e221602b3136e3d") {
                serverItem._props.Durability = 17;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.30;
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.armorColliders = ['Eyes'];
            }
            //oakley SIM
            if (serverItem._id === "62a61c988ec41a51b34758d5") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.32;
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.armorColliders = ['Eyes'];
            }
            //pyramex
            if (serverItem._id === "5c0d32fcd174af02a1659c75") {
                serverItem._props.Durability = 12;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.40;
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.armorColliders = ['Eyes'];
            }
            //crossbow
            if (serverItem._id === "5d5fca1ea4b93635fd598c07") {
                serverItem._props.Durability = 10;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.35;
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.armorColliders = ['Eyes'];
            }
            /////// HELMETS //////
            //// Class 0 ////
            //Beanie
            if (serverItem._id === "60bf74184a63fc79b60c57f6") {
                serverItem._props.Durability = 69420;
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
                serverItem._props.Durability = 99999;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 0;
                serverItem._props.speedPenaltyPercent = 0;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = 0;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.armorColliders = [
                    "Jaw",
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //// Class 1 ////
            //Knight Mask
            if (serverItem._id === "62963c18dbc8ab5f0d382d0b") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.mousePenalty = 0;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.armorColliders = [
                    "ParietalHead"
                ];
            }
            //Kolpak
            if (serverItem._id === "59e7711e86f7746cae05fbe1") {
                serverItem._props.Durability = 40;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.speedPenaltyPercent = -0.95;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.95;
                serverItem._props.BluntThroughput = 0.05;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.9;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //SHPM Firefighter
            if (serverItem._id === "5c08f87c0db8340019124324") {
                serverItem._props.Durability = 35;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.05;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.5;
                serverItem._props.armorColliders = [
                    "Eyes",
                    "Jaw",
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Fast MT Helmet Replica
            if (serverItem._id === "5ea05cf85ad9772e6624305d") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.speedPenaltyPercent = -0.225;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.225;
                serverItem._props.BluntThroughput = 0.22;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.45;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //// Class 2 ////
            //Glorious E Mask
            if (serverItem._id === "62a09e08de7ac81993580532") {
                serverItem._props.Durability = 40;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.armorColliders = [
                    "ParietalHead",
                    "Ears",
                    "Jaws"
                ];
            }
            //Djeta
            if (serverItem._id === "5c0d2727d174af02a012cf58") {
                serverItem._props.Durability = 38;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 2;
                serverItem._props.speedPenaltyPercent = -0.65;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.65;
                serverItem._props.BluntThroughput = 0.05;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.3;
                serverItem._props.armorColliders = [
                    "Eyes",
                    "Jaw",
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //// Class 3 ////
            //Shattered Facemask
            if (serverItem._id === "5b432b2f5acfc4771e1c6622") {
                serverItem._props.Durability = 50;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.9;
                serverItem._props.BluntThroughput = 0.2;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.8;
                serverItem._props.armorColliders = [
                    "Jaw",
                    "Ears",
                    "ParietalHead"
                ];
            }
            //UN Helmet
            if (serverItem._id === "5aa7d03ae5b5b00016327db5") {
                serverItem._props.Durability = 45;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -1.1;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.1;
                serverItem._props.BluntThroughput = 0.16;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 2.2;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Kiver
            if (serverItem._id === "5645bc214bdc2d363b8b4571") {
                serverItem._props.Durability = 35;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.6;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.6;
                serverItem._props.BluntThroughput = 0.2;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.2;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //LZSh
            if (serverItem._id === "5b432d215acfc4771e1c6624") {
                serverItem._props.Durability = 26;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.475;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.475;
                serverItem._props.BluntThroughput = 0.27;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 0.95;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //SSh-68
            if (serverItem._id === "5c06c6a80db834001b735491") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -1.25;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.25;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 1.5;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Ratnik-BSh 6B47
            if (serverItem._id === "5a7c4850e899ef00150be885") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -1.65;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.65;
                serverItem._props.BluntThroughput = 0.26;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.305;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Ratnik-BSh Covered 6B47
            if (serverItem._id === "5aa7cfc0e5b5b00015693143") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -1.65;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.65;
                serverItem._props.BluntThroughput = 0.26;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.3;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //// Class 4 ////
            //Tagilla's Welding Mask "UBEY"
            if (serverItem._id === "60a7ad2a2198820d95707a2e") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.145;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 1.5;
                serverItem._props.armorColliders = [
                    "Eyes",
                    "Jaw",
                    "Ears",
                    "ParietalHead"
                ];
            }
            //Tagilla's Welding Mask "Gorilla"
            if (serverItem._id === "60a7ad3a0c5cb24b0134664a") {
                serverItem._props.Durability = 34;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.9;
                serverItem._props.BluntThroughput = 0.156;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 1.8;
                serverItem._props.armorColliders = [
                    "Eyes",
                    "Jaw",
                    "Ears",
                    "ParietalHead"
                ];
            }
            //NFM HJELM
            if (serverItem._id === "61bca7cda0eae612383adf57") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.4;
                serverItem._props.BluntThroughput = 0.35;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.8;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Sfera
            if (serverItem._id === "5aa7d193e5b5b000171d063f") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -1.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.75;
                serverItem._props.BluntThroughput = 0.22;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 3.5;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Ops-Core Fast MT Tan
            if (serverItem._id === "5ac8d6885acfc400180ae7b0") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.45;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.45;
                serverItem._props.BluntThroughput = 0.35;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.9;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Ops-Core Fast MT Black
            if (serverItem._id === "5a154d5cfcdbcb001a3b00da") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.45;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.45;
                serverItem._props.BluntThroughput = 0.35;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.9;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Crye Airframe
            if (serverItem._id === "5c17a7ed2e2216152142459c") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.44;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.44;
                serverItem._props.BluntThroughput = 0.33;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.88;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Caiman
            if (serverItem._id === "5f60b34a41e30a4ab12a6947") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.56;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.56;
                serverItem._props.BluntThroughput = 0.31;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.12;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //// Class 5 ////
            //Ronin
            if (serverItem._id === "5b4329f05acfc47a86086aa1") {
                serverItem._props.Durability = 50;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -5;
                serverItem._props.BluntThroughput = 0.3;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.6;
                serverItem._props.armorColliders = [
                    "Eyes",
                    "Jaw",
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //BNTI LSHZ-2DTM
            if (serverItem._id === "5d6d3716a4b9361bc8618872") {
                serverItem._props.Durability = 60;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.7;
                serverItem._props.BluntThroughput = 0.287;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 3.4;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //ZSh
            if (serverItem._id === "5aa7e454e5b5b0214e506fa2") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.85;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.85;
                serverItem._props.BluntThroughput = 0.165;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 3.7;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //ZSh Black
            if (serverItem._id === "5aa7e4a4e5b5b000137b76f2") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.85;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.85;
                serverItem._props.BluntThroughput = 0.165;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 3.7;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //TC-2001
            if (serverItem._id === "5d5e7d28a4b936645d161203") {
                serverItem._props.Durability = 50;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.7;
                serverItem._props.BluntThroughput = 0.24;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.4;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //TC-2002
            if (serverItem._id === "5d5e9c74a4b9364855191c40") {
                serverItem._props.Durability = 55;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.71;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.71;
                serverItem._props.BluntThroughput = 0.24;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.42;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //ULACH Black
            if (serverItem._id === "5b40e1525acfc4771e1c6611") {
                serverItem._props.Durability = 75;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.95;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.95;
                serverItem._props.BluntThroughput = 0.19;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.9;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //ULACH Tan
            if (serverItem._id === "5b40e2bc5acfc40016388216") {
                serverItem._props.Durability = 75;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.95;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.95;
                serverItem._props.BluntThroughput = 0.19;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.9;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //ACHHC Black
            if (serverItem._id === "5b40e3f35acfc40016388218") {
                serverItem._props.Durability = 60;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.22;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.5;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //ACHHC Olive
            if (serverItem._id === "5b40e4035acfc47a87740943") {
                serverItem._props.Durability = 60;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.22;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.5;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Team Wendy Exfil Black
            if (serverItem._id === "5e00c1ad86f774747333222c") {
                serverItem._props.Durability = 19;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.59;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.59;
                serverItem._props.BluntThroughput = 0.48;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.18;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Team Wendy Exfil Coyote
            if (serverItem._id === "5e01ef6886f77445f643baa4") {
                serverItem._props.Durability = 19;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.59;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.59;
                serverItem._props.BluntThroughput = 0.48;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.18;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //TC 800
            if (serverItem._id === "5e4bfc1586f774264f7582d3") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.585;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.585;
                serverItem._props.BluntThroughput = 0.44;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.17;
                serverItem._props.armorColliders = [
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Altyn
            if (serverItem._id === "5aa7e276e5b5b000171d0647") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 4;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Rys-T
            if (serverItem._id === "5f60c74e3b85f6263c145586") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.25;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.25;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 2.5;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Diamond Age
            if (serverItem._id === "5ea17ca01412a1425304d1c0") {
                serverItem._props.Durability = 27;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.48;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.48;
                serverItem._props.BluntThroughput = 0.39;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 0.96;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Maska
            if (serverItem._id === "5c091a4e0db834001d5addc8") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.3;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.3;
                serverItem._props.BluntThroughput = 0.088;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 2.6;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //Maska Killa
            if (serverItem._id === "5c0e874186f7745dc7616606") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.3;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.3;
                serverItem._props.BluntThroughput = 0.088;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 2.6;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }
            //// Class 8 ////
            //Vulkan-5
            if (serverItem._id === "5ca20ee186f774799474abc2") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -2.25;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2.25;
                serverItem._props.BluntThroughput = 0.108;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 4.5;
                serverItem._props.armorColliders = [
                    "Ears",
                    "BackHead",
                    "ParietalHead"
                ];
            }

            //// Helmet Accesories ////
            //// Class 1 ////
            //K1S Visor
            if (serverItem._id === "5ac4c50d5acfc40019262e87") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.speedPenaltyPercent = -0.5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.5;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 1;
            }
            //Ops-Core FAST Visor
            if (serverItem._id === "5a16b672fcdbcb001912fa83") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.speedPenaltyPercent = -0.175;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.175;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 0.35;
            }

            //// Class 2 ////
            //Caiman Fixed Arm Visor
            if (serverItem._id === "5f60bf4558eff926626a60f2") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 2;
                serverItem._props.speedPenaltyPercent = -0.19;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.19;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 0.38;
            }
            //// Class 3 ////
            //Heavy Trooper mask
            if (serverItem._id === "5ea058e01dbce517f324b3e2") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -4;
                serverItem._props.BluntThroughput = 0.036;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.4;
            }
            //Caiman Mandible
            if (serverItem._id === "5f60c076f2bcbb675b00dac2") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.325;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2;
                serverItem._props.BluntThroughput = 0.026;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.65;
            }
            //Kiver face shield
            if (serverItem._id === "5b46238386f7741a693bcf9c") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.61;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.61;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 1.22;
            }
            //TW EXFIL Visor Black
            if (serverItem._id === "5e00cdd986f7747473332240") {
                serverItem._props.Durability = 22;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.125;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.125;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 0.252;
            }
            //TW EXFIL Visor Coyote
            if (serverItem._id === "5e01f37686f774773c6f6c15") {
                serverItem._props.Durability = 22;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.125;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.125;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 0.252;
            }
            //// Class 4 ////
            //Zsh Visor
            if (serverItem._id === "5aa7e3abe5b5b000171d064d") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.55;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.55;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 1.1;
            }
            //FAST Mandible
            if (serverItem._id === "5a16ba61fcdbcb098008728a") {
                serverItem._props.Durability = 40;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -4;
                serverItem._props.BluntThroughput = 0.013;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 0.8;
            }
            //Altyn Visor
            if (serverItem._id === "5aa7e373e5b5b000137b76f0") {
                serverItem._props.Durability = 35;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.7;
                serverItem._props.BluntThroughput = 0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 1.4;
            }
            //Rys-T Visor
            if (serverItem._id === "5f60c85b58eff926626a60f7") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.6;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.6;
                serverItem._props.BluntThroughput = 0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 1.2;
            }
            //FAST Side Armor
            if (serverItem._id === "5a16badafcdbcb001865f72d") {
                serverItem._props.Durability = 14;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.15;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.15;
                serverItem._props.BluntThroughput = 0.156;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.3;
            }
            //TW EXFIL Ear Covers Black
            if (serverItem._id === "5e00cfa786f77469dc6e5685") {
                serverItem._props.Durability = 8;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.085;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.085;
                serverItem._props.BluntThroughput = 0.091;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.172;
            }
            //TW EXFIL Ear Covers Coyote
            if (serverItem._id === "5e01f31d86f77465cf261343") {
                serverItem._props.Durability = 8;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.085;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.085;
                serverItem._props.BluntThroughput = 0.091;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.172;
            }
            //// Class 5 ////
            //LSHZ-2DTM Aventail
            if (serverItem._id === "5d6d3be5a4b9361bc73bc763") {
                serverItem._props.Durability = 40;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.6;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.6;
                serverItem._props.BluntThroughput = 0.01;
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.2;
            }
            //LSHZ Visor
            if (serverItem._id === "5d6d3829a4b9361bc8618943") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.5;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 1;
            }
            //Vulkan-5 Visor
            if (serverItem._id === "5ca2113f86f7740b2547e1d2") {
                serverItem._props.Durability = 35;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.9;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 1.8;
            }
            //Ops-Core Multi-Hit Visor
            if (serverItem._id === "5a16b7e1fcdbcb00165aa6c9") {
                serverItem._props.Durability = 60;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.65;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.65;
                serverItem._props.BluntThroughput = 0.0;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Glass';
                serverItem._props.Weight = 1.33;
            }
            //Maska Visor
            if (serverItem._id === "5c0919b50db834001b7ce3b9") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.55;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.55;
                serverItem._props.BluntThroughput = 0.05;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 1.1;
            }
            //Maska Killa Visor
            if (serverItem._id === "5c0e842486f77443a74d2976") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.55;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.55;
                serverItem._props.BluntThroughput = 0.05;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 1.1;
            }
            //Crye Airframe Chops
            if (serverItem._id === "5c178a942e22164bef5ceca3") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.38;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.38;
                serverItem._props.BluntThroughput = 0.06;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.76;
            }
            //Crye Airframe Ears
            if (serverItem._id === "5c1793902e221602b21d3de2") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.125;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.125;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.25;
            }
            //Caiman Hybrid Ballistic Applique
            if (serverItem._id === "5f60b85bbdb8e27dee3dc985") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.34;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.34;
                serverItem._props.BluntThroughput = 0.16;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.59;
            }
            //// Class 7 ////
            //SLAAP armor Plate
            if (serverItem._id === "5c0e66e2d174af02a96252f4") {
                serverItem._props.Durability = 32;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.175;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.45;
            }

            //Diamond Age Armor Plate
            if (serverItem._id === "5ea18c84ecf1982c7712d9a2") {
                serverItem._props.Durability = 36;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -0.5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -3.2;
                serverItem._props.BluntThroughput = 0.117;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 0.99;
            }
        }

        if (this.modConf.logEverything == true) {
            this.logger.info("Armour loaded");
        }
    }

    public buffHelmets() {
        //give built in helmet armor and masks a higher armor class
        if (this.modConf.logEverything == true) {
            this.logger.info("Helmets Buffed");
        }
    }
}