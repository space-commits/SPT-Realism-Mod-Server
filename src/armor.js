"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Armor = void 0;
class Armor {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.armMat = this.globalDB.ArmorMaterials;
        this.config = this.modConf;
    }
    loadArmor() {
        //Armor Destructibility values
        this.armMat.Glass.Destructibility = 1.0;
        this.armMat.Aramid.Destructibility = 0.77;
        this.armMat.Ceramic.Destructibility = 0.45;
        this.armMat.Combined.Destructibility = 0.32;
        this.armMat.UHMWPE.Destructibility = 0.25;
        this.armMat.Titan.Destructibility = 0.2;
        this.armMat.ArmoredSteel.Destructibility = 0.05;
        for (let i in this.itemDB) { //Credit to Kiki and Yim for the base code here, with permission :)
            let fileData = this.itemDB[i];
            ////////Body Armor//////////
            //// Class 3////
            //Module-3M bodyarmor
            if (fileData._id === "59e7635f86f7742cbf2c1095") {
                fileData._props.Durability = 80;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -3;
                fileData._props.BluntThroughput = 0.45;
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 3.5;
            }
            //DRD body armor
            if (fileData._id === "62a09d79de7ac81993580530") {
                fileData._props.Durability = 99;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = 1;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 1;
                fileData._props.BluntThroughput = 0.19;
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 6;
            }
            //// Class 4////
            //PACA
            if (fileData._id === "5648a7494bdc2d9d488b4583") {
                fileData._props.Durability = 90;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.52;
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 3;
            }
            //// Class 5////
            //6B2 Flora
            if (fileData._id === "5df8a2ca86f7740bfe6df777") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -8;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -5;
                fileData._props.BluntThroughput = 0.55;
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 5.4;
            }
            //// Class 6////
            //Thor CV
            if (fileData._id === "609e8540d5c319764c2bc2e9") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 6;
                fileData._props.speedPenaltyPercent = -8;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -6;
                fileData._props.BluntThroughput = 0.33;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 5.7;
            }
            //UN Armor
            if (fileData._id === "5ab8e4ed86f7742d8e50c7fa") {
                fileData._props.Durability = 85;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 6;
                fileData._props.speedPenaltyPercent = -13;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.35;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 8.5;
            }
            //Zhuk-3
            if (fileData._id === "5c0e5edb86f77461f55ed1f7") {
                fileData._props.Durability = 70;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 6;
                fileData._props.speedPenaltyPercent = -7;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.40;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 5.2;
            }
            //Kirasa
            if (fileData._id === "5b44d22286f774172b0c9de8") {
                fileData._props.Durability = 80;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -11;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -8;
                fileData._props.BluntThroughput = 0.38;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 7.1;
            }
            //// Class 7////
            //Highcom Trooper
            if (fileData._id === "5c0e655586f774045612eeb2") {
                fileData._props.Durability = 115;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -9;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.2;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 6.8;
            }
            //6B13 Digital
            if (fileData._id === "5c0e53c886f7747fa54205c7") {
                fileData._props.Durability = 105;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -17;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -11;
                fileData._props.BluntThroughput = 0.31;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 11.5;
            }
            //6B13 Flora
            if (fileData._id === "5c0e51be86f774598e797894") {
                fileData._props.Durability = 105;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -17;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -11;
                fileData._props.BluntThroughput = 0.31;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 11.5;
            }
            //// Class 8////
            //Black Slick
            if (fileData._id === "5e4abb5086f77406975c9342") {
                fileData._props.Durability = 200;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -6;
                fileData._props.BluntThroughput = 0.6;
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 8.1;
            }
            //Olive Slick
            if (fileData._id === "6038b4ca92ec1c3103795a0d") {
                fileData._props.Durability = 200;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -6;
                fileData._props.BluntThroughput = 0.6;
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 8.1;
            }
            //Tan Slick
            if (fileData._id === "6038b4b292ec1c3103795a0b") {
                fileData._props.Durability = 200;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -6;
                fileData._props.BluntThroughput = 0.6;
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 8.1;
            }
            //6B23-1
            if (fileData._id === "5c0e5bab86f77461f55ed1f3") {
                fileData._props.Durability = 90;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -11;
                fileData._props.BluntThroughput = 0.32;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 7.9;
            }
            //6B23-2
            if (fileData._id === "5c0e57ba86f7747fa141986d") {
                fileData._props.Durability = 85;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -11;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -11;
                fileData._props.BluntThroughput = 0.34;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 7.2;
            }
            //// Class 9////
            //THOR Integrated Carrier
            if (fileData._id === "60a283193cb70855c43a381d") {
                fileData._props.Durability = 135;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -20;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.18;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 13.7;
            }
            //Hexgrid
            if (fileData._id === "5fd4c474dd870108a754b241") {
                fileData._props.Durability = 120;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -11;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.24;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 7.4;
            }
            //Korund
            if (fileData._id === "5f5f41476bdad616ad46d631") {
                fileData._props.Durability = 115;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -15;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -19.7;
                fileData._props.BluntThroughput = 0.4;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 9.8;
            }
            //Ghzel-K
            if (fileData._id === "5ab8e79e86f7742d8b372e78") {
                fileData._props.Durability = 110;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -13;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -10;
                fileData._props.BluntThroughput = 0.34;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 8.9;
            }
            //6B13 Killa
            if (fileData._id === "5c0e541586f7747fa54205c9") {
                fileData._props.Durability = 110;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -11;
                fileData._props.BluntThroughput = 0.22;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 8.3;
            }
            //FORT Defender
            if (fileData._id === "5e9dacf986f774054d6b89f4") {
                fileData._props.Durability = 95;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -17.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -11;
                fileData._props.BluntThroughput = 0.36;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 11.5;
            }
            //Redut-M
            if (fileData._id === "5ca2151486f774244a3b8d30") {
                fileData._props.Durability = 95;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -20;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -11;
                fileData._props.BluntThroughput = 0.33;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 13.5;
            }
            //Redut-T5
            if (fileData._id === "5ca21c6986f77479963115a7") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -24;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -17;
                fileData._props.BluntThroughput = 0.3;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 16.5;
            }
            //// Class 10////
            //Gen 4 Full
            if (fileData._id === "5b44cd8b86f774503d30cba2") {
                fileData._props.Durability = 115;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 10;
                fileData._props.speedPenaltyPercent = -21;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -14;
                fileData._props.BluntThroughput = 0.18;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 14;
            }
            //Gen 4 Assault
            if (fileData._id === "5b44cf1486f77431723e3d05") {
                fileData._props.Durability = 110;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 10;
                fileData._props.speedPenaltyPercent = -18;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -22;
                fileData._props.BluntThroughput = 0.2;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 12;
            }
            //Gen 4 Mobility
            if (fileData._id === "5b44d0de86f774503d30cba8") {
                fileData._props.Durability = 110;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 10;
                fileData._props.speedPenaltyPercent = -18;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -10;
                fileData._props.BluntThroughput = 0.2;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 12;
            }
            //6B43
            if (fileData._id === "545cdb794bdc2d3a198b456a") {
                fileData._props.Durability = 130;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 10;
                fileData._props.speedPenaltyPercent = -25;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -23;
                fileData._props.BluntThroughput = 0.23;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 20;
            }
            //Zhuk-6a
            if (fileData._id === "5c0e625a86f7742d77340f62") {
                fileData._props.Durability = 80;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 10;
                fileData._props.speedPenaltyPercent = -14;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.33;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 9.5;
            }
            //// ARMORED RIGS ////
            //// Class 5 ////
            //6B3TM
            if (fileData._id === "5d5d646386f7742797261fd9") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -14;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.25;
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 9.2;
            }
            //// Class 6 ////
            //6B5 Uley 16
            if (fileData._id === "5c0e3eb886f7742015526062") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 6;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -12.25;
                fileData._props.BluntThroughput = 0.25;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 7.5;
            }
            //// Class 7 ////    
            //6B5 Uley 15
            if (fileData._id === "5c0e446786f7742013381639") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -18;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.32;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 12.2;
            }
            //First-Spear
            if (fileData._id === "61bcc89aef0f505f0c6cd0fc") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.18;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 7.9;
            }
            //S&S Precision PlateFrame plate carrier (Goons Edition)
            if (fileData._id === "628b9784bcf6e2659e09b8a2") {
                fileData._props.Durability = 95;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -3;
                fileData._props.BluntThroughput = 0.22;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 6.4;
            }
            //TV-110
            if (fileData._id === "5c0e746986f7741453628fe5") {
                fileData._props.Durability = 500;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -15;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.6;
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 10.3;
            }
            //A18
            if (fileData._id === "5d5d87f786f77427997cfaef") {
                fileData._props.Durability = 130;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.135;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 8.2;
            }
            //ANA M1
            if (fileData._id === "5c0e722886f7740458316a57") {
                fileData._props.Durability = 125;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -13;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -8;
                fileData._props.BluntThroughput = 0.15;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 8.8;
            }
            //ANA M2
            if (fileData._id === "5ab8dced86f774646209ec87") {
                fileData._props.Durability = 120;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 7;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -8;
                fileData._props.BluntThroughput = 0.14;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 8.4;
            }
            //// Class 8 ////  
            //MK4A Assault
            if (fileData._id === "60a3c70cde5f453f634816a3") {
                fileData._props.Durability = 115;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -13;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -10;
                fileData._props.BluntThroughput = 0.19;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 10.7;
            }
            //AVS
            if (fileData._id === "544a5caa4bdc2d1a388b4568") {
                fileData._props.Durability = 500;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -16;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.57;
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 9.9;
            }
            //AACPC
            if (fileData._id === "5e4ac41886f77406a511c9a8") {
                fileData._props.Durability = 110;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -13;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -8;
                fileData._props.BluntThroughput = 0.22;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 8.5;
            }
            //Eagle MMAC
            if (fileData._id === "61bc85697113f767765c7fe7") {
                fileData._props.Durability = 500;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -9;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.59;
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 9.1;
            }
            //Tasmanian Tiger SK Multicam Black
            if (fileData._id === "628cd624459354321c4b7fa2") {
                fileData._props.Durability = 90;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 8;
                fileData._props.speedPenaltyPercent = -6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -5;
                fileData._props.BluntThroughput = 0.23;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 7.5;
            }
            //// Class 9 ////  
            //Crye Precision CPC plate carrier (Goons Edition)
            if (fileData._id === "628b9c7d45122232a872358f") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -12;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.23;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 9.6;
            }
            //ECLiPSE RBAV-AF 
            if (fileData._id === "628dc750b910320f4c27a732") {
                fileData._props.Durability = 110;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -13;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -16;
                fileData._props.BluntThroughput = 0.21;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 9;
            }
            // Bagariy
            if (fileData._id === "628d0618d1ba6e4fa07ce5a4") {
                fileData._props.Durability = 85;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -16;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.25;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 13;
            }
            //MK4A Protection
            if (fileData._id === "60a3c68c37ea821725773ef5") {
                fileData._props.Durability = 120;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -15;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -10;
                fileData._props.BluntThroughput = 0.16;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 12.5;
            }
            //AVS MBAV (Tagilla)
            if (fileData._id === "609e860ebd219504d8507525") {
                fileData._props.Durability = 115;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -7;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -6;
                fileData._props.BluntThroughput = 0.23;
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 7.8;
            }
            //Tactec
            if (fileData._id === "5b44cad286f77402a54ae7e5") {
                fileData._props.Durability = 120;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -14;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -15.25;
                fileData._props.BluntThroughput = 0.195;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 9.5;
            }
            /////// HELMETS //////
            //// Class 0 ////
            //Beanie
            if (fileData._id === "60bf74184a63fc79b60c57f6") {
                fileData._props.Durability = 69420;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 0;
                fileData._props.speedPenaltyPercent = 2;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 5;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Aramid';
            }
            //Tank Crew Helmet
            if (fileData._id === "5df8a58286f77412631087ed") {
                fileData._props.Durability = 99999;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 0;
                fileData._props.speedPenaltyPercent = 0;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
            }
            //// Class 1 ////
            //Kolpak
            if (fileData._id === "59e7711e86f7746cae05fbe1") {
                fileData._props.Durability = 100;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 1;
                fileData._props.speedPenaltyPercent = -3;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -5;
                fileData._props.BluntThroughput = 0.2;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.9;
            }
            //SHPM Firefighter
            if (fileData._id === "5c08f87c0db8340019124324") {
                fileData._props.Durability = 95;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 1;
                fileData._props.speedPenaltyPercent = -2.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -12;
                fileData._props.BluntThroughput = 0.22;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.5;
            }
            //Fast MT Helmet Replica
            if (fileData._id === "5ea05cf85ad9772e6624305d") {
                fileData._props.Durability = 80;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 1;
                fileData._props.speedPenaltyPercent = -0.8;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.4;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.45;
            }
            //// Class 2 ////
            //Djeta
            if (fileData._id === "5c0d2727d174af02a012cf58") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 2;
                fileData._props.speedPenaltyPercent = -2.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -12;
                fileData._props.BluntThroughput = 0.19;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.3;
            }
            //Shattered Facemask
            if (fileData._id === "5b432b2f5acfc4771e1c6622") {
                fileData._props.Durability = 60;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 2;
                fileData._props.speedPenaltyPercent = -2.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.34;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.8;
            }
            //// Class 3 ////
            //Tagilla's Welding Mask "UBEY"
            if (fileData._id === "60a7ad2a2198820d95707a2e") {
                fileData._props.Durability = 30;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -3.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.1;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 1.5;
            }
            //Tagilla's Welding Mask "Gorilla"
            if (fileData._id === "60a7ad3a0c5cb24b0134664a") {
                fileData._props.Durability = 30;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -3.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.09;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 1.8;
            }
            //UN Helmet
            if (fileData._id === "5aa7d03ae5b5b00016327db5") {
                fileData._props.Durability = 70;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -3;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.35;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 2.2;
            }
            //Kiver
            if (fileData._id === "5645bc214bdc2d363b8b4571") {
                fileData._props.Durability = 60;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -2.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -5;
                fileData._props.BluntThroughput = 0.39;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.2;
            }
            //LZSh
            if (fileData._id === "5b432d215acfc4771e1c6624") {
                fileData._props.Durability = 40;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -1;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.44;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 0.95;
            }
            //SSh-68
            if (fileData._id === "5c06c6a80db834001b735491") {
                fileData._props.Durability = 15;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -2.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -4;
                fileData._props.BluntThroughput = 0.18;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 1.5;
            }
            //Ratnik-BSh
            if (fileData._id === "5a7c4850e899ef00150be885") {
                fileData._props.Durability = 50;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -2;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.4;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.3;
            }
            //Ratnik-BSh Covered
            if (fileData._id === "5aa7cfc0e5b5b00015693143") {
                fileData._props.Durability = 50;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -2;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.4;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.3;
            }
            //// Class 4 ////
            //NFM HJELM
            if (fileData._id === "61bca7cda0eae612383adf57") {
                fileData._props.Durability = 17;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -0.8;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.22;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.8;
            }
            //Sfera
            if (fileData._id === "5aa7d193e5b5b000171d063f") {
                fileData._props.Durability = 12;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -4.75;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.19;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 3.5;
            }
            //TC-2001
            if (fileData._id === "5d5e7d28a4b936645d161203") {
                fileData._props.Durability = 80;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -2.4;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.24;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.4;
            }
            //TC-2002
            if (fileData._id === "5d5e9c74a4b9364855191c40") {
                fileData._props.Durability = 84;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -2.4;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.24;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.42;
            }
            //Fast MT Tan
            if (fileData._id === "5ac8d6885acfc400180ae7b0") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -1;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.27;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.9;
            }
            //Fast MT Black
            if (fileData._id === "5a154d5cfcdbcb001a3b00da") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -1;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.27;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.9;
            }
            //Airframe
            if (fileData._id === "5c17a7ed2e2216152142459c") {
                fileData._props.Durability = 19;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -0.88;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.29;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.88;
            }
            //Caiman
            if (fileData._id === "5f60b34a41e30a4ab12a6947") {
                fileData._props.Durability = 21;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -1.3;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.26;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.12;
            }
            //BNTI LSHZ
            if (fileData._id === "5d6d3716a4b9361bc8618872") {
                fileData._props.Durability = 23;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -4.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.34;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 3.4;
            }
            //Vulkan-5
            if (fileData._id === "5ca20ee186f774799474abc2") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -5.25;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -8;
                fileData._props.BluntThroughput = 0.32;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 4.5;
            }
            //// Class 5 ////
            //Ronin
            if (fileData._id === "5b4329f05acfc47a86086aa1") {
                fileData._props.Durability = 40;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -3;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -15;
                fileData._props.BluntThroughput = 0.5;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.6;
                fileData._props.headSegments = [
                    "Top",
                    "Ears",
                    "Jaws",
                    "Nape"
                ];
            }
            //ZSh
            if (fileData._id === "5aa7e454e5b5b0214e506fa2") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -4.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.22;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 3.7;
            }
            //ZSh Black
            if (fileData._id === "5aa7e4a4e5b5b000137b76f2") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -4.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -7;
                fileData._props.BluntThroughput = 0.22;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 3.7;
            }
            //ULACH Black
            if (fileData._id === "5b40e1525acfc4771e1c6611") {
                fileData._props.Durability = 68;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -2;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -3.5;
                fileData._props.BluntThroughput = 0.29;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.9;
            }
            //ULACH Tan
            if (fileData._id === "5b40e2bc5acfc40016388216") {
                fileData._props.Durability = 68;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -2;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -3.5;
                fileData._props.BluntThroughput = 0.29;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.9;
            }
            //ACHHC Black
            if (fileData._id === "5b40e3f35acfc40016388218") {
                fileData._props.Durability = 50;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -1.6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -3;
                fileData._props.BluntThroughput = 0.29;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.5;
            }
            //ACHHC Olive
            if (fileData._id === "5b40e4035acfc47a87740943") {
                fileData._props.Durability = 50;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -1.6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -3;
                fileData._props.BluntThroughput = 0.29;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.5;
            }
            //Team Wendy Black
            if (fileData._id === "5e00c1ad86f774747333222c") {
                fileData._props.Durability = 17;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -1.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -1;
                fileData._props.BluntThroughput = 0.41;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.18;
            }
            //Team Wendy Coyote
            if (fileData._id === "5e01ef6886f77445f643baa4") {
                fileData._props.Durability = 17;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -1.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -1;
                fileData._props.BluntThroughput = 0.41;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.18;
            }
            //TC 800
            if (fileData._id === "5e4bfc1586f774264f7582d3") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -1.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -1;
                fileData._props.BluntThroughput = 0.39;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.17;
            }
            //Altyn
            if (fileData._id === "5aa7e276e5b5b000171d0647") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -4.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -9;
                fileData._props.BluntThroughput = 0.2;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 4;
            }
            //Rys-T
            if (fileData._id === "5f60c85b58eff926626a60f7") {
                fileData._props.Durability = 30;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -3.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -5;
                fileData._props.BluntThroughput = 0.18;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 2.5;
            }
            //Diamond Age
            if (fileData._id === "5ea17ca01412a1425304d1c0") {
                fileData._props.Durability = 30;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -1.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.3;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 0.96;
            }
            //Maska
            if (fileData._id === "5c091a4e0db834001d5addc8") {
                fileData._props.Durability = 36;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -3.6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -5;
                fileData._props.BluntThroughput = 0.15;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 2.6;
            }
            //Maska Killa
            if (fileData._id === "5c0e874186f7745dc7616606") {
                fileData._props.Durability = 36;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -3.4;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -4;
                fileData._props.BluntThroughput = 0.15;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Titan';
                fileData._props.Weight = 2.6;
            }
            //// Helmet Accesories ////
            //// Class 1 ////
            //K1S Visor
            if (fileData._id === "5ac4c50d5acfc40019262e87") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 1;
                fileData._props.speedPenaltyPercent = -2.25;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 1;
            }
            //Ops-Core FAST Visor
            if (fileData._id === "5a16b672fcdbcb001912fa83") {
                fileData._props.Durability = 11;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 1;
                fileData._props.speedPenaltyPercent = 0.4;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 0.35;
            }
            //// Class 2 ////
            //Caiman Fixed Arm Visor
            if (fileData._id === "5f60bf4558eff926626a60f2") {
                fileData._props.Durability = 12;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 2;
                fileData._props.speedPenaltyPercent = -0.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "None";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 0.38;
            }
            //// Class 3 ////
            //Heavy Trooper mask
            if (fileData._id === "5ea058e01dbce517f324b3e2") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -1.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -21;
                fileData._props.BluntThroughput = 0.02;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.4;
            }
            //Caiman Mandible
            if (fileData._id === "5f60c076f2bcbb675b00dac2") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -1.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -6;
                fileData._props.BluntThroughput = 0.15;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.65;
            }
            //Kiver face shield
            if (fileData._id === "5b46238386f7741a693bcf9c") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = 1.4;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 1.22;
            }
            //TW EXFIL Visor Black
            if (fileData._id === "5e00cdd986f7747473332240") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -0.6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -18;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 0.252;
            }
            //TW EXFIL Visor Coyote
            if (fileData._id === "5e01f37686f774773c6f6c15") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 3;
                fileData._props.speedPenaltyPercent = -0.6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -18;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 0.252;
            }
            //// Class 4 ////
            //Zsh Visor
            if (fileData._id === "5aa7e3abe5b5b000171d064d") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -1.4;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -13;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 1.1;
            }
            //FAST Mandible
            if (fileData._id === "5a16ba61fcdbcb098008728a") {
                fileData._props.Durability = 40;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -1.8;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -10;
                fileData._props.BluntThroughput = 0.11;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 0.8;
            }
            //Altyn Visor
            if (fileData._id === "5aa7e373e5b5b000137b76f0") {
                fileData._props.Durability = 15;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -2.6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.1;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 1.4;
            }
            //Rys-T Visor
            if (fileData._id === "5f60c85b58eff926626a60f7") {
                fileData._props.Durability = 18;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -2.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -19;
                fileData._props.BluntThroughput = 0.1;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Combined';
                fileData._props.Weight = 1.2;
            }
            //FAST Side Armor
            if (fileData._id === "5a16badafcdbcb001865f72d") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -1.2;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.19;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.3;
            }
            //LSHZ-2DTM Aventail
            if (fileData._id === "5d6d3be5a4b9361bc73bc763") {
                fileData._props.Durability = 150;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 4;
                fileData._props.speedPenaltyPercent = -1.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = 0;
                fileData._props.BluntThroughput = 0;
                fileData._props.ArmorMaterial = 'Aramid';
                fileData._props.Weight = 1.2;
            }
            //// Class 5 ////
            //LSHZ Visor
            if (fileData._id === "5d6d3829a4b9361bc8618943") {
                fileData._props.Durability = 15;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -2.25;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -15;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 1;
            }
            //Vulkan-5 Visor
            if (fileData._id === "5ca2113f86f7740b2547e1d2") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -3.45;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -20;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 1.8;
            }
            //Multi-Hit Visor
            if (fileData._id === "5a16b7e1fcdbcb00165aa6c9") {
                fileData._props.Durability = 50;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -3.3;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -21;
                fileData._props.BluntThroughput = 0.0;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'Glass';
                fileData._props.Weight = 1.33;
            }
            //Maska Visor
            if (fileData._id === "5c0919b50db834001b7ce3b9") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -4.5;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -26;
                fileData._props.BluntThroughput = 0.1;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 1.1;
            }
            //Maska Killa Visor
            if (fileData._id === "5c0e842486f77443a74d2976") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -4.4;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -25;
                fileData._props.BluntThroughput = 0.1;
                fileData._props.DeafStrength = "High";
                fileData._props.ArmorMaterial = 'ArmoredSteel';
                fileData._props.Weight = 1.1;
            }
            //Crye Airframe Chops
            if (fileData._id === "5c178a942e22164bef5ceca3") {
                fileData._props.Durability = 20;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -0.70;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -8;
                fileData._props.BluntThroughput = 0.12;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.76;
            }
            //Crye Airframe Ears
            if (fileData._id === "5c1793902e221602b21d3de2") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -0.24;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -1;
                fileData._props.BluntThroughput = 0.2;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.25;
            }
            //TW EXFIL Ear Covers Black
            if (fileData._id === "5e00cfa786f77469dc6e5685") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -0.16;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -1;
                fileData._props.BluntThroughput = 0.21;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.172;
            }
            //TW EXFIL Ear Covers Coyote
            if (fileData._id === "5e01f31d86f77465cf261343") {
                fileData._props.Durability = 10;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -0.16;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -1;
                fileData._props.BluntThroughput = 0.21;
                fileData._props.DeafStrength = "Low";
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.172;
            }
            //Caiman Hybrid Ballistic Applique
            if (fileData._id === "5f60b85bbdb8e27dee3dc985") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 5;
                fileData._props.speedPenaltyPercent = -1.32;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -2;
                fileData._props.BluntThroughput = 0.15;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 0.68;
            }
            //// Class 6 ////
            //SLAAP armor Plate
            if (fileData._id === "5c0e66e2d174af02a96252f4") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 6;
                fileData._props.speedPenaltyPercent = -2.6;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -4;
                fileData._props.BluntThroughput = 0.18;
                fileData._props.ArmorMaterial = 'UHMWPE';
                fileData._props.Weight = 1.3;
            }
            //// Class 9 ////
            //Bastion Helmet Armor
            if (fileData._id === "5ea18c84ecf1982c7712d9a2") {
                fileData._props.Durability = 25;
                fileData._props.MaxDurability = fileData._props.Durability;
                fileData._props.armorClass = 9;
                fileData._props.speedPenaltyPercent = -2;
                fileData._props.mousePenalty = 0;
                fileData._props.weaponErgonomicPenalty = -3.2;
                fileData._props.BluntThroughput = 0.15;
                fileData._props.ArmorMaterial = 'Ceramic';
                fileData._props.Weight = 0.99;
            }
            //Blunt Damage Multiplier for Armored Rigs and Vests
            if (fileData._parent === "5448e54d4bdc2dcc718b4568" || fileData._parent === "5448e5284bdc2dcb718b4567") {
                fileData._props.BluntThroughput *= 1;
            }
            //Blunt Damage Multiplier for Armored Rigs and Vests that below lvl 6
            if (fileData._props.armorClass <= 6 && (fileData._parent === "5448e54d4bdc2dcc718b4568" || fileData._parent === "5448e5284bdc2dcb718b4567")) {
                fileData._props.BluntThroughput *= 1.15;
            }
            //Blunt Damage Multiplier for Armored Rigs and Vests that above lvl 7
            if (fileData._props.armorClass >= 7 && (fileData._parent === "5448e54d4bdc2dcc718b4568" || fileData._parent === "5448e5284bdc2dcb718b4567")) {
                fileData._props.BluntThroughput *= 1;
            }
            //Blunt Damage Multiplier for Armored Rigs and Vests that above lvl 8
            if (fileData._props.armorClass >= 8 && (fileData._parent === "5448e54d4bdc2dcc718b4568" || fileData._parent === "5448e5284bdc2dcb718b4567")) {
                fileData._props.BluntThroughput *= 1.15;
            }
            //Blunt Damage Multiplier for Armored Rigs and Vests that above lvl 9
            if (fileData._props.armorClass >= 9 && (fileData._parent === "5448e54d4bdc2dcc718b4568" || fileData._parent === "5448e5284bdc2dcb718b4567")) {
                fileData._props.BluntThroughput *= 1.25;
            }
            //Blunt Damage Multiplier for Armored Rigs and Vests that above lvl 10
            if (fileData._props.armorClass >= 10 && (fileData._parent === "5448e54d4bdc2dcc718b4568" || fileData._parent === "5448e5284bdc2dcb718b4567")) {
                fileData._props.BluntThroughput *= 1.4;
            }
            //Blunt Damage Multiplier for Helmets
            if (fileData._parent === "5a341c4086f77401f2541505" && fileData._props.armorClass <= 3 || fileData._parent === "5a341c4686f77469e155819e") {
                fileData._props.BluntThroughput *= 0.65;
            }
            if (fileData._parent === "5a341c4086f77401f2541505" && fileData._props.armorClass == 4) {
                fileData._props.BluntThroughput *= 0.75;
            }
            if (fileData._parent === "5a341c4086f77401f2541505" && fileData._props.armorClass == 5) {
                fileData._props.BluntThroughput *= 1.2;
            }
            //Set min/max armor durability for bots
            if (fileData._parent === "5448e5284bdc2dcb718b4567" ||
                fileData._parent === "5448e54d4bdc2dcc718b4568" ||
                fileData._parent === "57bef4c42459772e8d35a53b" ||
                fileData._parent === "5a341c4086f77401f2541505" ||
                fileData._parent === "5a341c4686f77469e155819e") {
                fileData._props.durabSpawnMin = 85;
                fileData._props.durabSpawnMax = 100;
            }
        }
        if (this.config.logEverything == true) {
            this.logger.info("Armour loaded");
        }
    }
}
exports.Armor = Armor;
