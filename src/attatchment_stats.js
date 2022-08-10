"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttatchmentStats = void 0;
class AttatchmentStats {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.globalDB = this.tables.globals.config;
        this.itemDB = this.tables.templates.items;
        this.config = this.modConf;
    }
    loadAttStats() {
        for (let i in this.itemDB) {
            let fileData = this.itemDB[i];
            // ///Handguards///
            // //416 TROY M-LOK 13 INCH
            // if (fileData._id === "5c6c2c9c2e2216000f2002e4") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -3;
            //     fileData._props.HeatFactor = 0.93;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //416 Strike Industries 15 inch
            // if (fileData._id === "5c6d11152e2216000f2003e7") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //416 MRS Keymod 14 inch
            // if (fileData._id === "5c6d10e82e221601da357b07") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -2.5;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1.14;
            // }
            // //416 Midwest MLOK 9 inch
            // if (fileData._id === "5c6d10fa2e221600106f3f23") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -4;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //416 Midwest MLOK 13.5 Inch
            // if (fileData._id === "5c6d11072e2216000e69d2e4") {
            //     fileData._props.Ergonomics += 11.25;
            //     fileData._props.Recoil += -2.25;
            //     fileData._props.Accuracy = -3;
            //     fileData._props.HeatFactor = 0.935;
            //     fileData._props.CoolFactor = 1.125;
            // }
            // //416 Quad rail
            // if (fileData._id === "5bb20de5d4351e0035629e59") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //416 Quad FS
            // if (fileData._id === "5bb20df1d4351e00347787d5") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //416 Extended Quad
            // if (fileData._id === "5bb20dfcd4351e00334c9e24") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.83;
            //     fileData._props.CoolFactor = 0.9;
            // }
            // //HK417 Patrol
            // if (fileData._id === "61712eae6c780c1e710c9a1d") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //HK417 Extended
            // if (fileData._id === "61703001d92c473c77021497") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.83;
            //     fileData._props.CoolFactor = 0.9;
            // }
            // //SVDS Polymer
            // if (fileData._id === "5c471c6c2e221602b66cd9ae") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //SVD SAG
            // if (fileData._id === "5dfcd0e547101c39625f66f9") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -3.5;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.HeatFactor = 0.85;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //SVD CAA
            // if (fileData._id === "5e5699df2161e06ac158df6f") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.88;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SVD Modernized
            // if (fileData._id === "5e56991336989c75ab4f03f6") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -18;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //MPX Midwest 4.5 inch
            // if (fileData._id === "5c5db5f22e2216000e5e47e8") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -4;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //MPX Midwest 6.5 inch
            // if (fileData._id === "5c5db5fc2e2216000f1b2842") {
            //     fileData._props.Ergonomics += 9.5;
            //     fileData._props.Recoil += -2.5;
            //     fileData._props.Accuracy = -3.5;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //MPX Midwest 10.5 inch
            // if (fileData._id === "5c5db6302e2216000e5e47f0") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.11;
            // }
            // //MPX Midwest 14 inch
            // if (fileData._id === "5c5db63a2e2216000f1b284a") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.93;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //MPX Lancer 14 inch
            // if (fileData._id === "5c59529a2e221602b177d160") {
            //     fileData._props.Ergonomics += 12.5;
            //     fileData._props.Recoil += -4.25;
            //     fileData._props.Accuracy += -1;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.17;
            // }
            // //MPX GEN 1
            // if (fileData._id === "5894a42086f77426d2590762") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -4;
            //     fileData._props.HeatFactor = 0.94;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //MDR Handguard Tan
            // if (fileData._id === "5dcbd6b46ec07c0c4347a564") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil = -2;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //MDR Handguard
            // if (fileData._id === "5c48a14f2e2216152006edd7") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil = -2;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //SA-58 Quad
            // if (fileData._id === "5b099a9d5acfc47a8607efe7") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //SA-58 quad rail full length
            // if (fileData._id === "5b7be1ca5acfc400170e2d2f") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.HeatFactor = 0.85;
            //     fileData._props.CoolFactor = 0.9;
            // }
            // //SA-58 VLTOR CASV FAS
            // if (fileData._id === "5b7bee755acfc400196d5383") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.91;
            //     fileData._props.CoolFactor = 1.11;
            // }
            // //SA-58 VLTOR CASV FAL
            // if (fileData._id === "5b7bedd75acfc43d825283f9") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //FAL Handguard
            // if (fileData._id === "5b7bed205acfc400161d08cc") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //FAL Belgium
            // if (fileData._id === "5b7d671b5acfc43d82528ddd") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //FAL AIM SPORT MLOK
            // if (fileData._id === "5b7bebc85acfc43bca706666") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -4;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.11;
            // }
            // //FAL AIM SPORT Keymod
            // if (fileData._id === "5b7be2345acfc400196d524a") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -4.5;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //RSASS
            // if (fileData._id === "5a329052c4a28200741e22d3") {
            //     fileData._props.Ergonomics += 11.5;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.93;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //Soyuz 9 inch
            // if (fileData._id === "6034e3cb0ddce744014cb870") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -2.25;
            //     fileData._props.Accuracy = -3.5;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //Soyuz 12 inch
            // if (fileData._id === "6034e3e20ddce744014cb878") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -2.5;
            //     fileData._props.Accuracy = -3;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //Soyuz 15 inch
            // if (fileData._id === "6034e3d953a60014f970617b") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -3.5;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //LVOA-C
            // if (fileData._id === "595cfa8b86f77427437e845b") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.91;
            //     fileData._props.CoolFactor = 1.11;
            // }
            // //LOVOA-S
            // if (fileData._id === "595cf16b86f77427440c32e2") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //SAI 10 Inch
            // if (fileData._id === "5c78f2612e221600114c9f0d") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = -3;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //SAI 14.5 Inch
            // if (fileData._id === "5c78f2492e221600114c9f04") {
            //     fileData._props.Ergonomics += 13.5;
            //     fileData._props.Recoil += -3.5;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //AR-15 Colt
            // if (fileData._id === "5ae30db85acfc408fb139a05") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //AR-15 Wings
            // if (fileData._id === "6087e0336d0bd7580617bb7a") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //AR-15 Alexander Arms
            // if (fileData._id === "5b2cfa535acfc432ff4db7a0") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.85;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Aeroknox
            // if (fileData._id === "619b5db699fb192e7430664f") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -6;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.CoolFactor = 1.11;
            // }
            // //STNGR
            // if (fileData._id === "5c6d5d8b2e221644fc630b39") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //KAC RIS
            // if (fileData._id === "55d459824bdc2d892f8b4573") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -19;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //ADAR
            // if (fileData._id === "5c0e2f5cd174af02a012cfc9") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -18;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.99;
            // }
            // // AR-15 Strike Black
            // if (fileData._id === "5d00e0cbd7ad1a6c6566a42d") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -21;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // // AR-15 Strike Tan
            // if (fileData._id === "5d00f63bd7ad1a59283b1c1e") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -21;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //URX 10.75 inch
            // if (fileData._id === "5d122e7bd7ad1a07102d6d7f") {
            //     fileData._props.Ergonomics += 11.5;
            //     fileData._props.Recoil += -2.5;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //URX 8 inch
            // if (fileData._id === "5d123102d7ad1a004e475fe5") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -2.5;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //Geissele 9.5
            // if (fileData._id === "5ea16acdfadf1d18c87b0784") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //Geissele 13.5
            // if (fileData._id === "5ea16ada09aa976f2e7a51be") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -1.5;
            //     fileData._props.HeatFactor = 0.88;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //RIS II FSP 9.5 inch
            // if (fileData._id === "5c9a26332e2216001219ea70") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -2.5;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //RIS II 12.25 Inch
            // if (fileData._id === "5c9a25172e2216000f20314e") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.85;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //RIS II 9.5 Tan
            // if (fileData._id === "55f84c3c4bdc2d5f408b4576") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RIS II 9.5 Black
            // if (fileData._id === "588b56d02459771481110ae2") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MOE SL Medium
            // if (fileData._id === "5c78f26f2e221601da3581d1") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.88;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //MOE SL Carbine
            // if (fileData._id === "5c78f2792e221600106f4683") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //AR-15 Lone Star
            // if (fileData._id === "5d43021ca4b9362eab4b5e25") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //SOK-12 Custom Guns
            // if (fileData._id === "6086b5731246154cad35d6c7") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -2.5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.85;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //SOK-12 Leapers Long
            // if (fileData._id === "5827272a24597748c74bdeea") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //SOK-12 Leapers short
            // if (fileData._id === "58272b392459774b4c7b3ccd") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //SOK-12 Bravo 18
            // if (fileData._id === "5f63418ef5750b524b45f116") {
            //     fileData._props.Ergonomics += -6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -7;
            //     fileData._props.HeatFactor = 0.86;
            //     fileData._props.CoolFactor = 0.97;
            // }
            // //SOK-12
            // if (fileData._id === "576169e62459773c69055191") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RPK
            // if (fileData._id === "5beec3e30db8340019619424") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil = -1;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //AK TDI X47
            // if (fileData._id === "5f6331e097199b7db2128dc2") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //AK Hexagon Red
            // if (fileData._id === "5b80242286f77429445e0b47") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.HeatFactor = 0.94;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //AK Hexagon
            // if (fileData._id === "5b800e9286f7747a8b04f3ff") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.HeatFactor = 0.93;
            //     fileData._props.CoolFactor = 1.16;
            // }
            // //B-30 with B-31S
            // if (fileData._id === "5efaf417aeb21837e749c7f2") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -3;
            //     fileData._props.HeatFactor = 0.83;
            //     fileData._props.CoolFactor = 0.97;
            // }
            // //B-11
            // if (fileData._id === "57ffa9f4245977728561e844") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -18;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 0.99;
            // }
            // //B-10M
            // if (fileData._id === "5648b4534bdc2d3d1c8b4580") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -3;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 0.99;
            // }
            // //B-10
            // if (fileData._id === "5c617a5f2e2216000f1e81b3") {
            //     fileData._props.Ergonomics += 6.5;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 0.97;
            // }
            // //Strike TRAX 1
            // if (fileData._id === "5a9d56c8a2750c0032157146") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //Strike TRAX 2
            // if (fileData._id === "5a9d6d34a2750c00141e07da") {
            //     fileData._props.Ergonomics += 4;
            //     fileData._props.Recoil += -2;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //Zhukov Tan
            // if (fileData._id === "5c9a1c3a2e2216000e69fb6a") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //Zhukov Plum
            // if (fileData._id === "5c9a1c422e221600106f69f0") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //Zhukov Black
            // if (fileData._id === "5c9a07572e221644f31c4b32") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //VLTOR CMRD
            // if (fileData._id === "5c17664f2e2216398b5a7e3c") {
            //     fileData._props.Ergonomics += 6.25;
            //     fileData._props.Recoil += -2.5;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 0.88;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VPO-209
            // if (fileData._id === "59e898ee86f77427614bd225") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AKS74U XRSU47SU Tactical
            // if (fileData._id === "5a957c3fa2750c00137fa5f7") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //AK-74 Wooden
            // if (fileData._id === "5648b0744bdc2d363b8b4578") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MOE AKM Plum
            // if (fileData._id === "57cffe0024597763b03fc60b") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.91;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //MOE AKM Tan
            // if (fileData._id === "57cffd8224597763b03fc609") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.91;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //MOE AKM Black
            // if (fileData._id === "57cff947245977638e6f2a19") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.91;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //MOE AKM Grey
            // if (fileData._id === "57cffe20245977632f391a9d") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.91;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //MOE AKM OD
            // if (fileData._id === "57cffddc24597763133760c6") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.91;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //AKM
            // if (fileData._id === "59d64f2f86f77417193ef8b3") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VEPR-KM
            // if (fileData._id === "59e6284f86f77440d569536f") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK Krebs
            // if (fileData._id === "59fb375986f7741b681b81a6") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //AK CAA
            // if (fileData._id === "5648ae314bdc2d3d1c8b457f") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -22;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK TDI Red
            // if (fileData._id === "5d4aaa54a4b9365392071170") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -18;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //AK TDI Orange
            // if (fileData._id === "5d4aaa73a4b9365392071175") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -18;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //AK TDI Black
            // if (fileData._id === "5d1b198cd7ad1a604869ad72") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.Accuracy = -18;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //Dong
            // if (fileData._id === "5d2c829448f0353a5c7d6674") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -6;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Goliaf
            // if (fileData._id === "5d15ce51d7ad1a1eff619092") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //AKS-74u
            // if (fileData._id === "57dc32dc245977596d4ef3d3") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK-74 polymer plum
            // if (fileData._id === "5cbda9f4ae9215000e5b9bfc") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -19;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //AK-74 polymer
            // if (fileData._id === "5648b1504bdc2d9d488b4584") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -19;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //AK-100
            // if (fileData._id === "5cbda392ae92155f3c17c39f") {
            //     fileData._props.Ergonomics += 7.5;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -19;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //AK Aggressor
            // if (fileData._id === "5cf4e3f3d7f00c06595bc7f0") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.HeatFactor = 0.88;
            //     fileData._props.CoolFactor = 0.94;
            // }
            // //CMMG 9 inch
            // if (fileData._id === "6065880c132d4d12c81fd8da") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = -2.5;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //CMMG 15 inch
            // if (fileData._id === "6065881d1246154cad35d637") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //AR-10 Lancer 12.5
            // if (fileData._id === "5f6336bbda967c74a42e9932") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -3;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //AR-10 URX
            // if (fileData._id === "5df916dfbb49d91fb446d6b9") {
            //     fileData._props.Ergonomics += -12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //AR-10 Noveske
            // if (fileData._id === "5d00ede1d7ad1a0940739a76") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -2.5;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.HeatFactor = 0.85;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AR-10 Noveske Split
            // if (fileData._id === "5d00ef6dd7ad1a0940739b16") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -0.5;
            //     fileData._props.HeatFactor = 0.84;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP5SD
            // if (fileData._id === "5926f34786f77469195bfe92") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -1;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP5 TL-99
            // if (fileData._id === "5a9548c9159bd400133e97b3") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -1.25;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //MP5 Tropical
            // if (fileData._id === "5926c36d86f77467a92a8629") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -1.5;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //MP5K
            // if (fileData._id === "5d2f259b48f0355a844acd74") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -5;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //MP5 CAA 
            // if (fileData._id === "5d010d1cd7ad1a59283b1ce7") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -1;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 0.97;
            // }
            // //MP5 PTR
            // if (fileData._id === "5d19cd96d7ad1a4a992c9f52") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -1.25;
            //     fileData._props.HeatFactor = 0.88;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //Remington M700 AB ARMS MOD*X
            // if (fileData._id === "5cde7afdd7f00c000d36b89d") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.89;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //DVL-10 M2
            // if (fileData._id === "5888976c24597754281f93f5") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //Orsis
            // if (fileData._id === "5df25d3bfd6b4e6e2276dc9a") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.86;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //MP-133 custom
            // if (fileData._id === "55d45f484bdc2d972f8b456d") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil = -1.25;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //MP-133 wood
            // if (fileData._id === "55d45d3f4bdc2d972f8b456c") {
            //     fileData._props.Ergonomics += 8.5;
            //     fileData._props.Recoil = -1.5;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M870 FAB
            // if (fileData._id === "5a788031c585673f2b5c1c79") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil = -1.5;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //M870 MOE
            // if (fileData._id === "5a788068c5856700137e4c8f") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.75;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //M870 Speedfeed
            // if (fileData._id === "5a788089c5856700142fdd9c") {
            //     fileData._props.Ergonomics += 9.5;
            //     fileData._props.Recoil += -2;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //Speedfeed Mossberg
            // if (fileData._id === "5e87076ce2db31558c75a11d") {
            //     fileData._props.Ergonomics += 9.5;
            //     fileData._props.Recoil += -2;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //MOE Mossberg
            // if (fileData._id === "5eea21647547d6330471b3c9") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1.75;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //MP-155 Ultima
            // if (fileData._id === "606ee5c81246154cad35d65e") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.HeatFactor = 0.94;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP-153
            // if (fileData._id === "56deed6ed2720b4c698b4583") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //MCX 12 Inch
            // if (fileData._id === "5fbc227aa56d053a3543f79e") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.HeatFactor = 0.94;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //MCX 8 Inch
            // if (fileData._id === "5fbc226eca32ed67276c155d") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //MK-18 
            // if (fileData._id === "5fc235db2770a0045c59c683") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 0.87;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //SCAR Kinetic MREX 6.5 M-LOK rail
            // if (fileData._id === "619666f4af1f5202c57a952d") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += 8;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //SCAR PWS SRX
            // if (fileData._id === "61965d9058ef8c428c287e0d") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //Vector Mk.5 modular rail
            // if (fileData._id === "5fbb978207e8a97d1f0902d3") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -2;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // ///Foregrips + Rail Covers///
            // //HK Sturm
            // if (fileData._id === "619386379fb0c665d5490dbe") {
            //     fileData._props.Ergonomics += 7.5;
            //     fileData._props.Recoil += -3.5;
            // }
            // //A3 Keymod
            // if (fileData._id === "5fc0f9b5d724d907e2077d82") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -3.5;
            // }
            // //Sig Vertical Keymod
            // if (fileData._id === "5fc0f9cbd6fa9c00c571bb90") {
            //     fileData._props.Ergonomics += 8.5;
            //     fileData._props.Recoil += -4;
            // }
            // //Monstrum Keymod
            // if (fileData._id === "615d8fd3290d254f5e6b2edc") {
            //     fileData._props.Ergonomics += 7.5;
            //     fileData._props.Recoil += -4.5;
            // }
            // //KAC
            // if (fileData._id === "5c87ca002e221600114cb150") {
            //     fileData._props.Ergonomics += 5.5;
            //     fileData._props.Recoil += -2.5;
            // }
            // //BCM
            // if (fileData._id === "5c7fc87d2e221644f31c0298") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -3;
            // }
            // //Strike Cobra
            // if (fileData._id === "5c791e872e2216001219c40a") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -1.75;
            // }
            // //M-LOK AFG Black
            // if (fileData._id === "57cffb66245977632f391a99") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -2;
            // }
            // //M-LOK AFG Tan
            // if (fileData._id === "57cffcd624597763133760c5") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -2;
            // }
            // //M-LOK AFG OD
            // if (fileData._id === "57cffcdd24597763f5110006") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -2;
            // }
            // //M-LOK AFG Grey
            // if (fileData._id === "57cffce524597763b31685d8") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -2;
            // }
            // //AFG Black
            // if (fileData._id === "588226d124597767ad33f787") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2.25;
            // }
            // //AFG Tan
            // if (fileData._id === "588226dd24597767ad33f789") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2.25;
            // }
            // //AFG OD
            // if (fileData._id === "588226ef24597767af46e39c") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2.25;
            // }
            // //AFG FG
            // if (fileData._id === "588226e62459776e3e094af7") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2.25;
            // }
            // //RVG Black
            // if (fileData._id === "59fc48e086f77463b1118392") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -3;
            // }
            // //RVG Tan
            // if (fileData._id === "5fce0cf655375d18a253eff0") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -3;
            // }
            // //Hera ARMS
            // if (fileData._id === "5a7dbfc1159bd40016548fde") {
            //     fileData._props.Ergonomics += 7.5;
            //     fileData._props.Recoil += -3.4;
            // }
            // //Fortis Shift
            // if (fileData._id === "59f8a37386f7747af3328f06") {
            //     fileData._props.Ergonomics += 10.5;
            //     fileData._props.Recoil += -1.5;
            // }
            // //Tactical Dynamics Skeletonized
            // if (fileData._id === "5f6340d3ca442212f4047eb2") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            // }
            // //Stark SE-5
            // if (fileData._id === "5b057b4f5acfc4771e1bd3e9") {
            //     fileData._props.Ergonomics += 8.5;
            //     fileData._props.Recoil += 2.5
            // }
            // //TD Tan
            // if (fileData._id === "58c157be86f77403c74b2bb6") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += 2.5
            // }
            // //TD Grey
            // if (fileData._id === "58c157c886f774032749fb06") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -2.5;
            // }
            // //TD Black
            // if (fileData._id === "558032614bdc2de7118b4585") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -2.5;
            // }
            // //Viking UVG
            // if (fileData._id === "591af28e86f77414a27a9e1d") {
            //     fileData._props.Ergonomics += 5.5;
            //     fileData._props.Recoil += -3;
            // }
            // //RTM Pilau
            // if (fileData._id === "5cf4fb76d7f00c065703d3ac") {
            //     fileData._props.Ergonomics += 6.5;
            //     fileData._props.Recoil += -3;
            // }
            // //ASH-12
            // if (fileData._id === "5cda9bcfd7f00c0c0b53e900") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -3;
            // }
            // //MP9-N
            // if (fileData._id === "5de8fbad2fbe23140d3ee9c4") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -6;
            // }
            // //Orsis Padded handguard
            // if (fileData._id === "5df36948bb49d91fb446d5ad") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -1;
            // }
            // //RK-6
            // if (fileData._id === "5c1bc7752e221602b1779b34") {
            //     fileData._props.Ergonomics += 7.5;
            //     fileData._props.Recoil += -1.5;
            // }
            // //RK-4
            // if (fileData._id === "5c1bc5fb2e221602b1779b32") {
            //     fileData._props.Ergonomics += 6.5;
            //     fileData._props.Recoil += -2;
            // }
            // //RK-0
            // if (fileData._id === "5c1bc4812e22164bef5cfde7") {
            //     fileData._props.Ergonomics += 5.5;
            //     fileData._props.Recoil += -2.5;
            // }
            // //RK-5
            // if (fileData._id === "5c1bc7432e221602b412949d") {
            //     fileData._props.Ergonomics += 4.5;
            //     fileData._props.Recoil += -3;
            // }
            // //RK-1
            // if (fileData._id === "5c1bc5612e221602b5429350") {
            //     fileData._props.Ergonomics += 4;
            //     fileData._props.Recoil += -3.5;
            // }
            // //RK-1 Canted
            // if (fileData._id === "5c1cd46f2e22164bef5cfedb") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -4;
            // }
            // //RK-2
            // if (fileData._id === "5c1bc5af2e221602b412949b") {
            //     fileData._props.Ergonomics += 2;
            //     fileData._props.Recoil += -5;
            // }
            // //KAC Short Panel black
            // if (fileData._id === "5d123a3cd7ad1a004e476058") {
            //     fileData._props.Ergonomics += 1.5;
            //     fileData._props.Recoil += 0.5;
            // }
            // //KAC Short Panel tan
            // if (fileData._id === "5d124c01d7ad1a115c7d59fb") {
            //     fileData._props.Ergonomics += 1.5;
            //     fileData._props.Recoil += 0.5;
            // }
            // //KAC long panel black
            // if (fileData._id === "5d123b70d7ad1a0ee35e0754") {
            //     fileData._props.Ergonomics += 1.5;
            //     fileData._props.Recoil += 0.5;
            // }
            // //KAC long panel tan
            // if (fileData._id === "5d124c0ed7ad1a10d168dd9b") {
            //     fileData._props.Ergonomics += 1.5;
            //     fileData._props.Recoil += 0.5;
            // }
            // //KAC hand stop black
            // if (fileData._id === "5d123b7dd7ad1a004f01b262") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += 2.5;
            // }
            // //KAC hand stop tan
            // if (fileData._id === "5d124c1ad7ad1a12227c53a7") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += 2.5;
            // }
            // ///Pistol Grips///
            // //F1 Style 2 PC
            // if (fileData._id === "6113cc78d3a39d50044c065a") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //F1 Style 2
            // if (fileData._id === "6113cce3d92c473c770200c7") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //F1 Style 1
            // if (fileData._id === "6113c3586c780c1e710c90bc") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //Hexgrip AR-15
            // if (fileData._id === "615d8faecabb9b7ad90f4d5d") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //Naroh Arms GRAL
            // if (fileData._id === "59db3a1d86f77429e05b4e92") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //Tactical Dynamics Skeletonized Pistolgrip
            // if (fileData._id === "5f6340d3ca442212f4047eb2") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //KGB MG-47 Tan
            // if (fileData._id === "5cf54404d7f00c108840b2ef") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //KGB MG-47 Red
            // if (fileData._id === "5e2192a498a36665e8337386") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //HK Battle Grip Beavertail
            // if (fileData._id === "5bb20e0ed4351e3bac1212dc") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //HK Battle Grip Beavertail Tan
            // if (fileData._id === "6193dcd0f8ee7e52e4210a28") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //HK V2
            // if (fileData._id === "5c6d7b3d2e221600114c9b7d") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //HK Battle Grip
            // if (fileData._id === "5bb20e18d4351e00320205d5") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //COLT A2
            // if (fileData._id === "55d4b9964bdc2d1d4e8b456e") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //Damage Industries ECS
            // if (fileData._id === "571659bb2459771fb2755a12") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //Hogue overmolded AR-15 Tan
            // if (fileData._id === "57af48872459771f0b2ebf11") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //Hogue overmolded AR-15 Black
            // if (fileData._id === "57c55efc2459772d2c6271e7") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //Hogue overmolded AR-15 Gillie Earth
            // if (fileData._id === "57c55f092459772d291a8463") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //Hogue overmolded AR-15 Ghillie Green
            // if (fileData._id === "57c55f112459772d28133310") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //Hogue overmolded AR-15 OD
            // if (fileData._id === "57c55f172459772d27602381") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //AR-15 MIAD
            // if (fileData._id === "5a339805c4a2826c6e06d73d") {
            //     fileData._props.Ergonomics += 8.5;
            // }
            // //AR-15 MOE Tan
            // if (fileData._id === "5d15cf3bd7ad1a67e71518b2") {
            //     fileData._props.Ergonomics += 8.5;
            // }
            // //AR-15 MOE Black
            // if (fileData._id === "55802f5d4bdc2dac148b458f") {
            //     fileData._props.Ergonomics += 8.5;
            // }
            // //AR-15 DLG
            // if (fileData._id === "602e71bd53a60014f9705bfa") {
            //     fileData._props.Ergonomics += 6.5;
            // }
            // //AR-15 Hera Arms HG-15
            // if (fileData._id === "5cc9bcaed7f00c011c04e179") {
            //     fileData._props.Ergonomics += 6.5;
            // }
            // //Stark AR FDE
            // if (fileData._id === "59db3b0886f77429d72fb895") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //Stark AR Black
            // if (fileData._id === "59db3acc86f7742a2c4ab912") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //MPX
            // if (fileData._id === "5894a51286f77426d13baf02") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //MCX
            // if (fileData._id === "5fbcbd6c187fea44d52eda14") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //AR PSG-1 style
            // if (fileData._id === "5d025cc1d7ad1a53845279ef") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Accuracy += 3;
            // }
            // //Custom Arms AGS-74 PRO
            // if (fileData._id === "6087e663132d4d12c81fd96b") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Accuracy += 3;
            // }
            // //AK Tapco Tan
            // if (fileData._id === "5947fa2486f77425b47c1a9b") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //AK Tapco Black
            // if (fileData._id === "5947f92f86f77427344a76b1") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //AK-12 Pistol Grip
            // if (fileData._id === "5beec8ea0db834001a6f9dbf") {
            //     fileData._props.Ergonomics += 6.5;
            // }
            // //AK MOE
            // if (fileData._id === "5b30ac585acfc433000eb79c") {
            //     fileData._props.Ergonomics += 8.5;
            // }
            // //AK US Palm
            // if (fileData._id === "59fafc9386f774067d462453") {
            //     fileData._props.Ergonomics += 8.5;
            // }
            // //AK US Palm
            // if (fileData._id === "59fafc5086f7740dbe19f6c3") {
            //     fileData._props.Ergonomics += 8.5;
            // }
            // //Vityaz
            // if (fileData._id === "5998517986f7746017232f7e") {
            //     fileData._props.Ergonomics += 6.5;
            // }
            // //AK 6P1 Sb.8v
            // if (fileData._id === "5649ad3f4bdc2df8348b4585") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //AK 6P1 Sb.8
            // if (fileData._id === "5649ade84bdc2d1b2b8b4587") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //AKM Bakelite
            // if (fileData._id === "59e62cc886f77440d40b52a1") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //AKM Wooden pistol grip
            // if (fileData._id === "5a0071d486f77404e23a12b2") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //AK Bakelite 6P4 Sb.9
            // if (fileData._id === "57e3dba62459770f0c32322b") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //AK Bakelite
            // if (fileData._id === "59e6318286f77444dd62c4cc") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //AK Zenit
            // if (fileData._id === "5649ae4a4bdc2d1b2b8b4588") {
            //     fileData._props.Ergonomics += 8.5;
            // }
            // //AK Strike Enhanced Tan
            // if (fileData._id === "5cf508bfd7f00c056e24104e") {
            //     fileData._props.Ergonomics += 7;
            // }
            // //AK Strike Enhanced Black
            // if (fileData._id === "5cf50850d7f00c056e24104c") {
            //     fileData._props.Ergonomics += 7;
            // }
            // //AK Aeroknox
            // if (fileData._id === "5f6341043ada5942720e2dc5") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //SA-58 FAB Defense
            // if (fileData._id === "5b7d679f5acfc4001a5c4024") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //SA-58 Grip
            // if (fileData._id === "5b7d678a5acfc4001a5c4022") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //SA-58 Tapco
            // if (fileData._id === "5b099b965acfc400186331e6") {
            //     fileData._props.Ergonomics += 7.5;
            // }
            // //SVDS Pistol Grip
            // if (fileData._id === "5c471be12e221602b66cd9ac") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //MDR Pistol grip Tan
            // if (fileData._id === "5c48a2c22e221602b313fb6c") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //MDR Pistol grip black
            // if (fileData._id === "5dcbd6dddbd3d91b3e5468de") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //Mosin Rifle Tacfire
            // if (fileData._id === "5bbde41ed4351e003562b038") {
            //     fileData._props.Ergonomics += 10;
            // }
            // //SAGE EBR
            // if (fileData._id === "5addc7db5acfc4001669f279") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //KEDR
            // if (fileData._id === "57d152ec245977144076ccdf") {
            //     fileData._props.Ergonomics += 5;
            // }
            // //MP-155 Ultima
            // if (fileData._id === "606eef46232e5a31c233d500") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            // }
            // //M870 FAb defense
            // if (fileData._id === "5bfe86a20db834001d23e8f7") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            // }
            // //KS23M
            // if (fileData._id === "5e848d99865c0f329958c83b") {
            //     fileData._props.Ergonomics += 10;
            // }
            // //TOZ
            // if (fileData._id === "5a38eecdc4a282329a73b512") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -2;
            // }
            // //ORSIS grip
            // if (fileData._id === "5df38a5fb74cd90030650cb6") {
            //     fileData._props.Ergonomics += 8;
            // }
            // //SKS FAB Defense
            // if (fileData._id === "5d023784d7ad1a049d4aa7f2") {
            //     fileData._props.Ergonomics += 6.5;
            //     fileData._props.Recoil += -1;
            // }
            // //SKS Tapco
            // if (fileData._id === "5947fa2486f77425b47c1a9b") {
            //     fileData._props.Ergonomics += 7.5;
            //     fileData._props.Recoil += -1;
            // }
            // //Remington M700 Magpul
            // if (fileData._id === "5cdeac5cd7f00c000f261694") {
            //     fileData._props.Ergonomics += 8.5;
            //     fileData._props.Recoil += -1;
            // }
            // //AS VAL Rotor 43
            // if (fileData._id === "5a69a2ed8dc32e000d46d1f1") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -5;
            // }
            // //TT Razor
            // if (fileData._id === "5c079ec50db834001966a706") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += -7;
            // }
            // //TT Hogue
            // if (fileData._id === "5c0684e50db834002a12585a") {
            //     fileData._props.Ergonomics += 3;
            //     fileData._props.Recoil += -8.5;
            // }
            // //TT ornate
            // if (fileData._id === "5b3cadf35acfc400194776a0") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -5;
            // }
            // //TT side grips
            // if (fileData._id === "571a282c2459771fb2755a69") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -5;
            // }
            // //TT PM laser
            // if (fileData._id === "5bffcf7a0db83400232fea79") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -5;
            // }
            // //P226 Stainless Elite Wood
            // if (fileData._id === "5c00076d0db834001d23ee1f") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += 7;
            // }
            // //p226 Emperor
            // if (fileData._id === "5c0006470db834001a6697fe") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += 6;
            // }
            // //p226 Hogue Chain Link
            // if (fileData._id === "5bffef760db8340019668fe4") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += 6;
            // }
            // //p226 Axelson
            // if (fileData._id === "5bffec120db834001c38f5fa") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += 6;
            // }
            // //p226 hogue rubberized
            // if (fileData._id === "5b39ffbd5acfc47a8773fb06") {
            //     fileData._props.Ergonomics += 3;
            //     fileData._props.Recoil += -8.5;
            // }
            // //p226 polymer
            // if (fileData._id === "56d5a2bbd2720bb8418b456a") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += 5;
            // }
            // //p226 polymer FDE
            // if (fileData._id === "57c9a89124597704ee6faec1") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += 5;
            // }
            // //Glock Pachmayr
            // if (fileData._id === "5a7b4960e899ef197b331a2d") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += 5;
            // }
            // //M9A3 Polymer
            // if (fileData._id === "5cadc190ae921500103bb3b6") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += 5;
            // }
            // //m1911a1 polymer
            // if (fileData._id === "5e81c6bf763d9f754677beff") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += 5;
            // }
            // //m1911a1 Pachmayr
            // if (fileData._id === "5ef366938cef260c0642acad") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += 7;
            // }
            // //M45a1
            // if (fileData._id === "5f3e778efcd9b651187d7201") {
            //     fileData._props.Ergonomics += 6;
            //     fileData._props.Recoil += 6;
            // }
            // ///Bipods///
            // //Harris
            // if (fileData._id === "5888961624597754281f93f3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy += 5;
            // }
            // //SV-98
            // if (fileData._id === "56ea8222d2720b69698b4567") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy += 5;
            // }
            // ///Charging Handles///
            // //HK417
            // if (fileData._id === "61702d8a67085e45ef140b24") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //HK Extended
            // if (fileData._id === "5bb20dbcd4351e44f824c04e") {
            //     fileData._props.Ergonomics += 4;
            // }
            // //ADAR
            // if (fileData._id === "5c0faf68d174af02a96260b8") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //AR-15 Colt
            // if (fileData._id === "55d44fd14bdc2d962f8b456e") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //Badger Ordnance
            // if (fileData._id === "56ea7165d2720b6e518b4583") {
            //     fileData._props.Ergonomics += 4;
            // }
            // //Radian Arms Raptor
            // if (fileData._id === "5b2240bf5acfc40dc528af69") {
            //     fileData._props.Ergonomics += 4.5;
            // }
            // //Radian Arms Raptor Grey
            // if (fileData._id === "5d44334ba4b9362b346d1948") {
            //     fileData._props.Ergonomics += 4.5;
            // }
            // //Geissele ACH
            // if (fileData._id === "5ea16d4d5aad6446a939753d") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //Rainier Arms
            // if (fileData._id === "5f633ff5c444ce7e3c30a006") {
            //     fileData._props.Ergonomics += 4;
            // }
            // //MASP
            // if (fileData._id === "6033749e88382f4fab3fd2c5") {
            //     fileData._props.Ergonomics += 4;
            // }
            // //MK47
            // if (fileData._id === "606587bd6d0bd7580617bacc") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //MPX Geissele
            // if (fileData._id === "5c5db6b32e221600102611a0") {
            //     fileData._props.Ergonomics += 6;
            // }
            // //MPX Double Latch
            // if (fileData._id === "58949edd86f77409483e16a9") {
            //     fileData._props.Ergonomics += 4;
            // }
            // //MPX Single Latch
            // if (fileData._id === "58949fac86f77409483e16aa") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //MCX Charging Handle
            // if (fileData._id === "5fbcc640016cce60e8341acc") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //AR-10 KAC
            // if (fileData._id === "5df8e053bb49d91fb446d6a6") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //AR-10 KAC Ambi
            // if (fileData._id === "5df8e085bb49d91fb446d6a8") {
            //     fileData._props.Ergonomics += 4;
            // }
            // //FN SCAR
            // if (fileData._id === "6181688c6c780c1e710c9b04") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //AK CSS
            // if (fileData._id === "6130ca3fd92c473c77020dbd") {
            //     fileData._props.Ergonomics += 4;
            // }
            // //AK RP-1
            // if (fileData._id === "5648ac824bdc2ded0b8b457d") {
            //     fileData._props.Ergonomics += 3;
            // }
            // //MP5
            // if (fileData._id === "5926c32286f774616e42de99") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //MP5k
            // if (fileData._id === "5d2f2d5748f03572ec0c0139") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //P90
            // if (fileData._id === "5cc6ea78e4a949000e1ea3c1") {
            //     fileData._props.Ergonomics += 2;
            // }
            // //P90 K&M The Handler
            // if (fileData._id === "5cc6ea85e4a949000e1ea3c3") {
            //     fileData._props.Ergonomics += 5;
            // }
            // ///Gas Block///
            // //M4 FS
            // if (fileData._id === "5ae30e795acfc408fb139a0b") {
            //     fileData._props.Recoil += 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            //     fileData._props.Accuracy = -6;
            // }
            // //MK12 low profile
            // if (fileData._id === "56eabcd4d2720b66698b4574") {
            //     fileData._props.Recoil += 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 0.99;
            //     fileData._props.CoolFactor = 1;
            //     fileData._props.Accuracy = 0;
            // }
            // //JP System 5B AR-15
            // if (fileData._id === "5d00ec68d7ad1a04a067e5be") {
            //     fileData._props.Recoil += -2;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 1;
            //     fileData._props.Accuracy = -2;
            // }
            // //JP System 6 AR-10
            // if (fileData._id === "5a34fbadc4a28200741e230a") {
            //     fileData._props.Recoil += -8;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = -0.95;
            //     fileData._props.CoolFactor = 1;
            //     fileData._props.Accuracy = -8;
            // }
            // //Windh
            // if (fileData._id === "56ea8d2fd2720b7c698b4570") {
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            //     fileData._props.Accuracy = -4;
            // }
            // //AK Ultimak
            // if (fileData._id === "59ccfdba86f7747f2109a587") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -1;
            //     fileData._props.Accuracy = -25;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //AK Troy 
            // if (fileData._id === "5b237e425acfc4771e1be0b6") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.HeatFactor = 0.84;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //AK Strelok VS-24
            // if (fileData._id === "5cf656f2d7f00c06585fb6eb") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.HeatFactor = 0.83;
            //     fileData._props.CoolFactor = 0.96;
            // }
            // //AK Strelok VS-24 White
            // if (fileData._id === "5d4aab30a4b9365435358c55") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.HeatFactor = 0.83;
            //     fileData._props.CoolFactor = 0.96;
            // }
            // ///Barrels///
            // //417 16.5
            // if (fileData._id === "61702be9faa1272e431522c3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.016;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //416 10.6
            // if (fileData._id === "5c6d85e02e22165df16b81f4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 25;
            //     fileData._props.Recoil += 8;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.04;
            //     fileData._props.DurabilityBurnModificator = 1.12;
            //     fileData._props.HeatFactor = 1.11;
            //     fileData._props.CoolFactor = 1.11;
            // }
            // //416 11
            // if (fileData._id === "5bb20d92d4351e00853263eb") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 23;
            //     fileData._props.Recoil += 7.5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0399;
            //     fileData._props.DurabilityBurnModificator = 1.08;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //416 14.5
            // if (fileData._id === "5bb20d9cd4351e00334c9d8a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 4;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.03;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //416 16.5
            // if (fileData._id === "5bb20da5d4351e0035629dbf") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.029;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //416 20
            // if (fileData._id === "5bb20dadd4351e00367faeff") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.032;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AR-15 260mm
            // if (fileData._id === "55d35ee94bdc2d61338b4568") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 25;
            //     fileData._props.Recoil += 15;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.035;
            //     fileData._props.DurabilityBurnModificator = 1.2;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //AR-15 370mm
            // if (fileData._id === "55d3632e4bdc2d972f8b4569") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 7;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.025;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //AR-15 406mm MOLOT
            // if (fileData._id === "5c0e2f94d174af029f650d56") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.06;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //AR-15 18 inch
            // if (fileData._id === "5d440b93a4b9364276578d4b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += -4;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.02;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //AR-15 20 inch
            // if (fileData._id === "5d440b9fa4b93601354d480c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.027;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SCAR 16 18 inch
            // if (fileData._id === "6183fd9e8004cc50514c358f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -2;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.028;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SCAR 16 14 inch
            // if (fileData._id === "6183fd911cb55961fa0fdce9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 4;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.034;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //SCAR 16 10 inch
            // if (fileData._id === "6183fc15d3a39d50044c13e9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 25;
            //     fileData._props.Recoil += 8;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.044;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //SCAR 17 20 inch
            // if (fileData._id === "6183b084a112697a4b3a6e6c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.03;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SCAR 17 16 inch
            // if (fileData._id === "6183b0711cb55961fa0fdcad") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.027;
            //     fileData._props.DurabilityBurnModificator = 1.06;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //SCAR 17 13 inch
            // if (fileData._id === "618168b350224f204c1da4d8") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 23;
            //     fileData._props.Recoil += 6;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.05;
            //     fileData._props.DurabilityBurnModificator = 1.12;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //MK47 409mm
            // if (fileData._id === "6065878ac9cf8012264142fd") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.067
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MK47 254mm
            // if (fileData._id === "60658776f2cb2e02a42ace2b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 15;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.074;
            //     fileData._props.DurabilityBurnModificator = 1.12;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //MPX 14 inch
            // if (fileData._id === "5c5db5c62e22160012542255") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.14;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MPX 10.5 inch
            // if (fileData._id === "5c5db5b82e2216003a0fe71d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.139;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //MPX 203mm
            // if (fileData._id === "5894a2c386f77427140b8342") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 12;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.138;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //MPX 6.5 inch
            // if (fileData._id === "5c5db5962e2216000e5e46eb") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.137;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //MPX 4.5 inch
            // if (fileData._id === "5c5db5852e2216003a0fe71a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.146;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.12;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //MPX-SD 165mm
            // if (fileData._id === "58aeaaa886f7744fc1560f81") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.16;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.12;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //MDR 5.56 16 inch
            // if (fileData._id === "5c48a2852e221602b21d5923") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.037;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MDR 7.62 16 inch
            // if (fileData._id === "5dcbe9431e1f4616d354987e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.038;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SVDS 22 inch
            // if (fileData._id === "5c471cb32e221602b177afaa") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.044;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 20 inch
            // if (fileData._id === "5bfebc320db8340019668d79") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0139;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //M700 20 inch stainless
            // if (fileData._id === "5d2703038abbc3105103d94c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0067;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //M700 26 inch
            // if (fileData._id === "5bfebc250db834001a6694e1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0145;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 26 inch stainless
            // if (fileData._id === "5d2702e88abbc31ed91efc44") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.011;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //T-5000M 660mm
            // if (fileData._id === "5df256570dee1b22f862e9c4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0.009;
            //     fileData._props.CenterOfImpact = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SR-25 20 inch
            // if (fileData._id === "5dfa397fb11454561e39246c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0195;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SR-25 16 inch
            // if (fileData._id === "5df917564a9f347bc92edca3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.018;
            //     fileData._props.DurabilityBurnModificator = 1.06;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //VPO-215 23 inch
            // if (fileData._id === "5de65547883dde217541644b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.075;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PPSH
            // if (fileData._id === "5ea02bb600685063ec28bfa1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.15;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RFB 18 inch
            // if (fileData._id === "5f2aa46b878ef416f538b567") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0345;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MCX 171 mm
            // if (fileData._id === "5fbbfabed5cb881a7363194e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 2;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.015;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //MCX 229 mm
            // if (fileData._id === "5fbbfacda56d053a3543f799") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0165;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Vector 9x19 5 inch
            // if (fileData._id === "5fbbc366ca32ed67276c1557") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.12;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.01;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //Vector 9x19 6 inch
            // if (fileData._id === "5fbbc383d5cb881a7363194a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1185;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Vector .45 5 inch
            // if (fileData._id === "5fb65363d1409e5ca04b54f5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1275;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.01;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //Vector .45 6 inch
            // if (fileData._id === "5fb653962b1b027b1f50bd03") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += -0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.126;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //UMP 8 inch
            // if (fileData._id === "5fc3e4a27283c4046c5814ab") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.12;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //UMP 8 inch threader
            // if (fileData._id === "6130c3dffaa1272e43151c7d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.123;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //.338 24 inch
            // if (fileData._id === "5fc23678ab884124df0cd590") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.01035;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //STM 10.5 inch
            // if (fileData._id === "603372b4da11d6478d5a07ff") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //STM 12 inch
            // if (fileData._id === "603372d154072b51b239f9e1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1125;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //STM 14 inch
            // if (fileData._id === "603372f153a60014f970616d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1155;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.02;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //STM 16 inch
            // if (fileData._id === "603373004e02ce1eaa358814") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.12;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin 200mm
            // if (fileData._id === "5bfd4cc90db834001d23e846") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 30;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.105;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //Mosin 220mm threaded
            // if (fileData._id === "5bfd4cd60db834001c38f095") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 28;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1095;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //Mosin 514mm
            // if (fileData._id === "5bfd4cbe0db834001b73449f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 8;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0555;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //Mosin 730mm
            // if (fileData._id === "5ae09bff5acfc4001562219d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0405;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RPK 15 inch
            // if (fileData._id === "5beec1bd0db834001e6006f3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0555;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1.15;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //RPK 22 inch
            // if (fileData._id === "5beec2820db834001b095426") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.06;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //FAL 11 inch
            // if (fileData._id === "5b099a765acfc47a8607efe3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Recoil = 8;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0645;
            //     fileData._props.DurabilityBurnModificator = 1.06;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //FAL 16 inch
            // if (fileData._id === "5b7be1125acfc4001876c0e5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0.0555;
            //     fileData._props.CenterOfImpact = 0;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //FAL 21 inch
            // if (fileData._id === "5b7be1265acfc400161d0798") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.057;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1A 22 inch
            // if (fileData._id === "5addbac75acfc400194dbc56") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.03;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1A 16 inch
            // if (fileData._id === "5aaf9d53e5b5b00015042a52") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.027;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //AR-10 18 inch
            // if (fileData._id === "5a34f7f1c4a2826c6e06d75d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.012;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //AR-10 22 inch
            // if (fileData._id === "5a34fae7c4a2826c6e06d760") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.015;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //DVL-10 500mm
            // if (fileData._id === "5888945a2459774bf43ba385") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0135;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.15;
            //     fileData._props.CoolFactor = 1.15;
            // }
            // //DVL-10 660mm
            // if (fileData._id === "5888956924597752983e182d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.01125;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //P90 10.5 inch
            // if (fileData._id === "5cc701aae4a949000e1ea45c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0765;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //P90 16 inch
            // if (fileData._id === "5cc701d7e4a94900100ac4e7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 8;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.0855;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //USP Tactical threaded
            // if (fileData._id === "6194efe07c6c7b169525f11b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1335;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //USP Match
            // if (fileData._id === "6194f02d9bb3d20b0946d2f0") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.132;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.92;
            //     fileData._props.CoolFactor = 0.92;
            // }
            // //USP Expert
            // if (fileData._id === "6194eff92d2c397d6600348b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.132;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.CoolFactor = 0.96;
            // }
            // //USP ELite
            // if (fileData._id === "6194f017ed0429009f543eaa") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.132;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.94;
            //     fileData._props.CoolFactor = 0.94;
            // }
            // //USP standard
            // if (fileData._id === "6194ef39de3cdf1d2614a768") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.144;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TT
            // if (fileData._id === "571a26d524597720680fbe8a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.24;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TT threaded
            // if (fileData._id === "571a279b24597720b4066566") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.2445;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //TT Gold
            // if (fileData._id === "5b3baf8f5acfc40dc5296692") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.2955;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.99;
            //     fileData._props.CoolFactor = 0.99;
            // }
            // //P226 threaded
            // if (fileData._id === "587de4282459771bca0ec90b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1515;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //P226
            // if (fileData._id === "56d5a1f7d2720bb3418b456a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.15;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock
            // if (fileData._id === "5a6b5f868dc32e000a311389") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1875;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock Lone Wolf
            // if (fileData._id === "5a6b5b8a8dc32e001207faf3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1635;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //Glock Double Diamond
            // if (fileData._id === "5a6b5e468dc32e001207faf5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.168;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //Glock with compensator
            // if (fileData._id === "5a6b60158dc32e000a31138b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1935;
            //     fileData._props.DurabilityBurnModificator = 1.07;
            //     fileData._props.HeatFactor = 1.15;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock SAI
            // if (fileData._id === "5a6b5ed88dc32e000c52ec86") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.155;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.05;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //Glock 18C
            // if (fileData._id === "5b1fa9ea5acfc40018633c0a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.192;
            //     fileData._props.DurabilityBurnModificator = 1.06;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M9A3
            // if (fileData._id === "5cadc1c6ae9215000f2775a4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.165;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //FN 5.7
            // if (fileData._id === "5d3eb5b6a4b9361eab311902") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.141;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //5.7 threaded
            // if (fileData._id === "5d3eb59ea4b9361c284bb4b2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1425;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //M1911A1
            // if (fileData._id === "5e81c519cb2b95385c177551") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1575;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1911A1 Match
            // if (fileData._id === "5f3e7801153b8571434a924c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1425;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.CoolFactor = 0.96;
            // }
            // //M1911A1 Threaded
            // if (fileData._id === "5f3e77f59103d430b93f94c1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1545;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //PL15
            // if (fileData._id === "602a95edda11d6478d5a06da") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1875;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PL15 threaded
            // if (fileData._id === "602a95fe4e02ce1eaa358729") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1879;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //m870 660mm
            // if (fileData._id === "") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.117;
            //     fileData._props.ShotgunDispersion = 1.33;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //m870 508mm
            // if (fileData._id === "5a787fadc5856700155a6ca1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.115;
            //     fileData._props.ShotgunDispersion = 1.35;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //m870 325mm sawn-off
            // if (fileData._id === "5a787fdfc5856700142fdd9a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.162;
            //     fileData._props.ShotgunDispersion = 1.45;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //m870 355mm
            // if (fileData._id === "5a787f25c5856700186c4ab9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0;
            //     fileData._props.ShotgunDispersion = 1.4;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //Mossberg
            // if (fileData._id === "5e87071478f43e51ca2de5e1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.11475;
            //     fileData._props.ShotgunDispersion = 1.35;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //153 610mm
            // if (fileData._id === "588200af24597742fa221dfb") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1305;
            //     fileData._props.ShotgunDispersion = 1.38;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //153 660mm
            // if (fileData._id === "588200c224597743990da9ed") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.132;
            //     fileData._props.ShotgunDispersion = 1.37;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //153 710mm
            // if (fileData._id === "588200cf2459774414733d55") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1335;
            //     fileData._props.ShotgunDispersion = 1.36;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.02;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //153 750mm
            // if (fileData._id === "56deec93d2720bec348b4568") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.135;
            //     fileData._props.ShotgunDispersion = 1.35;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //133 510mm
            // if (fileData._id === "55d4491a4bdc2d882f8b456e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1275
            //     fileData._props.ShotgunDispersion = 1.4;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //133 510mm ribbed
            // if (fileData._id === "560835c74bdc2dc8488b456f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.126;
            //     fileData._props.ShotgunDispersion = 1.39;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.07;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //133 540mm
            // if (fileData._id === "560836484bdc2d20478b456e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 8;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.129;
            //     fileData._props.ShotgunDispersion = 1.39;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.07;
            //     fileData._props.CoolFactor = 1.07;
            // }
            // //133 540mm ribbed
            // if (fileData._id === "560836b64bdc2d57468b4567") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 8;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1275;
            //     fileData._props.ShotgunDispersion = 1.38;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //133 610mm
            // if (fileData._id === "55d448594bdc2d8c2f8b4569") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 4;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1305;
            //     fileData._props.ShotgunDispersion = 1.38;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //133 610mm ribbed
            // if (fileData._id === "55d449444bdc2d962f8b456d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 4;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.129;
            //     fileData._props.ShotgunDispersion = 1.37;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.05;
            //     fileData._props.CoolFactor = 1.11;
            // }
            // //133 660mm
            // if (fileData._id === "560836fb4bdc2d773f8b4569") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.132;
            //     fileData._props.ShotgunDispersion = 1.37;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //133 660mm ribbed
            // if (fileData._id === "560837154bdc2da74d8b4568") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1305;
            //     fileData._props.ShotgunDispersion = 1.36;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1.12;
            // }
            // //133 710mm
            // if (fileData._id === "5608373c4bdc2dc8488b4570") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1335;
            //     fileData._props.ShotgunDispersion = 1.36;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.02;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //133 710mm ribbed
            // if (fileData._id === "560837544bdc2de22e8b456e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.132;
            //     fileData._props.ShotgunDispersion = 1.35;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.01;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //133 750mm
            // if (fileData._id === "560837824bdc2d57468b4568") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.135;
            //     fileData._props.ShotgunDispersion = 1.35;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //133 750mm ribbed
            // if (fileData._id === "5608379a4bdc2d26448b4569") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1335;
            //     fileData._props.ShotgunDispersion = 1.34;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1.14;
            // }
            // //MTS-255 755mm
            // if (fileData._id === "612368f58b401f4f51239b33") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.12;
            //     fileData._props.ShotgunDispersion = 1.34;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP-43 750mm
            // if (fileData._id === "611a30addbdd8440277441dc") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.135;
            //     fileData._props.ShotgunDispersion = 1.33;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP-43 725mm
            // if (fileData._id === "55d447bb4bdc2d892f8b456f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1335;
            //     fileData._props.ShotgunDispersion = 1.34;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.02;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //MP-43 510mm
            // if (fileData._id === "5580169d4bdc2d9d138b4585") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1275;
            //     fileData._props.ShotgunDispersion = 1.38;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //MP-155 510mm
            // if (fileData._id === "6076c1b9f2cb2e02a42acedc") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.1275;
            //     fileData._props.ShotgunDispersion = 1.4;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //KS-23 23x75 700mm barrel
            // if (fileData._id === "5e848d2eea0a7c419c2f9bfd") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0.0675;
            //     fileData._props.CenterOfImpact = 0;
            //     fileData._props.ShotgunDispersion = 0.21;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //KS-23 23x75 510mm barrel
            // if (fileData._id === "5e848d1c264f7c180b5e35a9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.CenterOfImpact = 0.067;
            //     fileData._props.ShotgunDispersion = 0.2;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // ///Suppressors///
            // //HK UMP Supp
            // if (fileData._id === "6130c4d51cb55961fa0fd49f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -25;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.13;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //AAC Illusion
            // if (fileData._id === "5c7e8fab2e22165df16b889b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -18;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.12;
            //     fileData._props.HeatFactor = 1.18;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //SRD9
            // if (fileData._id === "5c6165902e22160010261b28") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -16;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.15;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //Rotex 4.6mm Supp
            // if (fileData._id === "5ba26ae8d4351e00367f9bdb") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -17;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.11;
            //     fileData._props.HeatFactor = 1.13;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //ROTOR 9x19
            // if (fileData._id === "5a9fb739a2750c003215717f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -10;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.2;
            //     fileData._props.HeatFactor = 1.22;
            //     fileData._props.CoolFactor = 1;
            // }
            // //APB 9x18 supp
            // if (fileData._id === "5abcc328d8ce8700194394f3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -13;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = -25;
            //     fileData._props.DurabilityBurnModificator = 1.22;
            //     fileData._props.HeatFactor = 1.20;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP5SD Supp
            // if (fileData._id === "5926d33d86f77410de68ebc0") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -30;
            //     fileData._props.Recoil += -30;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.2;
            //     fileData._props.HeatFactor = 1.13;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Osprey 9x19
            // if (fileData._id === "5a32a064c4a28200741e22de") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -19;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.16;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //SR-1MP 9x21 Supp
            // if (fileData._id === "5a27b6bec4a282000e496f78") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -16;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1.21;
            //     fileData._props.HeatFactor = 1.18;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TT Makeshift Supp
            // if (fileData._id === "571a28e524597720b4066567") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -12;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -30;
            //     fileData._props.DurabilityBurnModificator = 1.3;
            //     fileData._props.HeatFactor = 1.22;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Alpha Dog
            // if (fileData._id === "5a33a8ebc4a282000c5a950d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -16;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.12;
            //     fileData._props.HeatFactor = 1.18;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //Fischer Glock
            // if (fileData._id === "5a7ad74e51dfba0015068f45") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -17;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1.15;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //MPX-SD Supp
            // if (fileData._id === "58aeac1b86f77457c419f475") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -28;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.25;
            //     fileData._props.HeatFactor = 1.14;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PB 9x18 supp
            // if (fileData._id === "56e05b06d2720bb2668b4586") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -14;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1.25;
            //     fileData._props.HeatFactor = 1.13;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Vityaz Supp
            // if (fileData._id === "59bfc5c886f7743bf6794e62") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -14;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.24;
            //     fileData._props.HeatFactor = 1.18;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Kedr-B supp
            // if (fileData._id === "57f3c8cc2459773ec4480328") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -13;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = -30;
            //     fileData._props.DurabilityBurnModificator = 1.3;
            //     fileData._props.HeatFactor = 1.23;
            //     fileData._props.CoolFactor = 1;
            // }
            // //FN Attenuator 5.7 Supp
            // if (fileData._id === "5cebec00d7f00c065c53522a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -18;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.13;
            //     fileData._props.HeatFactor = 1.13;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Gemtech 5.7mm Supp
            // if (fileData._id === "5d3ef698a4b9361182109872") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -16;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.11;
            //     fileData._props.HeatFactor = 1.18;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //MP9 9x19 Supp
            // if (fileData._id === "5de8f2d5b74cd90030650c72") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -17;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.17;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PL-15 9x19 Supp
            // if (fileData._id === "602a97060ddce744014caf6f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -16;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.14;
            //     fileData._props.HeatFactor = 1.16;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Omega .45k .45 Supp
            // if (fileData._id === "5fc4b9b17283c4046c5814d7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -25;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.09;
            //     fileData._props.HeatFactor = 1.12;
            //     fileData._props.CoolFactor = 1.01;
            // }
            // //9x39 VSS supp
            // if (fileData._id === "57838c962459774a1651ec63") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.13;
            //     fileData._props.CoolFactor = 1;
            // }
            // //9x39 VAL supp
            // if (fileData._id === "57c44dd02459772d2e0ae249") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -15;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.13;
            //     fileData._props.CoolFactor = 1;
            // }
            // //G28 Supp
            // if (fileData._id === "6171367e1cb55961fa0fdb36") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.2;
            //     fileData._props.HeatFactor = 1.21;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //Saker ASR
            // if (fileData._id === "60926df0132d4d12c81fd9df") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -8;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.11;
            //     fileData._props.HeatFactor = 1.20;
            //     fileData._props.CoolFactor = 1.06;
            // }
            // //Gemtech ONE
            // if (fileData._id === "5c7955c22e221644f31bfd5e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -13;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1.17;
            //     fileData._props.HeatFactor = 1.22;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //SV-98 Supp
            // if (fileData._id === "5c4eecc32e221602b412b440") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.21;
            //     fileData._props.HeatFactor = 1.25;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Surefire MONSTER
            // if (fileData._id === "55d614004bdc2d86028b4568") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -12;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.15;
            //     fileData._props.HeatFactor = 1.22;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //Surefire MINI MONSTER
            // if (fileData._id === "55d6190f4bdc2d87028b4567") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -8;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1.11;
            //     fileData._props.HeatFactor = 1.18;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //Surefire SOCOM RC2
            // if (fileData._id === "5ea17bbc09aa976f2e7a51cd") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -11;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.17;
            //     fileData._props.HeatFactor = 1.20;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //PBS-4
            // if (fileData._id === "57ffb0e42459777d047111c5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1.21;
            //     fileData._props.HeatFactor = 1.26;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PBS-1
            // if (fileData._id === "5a0d63621526d8dba31fe3bf") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -7;
            //     fileData._props.Velocity = -10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy + -25;
            //     fileData._props.DurabilityBurnModificator = 1.27;
            //     fileData._props.HeatFactor = 1.28;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TGP-A
            // if (fileData._id === "564caa3d4bdc2d17108b458e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -7;
            //     fileData._props.Recoil += -9;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1.19;
            //     fileData._props.HeatFactor = 1.27;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Hexagon Wafflemaker
            // if (fileData._id === "615d8f8567085e45ef1409ca") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -10;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.17;
            //     fileData._props.HeatFactor = 1.25;
            //     fileData._props.CoolFactor = 1.13;
            // }
            // //Hexagon DTKP
            // if (fileData._id === "5e208b9842457a4a7a33d074") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.15;
            //     fileData._props.HeatFactor = 1.20;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //Hexagon 5.45
            // if (fileData._id === "593d493f86f7745e6b2ceb22") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -8;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.2;
            //     fileData._props.HeatFactor = 1.23;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Hexagon 7.62x39
            // if (fileData._id === "593d489686f7745c6255d58a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -8;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.2;
            //     fileData._props.HeatFactor = 1.24;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Zenit DTK-4M
            // if (fileData._id === "59fb257e86f7742981561852") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -7;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.14;
            //     fileData._props.HeatFactor = 1.19;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Hexagon SKS
            // if (fileData._id === "593d490386f7745ee97a1555") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -8;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.2;
            //     fileData._props.HeatFactor = 1.24;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Rotor 7.62x39
            // if (fileData._id === "5a9fbacda2750c00141e080f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.22;
            //     fileData._props.HeatFactor = 1.27;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Rotor .366
            // if (fileData._id === "5a9fbb74a2750c0032157181") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.24;
            //     fileData._props.HeatFactor = 1.28;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Rotor 7.62x54R
            // if (fileData._id === "5e01ea19e9dc277128008c0b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.27;
            //     fileData._props.HeatFactor = 1.29;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Rotor 5.56
            // if (fileData._id === "5a9fbb84a2750c00137fa685") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.23;
            //     fileData._props.HeatFactor = 1.25;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Rotor VEPR Supp
            // if (fileData._id === "5f63407e1b231926f2329f15") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = -22;
            //     fileData._props.DurabilityBurnModificator = 1.27;
            //     fileData._props.HeatFactor = 1.29;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AAC 762 SDN
            // if (fileData._id === "5a34fe59c4a282000b1521a2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -7;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.19;
            //     fileData._props.HeatFactor = 1.22;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //SilencerCo Hybrid 46
            // if (fileData._id === "59bffbb386f77435b379b9c2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -9;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1.15;
            //     fileData._props.HeatFactor = 1.23;
            //     fileData._props.CoolFactor = 1.03;
            // }
            // //KAC QDSS Black
            // if (fileData._id === "57da93632459771cb65bf83f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -9;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.18;
            //     fileData._props.HeatFactor = 1.25;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //KAC QDSS Tan
            // if (fileData._id === "57dbb57e2459774673234890") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -9;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.18;
            //     fileData._props.HeatFactor = 1.25;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //Daniel Defense WAVE
            // if (fileData._id === "5cff9e84d7ad1a049e54ed55") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -11;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.16;
            //     fileData._props.HeatFactor = 1.2;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //Thunder Beast Arms Ultra 5
            // if (fileData._id === "5d44064fa4b9361e4f6eb8b5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -7;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.22;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //KAC PRS/QDC 7.62
            // if (fileData._id === "5dfa3d2b0dee1b22f862eade") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -8;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.18;
            //     fileData._props.HeatFactor = 1.25;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //Sig SRD762Ti
            // if (fileData._id === "5fbe7618d6fa9c00c571bb6c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -9;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1.17;
            //     fileData._props.HeatFactor = 1.2;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //Sig SRD762-QD
            // if (fileData._id === "5fbe760793164a5b6278efc8") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -9;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.18;
            //     fileData._props.HeatFactor = 1.22;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //Bramit
            // if (fileData._id === "5b86a0e586f7745b600ccb23") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1.15;
            //     fileData._props.HeatFactor = 1.28;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SilencerCo Salvo 12
            // if (fileData._id === "5b363dd25acfc4001a598fd2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -16;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.15;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Hexagon 12K
            // if (fileData._id === "59c0ec5b86f77435b128bfca") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -12;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.1;
            //     fileData._props.HeatFactor = 1.19;
            //     fileData._props.CoolFactor = 1;
            // }
            // //ASH-12 Supp
            // if (fileData._id === "5caf187cae92157c28402e43") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Loudness = -6;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1.3;
            //     fileData._props.HeatFactor = 1.3;
            //     fileData._props.CoolFactor = 1;
            // }
            // ///Muzzle Adapters + Protectors///
            // //Remington Choke 
            // if (fileData._id === "560838c94bdc2d77798b4569") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 22;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MTS-255 choke
            // if (fileData._id === "619d36da53b4d42ee724fae4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 25;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //ME Cylinder Muzzle Adapter
            // if (fileData._id === "5c0111ab0db834001966914d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 20;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SilencerCo Salvo 12 Thread adapter
            // if (fileData._id === "5b363e1b5acfc4771e1c5e80") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SilencerCo Salvo 12 Choke adapter
            // if (fileData._id === "5b363dea5acfc4771e1c5e7e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 20;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AWC PSR muzzle brake protector
            // if (fileData._id === "612e0e04568c120fdd294258") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.96;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //HK USP thread protector
            // if (fileData._id === "6194f1f918a3974e5e7421e4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //P226 thread protector
            // if (fileData._id === "587de5ba2459771c0f1e8a58") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SOK-12 thread protector
            // if (fileData._id === "576167ab2459773cad038c43") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.97;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock Alpha Wolf thread protector
            // if (fileData._id === "5a6b585a8dc32e5a9c28b4f1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock Double Diamond thread protector
            // if (fileData._id === "5a6b592c8dc32e00094b97bf") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock SAI thread protector
            // if (fileData._id === "5a6b59a08dc32e000b452fb7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MPA3 thread protector
            // if (fileData._id === "5cadc390ae921500126a77f1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.96;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 thread protector
            // if (fileData._id === "5d270b3c8abbc3105335cfb8") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.96;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 thread protector
            // if (fileData._id === "5d270ca28abbc31ee25ee821") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VPO-215 thread protector
            // if (fileData._id === "5de6556a205ddc616a6bc4f7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.97;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RFB thread protector
            // if (fileData._id === "5f2aa4464b50c14bcf07acdb") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.97;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Kriss 9x19 thread protector
            // if (fileData._id === "5fbbc34106bde7524f03cbe9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.96;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Kriss .45 thread protector
            // if (fileData._id === "5fb6548dd1409e5ca04b54f9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.96;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VPO-209 Thread Protector
            // if (fileData._id === "59e8a00d86f7742ad93b569c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 1;
            //     fileData._props.DurabilityBurnModificator = 0.97;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP5 3-lug protector
            // if (fileData._id === "5926e16e86f7742f5a0f7ecb") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 2;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Kiba AKM .308 thread adapter
            // if (fileData._id === "615d8e9867085e45ef1409c6") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Taktika Tula muzzle adapter
            // if (fileData._id === "5a0abb6e1526d8000a025282") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Gemtech ONE direct thread
            // if (fileData._id === "5c7954d52e221600106f4cc7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP5 3-lug threaded muzzle protector
            // if (fileData._id === "5c0000c00db834001a6697fc") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Silencro Hybrid 46 direct thread mount
            // if (fileData._id === "59bffc1f86f77435b128b872") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PP-19 KEDR B muzzle thread piece
            // if (fileData._id === "57f3c7e024597738ea4ba286") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1A Smith Enterprise SOCOM threaded
            // if (fileData._id === "5ab3afb2d8ce87001660304d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Weapon Tuning Thread Adapter
            // if (fileData._id === "5cf67a1bd7f00c06585fb6f3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SKS weapon tuning thread adapter
            // if (fileData._id === "5cf67cadd7f00c065a5abab7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin custom thread adapter
            // if (fileData._id === "5cf79389d7f00c10941a0c4d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin tiger rock thread adapter
            // if (fileData._id === "5cf79599d7f00c10875d9212") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SVDS Rotor thread adapter
            // if (fileData._id === "5e01e9e273d8eb11426f5bc3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Lantac BMD Blast mitigation adapter
            // if (fileData._id === "5cf78496d7f00c065703d6ca") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP9 suppresor adapter
            // if (fileData._id === "5de8f237bbaf010b10528a70") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK CNC Warrior
            // if (fileData._id === "5e21ca18e4d47f0da15e77dd") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RFB thread spacer
            // if (fileData._id === "5f2aa43ba9b91d26f20ae6d2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Sig Sauer Taper-LOK
            // if (fileData._id === "5fbc22ccf24b94483f726483") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Omega 45k thread mount
            // if (fileData._id === "5fc4b992187fea44d52edaa9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //45k piston mount adapter
            // if (fileData._id === "5fc4b97bab884124df0cd5e3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //DVL-10 end cap
            // if (fileData._id === "58889c7324597754281f9439") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // ///Muzzle Devices///
            // //TAA ZK-38 7.62
            // if (fileData._id === "612e0e3c290d254f5e6b291d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TAA ZK-23 5.56
            // if (fileData._id === "612e0e55a112697a4b3a66e7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //KAC QDC 7.62 MB
            // if (fileData._id === "6130c43c67085e45ef1405a1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 12;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP5 B&T Muzzle Brake
            // if (fileData._id === "615d8df08004cc50514c3236") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -16;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PSR 7.62
            // if (fileData._id === "612e0d3767085e45ef14057f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Loudness = 18;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PSR 5.56
            // if (fileData._id === "612e0cfc8004cc50514c2d9e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Loudness = 18;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PSR .338
            // if (fileData._id === "612e0d81290d254f5e6b291a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Loudness = 18;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Hexagon Reactor
            // if (fileData._id === "615d8f5dd92c473c770212ef") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -23;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -7;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Surefire ProComp 7.62
            // if (fileData._id === "607ffb988900dc2d9a55b6e4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -28;
            //     fileData._props.Loudness = 25;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //CMMG SV 7.62 MB
            // if (fileData._id === "6065c6e7132d4d12c81fd8e1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AKM MB
            // if (fileData._id === "59d64fc686f774171b243fe2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VPO-136 MB
            // if (fileData._id === "59e61eb386f77440d64f5daf") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock CARVER 4 Port
            // if (fileData._id === "5a7ad0c451dfba0013379712") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Loudness = 22;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Odin Works ATLAS MB
            // if (fileData._id === "5bbdb8bdd4351e4502011460") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Tacfire Tanker MB
            // if (fileData._id === "5bbdb83fd4351e44f824c44b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Loudness = 23;
            //     fileData._props.Accuracy = -17;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Witt Machine MB
            // if (fileData._id === "5bc5a35cd4351e450201232f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PWS CQB 5.56 MB
            // if (fileData._id === "5943ee5a86f77413872d25ec") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Accuracy = -14;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PWS CQB 5.45 MB
            // if (fileData._id === "5943eeeb86f77412d6384f6b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Accuracy = -14;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Vendetta 5.56 MB
            // if (fileData._id === "5a7c147ce899ef00150bd8b8") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -23;
            //     fileData._props.Loudness = 18;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //DVL-10 M2 MB
            // if (fileData._id === "5888996c24597754281f9419") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Loudness = 22;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Tromix Monster Claw MB
            // if (fileData._id === "59fb137a86f7740adb646af1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //GK-02 MB
            // if (fileData._id === "58272d7f2459774f6311ddfd") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Loudness = 22;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK-101 MB
            // if (fileData._id === "5ac72e615acfc43f67248aa0") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 8;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Ak-74 MB
            // if (fileData._id === "5649aa744bdc2ded0b8b457e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 8;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK-74M MB
            // if (fileData._id === "5ac7655e5acfc40016339a19") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 8;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK-103 MB
            // if (fileData._id === "5ac72e7d5acfc40016339a02") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 8;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK-105 MB
            // if (fileData._id === "5ac72e945acfc43f3b691116") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 7;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AK-104 MB
            // if (fileData._id === "5ac72e895acfc43b321d4bd5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 7;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AKS-74U MB
            // if (fileData._id === "57dc324a24597759501edc20") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 7;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1A Socom MB
            // if (fileData._id === "5aafa1c2e5b5b00015042a56") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 17;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Spikes Tactical Dynacomp MB
            // if (fileData._id === "5a9ea27ca2750c00137fa672") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 18;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Fortis RED 7.62 MB
            // if (fileData._id === "5d026791d7ad1a04a067ea63") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Loudness = 22;
            //     fileData._props.Accuracy = -7;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //ASH-12 MB
            // if (fileData._id === "5caf17c9ae92150b30006be1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Loudness = 25;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SV98 SRVV MB-Comp
            // if (fileData._id === "") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Loudness = 17;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SRVV 5.45 MB
            // if (fileData._id === "5cc9a96cd7f00c011c04e04a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Loudness = 17;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SRVV 7.62x39 MB
            // if (fileData._id === "5cc9ad73d7f00c000e2579d4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Loudness = 17;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Keeno Arms MB
            // if (fileData._id === "5cdd7685d7f00c000f260ed2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 13;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Precision Armanent M11 7.62 MB
            // if (fileData._id === "5cdd7693d7f00c0010373aa5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TACCOM MB
            // if (fileData._id === "5cf6935bd7f00c06585fb791") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 16;
            //     fileData._props.Accuracy = -6;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Bulletec ST MB
            // if (fileData._id === "5cf6937cd7f00c056c53fb39") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -9;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Daniel Defense Wave 5.56 MB
            // if (fileData._id === "5cff9e5ed7ad1a09407397d4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 13;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Daniel Defense Wave 7.62 MB
            // if (fileData._id === "5d1f819086f7744b355c219b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 13;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Thunder Beast 5.56 MB
            // if (fileData._id === "5d440625a4b9361eec4ae6c5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -6;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Thunder Beast 7.62 MB
            // if (fileData._id === "5d443f8fa4b93678dd4a01aa") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -6;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //ORSIS MB
            // if (fileData._id === "5df35e7f2a78646d96665dd4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -23;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //1911 Anarchy MB
            // if (fileData._id === "5ef61964ec7f42238c31e0c1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -11;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Ferfrans CQB MB
            // if (fileData._id === "5f6372e2865db925d54f3869") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //JMAC 7.62x39 MB
            // if (fileData._id === "5f633f68f5750b524b45f112") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -27;
            //     fileData._props.Loudness = 25;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //JMAC 5.45 MB
            // if (fileData._id === "5f633f791b231926f2329f13") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -27;
            //     fileData._props.Loudness = 25;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //ASR .338 MB
            // if (fileData._id === "5fc23636016cce60e8341b05") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Loudness = 18;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Sig Micro Brake
            // if (fileData._id === "5fbcbd02900b1d5091531dd3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 12;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Sig two port Brake
            // if (fileData._id === "5fbcbd10ab884124df0cd563") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Loudness = 16;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //STM-9 MB
            // if (fileData._id === "60337f5dce399e10262255d1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -28;
            //     fileData._props.Loudness = 27;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Lantac Dragon MB-Comp 7.62x39
            // if (fileData._id === "5c878ebb2e2216001219d48a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Lantac Dragon MB-Comp 7.62x51
            // if (fileData._id === "5c878e9d2e2216000f201903") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SVDS MB-Comp
            // if (fileData._id === "5c471bfc2e221602b21d4e17") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -16;
            //     fileData._props.Loudness = 14;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Antidote MB-Comp
            // if (fileData._id === "5c7951452e221644f31bfd5c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Noveske MP5 MB-Comp
            // if (fileData._id === "56ea6fafd2720b844b8b4593") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TT PM Laser DTK MB-Comp
            // if (fileData._id === "5bffd7ed0db834001d23ebf9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -13;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RPK-16 MB-Comp
            // if (fileData._id === "5beec3420db834001b095429") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -16;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -7;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M14 Yankee Hill Phantom MB-Comp
            // if (fileData._id === "5addbbb25acfc40015621bd9") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Loudness = 16;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M14 Smith Enterpise MB-Comp
            // if (fileData._id === "5addbba15acfc400185c2854") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -6;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1A National Match MB-Comp
            // if (fileData._id === "5addbb6e5acfc408fb1393fd") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -16;
            //     fileData._props.Loudness = 12;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M14 JP Enterprise MB-Comp
            // if (fileData._id === "5addbb825acfc408fb139400") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -9;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M14 Good Iron MB-Comp
            // if (fileData._id === "5addbb945acfc4001a5fc44e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 17;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Zenit DTK-1 MB-Comp
            // if (fileData._id === "5649ab884bdc2ded0b8b457f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 16;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //PP-19 MB-Comp
            // if (fileData._id === "5998597786f77414ea6da093") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock CARVER Decelerator 3 Port
            // if (fileData._id === "5a7037338dc32e000d46d257") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Loudness = 18;
            //     fileData._props.Accuracy = -11;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock Double Diamond
            // if (fileData._id === "5a70366c8dc32e001207fb06") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 16;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock Alpha Wolf Bullnose comp
            // if (fileData._id === "5a705e128dc32e000d46d258") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -23;
            //     fileData._props.Loudness = 20;
            //     fileData._props.Accuracy = -7;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock Lone Wolf LWD-COMP9
            // if (fileData._id === "5a7ad1fb51dfba0013379715") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Loudness = 22;
            //     fileData._props.Accuracy = -12;
            //     fileData._props.DurabilityBurnModificator = 1.04;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock Strike Industries G4
            // if (fileData._id === "5a7b32a2e899ef00135e345a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SAI JailBrake
            // if (fileData._id === "5c78f2882e22165df16b832e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //P226 Compensator
            // if (fileData._id === "5c6beec32e221601da3578f2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 15;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //2A Armament 7.62 Compensator
            // if (fileData._id === "5b7d693d5acfc43bca706a3d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //HK Prolonged FH
            // if (fileData._id === "61713308d92c473c770214a0") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SCAR-L FH
            // if (fileData._id === "618407a850224f204c1da549") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SCAR-H FH
            // if (fileData._id === "618178aa1cb55961fa0fdc80") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Blitz FH
            // if (fileData._id === "615d8e2f1cb55961fa0fd9a4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //ASR FH
            // if (fileData._id === "609269c3b0e443224b421cc1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //AKML FH
            // if (fileData._id === "5a0d716f1526d8000d26b1e2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Blackout 51T FH 7.62
            // if (fileData._id === "5a34fd2bc4a282329a73b4c5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Blackout 51T FH 5.56
            // if (fileData._id === "5c7e5f112e221600106f4ede") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Surefire WarComp FH
            // if (fileData._id === "5c6d710d2e22165df16b81e7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Surefire SF3P
            // if (fileData._id === "5c7fb51d2e2216001219ce11") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -6;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Surefire FH556RC
            // if (fileData._id === "5ea172e498dacb342978818e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -6;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Desert Tech 5.56
            // if (fileData._id === "5c48a2a42e221602b66d1e07") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Desert Tech 7.62
            // if (fileData._id === "5dcbe965e4ed22586443a79d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //ADAR FH
            // if (fileData._id === "5c0fafb6d174af02a96260ba") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MP7 FH
            // if (fileData._id === "5ba26acdd4351e003562908e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //FAL Austrian FH
            // if (fileData._id === "5b7d68af5acfc400170e30c3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Yankee Hill FH
            // if (fileData._id === "5b3a16655acfc40016387a2a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Loudness = 10;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SA-58 FH
            // if (fileData._id === "5b099b7d5acfc400186331e4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 7;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M4 Colt FH
            // if (fileData._id === "544a38634bdc2d58388b4568") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MPX FH
            // if (fileData._id === "58949dea86f77409483e16a8") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //P90 FH
            // if (fileData._id === "5cc82796e24e8d000f5859a8") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //KAC QDC FH 7.62
            // if (fileData._id === "5dfa3cd1b33c0951220c079b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //KAC QDC FH 5.56
            // if (fileData._id === "56ea8180d2720bf2698b456a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //RFB FH
            // if (fileData._id === "5f2aa4559b44de6b1b4e68d1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Sig Sauer 7.62 FH
            // if (fileData._id === "5fbcbcf593164a5b6278efb2") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Vector 9x19 FH
            // if (fileData._id === "5fbbc3324e8a554c40648348") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -7;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Vector .45 FH
            // if (fileData._id === "5fb65424956329274326f316") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = -7;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Surefire Warden Blast Mitigation
            // if (fileData._id === "615d8eb350224f204c1da1cf") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Loudness = -8;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1.08;
            //     fileData._props.HeatFactor = 1.05;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Noveske KX3
            // if (fileData._id === "56ea6fafd2720b844b8b4593") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Troy Claymore
            // if (fileData._id === "5cc9b815d7f00c000e2579d6") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Accuracy = -17;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1.03;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Lantac BMD
            // if (fileData._id === "5cf78720d7f00c06595bc93e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Ferfrans CRD
            // if (fileData._id === "5f6339d53ada5942720e2dc3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Loudness = -5;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SV98 Muzzle Device
            // if (fileData._id === "560e620e4bdc2d724b8b456b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 5;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.01;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //HK USP .45 ACP Elite compensator
            // if (fileData._id === "619621a4de3cdf1d2614a7a7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -11;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //HK USP .45 ACP Match compensator
            // if (fileData._id === "619624b26db0f2477964e6b0") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Loudness = 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // ///Full Stocks///
            // //PPSh-41 stock
            // if (fileData._id === "5ea03e9400685063ec28bfa4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VPO-101 Vepr Hunter Stock
            // if (fileData._id === "5c503af12e221602b177ca02") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VPO-101 Vepr Hunter SVD style stock
            // if (fileData._id === "5f63405df5750b524b45f114") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += 10;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 Hogue Overmolded
            // if (fileData._id === "5bfeb32b0db834001a6694d9") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += -50;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle Standard Stock
            // if (fileData._id === "5ae096d95acfc400185c2c81") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -25;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle infantry stock
            // if (fileData._id === "5bfd35380db83400232fe5cc") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -20;
            //     fileData._props.HeatFactor = 25;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle Carbine Stock
            // if (fileData._id === "5bfd384c0db834001a6691d3") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -20;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle Sniper Carbine
            // if (fileData._id === "5bfd37c80db834001d23e842") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -20;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle ATI Monte Carlo
            // if (fileData._id === "5bbdb870d4351e00367fb67d") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -15;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle Archangel
            // if (fileData._id === "5bae13bad4351e00320204af") {
            //     fileData._props.Ergonomics += 25;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle sawn-off stock
            // if (fileData._id === "5bfd36ad0db834001c38ef66") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Mosin Rifle sawn-off sniper stock
            // if (fileData._id === "5bfd36290db834001966869a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //MTs 20-01 TOZ Stock
            // if (fileData._id === "5adf23995acfc400185c2aeb") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TOZ-106 custom cut Mosin stock
            // if (fileData._id === "5c99f3592e221644fc633070") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -5;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //TOZ-106 Stock
            // if (fileData._id === "5a38ef1fc4a282000b1521f6") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy += -10;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1A Promag Archangel
            // if (fileData._id === "5addbf175acfc408fb13965b") {
            //     fileData._props.Ergonomics += 25;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -20;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1A SOCOM 16 stock
            // if (fileData._id === "5aaf8e43e5b5b00015693246") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -50;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //OP-SKS stock
            // if (fileData._id === "587e0531245977466077a0f7") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Accuracy += -20;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SKS wooden stock
            // if (fileData._id === "574dad8024597745964bf05c") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -25;
            //     fileData._props.Accuracy += -20;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SKS TAPCO Intrafuse
            // if (fileData._id === "5afd7ded5acfc40017541f5e") {
            //     fileData._props.Ergonomics += 25;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += -10;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //SKS FAB Defense UAS
            // if (fileData._id === "5d0236dad7ad1a0940739d29") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -30;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //FN P90 stock
            // if (fileData._id === "5cc700b9e4a949000f0f0f25") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //FN PS90 stock
            // if (fileData._id === "5cebec10d7f00c065703d185") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //VPO-215 stock
            // if (fileData._id === "5de655be4a9f347bc92edb88") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy += 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // ///Rear Stocks///
            // //HK417 stock
            // if (fileData._id === "617154aa1cb55961fa0fdb3b") {
            //     fileData._props.Ergonomics += 18;
            //     fileData._props.Recoil += -23;
            //     fileData._props.Accuracy += 2.5;
            // }
            // //HK adjustable stock
            // if (fileData._id === "617155ee50224f204c1da3cd") {
            //     fileData._props.Ergonomics += 23;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 1.5;
            // }
            // //HK E1 stock
            // if (fileData._id === "5c87a07c2e2216001219d4a2") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -24;
            //     fileData._props.Accuracy += 2;
            // }
            // //HK Slim line
            // if (fileData._id === "5bb20e70d4351e0035629f8f") {
            //     fileData._props.Ergonomics += 25;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += 1.5;
            // }
            // //CMMG RipStock
            // if (fileData._id === "606587d11246154cad35d635") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy += 1;
            // }
            // //Strike Industries Viper Mod 1
            // if (fileData._id === "5c793fde2e221601da358614") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += 1;
            // }
            // //FAB Defense GLR
            // if (fileData._id === "5bfe86df0db834001b734685") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 1;
            // }
            // //FAB Defense GL-Shock
            // if (fileData._id === "5a9eb32da2750c00171b3f9c") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 1.5;
            // }
            // //FAB Defense GL-Core
            // if (fileData._id === "602e620f9b513876d4338d9a") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Accuracy += 1;
            // }
            // //AK-12 Stock
            // if (fileData._id === "5beec8c20db834001d2c465c") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 1;
            // }
            // //Vltor EMOD
            // if (fileData._id === "5b39f8db5acfc40016387a1b") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Accuracy += 2;
            // }
            // //LMT SOPMOD
            // if (fileData._id === "5ae30c9a5acfc408fb139a03") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Accuracy += 2;
            // }
            // //Magpul MOE Carbine Black
            // if (fileData._id === "56eabf3bd2720b75698b4569") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy += 2;
            // }
            // //Magpul MOE Carbine Tan
            // if (fileData._id === "58d2946386f774496974c37e") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy += 1;
            // }
            // //Magpul MOE Carbine Grey
            // if (fileData._id === "58d2947e86f77447aa070d53") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy += 1;
            // }
            // //Magpul MOE Carbine OD
            // if (fileData._id === "58d2947686f774485c6a1ee5") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy += 1;
            // }
            // //Magpul MOE Carbine FG
            // if (fileData._id === "58d2946c86f7744e271174b5") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy += 1;
            // }
            // //Magpul CTR Carbine black
            // if (fileData._id === "5d135e83d7ad1a21b83f42d8") {
            //     fileData._props.Ergonomics += 22;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 2;
            // }
            // //Magpul CTR Carbine black
            // if (fileData._id === "5d135ecbd7ad1a21c176542e") {
            //     fileData._props.Ergonomics += 22;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Accuracy += 2;
            // }
            // //High Standard M4SS
            // if (fileData._id === "55d4ae6c4bdc2d8b2f8b456e") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 1;
            // }
            // //MFT BUS Stock
            // if (fileData._id === "5947c73886f7747701588af5") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -21;
            //     fileData._props.Accuracy += 1.5;
            // }
            // //Kriss Defiance DS150 black
            // if (fileData._id === "5fbbaa86f9986c4cff3fe5f6") {
            //     fileData._props.Ergonomics += 22;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy += 1.5;
            // }
            // //Kriss Defiance DS150 tan
            // if (fileData._id === "5fce16961f152d4312622bc9") {
            //     fileData._props.Ergonomics += 22;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy += 1.5;
            // }
            // //B5 Systems Precision stock
            // if (fileData._id === "5fc2369685fd526b824a5713") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 7;
            // }
            // //Magpul PRS GEN3 Black
            // if (fileData._id === "5d44069ca4b9361ebd26fc37") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 7;
            // }
            // //Magpul PRS GEN3 Grey
            // if (fileData._id === "5d4406a8a4b9361e4f6eb8b7") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 7;
            // }
            // //Magpul PRS GEN2 FDE
            // if (fileData._id === "5a33cae9c4a28232980eb086") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 7;
            // }
            // //Troy M7A1 PDW Tan
            // if (fileData._id === "591af10186f774139d495f0e") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -11;
            //     fileData._props.Accuracy += 0;
            // }
            // //Troy M7A1 PDW Black
            // if (fileData._id === "591aef7986f774139d495f03") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -11;
            //     fileData._props.Accuracy += 0;
            // }
            // //Magpul UBR Black
            // if (fileData._id === "5947e98b86f774778f1448bc") {
            //     fileData._props.Ergonomics += 18;
            //     fileData._props.Recoil += -23;
            //     fileData._props.Accuracy += 1;
            // }
            // //Magpul UBR Tan
            // if (fileData._id === "5947eab886f77475961d96c5") {
            //     fileData._props.Ergonomics += 18;
            //     fileData._props.Recoil += -23;
            //     fileData._props.Accuracy += 1;
            // }
            // //ERGO F93 PRO
            // if (fileData._id === "5b0800175acfc400153aebd4") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 1;
            // }
            // //AR-15 DoubleStar ACE SOCOM Gen.4 stock
            // if (fileData._id === "5d120a10d7ad1a4e1026ba85") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -1.5;
            // }
            // //Hera Arms CQR M4
            // if (fileData._id === "5a33e75ac4a2826c6e06d759") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += -0.5;
            // }
            // //ADAR Stock
            // if (fileData._id === "5c0e2ff6d174af02a1659d4a") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += -1;
            // }
            // //Zhukov stock
            // if (fileData._id === "5b0e794b5acfc47a877359b2") {
            //     fileData._props.Ergonomics += 22;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy += 1;
            // }
            // //AK Zenit PT-3 "Klassika" stock
            // if (fileData._id === "59ecc3dd86f7746dc827481c") {
            //     fileData._props.Ergonomics += 22;
            //     fileData._props.Recoil += -17;
            //     fileData._props.Accuracy += 1.5;
            // }
            // //AK Zenit PT-1 "Klassika" stock
            // if (fileData._id === "5b222d405acfc400153af4fe") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Accuracy += 2.5;
            // }
            // //SOK-12 AK-style stock
            // if (fileData._id === "57616ca52459773c69055192") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -7;
            //     fileData._props.Accuracy += 0;
            // }
            // //AK-74 polymer stock (6P20 Sb.7)
            // if (fileData._id === "5649b0fc4bdc2d17108b4588") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -7;
            //     fileData._props.Accuracy += 0;
            // }
            // //AK-74M 6P4 Sb. 1-19
            // if (fileData._id === "5ac50c185acfc400163398d4") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -7;
            //     fileData._props.Accuracy += 0;
            // }
            // //AKM wooden stock (6P1 Sb.5)
            // if (fileData._id === "59d6514b86f774171a068a08") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -6;
            //     fileData._props.Accuracy += 0;
            // }
            // //VPO-136 "Vepr-KM" wooden stock
            // if (fileData._id === "59e6227d86f77440d64f5dc2") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -6;
            //     fileData._props.Accuracy += 0;
            // }
            // //	VPO-209 wooden stock
            // if (fileData._id === "59e89d0986f77427600d226e") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -6;
            //     fileData._props.Accuracy += 0;
            // }
            // //	AK-74 wooden stock (6P20 Sb.5)
            // if (fileData._id === "5649b1c04bdc2d16268b457c") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -6;
            //     fileData._props.Accuracy += 0;
            // }
            // // PP-19-01 "Vityaz" metal skeleton stock
            // if (fileData._id === "599851db86f77467372f0a18") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -7;
            //     fileData._props.Accuracy += -1;
            // }
            // //AKS-74 metal skeletonized stock (6P21 Sb.5)
            // if (fileData._id === "5ab626e4d8ce87272e4c6e43") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -7;
            //     fileData._props.Accuracy += -1;
            // }
            // //	AKS-74U metal skeleton stock (6P26 Sb.5)
            // if (fileData._id === "57dc347d245977596754e7a1") {
            //     fileData._props.Ergonomics += 9;
            //     fileData._props.Recoil += -7;
            //     fileData._props.Accuracy += -1;
            // }
            // //AKMSN shoulder piece (6P4 Sb.1-19)
            // if (fileData._id === "5abcd472d8ce8700166032ae") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy += -2;
            // }
            // //AKMS shoulder piece (6P4 Sb.1-19)
            // if (fileData._id === "59ff3b6a86f77477562ff5ed") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy += -2;
            // }
            // //Armacon Baskak stock
            // if (fileData._id === "57ade1442459771557167e15") {
            //     fileData._props.Ergonomics += 7;
            //     fileData._props.Recoil += -3;
            //     fileData._props.Accuracy += -2;
            // }
            // //AKM/AK-74 Hexagon "Kocherga" stock (Anodized Red)
            // if (fileData._id === "5e217ba4c1434648c13568cd") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += -1;
            // }
            // //Hera Arms AKM stock
            // if (fileData._id === "619b69037b9de8162902673e") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += -0.5;
            // }
            // //AKM ProMag Archangler OPFOR
            // if (fileData._id === "6087e2a5232e5a31c233d552") {
            //     fileData._props.Ergonomics += 19;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Accuracy += 3;
            // }
            // //SVDS Stock
            // if (fileData._id === "5c471b5d2e221602b21d4e14") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -9;
            //     fileData._props.Accuracy += 0;
            // }
            // //VAL Stock
            // if (fileData._id === "57c450252459772d28133253") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += -1;
            // }
            // //VSS Stock
            // if (fileData._id === "578395e82459774a0e553c7b") {
            //     fileData._props.Ergonomics += 11;
            //     fileData._props.Recoil += -7;
            //     fileData._props.Accuracy += 0;
            // }
            // //SA-58 humpback polymer stock
            // if (fileData._id === "5b7d645e5acfc400170e2f90") {
            //     fileData._props.Ergonomics += 18;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 0;
            // }
            // //SA-58 folding stock
            // if (fileData._id === "5b7d63cf5acfc4001876c8df") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += -1.5;
            // }
            // //SA-58 SPR stock
            // if (fileData._id === "5b7d63de5acfc400170e2f8d") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Accuracy += 2;
            // }
            // //SA-58 BRS stock
            // if (fileData._id === "5b7d64555acfc4001876c8e2") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Accuracy += 5;
            // }
            // //SA-58/FAL Magpul PRS 2 polymer stock
            // if (fileData._id === "5b7d63b75acfc400170e2f8a") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Accuracy += 7;
            // }
            // //MPX/MCX PMM ULSS foldable stock
            // if (fileData._id === "5c5db6f82e2216003a0fe914") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 0;
            // }
            // //MPX/MCX Maxim Defense CQB telescoping stock
            // if (fileData._id === "5c5db6ee2e221600113fba54") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += 0;
            // }
            // //MPX/MCX collapsing/telescoping stock
            // if (fileData._id === "5894a13e86f7742405482982") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -9;
            //     fileData._props.Accuracy += -1;
            // }
            // //MCX/MPX telescoping stock
            // if (fileData._id === "5fbcc429900b1d5091531dd7") {
            //     fileData._props.Ergonomics += 22;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Accuracy += 1;
            // }
            // // MPX/MCX lightweight stock
            // if (fileData._id === "5fbcc437d724d907e2077d5c") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 0;
            // }
            // //KRISS Vector Gen.2 folding stock
            // if (fileData._id === "5fb6558ad6f0b2136f2d7eb7") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -11;
            //     fileData._props.Accuracy += 0;
            // }
            // //HK UMP polymer stock
            // if (fileData._id === "5fc3e4ee7283c4046c5814af") {
            //     fileData._props.Ergonomics += 17;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 0;
            // }
            // //MP9 stock
            // if (fileData._id === "5de910da8b6c4240ba2651b5") {
            //     fileData._props.Ergonomics += 13;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += 0;
            // }
            // //APB detachable wire stock
            // if (fileData._id === "5a17fb9dfcdbcbcae6687291") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy == 0;
            // }
            // //Glock FAB Defense GLR-17 stock
            // if (fileData._id === "5d1c702ad7ad1a632267f429") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += 0;
            // }
            // //HK MP5 A3 old model stock
            // if (fileData._id === "5926d40686f7740f152b6b7e") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += -2;
            // }
            // //HK MP5 A2 stock
            // if (fileData._id === "5926d3c686f77410de68ebc8") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy += 0;
            // }
            // //HK MP7A2 stock
            // if (fileData._id === "5bd704e7209c4d00d7167c31") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += -2;
            // }
            // //HK MP7A1 stock
            // if (fileData._id === "5bcf0213d4351e0085327c17") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += -2;
            // }
            // //Remington M700 Magpul Pro 700 folding stock
            // if (fileData._id === "5cdeac42d7f00c000d36ba73") {
            //     fileData._props.Ergonomics += 18;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 8;
            // }
            // //ORSIS T-5000M stock
            // if (fileData._id === "5df35ddddfc58d14537c2036") {
            //     fileData._props.Ergonomics += 18;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 8;
            // }
            // //Lobaev Arms stock
            // if (fileData._id === "58889d0c2459775bc215d981") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -15;
            //     fileData._props.Accuracy += 6;
            // }
            // //M14 SAGE International M14ALCS (MOD-0) stock
            // if (fileData._id === "5addc7ac5acfc400194dbd90") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy += 0;
            // }
            // //MP-155 Ultima polymer stock
            // if (fileData._id === "606eef756d0bd7580617baf8") {
            //     fileData._props.Ergonomics += 16;
            //     fileData._props.Recoil += -18;
            //     fileData._props.Accuracy += 2;
            // }
            // //MP-155 walnut stock
            // if (fileData._id === "607d5a891246154cad35d6aa") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 0;
            // }
            // //MTs-255-12 wooden stock
            // if (fileData._id === "612781056f3d944a17348d60") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 0;
            // }
            // //KS-23M wire stock
            // if (fileData._id === "5e848dc4e4dbc5266a4ec63d") {
            //     fileData._props.Ergonomics += 8;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy += -2;
            // }
            // //KS-23 wooden stock
            // if (fileData._id === "5e848db4681bea2ada00daa9") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 0;
            // }
            // //Mossberg 590A1 Magpul SGA stock
            // if (fileData._id === "5eea217fc64c5d0dfc05712a") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Accuracy += 2;
            // }
            // //Mossberg 590A1 polymer stock
            // if (fileData._id === "5e87116b81c4ed43e83cefdd") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 0;
            // }
            // //M870 SPS polymer stock
            // if (fileData._id === "5a7880d0c5856700142fdd9d") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 0;
            // }
            // //M870 Magpul SGA polymer stock
            // if (fileData._id === "5a78813bc5856700186c4abe") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -22;
            //     fileData._props.Accuracy += 2;
            // }
            // //MP-133/153 plastic stock
            // if (fileData._id === "56083be64bdc2d20478b456f") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -14;
            //     fileData._props.Accuracy += 0;
            // }
            // //MP-133/153 wooden stock
            // if (fileData._id === "56083cba4bdc2de22e8b456f") {
            //     fileData._props.Ergonomics += 12;
            //     fileData._props.Recoil += -12;
            //     fileData._props.Accuracy += 0;
            // }
            // //Stock Parts
            // //FN SCAR Cheek Tan
            // if (fileData._id === "61825d24d3a39d50044c13af") {
            //     fileData._props.Ergonomics += 2;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 2;
            // }
            // //FN SCAR Cheek Black
            // if (fileData._id === "618167441cb55961fa0fdc71") {
            //     fileData._props.Ergonomics += 2;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 2;
            // }
            // //FN SCAR Folding stock Tan
            // if (fileData._id === "61825d06d92c473c770215de") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //FN SCAR Folding stock Black
            // if (fileData._id === "61816734d8e3106d9806c1f3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //FN SCAR retractable stock Black
            // if (fileData._id === "618167528004cc50514c34f9") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Accuracy += 0;
            // }
            // //FN SCAR retractable stock Tan
            // if (fileData._id === "618167528004cc50514c34f9") {
            //     fileData._props.Ergonomics += 14;
            //     fileData._props.Recoil += -19;
            //     fileData._props.Accuracy += 0;
            // }
            // //FN SCAR rubber buttpad
            // if (fileData._id === "618167616ef05c2ce828f1a8") {
            //     fileData._props.Ergonomics += 4;
            //     fileData._props.Recoil += 4;
            //     fileData._props.Accuracy = 0.5;
            // }
            // //Magpul MOE Carbine buttpad
            // if (fileData._id === "58d2912286f7744e27117493") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0.5;
            // }
            // //AR-15 DoubleStar ACE 0.5 inch recoil pad
            // if (fileData._id === "5d120a28d7ad1a1c8962e295") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 0.5;
            // }
            // //MP-43-1C buttpad
            // if (fileData._id === "611a31ce5b7ffe001b4649d1") {
            //     fileData._props.Ergonomics += 3;
            //     fileData._props.Recoil += 3;
            //     fileData._props.Accuracy = 0;
            // }
            // //MP-155 Ultima thin
            // if (fileData._id === "606ef0812535c57a13424d20") {
            //     fileData._props.Ergonomics += 4;
            //     fileData._props.Recoil += 2;
            //     fileData._props.Accuracy = 0;
            // }
            // //MP-155 Ultima medium
            // if (fileData._id === "606f262c6d0bd7580617bafa") {
            //     fileData._props.Ergonomics += 2;
            //     fileData._props.Recoil += 4;
            //     fileData._props.Accuracy = 0;
            // }
            // //MP-155 Ultima large
            // if (fileData._id === "606f263a8900dc2d9a55b68d") {
            //     fileData._props.Ergonomics += 1;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0.5;
            // }
            // //Mosin AIM Sports recoil pad
            // if (fileData._id === "5bbde409d4351e003562b036") {
            //     fileData._props.Ergonomics += 4;
            //     fileData._props.Recoil += 4;
            //     fileData._props.Accuracy = 0.5;
            // }
            // //GP-25 recoil pad
            // if (fileData._id === "5a0c59791526d8dba737bba7") {
            //     fileData._props.Ergonomics += -2;
            //     fileData._props.Recoil += 5.5;
            //     fileData._props.Accuracy = 0;
            // }
            // //FN P90 buttpad
            // if (fileData._id === "5cc700cae4a949035e43ba72") {
            //     fileData._props.Ergonomics += 5;
            //     fileData._props.Recoil += 2.5;
            //     fileData._props.Accuracy = 0;
            // }
            // //FN P90 damage industries buttpad
            // if (fileData._id === "5cc700d4e4a949000f0f0f28") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0.5;
            // }
            // //HK Adjustable buttstock cheek rest
            // if (fileData._id === "61715e7e67085e45ef140b33") {
            //     fileData._props.Ergonomics += 2;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 2;
            // }
            // //Zenit AKM PT lock
            // if (fileData._id === "5b222d335acfc4771e1be099") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //Zenit AK-100 PT lock
            // if (fileData._id === "5ac78eaf5acfc4001926317a") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //Zenit AKS-74U PT lock
            // if (fileData._id === "59ecc28286f7746d7a68aa8c") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //Vector Pistol Sling adapter
            // if (fileData._id === "5fb655a72b1b027b1f50bd06") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //HK MP5K end cap
            // if (fileData._id === "5d2f25bc48f03502573e5d85") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //HK MP5 end cap
            // if (fileData._id === "5c07c9660db834001a66b588") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //M870 Shockwave Raptor Grip
            // if (fileData._id === "5a788169c5856700142fdd9e") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //MP-133/153 plastic grip
            // if (fileData._id === "56083a334bdc2dc8488b4571") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // ///Stock tubes///
            // //HK G28 Buffer
            // if (fileData._id === "617153016c780c1e710c9a2f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //Advanced buffer black
            // if (fileData._id === "5c793fb92e221644f31bfb64") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy = 0;
            // }
            // //Advanced buffer red
            // if (fileData._id === "5c793fc42e221600114ca25d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -13;
            //     fileData._props.Accuracy = 0;
            // }
            // //CMMG buffer tube
            // if (fileData._id === "606587e18900dc2d9a55b65f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //HK Enhanced buffer
            // if (fileData._id === "5bb20e58d4351e00320205d7") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //ADAR buffer tube
            // if (fileData._id === "5c0faeddd174af02a962601f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //Colt A2 buffer (long)
            // if (fileData._id === "5a33ca0fc4a282000d72292f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -8;
            //     fileData._props.Accuracy = 0;
            // }
            // //Colt A1 buffer
            // if (fileData._id === "5649be884bdc2d79388b4577") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //Soyuz-TM buffer tube
            // if (fileData._id === "602e3f1254072b51b239f713") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //CAA AKTS buffer AKM
            // if (fileData._id === "5cf518cfd7f00c065b422214") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //CAA AKTS buffer ak-74m
            // if (fileData._id === "5cf50fc5d7f00c056c53f83c") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //RPK-16 buffer tube
            // if (fileData._id === "5beec8b20db834001961942a") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //Mesa Tactical hydraulic buffer
            // if (fileData._id === "5ef1ba28c64c5d0dfc0571a5") {
            //     fileData._props.Ergonomics += -5;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Accuracy = -5;
            // }
            // //SKS Tapco buffer
            // if (fileData._id === "5afd7e095acfc40017541f61") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //FAB Defense AGR-870 buffer tube
            // if (fileData._id === "5bfe89510db834001808a127") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // ///Buffer Tube Adapters///
            // //SVDS Lynx Arms buffer tube adapter
            // if (fileData._id === "6197b229af1f5202c57a9bea") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //SA-58 buffer tube adapter
            // if (fileData._id === "5b099bf25acfc4001637e683") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //AKM ME4 buffer tube adapter
            // if (fileData._id === "5649b2314bdc2d79388b4576") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //MPX/MCX stock pipe adapter
            // if (fileData._id === "58ac1bf086f77420ed183f9f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //M700 AB Arms MOD*X buffer tube adapter
            // if (fileData._id === "5cde77a9d7f00c000f261009") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            // }
            // //Mossberg Mesa Tactical LEO gen 1 stock adapter
            // if (fileData._id === "5ef1b9f0c64c5d0dfc0571a1") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //Mesa Tactical LEO stock adapter
            // if (fileData._id === "5ae35b315acfc4001714e8b0") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // //Vector stock adapter
            // if (fileData._id === "5fb655b748c711690e3a8d5a") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 5;
            //     fileData._props.Accuracy = 0;
            // }
            // ///Chasis///
            // //Remington M700 ProMag Archangel polymer stock
            // if (fileData._id === "5cf13123d7f00c1085616a50") {
            //     fileData._props.Ergonomics += 25;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 AB ARms MOD*X chasis
            // if (fileData._id === "5cde739cd7f00c0010373bd3") {
            //     fileData._props.Ergonomics += 10;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 Magpul Pro 700 chasis
            // if (fileData._id === "5cdeac22d7f00c000f26168f") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy = -5;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M700 AT AICS chasis
            // if (fileData._id === "5d25d0ac8abbc3054f3e61f7") {
            //     fileData._props.Ergonomics += 30;
            //     fileData._props.Recoil += -20;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Orsis chasis 
            // if (fileData._id === "5df35e59c41b2312ea3334d5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M14 SAGE EBR Chasis
            // if (fileData._id === "5addc7005acfc4001669f275") {
            //     fileData._props.Ergonomics += 20;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M14 TROY S.A.S.S.
            // if (fileData._id === "5ab372a310e891001717f0d8") {
            //     fileData._props.Ergonomics += 15;
            //     fileData._props.Recoil += -10;
            //     fileData._props.Accuracy = -25;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // ///Slides///
            // //USP Tacitcal Slide
            // if (fileData._id === "6194f41f9fb0c665d5490e75") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.96;
            //     fileData._props.HeatFactor = 0.96;
            // }
            // //USP Match Slide
            // if (fileData._id === "6194f5a318a3974e5e7421eb") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //USP Expert Slide
            // if (fileData._id === "6194f5722d2c397d6600348f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //USP Elite Slide
            // if (fileData._id === "6194f5d418a3974e5e7421ef") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += -5;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.94;
            //     fileData._props.CoolFactor = 0.94;
            // }
            // //USP Slide
            // if (fileData._id === "6193d382ed0429009f543e65") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //P226 MK25
            // if (fileData._id === "56d5a407d2720bb3418b456b") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //P226 Legion full size pistol slide
            // if (fileData._id === "5c0125fc0db834001a669aa3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 8;
            //     fileData._props.DurabilityBurnModificator = 0.96;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //P226 Emperor Scorpion pistol slide
            // if (fileData._id === "5c010a700db834001d23ef5d") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 7;
            //     fileData._props.DurabilityBurnModificator = 0.97;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 0.97;
            // }
            // //P226 Stainless Elite pistol slide
            // if (fileData._id === "5c0009510db834001966907f") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 0.95;
            //     fileData._props.HeatFactor = 0.97;
            //     fileData._props.CoolFactor = 0.97;
            // }
            // //P226 Axelson Tactical Mk.25 pistol slide
            // if (fileData._id === "5bffe7c50db834001d23ece1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 0.98;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //Glock MOS
            // if (fileData._id === "615d8dbd290d254f5e6b2ed6") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1.02;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //Glock 18C 9x19 pistol slide
            // if (fileData._id === "5b1faa0f5acfc40dc528aeb5") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.02;
            //     fileData._props.CoolFactor = 1.02;
            // }
            // //Glock 9x19 Moto Cut pistol slide
            // if (fileData._id === "5a9685b1a2750c0032157104") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.07;
            // }
            // //Glock 9x19 Alpha Wolf custom pistol slide
            // if (fileData._id === "5a7033908dc32e000a311392") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 12;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.04;
            //     fileData._props.CoolFactor = 1.04;
            // }
            // //Glock Polymer80 PS9 pistol slide
            // if (fileData._id === "5a7afa25e899ef00135e31b0") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock ZEV Tech HEX Gen3 pistol slide
            // if (fileData._id === "5a71e22f8dc32e00094b97f4") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //Glock 9x19 pistol slide
            // if (fileData._id === "5a6f5e048dc32e00094b97da") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Glock ZEV Tech HEX Spartan pistol slide
            // if (fileData._id === "5a71e4f48dc32e001207fb26") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.03;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.09;
            // }
            // //Glock 9x19 Viper Cut pistol slide
            // if (fileData._id === "5a6f5f078dc32e00094b97dd") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 5;
            //     fileData._props.DurabilityBurnModificator = 1.02;
            //     fileData._props.HeatFactor = 1.06;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //Glock Alpha Wolf pistol slide
            // if (fileData._id === "5a702d198dc32e000b452fc3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 10;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.08;
            //     fileData._props.CoolFactor = 1.08;
            // }
            // //M9A3 9x19 pistol slide
            // if (fileData._id === "5cadc55cae921500103bb3be") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //FN Five-seveN MK2 pistol slide
            // if (fileData._id === "5d3eb44aa4b93650d64e4979") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M1911A1 .45 ACP pistol slide
            // if (fileData._id === "5e81edc13397a21db957f6a1") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1.05;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //M45A1 .45 ACP slide
            // if (fileData._id === "5f3e7823ddc4f03b010e2045") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 15;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //PL-15 pistol slide
            // if (fileData._id === "60228924961b8d75ee233c32") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // ///Receivers///
            // //ADAR Upper Receiver
            // if (fileData._id === "5c0e2f26d174af02a9625114") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //Colt M4 Upper Receiver
            // if (fileData._id === "55d355e64bdc2d962f8b4569") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -8;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //VLTOR MUR Upper Receiver
            // if (fileData._id === "59bfe68886f7746004266202") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -1;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Noveske Gen 3 Upper Receiver
            // if (fileData._id === "5c07a8770db8340023300450") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -2;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.05;
            //     fileData._props.CoolFactor = 1.05;
            // }
            // //TX-15 Upper Receiver
            // if (fileData._id === "5d4405aaa4b9361e6a4e6bd3") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1.1;
            //     fileData._props.CoolFactor = 1.1;
            // }
            // //SA-58 Extreme Duty Upper
            // if (fileData._id === "5b099bb25acfc400186331e8") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            // //Zenit B-33
            // if (fileData._id === "5649af884bdc2d1b2b8b4589") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = 0;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.95;
            //     fileData._props.CoolFactor = 0.95;
            // }
            // //FAB Defense PDC
            // if (fileData._id === "5d2c770c48f0354b4a07c100") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -20;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.98;
            //     fileData._props.CoolFactor = 0.98;
            // }
            // //AKademia Bastion dust over
            // if (fileData._id === "5d2c76ed48f03532f2136169") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -15;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 0.9;
            //     fileData._props.CoolFactor = 0.9;
            // }
            // //AK TWS Dog Leg
            // if (fileData._id === "5d2c772c48f0355d95672c25") {
            //     fileData._props.Ergonomics += 0;
            //     fileData._props.Recoil += 0;
            //     fileData._props.Accuracy = -10;
            //     fileData._props.DurabilityBurnModificator = 1;
            //     fileData._props.HeatFactor = 1;
            //     fileData._props.CoolFactor = 1;
            // }
            ///Magazines///
            //SCAR-L Tan
            if (fileData._id === "61840d85568c120fdd2962a5") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SCAR-L Black
            if (fileData._id === "61840bedd92c473c77021635") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Troy Battlemag
            if (fileData._id === "5c6d46132e221601da357d56") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //HK PM GEN 2
            if (fileData._id === "5c6d450c2e221600114c997d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.02;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //HK 30 STANAG polymer
            if (fileData._id === "5c6d42cb2e2216000e69d7d1") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.025;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //HK Steel Maritime
            if (fileData._id === "5c05413a0db834001c390617") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Colt AR-15 STANAG
            if (fileData._id === "55d4887d4bdc2d962f8b4570") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 2;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul PMAG 10 
            if (fileData._id === "5aaa5e60e5b5b000140293d6") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul PMAG 20 
            if (fileData._id === "5448c1d04bdc2dff2f8b4569") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul GEN M3 Tan
            if (fileData._id === "5d1340b3d7ad1a0b52682ed7") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.015;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul GEN M3 Black
            if (fileData._id === "5aaa5dfee5b5b000140293d3") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.015;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul GEN3 W Tan
            if (fileData._id === "5d1340cad7ad1a0b0b249869") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.02;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul GEN3 W Black
            if (fileData._id === "55802d5f4bdc2dac148b458e") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.02;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul GEN M3 40 Black
            if (fileData._id === "544a378f4bdc2d30388b4567") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.05;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul GEN M3 40 Tan
            if (fileData._id === "5d1340bdd7ad1a0e8d245aab") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.05;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul D-60
            if (fileData._id === "59c1383d86f774290a37e0ca") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 2;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Surefire MAG5-100
            if (fileData._id === "5c6592372e221600133e47d7") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 11;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Surefire MAG5-60
            if (fileData._id === "544a37c44bdc2d25388b4567") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 9;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //HK G36 30
            if (fileData._id === "62307b7b10d2321fa8741921") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SCAR-H Tan
            if (fileData._id === "6183d53f1cb55961fa0fdcda") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SCAR-H Black
            if (fileData._id === "618168dc8004cc50514c34fc") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //G28 10 round
            if (fileData._id === "617130016c780c1e710c9a24") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //G28 20 round
            if (fileData._id === "617131a4568c120fdd29482d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.05;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul AR-10 PMAG 20
            if (fileData._id === "5a3501acc4a282000d72293a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AR-10 KAC 20
            if (fileData._id === "5df8f541c41b2312ea3335e3") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.1;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AR-10 KAC 10
            if (fileData._id === "5df8f535bb49d91fb446d6b0") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //VPO-101 10 round
            if (fileData._id === "5c503ac82e221602b21d6e9a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //VPO-101 10 round
            if (fileData._id === "5c503ad32e2216398b5aada2") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.25;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SVD 20 round
            if (fileData._id === "5c88f24b2e22160bc12c69a6") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.25;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SVD 10 round
            if (fileData._id === "5c471c442e221602b542a6f8") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FAL 10 round
            if (fileData._id === "5b7bef1e5acfc43d82528402") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FAL 20 round
            if (fileData._id === "5b099ac65acfc400186331e1") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FAL MMW polymer 20
            if (fileData._id === "5b7c2d1d5acfc43d1028532a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 2;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FAL 30 round
            if (fileData._id === "5b7bef5d5acfc43bca7067a3") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FAL SLR 30
            if (fileData._id === "5b7d37845acfc400170e2f87") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 2.5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FAL X Products 50 
            if (fileData._id === "5b7bef9c5acfc43d102852ec") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M14 X Products 50 round
            if (fileData._id === "5addccf45acfc400185c2989") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M14 30-round
            if (fileData._id === "5addcce35acfc4001a5fc635") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 1.5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M1A 20 round
            if (fileData._id === "5aaf8a0be5b5b00015693243") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MK18 10 round 
            if (fileData._id === "5fc23426900b1d5091531e15") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AXMC 10 
            if (fileData._id === "628120fd5631d45211793c9f") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SV-98 10
            if (fileData._id === "559ba5b34bdc2d1f1a8b4582") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //WYATT 5 round
            if (fileData._id === "5bfea7ad0db834001c38f1ee") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //WYATT 10 round
            if (fileData._id === "5bfeaa0f0db834001b734927") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.02;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul M700 5
            if (fileData._id === "5ce69cbad7f00c00b61c5098") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Magpul M700 10
            if (fileData._id === "5d25a7b88abbc3054f3e60bc") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.01;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M700 ProMag 20 round
            if (fileData._id === "5cf12a15d7f00c05464b293f") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.025;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M700 ProMag 10 round
            if (fileData._id === "5d25af8f8abbc3055079fec5") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M700 AICS 5 round
            if (fileData._id === "5d25a4a98abbc30b917421a4") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M700 AICS 10 round
            if (fileData._id === "5d25a6538abbc306c62e630d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.01;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M700 MDT AICS 12 round
            if (fileData._id === "5d25a6a48abbc306c62e6310") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //DVL-10 10
            if (fileData._id === "5888988e24597752fe43a6fa") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //ORSIS 5
            if (fileData._id === "5df25b6c0b92095fd441e4cf") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //VPO-215 4
            if (fileData._id === "5de653abf76fdc1ce94a5a2a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Archangel mosin 10 round
            if (fileData._id === "5bae13ded4351e44f824bf38") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Mosin 5 round internal
            if (fileData._id === "5ae0973a5acfc4001562206c") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SKS KCI 75 round
            if (fileData._id === "61695095d92c473c7702147a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 14;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SKS Promag 35
            if (fileData._id === "5c5970672e221602b21d7855") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 7;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SKS Promag 20 round
            if (fileData._id === "587df583245977373c4f1129") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 3.5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SKS internal
            if (fileData._id === "587df3a12459772c28142567") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK saiga 10 round
            if (fileData._id === "55d4837c4bdc2d1d4e8b456c") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FAB Ultimag 30 round
            if (fileData._id === "6272874a6c47bd74f92e2087") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.6;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SLR-106 Circle 10 30 round
            if (fileData._id === "5c0548ae0db834001966a3c2") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.4;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-12
            if (fileData._id === "5c0548ae0db834001966a3c2") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.2;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-101
            if (fileData._id === "5ac66c5d5acfc4001718d314") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.05;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-103
            if (fileData._id === "5ac66bea5acfc43b321d4aec") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.018;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-74 PMAG GEN M3
            if (fileData._id === "5aaa4194e5b5b055d06310a5") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.03;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM 6L10
            if (fileData._id === "5a01c29586f77474660c694c") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.018;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-74 6L23
            if (fileData._id === "55d480c04bdc2d1d4e8b456a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.018;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-74 6L23 Plum
            if (fileData._id === "5cbdaf89ae9215000e5b9c94") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.018;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-74 6L20
            if (fileData._id === "564ca99c4bdc2d16268b4589") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.018;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-74 6L18 45
            if (fileData._id === "564ca9df4bdc2d35148b4569") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.15;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-74 6L26 45
            if (fileData._id === "55d481904bdc2d8c2f8b456a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.15;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK-74 6L31 60 round
            if (fileData._id === "55d482194bdc2d1d4e8b456b") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 11;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM 10 ribbed
            if (fileData._id === "59e5d83b86f7745aed03d262") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM 30 (issued 55 or later)
            if (fileData._id === "59d625f086f774661516605d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.005;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM Magpul GEN M3
            if (fileData._id === "59d6272486f77466146386ff") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.035;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKMS Aluminium 30
            if (fileData._id === "5a0060fc86f7745793204432") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.25;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK Aluminium 10
            if (fileData._id === "5b1fd4e35acfc40018633c39") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.35;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM US PALM AK30 Tan
            if (fileData._id === "59fafc9386f774067d462453") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.1;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM US PALM AK30 Black/Grey
            if (fileData._id === "59fafc5086f7740dbe19f6c3") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.1;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM bakelite 40
            if (fileData._id === "5b1fb3e15acfc4001637f068") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.2;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AKM Molot 40-round 6P2
            if (fileData._id === "59e5f5a486f7746c530b3ce2") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.55;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK Molot 75 round
            if (fileData._id === "5cbdc23eae9215001136a407") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 8;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //AK X Products 50
            if (fileData._id === "5cfe8010d7ad1a59283b14c6") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 4;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //RPK-16 95
            if (fileData._id === "5bed625c0db834001c062946") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 11;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SOK-12 5 round
            if (fileData._id === "57616a9e2459773c7a400234") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SOK-12 10 round
            if (fileData._id === "5a966f51a2750c00156aacf6") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 22;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SOK-12 MaxRounds Powermag
            if (fileData._id === "5cf8f3b0d7f00c00217872ef") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 37;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //ASH-12 20
            if (fileData._id === "5caf1109ae9215753c44119f") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //ASH-12 10
            if (fileData._id === "5caf1041ae92157c28402e3f") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //VSS 6L24 10
            if (fileData._id === "57838f0b2459774a256959b2") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //VSS 6L25 20
            if (fileData._id === "57838f9f2459774a150289a0") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0.15;
                fileData._props.CheckTimeModifier += 0;
            }
            //SR3M 30 
            if (fileData._id === "5a9e81fba2750c00164f6b11") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0.4;
                fileData._props.CheckTimeModifier += 0;
            }
            //USP 12
            if (fileData._id === "6193d338de3cdf1d2614a6fc") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //USP Tactical 12
            if (fileData._id === "6193d3149fb0c665d5490e32") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MPX 20 round
            if (fileData._id === "5c5db6552e2216001026119d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MPX 30
            if (fileData._id === "5894a05586f774094708ef75") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.02;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MPX TTI Base Pad 41
            if (fileData._id === "5c5db6652e221600113fba51") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.1;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MPX MFG 50
            if (fileData._id === "5c5db6742e2216000f1b2852") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PP-19 PUFGUN 20 round
            if (fileData._id === "5c0673fb0db8340023300271") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.2;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PP-19 PUFGUN 30 round
            if (fileData._id === "5c0672ed0db834001b7353f3") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.3;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PP-19 30
            if (fileData._id === "599860ac86f77436b225ed1a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Saiga 9 10
            if (fileData._id === "5998529a86f774647f44f421") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.02;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //SR-1MP 18
            if (fileData._id === "59f99a7d86f7745b134aa97b") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //P226 15 round
            if (fileData._id === "56d59948d2720bb7418b4582") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //P226 20 extended
            if (fileData._id === "5c920e902e221644f31c3c99") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.15;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-443 Grach
            if (fileData._id === "576a5ed62459771e9c2096cb") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Glock 17
            if (fileData._id === "5a718b548dc32e000d46d262") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP5 X Products 50
            if (fileData._id === "5a351711c4a282000b1521a4") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 3;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //TT tt-105 8 round
            if (fileData._id === "571a29dc2459771fb2755a6a") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PM 84 round makeshift
            if (fileData._id === "55d485be4bdc2d962f8b456f") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 20;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PM 9x19PM 8 round
            if (fileData._id === "5448c12b4bdc2d02308b456f") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //APS 20 round
            if (fileData._id === "5a17fb03fcdbcbcae668728f") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PP-91 KEDR 20 round
            if (fileData._id === "57d14e1724597714010c3f4b") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PP-91 KEDR 30 round
            if (fileData._id === "57d1519e24597714373db79d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.05;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Glock PMAG 21
            if (fileData._id === "5a718da68dc32e000d46d264") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.05;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Glock SGM 50
            if (fileData._id === "5a718f958dc32e00094b97e7") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 5;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Glock Big Stick
            if (fileData._id === "5a7ad2e851dfba0016153692") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.15;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP7 20
            if (fileData._id === "5ba264f6d4351e0034777d52") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP7 30
            if (fileData._id === "5ba2657ed4351e0035628ff2") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.04;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP7 40
            if (fileData._id === "5ba26586d4351e44f824b340") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.08;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M9A3
            if (fileData._id === "5cadc190ae921500103bb3b6") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FN P90 50
            if (fileData._id === "5cc70093e4a949033c734312") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //HK MP5 20
            if (fileData._id === "5d2f213448f0355009199284") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //HK MP5 30
            if (fileData._id === "5926c3b286f774640d189b6b") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //FN Five-Seven 20
            if (fileData._id === "5d3eb5eca4b9363b1f22f8e4") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP9 15
            if (fileData._id === "5de8e8dafd6b4e6e2276dc32") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP9 20
            if (fileData._id === "5de8ea8ffd6b4e6e2276dc35") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.02;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP9 25
            if (fileData._id === "5de8eaadbbaf010b10528a6d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.04;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP9 30
            if (fileData._id === "5de8eac42a78646d96665d91") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.06;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PPSH 35
            if (fileData._id === "5ea034eb5aad6446a939737b") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PPSH 71
            if (fileData._id === "5ea034f65aad6446a939737e") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 4;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M1911A1 7
            if (fileData._id === "5e81c4ca763d9f754677befa") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.04;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M1911A1 Mec-Gar 11
            if (fileData._id === "5ef3448ab37dfd6af863525c") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.15;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M45 Wilson Combat 7
            if (fileData._id === "5f3e77b26cda304dcc634057") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Glock .45 13
            if (fileData._id === "5fb651b52b1b027b1f50bcff") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Glock .45 Kriss G30
            if (fileData._id === "5fb651dc85f90547f674b6f4") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.2;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //UMP
            if (fileData._id === "5fc3e466187fea44d52eda90") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //PL-15
            if (fileData._id === "602286df23506e50807090c6") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-155 6
            if (fileData._id === "6076c87f232e5a31c233d50e") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MTs-255
            if (fileData._id === "60dc519adf4c47305f6d410d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //TOZ-106 2
            if (fileData._id === "5a38ee51c4a282000c5a955c") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //TOZ-106 4
            if (fileData._id === "5a38ed75c4a28232996e40c6") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.05;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //TOZ-106 5
            if (fileData._id === "5c6161fb2e221600113fbde5") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0.1;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-133 8 
            if (fileData._id === "55d485804bdc2d8c2f8b456b") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-133 6
            if (fileData._id === "55d484b44bdc2d1d4e8b456d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-153 4
            if (fileData._id === "56deee15d2720bee328b4567") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-153 5
            if (fileData._id === "5882163e24597758206fee8c") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-153 6
            if (fileData._id === "5882163824597757561aa922") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-153 7
            if (fileData._id === "5882163224597757561aa920") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //MP-153 8
            if (fileData._id === "56deeefcd2720bc8328b4568") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M870 10
            if (fileData._id === "5a78832ec5856700155a6ca3") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M870 7
            if (fileData._id === "5a78830bc5856700137e4c90") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //M870 4
            if (fileData._id === "5a7882dcc5856700177af662") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Mossberg 8 shell
            if (fileData._id === "5e87080c81c4ed43e83cefda") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Benelli Super 90 5 shell
            if (fileData._id === "625ff2ccb8c587128c1a01dd") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Benelli Super 90 7 shell
            if (fileData._id === "6259bdcabd28e4721447a2aa") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Benelli Super 90 9 shell
            if (fileData._id === "625ff2eb9f5537057932257d") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Benelli Super 90 11 shell
            if (fileData._id === "625ff3046d721f05d93bf2ee") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //Benelli Super 90 13 shell
            if (fileData._id === "625ff31daaaa8c1130599f64") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            //KS-23 3
            if (fileData._id === "5f647d9f8499b57dc40ddb93") {
                fileData._props.Ergonomics += 0;
                fileData._props.MalfunctionChance = 0;
                fileData._props.LoadUnloadModifier += 0;
                fileData._props.CheckTimeModifier += 0;
            }
            ///Auxillary///
            ///Mounts///
            ///Reflex///
            ///Compact Reflex///
            ///Assault Scope///
            ///Scope///
            ///Special///
        }
        if (this.config.logEverything == true) {
            this.logger.info("Attatchment Base Loaded");
        }
    }
}
exports.AttatchmentStats = AttatchmentStats;
