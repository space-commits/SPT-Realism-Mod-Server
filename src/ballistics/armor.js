"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Armor = void 0;
const enums_1 = require("../utils/enums");
class Armor {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.armMat = this.globalDB.ArmorMaterials;
    }
    loadArmor() {
        //Armor Destructibility values
        this.armMat.Glass.Destructibility = 0.6;
        this.armMat.Aramid.Destructibility = 0.24;
        this.armMat.Ceramic.Destructibility = 0.18;
        this.armMat.Combined.Destructibility = 0.16;
        this.armMat.UHMWPE.Destructibility = 0.13;
        this.armMat.Titan.Destructibility = 0.06;
        this.armMat.ArmoredSteel.Destructibility = 0.2; //steel no longer becomes more likely to pen with dura loss, so represetns loss of anti-spall coating
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            ////////Body Armor//////////
            //// Class 3////
            //Module-3M bodyarmor
            if (serverItem._id === "59e7635f86f7742cbf2c1095") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2;
                serverItem._props.BluntThroughput = 0.45;
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 3.5;
            }
            //DRD body armor
            if (serverItem._id === "62a09d79de7ac81993580530") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = 1;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = 1;
                serverItem._props.BluntThroughput = 0.4;
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 3;
            }
            //// Class 4////
            //PACA
            if (serverItem._id === "5648a7494bdc2d9d488b4583") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -1;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1;
                serverItem._props.BluntThroughput = 0.5;
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 3;
            }
            //// Class 5////
            //6B2 Flora
            if (serverItem._id === "5df8a2ca86f7740bfe6df777") {
                serverItem._props.Durability = 85;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -5;
                serverItem._props.BluntThroughput = 0.35;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 5.4;
            }
            //Kirasa
            if (serverItem._id === "5b44d22286f774172b0c9de8") {
                serverItem._props.Durability = 115;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -8;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -8;
                serverItem._props.BluntThroughput = 0.2;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 7.1;
            }
            //// Class 6////
            //Thor CV
            if (serverItem._id === "609e8540d5c319764c2bc2e9") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 6;
                serverItem._props.speedPenaltyPercent = -4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -4;
                serverItem._props.BluntThroughput = 0.3;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 5.7;
            }
            //UN Armor
            if (serverItem._id === "5ab8e4ed86f7742d8e50c7fa") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 6;
                serverItem._props.speedPenaltyPercent = -7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -7;
                serverItem._props.BluntThroughput = 0.34;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 8.5;
            }
            //Zhuk-3
            if (serverItem._id === "5c0e5edb86f77461f55ed1f7") {
                serverItem._props.Durability = 80;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 6;
                serverItem._props.speedPenaltyPercent = -7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -7;
                serverItem._props.BluntThroughput = 0.26;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 5.2;
            }
            //// Class 7////
            //Highcom Trooper
            if (serverItem._id === "5c0e655586f774045612eeb2") {
                serverItem._props.Durability = 120;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -4.5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -4.5;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 7.5;
            }
            //Hexatac
            if (serverItem._id === "63737f448b28897f2802b874") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -2.5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2.5;
                serverItem._props.BluntThroughput = 0.14;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 6;
            }
            //// Class 8////
            //Black Slick
            if (serverItem._id === "5e4abb5086f77406975c9342") {
                serverItem._props.Durability = 90;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2;
                serverItem._props.BluntThroughput = 0.025;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 8.1;
            }
            //Olive Slick
            if (serverItem._id === "6038b4ca92ec1c3103795a0d") {
                serverItem._props.Durability = 90;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2;
                serverItem._props.BluntThroughput = 0.025;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 8.1;
            }
            //Tan Slick
            if (serverItem._id === "6038b4b292ec1c3103795a0b") {
                serverItem._props.Durability = 90;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2;
                serverItem._props.BluntThroughput = 0.025;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 8.1;
            }
            //6B23-1
            if (serverItem._id === "5c0e5bab86f77461f55ed1f3") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 7.9;
            }
            //Korund
            if (serverItem._id === "5f5f41476bdad616ad46d631") {
                serverItem._props.Durability = 115;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.08;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 9.8;
            }
            //// Class 9////
            ///////////////////////////////////
            //6B13 Digital
            if (serverItem._id === "5c0e53c886f7747fa54205c7") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 11.5;
            }
            //6B13 Flora
            if (serverItem._id === "5c0e51be86f774598e797894") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 11.5;
            }
            //6B23-2
            if (serverItem._id === "5c0e57ba86f7747fa141986d") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 12;
            }
            //////////////////////////////
            //THOR Integrated Carrier
            if (serverItem._id === "60a283193cb70855c43a381d") {
                serverItem._props.Durability = 130;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -11;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -11;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 13.7;
            }
            //Hexgrid
            if (serverItem._id === "5fd4c474dd870108a754b241") {
                serverItem._props.Durability = 120;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -3;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -3;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 7.4;
            }
            //Ghzel-K
            if (serverItem._id === "5ab8e79e86f7742d8b372e78") {
                serverItem._props.Durability = 110;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -7;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 8.9;
            }
            //6B13 Killa
            if (serverItem._id === "5c0e541586f7747fa54205c9") {
                serverItem._props.Durability = 120;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 8.3;
            }
            //FORT Defender
            if (serverItem._id === "5e9dacf986f774054d6b89f4") {
                serverItem._props.Durability = 120;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 10;
            }
            //Redut-M
            if (serverItem._id === "5ca2151486f774244a3b8d30") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -10;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -10;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 13.5;
            }
            //Redut-T5
            if (serverItem._id === "5ca21c6986f77479963115a7") {
                serverItem._props.Durability = 125;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -12;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -12;
                serverItem._props.BluntThroughput = 0.08;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 16.5;
            }
            //// Class 10////
            //Gen 4 Full
            if (serverItem._id === "5b44cd8b86f774503d30cba2") {
                serverItem._props.Durability = 105;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.speedPenaltyPercent = -10;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -10;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 14;
            }
            //Gen 4 Assault
            if (serverItem._id === "5b44cf1486f77431723e3d05") {
                serverItem._props.Durability = 95;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 12;
            }
            //Gen 4 Mobility
            if (serverItem._id === "5b44d0de86f774503d30cba8") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.speedPenaltyPercent = -8;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -8;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 12;
            }
            //6B43
            if (serverItem._id === "545cdb794bdc2d3a198b456a") {
                serverItem._props.Durability = 120;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.speedPenaltyPercent = -12;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -12;
                serverItem._props.BluntThroughput = 0.08;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 20;
            }
            //Zhuk-6a
            if (serverItem._id === "5c0e625a86f7742d77340f62") {
                serverItem._props.Durability = 80;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.speedPenaltyPercent = -7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -7;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 9.5;
            }
            //// ARMORED RIGS ////
            //// Class 5 ////
            //6B3TM
            if (serverItem._id === "5d5d646386f7742797261fd9") {
                serverItem._props.Durability = 110;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 9.2;
            }
            //// Class 6 ////
            //6B5 Uley 16
            if (serverItem._id === "5c0e3eb886f7742015526062") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 6;
                serverItem._props.speedPenaltyPercent = -10;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -12.25;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 7.5;
            }
            //// Class 7 ////    
            //6B5 Uley 15
            if (serverItem._id === "5c0e446786f7742013381639") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -10;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 12.2;
            }
            //First-Spear
            if (serverItem._id === "61bcc89aef0f505f0c6cd0fc") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -6;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -7;
                serverItem._props.BluntThroughput = 0.14;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 7.9;
            }
            //S&S Precision PlateFrame plate carrier (Goons Edition)
            if (serverItem._id === "628b9784bcf6e2659e09b8a2") {
                serverItem._props.Durability = 90;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -3;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -3;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 6;
            }
            //TV-110
            if (serverItem._id === "5c0e746986f7741453628fe5") {
                serverItem._props.Durability = 115;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -6;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.015;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 10.3;
            }
            //A18
            if (serverItem._id === "5d5d87f786f77427997cfaef") {
                serverItem._props.Durability = 130;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -7;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 8.2;
            }
            //ANA M1
            if (serverItem._id === "5c0e722886f7740458316a57") {
                serverItem._props.Durability = 110;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -8;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 8.8;
            }
            //ANA M2
            if (serverItem._id === "5ab8dced86f774646209ec87") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -8;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 8.4;
            }
            //// Class 8 ////  
            //Osprey MK4A Assault
            if (serverItem._id === "60a3c70cde5f453f634816a3") {
                serverItem._props.Durability = 105;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -8;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 10;
            }
            //Osprey MK4A Protection
            if (serverItem._id === "60a3c68c37ea821725773ef5") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -10;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 12.5;
            }
            //AVS
            if (serverItem._id === "544a5caa4bdc2d1a388b4568") {
                serverItem._props.Durability = 125;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -8;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.0125;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 9.9;
            }
            //AACPC
            if (serverItem._id === "5e4ac41886f77406a511c9a8") {
                serverItem._props.Durability = 110;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -8;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 8.5;
            }
            //Eagle MMAC
            if (serverItem._id === "61bc85697113f767765c7fe7") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -7;
                serverItem._props.BluntThroughput = 0.02;
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 9.1;
            }
            //Tasmanian Tiger SK Multicam Black
            if (serverItem._id === "628cd624459354321c4b7fa2") {
                serverItem._props.Durability = 90;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -5;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 7.5;
            }
            // Bagariy
            if (serverItem._id === "628d0618d1ba6e4fa07ce5a4") {
                serverItem._props.Durability = 125;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -8;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.08;
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 13;
            }
            //// Class 9 ////  
            //Crye Precision CPC plate carrier (Goons Edition)
            if (serverItem._id === "628b9c7d45122232a872358f") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -3;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -9;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 9.6;
            }
            //ECLiPSE RBAV-AF 
            if (serverItem._id === "628dc750b910320f4c27a732") {
                serverItem._props.Durability = 110;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -8;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -16;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 9;
            }
            //AVS MBAV (Tagilla)
            if (serverItem._id === "609e860ebd219504d8507525") {
                serverItem._props.Durability = 115;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -6;
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 7.8;
            }
            //Tactec
            if (serverItem._id === "5b44cad286f77402a54ae7e5") {
                serverItem._props.Durability = 120;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 9;
                serverItem._props.speedPenaltyPercent = -4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -5;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 9.5;
            }
            /// Class 10 ///
            //Shellback Banshee
            if (serverItem._id === "639343fce101f4caa40a4ef3") {
                serverItem._props.Durability = 100;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 10;
                serverItem._props.speedPenaltyPercent = -4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -4;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 8;
            }
            /////// Eyewear //////
            //6b34
            if (serverItem._id === "5b432be65acfc433000ed01f") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 2;
                serverItem._props.BluntThroughput = 0.25;
                serverItem._props.ArmorMaterial = 'Glass';
            }
            //yellow goggles
            if (serverItem._id === "59e770b986f7742cbd762754") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.20;
                serverItem._props.ArmorMaterial = 'Glass';
            }
            //oakley SIM
            if (serverItem._id === "5c1a1cc52e221602b3136e3d") {
                serverItem._props.Durability = 17;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.30;
                serverItem._props.ArmorMaterial = 'Glass';
            }
            //oakley SIM
            if (serverItem._id === "62a61c988ec41a51b34758d5") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.32;
                serverItem._props.ArmorMaterial = 'Glass';
            }
            //pyramex
            if (serverItem._id === "5c0d32fcd174af02a1659c75") {
                serverItem._props.Durability = 12;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.40;
                serverItem._props.ArmorMaterial = 'Glass';
            }
            //crossbow
            if (serverItem._id === "5d5fca1ea4b93635fd598c07") {
                serverItem._props.Durability = 10;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 1;
                serverItem._props.BluntThroughput = 0.35;
                serverItem._props.ArmorMaterial = 'Glass';
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
                serverItem._props.headSegments = [
                    "Top"
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
                serverItem._props.headSegments = [
                    "Top",
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
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.8;
                serverItem._props.headSegments = [
                    "Top",
                    "Ears",
                    "Jaws"
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
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 2.2;
            }
            //Kiver
            if (serverItem._id === "5645bc214bdc2d363b8b4571") {
                serverItem._props.Durability = 35;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.6;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.6;
                serverItem._props.BluntThroughput = 0.14;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.2;
            }
            //LZSh
            if (serverItem._id === "5b432d215acfc4771e1c6624") {
                serverItem._props.Durability = 26;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -0.475;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.475;
                serverItem._props.BluntThroughput = 0.19;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 0.95;
            }
            //SSh-68
            if (serverItem._id === "5c06c6a80db834001b735491") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -1.25;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.25;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 1.5;
            }
            //Ratnik-BSh 6B47
            if (serverItem._id === "5a7c4850e899ef00150be885") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -1.65;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.65;
                serverItem._props.BluntThroughput = 0.18;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.305;
            }
            //Ratnik-BSh Covered 6B47
            if (serverItem._id === "5aa7cfc0e5b5b00015693143") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 3;
                serverItem._props.speedPenaltyPercent = -1.65;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.65;
                serverItem._props.BluntThroughput = 0.18;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.3;
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
                serverItem._props.BluntThroughput = 0.07;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 1.5;
            }
            //Tagilla's Welding Mask "Gorilla"
            if (serverItem._id === "60a7ad3a0c5cb24b0134664a") {
                serverItem._props.Durability = 34;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.9;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.9;
                serverItem._props.BluntThroughput = 0.075;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 1.8;
            }
            //NFM HJELM
            if (serverItem._id === "61bca7cda0eae612383adf57") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.4;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.4;
                serverItem._props.BluntThroughput = 0.17;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.8;
            }
            //Sfera
            if (serverItem._id === "5aa7d193e5b5b000171d063f") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -1.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.75;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'ArmoredSteel';
                serverItem._props.Weight = 3.5;
            }
            //Ops-Core  Fast MT Tan
            if (serverItem._id === "5ac8d6885acfc400180ae7b0") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.45;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.45;
                serverItem._props.BluntThroughput = 0.17;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.9;
            }
            //Ops-Core Fast MT Black
            if (serverItem._id === "5a154d5cfcdbcb001a3b00da") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.45;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.45;
                serverItem._props.BluntThroughput = 0.17;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.9;
            }
            //Crye Airframe
            if (serverItem._id === "5c17a7ed2e2216152142459c") {
                serverItem._props.Durability = 30;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.44;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.44;
                serverItem._props.BluntThroughput = 0.16;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.88;
            }
            //Caiman
            if (serverItem._id === "5f60b34a41e30a4ab12a6947") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.56;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.56;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.12;
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
                serverItem._props.BluntThroughput = 0.14;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.6;
                serverItem._props.headSegments = [
                    "Top",
                    "Ears",
                    "Jaws",
                    "Nape"
                ];
            }
            //BNTI LSHZ
            if (serverItem._id === "5d6d3716a4b9361bc8618872") {
                serverItem._props.Durability = 60;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.7;
                serverItem._props.BluntThroughput = 0.13;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 3.4;
            }
            //ZSh
            if (serverItem._id === "5aa7e454e5b5b0214e506fa2") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.85;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.85;
                serverItem._props.BluntThroughput = 0.075;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 3.7;
            }
            //ZSh Black
            if (serverItem._id === "5aa7e4a4e5b5b000137b76f2") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.85;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.85;
                serverItem._props.BluntThroughput = 0.075;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 3.7;
            }
            //TC-2001
            if (serverItem._id === "5d5e7d28a4b936645d161203") {
                serverItem._props.Durability = 50;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.7;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.7;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.4;
            }
            //TC-2002
            if (serverItem._id === "5d5e9c74a4b9364855191c40") {
                serverItem._props.Durability = 55;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.71;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.71;
                serverItem._props.BluntThroughput = 0.11;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.42;
            }
            //ULACH Black
            if (serverItem._id === "5b40e1525acfc4771e1c6611") {
                serverItem._props.Durability = 75;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.95;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.95;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.9;
            }
            //ULACH Tan
            if (serverItem._id === "5b40e2bc5acfc40016388216") {
                serverItem._props.Durability = 75;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.95;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.95;
                serverItem._props.BluntThroughput = 0.09;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.9;
            }
            //ACHHC Black
            if (serverItem._id === "5b40e3f35acfc40016388218") {
                serverItem._props.Durability = 60;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.5;
            }
            //ACHHC Olive
            if (serverItem._id === "5b40e4035acfc47a87740943") {
                serverItem._props.Durability = 60;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Aramid';
                serverItem._props.Weight = 1.5;
            }
            //Team Wendy Exfil Black
            if (serverItem._id === "5e00c1ad86f774747333222c") {
                serverItem._props.Durability = 19;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.59;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.59;
                serverItem._props.BluntThroughput = 0.22;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.18;
            }
            //Team Wendy Exfil Coyote
            if (serverItem._id === "5e01ef6886f77445f643baa4") {
                serverItem._props.Durability = 19;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.59;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.59;
                serverItem._props.BluntThroughput = 0.22;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.18;
            }
            //TC 800
            if (serverItem._id === "5e4bfc1586f774264f7582d3") {
                serverItem._props.Durability = 25;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.585;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.585;
                serverItem._props.BluntThroughput = 0.2;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 1.17;
            }
            //Altyn
            if (serverItem._id === "5aa7e276e5b5b000171d0647") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -2;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2;
                serverItem._props.BluntThroughput = 0.06;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 4;
            }
            //Rys-T
            if (serverItem._id === "5f60c74e3b85f6263c145586") {
                serverItem._props.Durability = 15;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.25;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.25;
                serverItem._props.BluntThroughput = 0.05;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 2.5;
            }
            //Diamond Age
            if (serverItem._id === "5ea17ca01412a1425304d1c0") {
                serverItem._props.Durability = 27;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -0.48;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.48;
                serverItem._props.BluntThroughput = 0.18;
                serverItem._props.DeafStrength = "None";
                serverItem._props.ArmorMaterial = 'Combined';
                serverItem._props.Weight = 0.96;
            }
            //Maska
            if (serverItem._id === "5c091a4e0db834001d5addc8") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.3;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.3;
                serverItem._props.BluntThroughput = 0.04;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 2.6;
            }
            //Maska Killa
            if (serverItem._id === "5c0e874186f7745dc7616606") {
                serverItem._props.Durability = 20;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 5;
                serverItem._props.speedPenaltyPercent = -1.3;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -1.3;
                serverItem._props.BluntThroughput = 0.04;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'Titan';
                serverItem._props.Weight = 2.6;
            }
            //// Class 8 ////
            //Vulkan-5
            if (serverItem._id === "5ca20ee186f774799474abc2") {
                serverItem._props.Durability = 35;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 8;
                serverItem._props.speedPenaltyPercent = -2.25;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -2.25;
                serverItem._props.BluntThroughput = 0.08;
                serverItem._props.DeafStrength = "High";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 4.5;
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
                serverItem._props.BluntThroughput = 0.03;
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
                serverItem._props.BluntThroughput = 0.02;
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
                serverItem._props.BluntThroughput = 0.01;
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
                serverItem._props.BluntThroughput = 0.12;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.3;
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
            //TW EXFIL Ear Covers Black
            if (serverItem._id === "5e00cfa786f77469dc6e5685") {
                serverItem._props.Durability = 8;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 4;
                serverItem._props.speedPenaltyPercent = -0.085;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.085;
                serverItem._props.BluntThroughput = 0.07;
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
                serverItem._props.BluntThroughput = 0.07;
                serverItem._props.DeafStrength = "Low";
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.172;
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
            //// Class 6 ////
            //SLAAP armor Plate
            if (serverItem._id === "5c0e66e2d174af02a96252f4") {
                serverItem._props.Durability = 28;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -0.75;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -0.75;
                serverItem._props.BluntThroughput = 0.15;
                serverItem._props.ArmorMaterial = 'UHMWPE';
                serverItem._props.Weight = 0.45;
            }
            //Diamond Age Armor Plate
            if (serverItem._id === "5ea18c84ecf1982c7712d9a2") {
                serverItem._props.Durability = 31;
                serverItem._props.MaxDurability = serverItem._props.Durability;
                serverItem._props.armorClass = 7;
                serverItem._props.speedPenaltyPercent = -0.5;
                serverItem._props.mousePenalty = 0;
                serverItem._props.weaponErgonomicPenalty = -3.2;
                serverItem._props.BluntThroughput = 0.1;
                serverItem._props.ArmorMaterial = 'Ceramic';
                serverItem._props.Weight = 0.99;
            }
            //Buff Helemts
            if (serverItem._parent === enums_1.ParentClasses.HEADWEAR || serverItem._parent === enums_1.ParentClasses.FACECOVER || serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT) {
                if (this.modConf.buff_helmets == true && serverItem._props.armorClass < 10 && serverItem._props.armorClass > 0) {
                    serverItem._props.armorClass = +serverItem._props.armorClass + 1;
                    if (serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT) {
                        serverItem._props.Durability *= 1.25;
                        serverItem._props.MaxDurability = serverItem._props.Durability;
                    }
                    if (serverItem._parent === enums_1.ParentClasses.HEADWEAR) {
                        serverItem._props.Durability *= 1.1;
                        serverItem._props.MaxDurability = serverItem._props.Durability;
                    }
                }
            }
            //Set min/max armor durability for spawns
            if (serverItem._parent === enums_1.ParentClasses.CHESTRIG ||
                serverItem._parent === enums_1.ParentClasses.ARMORVEST ||
                serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT ||
                serverItem._parent === enums_1.ParentClasses.HEADWEAR ||
                serverItem._parent === enums_1.ParentClasses.FACECOVER) {
                serverItem._props.durabSpawnMin = 85;
                serverItem._props.durabSpawnMax = 100;
            }
        }
        this.armorBluntMulti();
        this.assignArmorZones();
        if (this.modConf.logEverything == true) {
            this.logger.info("Armour loaded");
        }
    }
    assignArmorZones() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if ((serverItem._parent === enums_1.ParentClasses.ARMORVEST || serverItem._parent === enums_1.ParentClasses.CHESTRIG) && serverItem?._props?.armorClass != null && serverItem?._props?.armorClass > 0) {
                if (serverItem._props.armorZone.includes("LeftArm") || serverItem._props.armorZone.includes("RightArm")) {
                    serverItem._props.armorZone = ["Chest", "Stomach", "LeftArm", "RightArm"];
                }
                else {
                    serverItem._props.armorZone = ["Chest", "Stomach"];
                }
            }
        }
    }
    armorBluntMulti() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if ((serverItem._parent === enums_1.ParentClasses.ARMORVEST || serverItem._parent === enums_1.ParentClasses.CHESTRIG) && serverItem?._props.armorClass != null && serverItem?._props.ArmorMaterial !== "ArmoredSteel" && serverItem?._props.ArmorMaterial !== "Titan") {
                if (serverItem._props.armorClass >= 3 && serverItem._props.armorClass <= 5) {
                    serverItem._props.BluntThroughput *= 1;
                }
                if (serverItem._props.armorClass >= 6 && serverItem._props.armorClass <= 7) {
                    serverItem._props.BluntThroughput *= 1;
                }
                if (serverItem._props.armorClass === 8) {
                    serverItem._props.BluntThroughput *= 1;
                }
                if (serverItem._props.armorClass >= 9) {
                    serverItem._props.BluntThroughput *= 1;
                }
            }
            if ((serverItem._parent === enums_1.ParentClasses.HEADWEAR || serverItem._parent === enums_1.ParentClasses.FACECOVER) && serverItem?._props.armorClass != null) {
                if (serverItem._props.armorClass === 3) {
                    serverItem._props.BluntThroughput *= 1.45; //1.15
                }
                if (serverItem._props.armorClass === 4) {
                    serverItem._props.BluntThroughput *= 2.08; //1.35
                }
                if (serverItem._props.armorClass === 5) {
                    serverItem._props.BluntThroughput *= 2.21; //1.45
                }
                if (serverItem._props.armorClass >= 6) {
                    serverItem._props.BluntThroughput *= 1.36; //1.25
                }
            }
            if ((serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT) && serverItem?._props.armorClass != null && serverItem?._props.ArmorMaterial !== "Glass") {
                if (serverItem._props.armorClass === 3) {
                    serverItem._props.BluntThroughput *= 1.2;
                }
                if (serverItem._props.armorClass === 4) {
                    serverItem._props.BluntThroughput *= 1.3;
                }
                if (serverItem._props.armorClass >= 8) {
                    serverItem._props.BluntThroughput *= 1.4;
                }
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Armor Blunt Damage Set");
        }
    }
    armorMousePenalty() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if ((serverItem._parent === enums_1.ParentClasses.ARMORVEST || serverItem._parent === enums_1.ParentClasses.HEADWEAR
                || serverItem._parent === enums_1.ParentClasses.FACECOVER || serverItem._parent === enums_1.ParentClasses.ARMOREDEQUIPMENT
                || serverItem._parent === enums_1.ParentClasses.BACKPACK || serverItem._parent === enums_1.ParentClasses.CHESTRIG)
                && serverItem._props?.speedPenaltyPercent != null) {
                serverItem._props.mousePenalty = 0;
            }
            if (serverItem._parent === enums_1.ParentClasses.BACKPACK) {
                serverItem._props.speedPenaltyPercent = 0;
                serverItem._props.weaponErgonomicPenalty = 0;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Armour Mouse Penalty Added");
        }
    }
    assignArmorPenRequirements() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem?._props?.armorClass !== undefined) {
                if (serverItem._props.ArmorMaterial === "Glass") {
                    if (serverItem._props.armorClass === 1) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "10"; //min pen
                    }
                    if (serverItem._props.armorClass === 2) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "20"; //min pen
                    }
                    if (serverItem._props.armorClass === 3) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "30"; //min pen
                    }
                    if (serverItem._props.armorClass === 4) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "40"; //min pen
                    }
                    if (serverItem._props.armorClass === 5) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "50"; //min pen
                    }
                    if (serverItem._props.armorClass === 6) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "60"; //min pen
                    }
                    if (serverItem._props.armorClass === 7) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "70"; //min pen
                    }
                    if (serverItem._props.armorClass === 8) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "80"; //min pen
                    }
                    if (serverItem._props.armorClass === 9) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "90"; //min pen
                    }
                    if (serverItem._props.armorClass === 10) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "100"; //min pen
                    }
                }
                if (serverItem._props.ArmorMaterial === "ArmoredSteel") {
                    if (serverItem._props.armorClass === 1) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "10"; //min pen
                    }
                    if (serverItem._props.armorClass === 2) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "20"; //min pen
                    }
                    if (serverItem._props.armorClass === 3) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "30"; //min pen
                    }
                    if (serverItem._props.armorClass === 4) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "40"; //min pen
                    }
                    if (serverItem._props.armorClass === 5) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "50"; //min pen
                    }
                    if (serverItem._props.armorClass === 6) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "60"; //min pen
                    }
                    if (serverItem._props.armorClass === 7) {
                        serverItem._props.ConflictingItems[6] = "990"; //min velocity
                        serverItem._props.ConflictingItems[7] = "1600"; //min KE
                        serverItem._props.ConflictingItems[8] = "62"; //min pen
                    }
                    if (serverItem._props.armorClass === 8) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "80"; //min pen
                    }
                    if (serverItem._props.armorClass === 9) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "90"; //min pen
                    }
                    if (serverItem._props.armorClass === 10) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "100"; //min pen
                    }
                }
                if (serverItem._props.ArmorMaterial === "Aramid") {
                    if (serverItem._props.armorClass === 1) {
                        serverItem._props.ConflictingItems[6] = "290"; //min velocity
                        serverItem._props.ConflictingItems[7] = "160"; //min KE
                        serverItem._props.ConflictingItems[8] = "10"; //min pen
                    }
                    if (serverItem._props.armorClass === 2) {
                        serverItem._props.ConflictingItems[6] = "290"; //min velocity
                        serverItem._props.ConflictingItems[7] = "160"; //min KE
                        serverItem._props.ConflictingItems[8] = "20"; //min pen
                    }
                    if (serverItem._props.armorClass === 3) {
                        serverItem._props.ConflictingItems[6] = "290"; //min velocity
                        serverItem._props.ConflictingItems[7] = "160"; //min KE
                        serverItem._props.ConflictingItems[8] = "30"; //min pen
                    }
                    if (serverItem._props.armorClass === 4) {
                        serverItem._props.ConflictingItems[6] = "290"; //min velocity
                        serverItem._props.ConflictingItems[7] = "160"; //min KE
                        serverItem._props.ConflictingItems[8] = "40"; //min pen
                    }
                    if (serverItem._props.armorClass === 5) {
                        serverItem._props.ConflictingItems[6] = "290"; //min velocity
                        serverItem._props.ConflictingItems[7] = "160"; //min KE
                        serverItem._props.ConflictingItems[8] = "50"; //min pen
                    }
                    if (serverItem._props.armorClass === 6) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "60"; //min pen
                    }
                    if (serverItem._props.armorClass === 7) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "70"; //min pen
                    }
                    if (serverItem._props.armorClass === 8) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "80"; //min pen
                    }
                    if (serverItem._props.armorClass === 9) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "90"; //min pen
                    }
                    if (serverItem._props.armorClass === 10) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "100"; //min pen
                    }
                }
                if (serverItem._props.ArmorMaterial === "Ceramic") {
                    if (serverItem._props.armorClass === 1) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "10"; //min pen
                    }
                    if (serverItem._props.armorClass === 2) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "20"; //min pen
                    }
                    if (serverItem._props.armorClass === 3) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "30"; //min pen
                    }
                    if (serverItem._props.armorClass === 4) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "40"; //min pen
                    }
                    if (serverItem._props.armorClass === 5) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "50"; //min pen
                    }
                    if (serverItem._props.armorClass === 6) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "60"; //min pen
                    }
                    if (serverItem._props.armorClass === 7) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "70"; //min pen
                    }
                    if (serverItem._props.armorClass === 8) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "80"; //min pen
                    }
                    if (serverItem._props.armorClass === 9) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "90"; //min pen
                    }
                    if (serverItem._props.armorClass === 10) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "100"; //min pen
                    }
                }
                if (serverItem._props.ArmorMaterial === "Combined") {
                    if (serverItem._props.armorClass === 1) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "10"; //min pen
                    }
                    if (serverItem._props.armorClass === 2) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "20"; //min pen
                    }
                    if (serverItem._props.armorClass === 3) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "30"; //min pen
                    }
                    if (serverItem._props.armorClass === 4) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "40"; //min pen
                    }
                    if (serverItem._props.armorClass === 5) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "50"; //min pen
                    }
                    if (serverItem._props.armorClass === 6) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "60"; //min pen
                    }
                    if (serverItem._props.armorClass === 7) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "70"; //min pen
                    }
                    if (serverItem._props.armorClass === 8) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "80"; //min pen
                    }
                    if (serverItem._props.armorClass === 9) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "90"; //min pen
                    }
                    if (serverItem._props.armorClass === 10) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "100"; //min pen
                    }
                }
                if (serverItem._props.ArmorMaterial === "UHMWPE") {
                    if (serverItem._props.armorClass === 1) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "10"; //min pen
                    }
                    if (serverItem._props.armorClass === 2) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "20"; //min pen
                    }
                    if (serverItem._props.armorClass === 3) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "30"; //min pen
                    }
                    if (serverItem._props.armorClass === 4) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "40"; //min pen
                    }
                    if (serverItem._props.armorClass === 5) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "50"; //min pen
                    }
                    if (serverItem._props.armorClass === 6) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "60"; //min pen
                    }
                    if (serverItem._props.armorClass === 7) {
                        serverItem._props.ConflictingItems[6] = "300"; //min velocity
                        serverItem._props.ConflictingItems[7] = "750"; //min KE
                        serverItem._props.ConflictingItems[8] = "70"; //min pen
                    }
                    if (serverItem._props.armorClass === 8) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "80"; //min pen
                    }
                    if (serverItem._props.armorClass === 9) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "90"; //min pen
                    }
                    if (serverItem._props.armorClass === 10) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "100"; //min pen
                    }
                }
                if (serverItem._props.ArmorMaterial === "Titan") {
                    if (serverItem._props.armorClass === 1) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "10"; //min pen
                    }
                    if (serverItem._props.armorClass === 2) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "20"; //min pen
                    }
                    if (serverItem._props.armorClass === 3) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "30"; //min pen
                    }
                    if (serverItem._props.armorClass === 4) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "40"; //min pen
                    }
                    if (serverItem._props.armorClass === 5) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "50"; //min pen
                    }
                    if (serverItem._props.armorClass === 6) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "60"; //min pen
                    }
                    if (serverItem._props.armorClass === 7) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "70"; //min pen
                    }
                    if (serverItem._props.armorClass === 8) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "80"; //min pen
                    }
                    if (serverItem._props.armorClass === 9) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "90"; //min pen
                    }
                    if (serverItem._props.armorClass === 10) {
                        serverItem._props.ConflictingItems[6] = ""; //min velocity
                        serverItem._props.ConflictingItems[7] = ""; //min KE
                        serverItem._props.ConflictingItems[8] = "100"; //min pen
                    }
                }
            }
            if (this.modConf.logEverything == true) {
                this.logger.info("Armor Pen Requirements Set");
            }
        }
    }
}
exports.Armor = Armor;
