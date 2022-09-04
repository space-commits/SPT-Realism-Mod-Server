"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponsStats = void 0;
class WeaponsStats {
    constructor(logger, tables, modConf) {
        this.logger = logger;
        this.tables = tables;
        this.modConf = modConf;
        this.itemDB = this.tables.templates.items;
    }
    loadWepStats() {
        const _9x18AmmoArr = this.itemDB["57f4c844245977379d5c14d1"]._props.Chambers[0]._props.filters[0].Filter;
        for (let i in this.itemDB) {
            let fileData = this.itemDB[i];
            ///AR///
            //SAG AK short
            if (fileData._id === "628b9c37a733087d0d7fe84b") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.28;
                    fileData._props.HeatFactorGun = 0.24;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.13;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //SAG AK
            if (fileData._id === "5ac4cd105acfc40016339859") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.17;
                    fileData._props.HeatFactorGun = 0.18;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.06;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 81;
                }
            }
            //RD-704
            if (fileData._id === "628a60ae6b1d481ff772e9c8") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.24;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.08;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 72;
                }
            }
            //AK-101
            if (fileData._id === "5ac66cb05acfc40198510a10") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.06;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 78;
                }
            }
            //AK-102
            if (fileData._id === "5ac66d015acfc400180ae6e4") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.27;
                    fileData._props.HeatFactorGun = 0.26;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.12;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 74;
                }
            }
            //AK-103
            if (fileData._id === "5ac66d2e5acfc43b321d4b53") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.15;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.03;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //AK-104
            if (fileData._id === "5ac66d725acfc43b321d4b60") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.22;
                    fileData._props.HeatFactorGun = 0.26;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.05;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //AK-105
            if (fileData._id === "5ac66d9b5acfc4001633997a") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.22;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.08;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //AK-74
            if (fileData._id === "5bf3e03b0db834001d2c4a9c") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.21;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.06;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 60;
                }
            }
            //AK-74M
            if (fileData._id === "5ac4cd105acfc40016339859") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.15;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.04;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //AK-74N
            if (fileData._id === "5644bd2b4bdc2d3b4c8b4572") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.05;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //AKS-74
            if (fileData._id === "5bf3e0490db83400196199af") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.055;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //AKs-74N
            if (fileData._id === "5ab8e9fcd8ce870019439434") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.045;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //AKS-74U
            if (fileData._id === "57dc2fa62459775949412633") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.28;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.2;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //AKS-74UB
            if (fileData._id === "5839a40f24597726f856b511") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.28;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //AKS-74UN
            if (fileData._id === "583990e32459771419544dd2") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.28;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.18;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //RPK-16
            if (fileData._id === "5beed0f50db834001c062b12") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.17;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.03;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //AKM
            if (fileData._id === "59d6088586f774275f37482f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.07;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 73;
                }
            }
            //AKMN
            if (fileData._id === "5a0ec13bfcdbcb00165aa685") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.06;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 73;
                }
            }
            //AKMS
            if (fileData._id === "59ff346386f77477562ff5e2") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.07;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //AKMSN
            if (fileData._id === "5abcbc27d8ce8700182eceeb") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.06;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //VPO-209 .366
            if (fileData._id === "59e6687d86f77411d949b251") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.24;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.4;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 71;
                }
            }
            //VPO-136 7.62
            if (fileData._id === "59e6152586f77473dc057aa1") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.2;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.2;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 73;
                }
            }
            //MK47
            if (fileData._id === "606587252535c57a13424cfd") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.36;
                    fileData._props.HeatFactorGun = 0.34;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 78;
                }
            }
            //HK-G36
            if (fileData._id === "623063e994fc3f7b302a9696") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.22;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.09;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //HK-416
            if (fileData._id === "5bb2475ed4351e00853264e3") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.21;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.03;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 82;
                }
            }
            //MCX
            if (fileData._id === "5fbcc1d9016cce60e8341ab3") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 83;
                }
            }
            //M4A1
            if (fileData._id === "5447a9cd4bdc2dbd208b4567") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.27;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 87;
                }
            }
            //ADAR
            if (fileData._id === "5c07c60e0db834002330051f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.38;
                    fileData._props.HeatFactorGun = 0.27;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 87;
                }
            }
            //TX-15
            if (fileData._id === "5d43021ca4b9362eab4b5e25") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.32;
                    fileData._props.HeatFactorGun = 0.27;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.08;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 87;
                }
            }
            //SCAR-L
            if (fileData._id === "6184055050224f204c1da540") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.22;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.06;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //SCAR-L FDE
            if (fileData._id === "618428466ef05c2ce828f218") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.22;
                    fileData._props.HeatFactorGun = 0.22;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.06;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //SCAR-H
            if (fileData._id === "6183afd850224f204c1da514") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.04;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //SCAR-H FDE
            if (fileData._id === "6165ac306ef05c2ce828ef74") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.04;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //SA-58
            if (fileData._id === "5b0bbe4e5acfc40dc528a72d") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.37;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.18;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //M1A
            if (fileData._id === "5aafa857e5b5b00018480968") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.45;
                    fileData._props.HeatFactorGun = 0.35;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.75;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //RFB
            if (fileData._id === "5f2a9575926fd9352339381f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.55;
                    fileData._props.HeatFactorGun = 0.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.65;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //DT-MDR 5.56
            if (fileData._id === "5c488a752e221602b412af63") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //DT-MDR 7.62
            if (fileData._id === "5dcbd56fdbd3d91b3e5468d5") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.4;
                    fileData._props.HeatFactorGun = 0.38;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.25;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //AS-VAL
            if (fileData._id === "57c44b372459772d2b39b8ce") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //VSS
            if (fileData._id === "57838ad32459774a17445cd2") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //ASH-12
            if (fileData._id === "5cadfbf7ae92152ac412eeef") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.23;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            ///Carbine///
            //OP-SKS
            if (fileData._id === "587e02ff24597743df3deaeb") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.34;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.2;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //SKS
            if (fileData._id === "574d967124597745970e7c94") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.34;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.25;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //VEPR Hunter
            if (fileData._id === "5c501a4d2e221602b412b540") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.4;
                    fileData._props.HeatFactorGun = 0.42;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.3;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            ///DMR///
            //G28
            if (fileData._id === "6176aca650224f204c1da3fb") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.45;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.02;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //MK-18
            if (fileData._id === "5fc22d7c187fea44d52eda44") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.45;
                    fileData._props.HeatFactorGun = 0.7;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.03;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //RSASS
            if (fileData._id === "5a367e5dc4a282000e49738f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.45;
                    fileData._props.HeatFactorGun = 0.6;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.12;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //SR-25
            if (fileData._id === "5df8ce05b11454561e39243b") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.45;
                    fileData._props.HeatFactorGun = 0.6;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.08;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //SVDS
            if (fileData._id === "5c46fbd72e2216398b5a8c9c") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.35;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.04;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 73;
                }
            }
            ///Bolt Action///
            //MP-18
            if (fileData._id === "61f7c9e189e6fb1a5e3ea78d") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.05;
                    fileData._props.HeatFactorGun = 0.9;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.2;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.weapClass = "sniperRifle";
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //VPO-215 
            if (fileData._id === "5de652c31b7e3716273428be") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.4;
                    fileData._props.HeatFactorGun = 1;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 2;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //Mosin Infantry
            if (fileData._id === "5bfd297f0db834001a669119") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.6;
                    fileData._props.HeatFactorGun = 1.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 2.7;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 72;
                }
            }
            //Mosin Sniper
            if (fileData._id === "5ae08f0a5acfc408fb1398a1") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.6;
                    fileData._props.HeatFactorGun = 1.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 1.8;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 72;
                }
            }
            //SV-98
            if (fileData._id === "55801eed4bdc2d89578b4588") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 1.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 74;
                }
            }
            //DVL-10
            if (fileData._id === "588892092459774ac91d4b11") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 1.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //AXMC
            if (fileData._id === "627e14b21713922ded6f2c15") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.4;
                    fileData._props.HeatFactorGun = 1.6;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //T-5000
            if (fileData._id === "5df24cf80dee1b22f862e9bc") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 1.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 77;
                }
            }
            //M700
            if (fileData._id === "5bfea6e90db834001b7347f3") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 1.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            ///Shotgun///
            //TOZ
            if (fileData._id === "5a38e6bac4a2826c6e06d79b") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.65;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 1.7;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //MP-43 double barrel
            if (fileData._id === "5580223e4bdc2d1c128b457f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.5;
                    fileData._props.HeatFactorGun = 0.65;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            } //MTs-255 revolver
            if (fileData._id === "60db29ce99594040e04c4a27") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.65;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowMisfire = true;
                    fileData._props.AllowJam = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //MP-133
            if (fileData._id === "54491c4f4bdc2db1078b4568") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.65;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.3;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //M870
            if (fileData._id === "5a7828548dc32e5a9c28b516") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.65;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //590A1
            if (fileData._id === "5e870397991fd70db46995c8") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.12;
                    fileData._props.HeatFactorGun = 0.65;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //MP-153
            if (fileData._id === "56dee2bdd2720bc8328b4567") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.55;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.6;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //MP-155
            if (fileData._id === "606dae0ab0e443224b421bb7") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.32;
                    fileData._props.HeatFactorGun = 0.55;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.7;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //Saiga-12
            if (fileData._id === "576165642459773c7a400233") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.55;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //KS-23M
            if (fileData._id === "5e848cc2988a8701445df1e8") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 1;
                    fileData._props.HeatFactorGun = 0.5;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.5;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            ///SMG///
            //MP5
            if (fileData._id === "5926bb2186f7744b1c6c6e60") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.15;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 90;
                }
            }
            //MP5K
            if (fileData._id === "5d2f0d8048f0356c925bc3b0") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.15;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //MPX
            if (fileData._id === "58948c8e86f77409493f7266") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.14;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //MP9
            if (fileData._id === "5e00903ae9dc277128008b87") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //MP9-N
            if (fileData._id === "5de7bd7bfd6b4e6e2276dc25") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //Vityaz PPs
            if (fileData._id === "59984ab886f7743e98271174") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.08;
                    fileData._props.HeatFactorGun = 0.1;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //Saiga 9
            if (fileData._id === "59f9cabd86f7743a10721f46") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.15;
                    fileData._props.HeatFactorGun = 0.1;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.2;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 74;
                }
            }
            //STM 9
            if (fileData._id === "60339954d62c9b14ed777c06") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.35;
                    fileData._props.HeatFactorGun = 0.35;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.17;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //UMP .45
            if (fileData._id === "5fc3e272f8b6a877a729eac5") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //Vector .45
            if (fileData._id === "5fb64bc92b1b027b1f50bcf2") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.85;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.6;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 220;
                }
            }
            //Vector 9x19
            if (fileData._id === "5fc3f2d5900b1d5091531e57") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.85;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.6;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 220;
                }
            }
            //MP7A2
            if (fileData._id === "5bd70322209c4d00d7167b8f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.15;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.05;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //MP7A1
            if (fileData._id === "5ba26383d4351e00334c93d9") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.15;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.05;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //P90
            if (fileData._id === "5cc82d76e24e8d00134b4b83") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.05;
                    fileData._props.HeatFactorGun = 0.15;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 87;
                }
            }
            //PPSH
            if (fileData._id === "5ea03f7400685063ec28bfa8") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.01;
                    fileData._props.HeatFactorGun = 0.05;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.25;
                    fileData._props.BaseMalfunctionChance = 0.2;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //Kedr-B
            if (fileData._id === "57f3c6bd24597738e730fa2f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.15;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //Kedr
            if (fileData._id === "57d14d2524597714373db789") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.15;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //Klin
            if (fileData._id === "57f4c844245977379d5c14d1") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.025;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.5;
                    fileData._props.BaseMalfunctionChance = 0.12;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            ///Pistol///
            //Chiapa .357
            if (fileData._id === "61a4c8884f95bc3b2c5dc96f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.02;
                    fileData._props.HeatFactorGun = 0.1;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowMisfire = true;
                    fileData._props.AllowJam = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //Chiapa 9x19
            if (fileData._id === "624c2e8614da335f1e034d8c") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.01;
                    fileData._props.HeatFactorGun = 0.1;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowMisfire = true;
                    fileData._props.AllowJam = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 88;
                }
            }
            //Grach
            if (fileData._id === "576a581d2459771e7b1bc4f1") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.05;
                    fileData._props.HeatFactorGun = 0.27;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.3;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //PL-15
            if (fileData._id === "602a9740da11d6478d5a06dc") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.20;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 86;
                }
            }
            //G17
            if (fileData._id === "5a7ae0c351dfba0017554310") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.18;
                    fileData._props.HeatFactorGun = 0.20;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //G18C
            if (fileData._id === "5b1fa9b25acfc40018633c01") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.6;
                    fileData._props.HeatFactorGun = 0.3;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.17;
                    fileData._props.BaseMalfunctionChance = 0.3;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //P226R
            if (fileData._id === "56d59856d2720bd8418b456a") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.07;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.05;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //M9A3
            if (fileData._id === "5cadc190ae921500103bb3b6") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.12;
                    fileData._props.HeatFactorGun = 0.23;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 83;
                }
            }
            //USP
            if (fileData._id === "6193a720f8ee7e52e42109ed") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.04;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 80;
                }
            }
            //1911 
            if (fileData._id === "5e81c3cbac2bb513793cdc75") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.25;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //M45
            if (fileData._id === "5f36a0e5fbf956000b716b65") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //tt
            if (fileData._id === "571a12c42459771f627b58a0") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilForceUp = 510;
                    fileData._props.RecoilForceBack = 300;
                    fileData._props.RecoilAngle = 80;
                }
            }
            //gold tt
            if (fileData._id === "5b3b713c5acfc4330140bd8d") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.15;
                    fileData._props.HeatFactorGun = 0.26;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.35;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilForceUp = 510;
                    fileData._props.RecoilForceBack = 300;
                    fileData._props.RecoilAngle = 80;
                }
            }
            //FN 5-7 Black
            if (fileData._id === "5d3eb3b0a4b93615055e84d2") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.05;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //FN 5-7 Tan
            if (fileData._id === "5d67abc1a4b93614ec50137f") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.05;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 85;
                }
            }
            //SR-1MP
            if (fileData._id === "59f98b4986f7746f546d2cef") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 75;
                }
            }
            //Makarov
            if (fileData._id === "5448bd6b4bdc2dfc2f8b4569") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilForceBack = 180;
                    fileData._props.RecoilAngle = 87;
                }
            }
            //Makarov threaded
            if (fileData._id === "579204f224597773d619e051") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.1;
                    fileData._props.HeatFactorGun = 0.25;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilForceBack = 180;
                    fileData._props.RecoilAngle = 87;
                }
            }
            //PB
            if (fileData._id === "56e0598dd2720bb5668b45a6") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.25;
                    fileData._props.HeatFactorGun = 0.4;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.1;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilForceBack = 150;
                    fileData._props.RecoilAngle = 89;
                }
            }
            //APS
            if (fileData._id === "5a17f98cfcdbcb0980087290") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            //APS
            if (fileData._id === "5abccb7dd8ce87001773e277") {
                if (this.modConf.malf_changes == true) {
                    fileData._props.DurabilityBurnRatio = 0.3;
                    fileData._props.HeatFactorGun = 0.2;
                    fileData._props.HeatFactorByShot = 1;
                    fileData._props.CoolFactorGun = 0.1;
                    fileData._props.BaseMalfunctionChance = 0.15;
                    fileData._props.CoolFactorGunMods = 1;
                    fileData._props.AllowOverheat = true;
                    fileData._props.Chambers[0]._props.filters[0].Filter = _9x18AmmoArr;
                }
                if (this.modConf.recoil_changes == true) {
                    fileData._props.RecoilAngle = 70;
                }
            }
            ///Melee///
            ///Grenades///
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Weapon Stats Loaded");
        }
    }
}
exports.WeaponsStats = WeaponsStats;
