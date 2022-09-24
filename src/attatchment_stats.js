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
                fileData._props.Ergonomics = 0;
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
