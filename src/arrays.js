"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrays = void 0;
class Arrays {
    constructor(tables) {
        this.tables = tables;
        this.botDB = this.tables.bots.types;
        this.outdoorMaps = [
            "shoreline",
            "Shoreline",
            "woods",
            "Woods",
            "lighthouse",
            "Lighthouse"
        ];
        this.urbanMaps = [
            "bigmap",
            "Customs",
            "rezervbase",
            "RezervBase",
            "ReserveBase",
            "Streets of Tarkov"
        ];
        this.cqbMaps = [
            "Factory",
            "factory4_night",
            "factory4_day",
            "Laboratory",
            "laboratory",
            "Interchange",
            "interchange"
        ];
        this.traderIDs = [
            "54cb50c76803fa8b248b4571",
            "54cb57776803fa99248b456e",
            "579dc571d53a0658a154fbec",
            "58330581ace78e27b8b10cee",
            "5935c25fb3acc3127c3d8cd9",
            "5a7c2eca46aef81a7ca2145d",
            "5ac3b934156ae10c4430e83c",
            "5c0647fdd443bc2504c2d371"
        ];
        this.stashMeds = [
            "544fb37f4bdc2dee738b4567",
            "5af0548586f7743a532b7e99",
            "5e8488fa988a8701445df1e4",
            "5af0454c86f7746bf20992e8",
            "5755356824597772cb798962",
            "590c661e86f7741e566b646a",
            "544fb45d4bdc2dee738b4568",
            "590c678286f77426c9660122",
            "60098ad7c2240c0fe85c570a",
            "590c657e86f77412b013051d",
            "5755383e24597772cb798966",
            "5751a89d24597722aa0e8db0",
            "5d02778e86f774203e7dedbe",
            "5d02797c86f774203f38e30a"
        ];
        this.keyParentIDs = [
            "5c164d2286f774194c5e69fa",
            "5c99f98d86f7745c314214b3",
        ];
        this.gearParentIDs = [
            "5448e5284bdc2dcb718b4567",
            "5448e54d4bdc2dcc718b4568",
            "57bef4c42459772e8d35a53b",
            "5a341c4086f77401f2541505",
            "5448e53e4bdc2d60728b4567",
            "5a341c4686f77469e155819e",
            "5645bcb74bdc2ded0b8b4578",
            "5b3f15d486f77432d0509248",
            "5448e5724bdc2ddf718b4568"
        ];
        this.barterParentIDs = [
            "590c745b86f7743cc433c5f2",
            "57864ada245977548638de91",
            "57864a66245977548f04a81f",
            "57864ee62459775490116fc1",
            "5d650c3e815116009f6201d2",
            "57864c322459775490116fbf",
            "57864c8c245977548867e7f1",
            "57864bb7245977548b3b66c2",
            "57864a3d24597754843f8721",
            "5448ecbe4bdc2d60728b4568"
        ];
        this.weaponParentIDs = [
            "5447b5e04bdc2d62278b4567",
            "5447b5f14bdc2d61278b4567",
            "5447b5cf4bdc2d65278b4567",
            "5447b6094bdc2dc3278b4567",
            "5447b6194bdc2d67278b4567",
            "5447b6254bdc2dc3278b4568",
            "5447bee84bdc2dc3278b4569",
            "5447bedf4bdc2d87278b4568",
            "5447bed64bdc2d97278b4568",
            "5447b5fc4bdc2d87278b4567",
            "5447e1d04bdc2dff2f8b4567"
        ];
        this.modParentIDs = [
            "550aa4bf4bdc2dd6348b456b",
            "550aa4dd4bdc2dc9348b4569",
            "550aa4cd4bdc2dd8348b456c",
            "555ef6e44bdc2de9068b457e",
            "55818b224bdc2dde698b456f",
            "55818a304bdc2db5418b457d",
            "55818a594bdc2db9688b456a",
            "55818a6f4bdc2db9688b456b",
            "55818acf4bdc2dde698b456b",
            "55818ad54bdc2ddc698b4569",
            "55818add4bdc2d5b648b456f",
            "55818ae44bdc2dde698b456c",
            "55818ac54bdc2d5b648b456e",
            "55818aeb4bdc2ddc698b456a",
            "5448bc234bdc2d3c308b4569",
            "5a74651486f7744e73386dd1",
            "55818af64bdc2d5b648b4570",
            "55818a684bdc2ddd698b456d",
            "56ea9461d2720b67698b456f",
            "55818a104bdc2db9688b4569",
            "55818afb4bdc2dde698b456d",
            "55818b084bdc2d5b648b4571",
            "55818b164bdc2ddc698b456c",
            "610720f290b75a49ff2e5e25",
            "627a137bf21bc425b06ab944"
        ];
        this.equipmentSlots = {
            Headwear: "Headwear",
            Earpiece: "Earpiece",
            FaceCover: "FaceCover",
            ArmorVest: "ArmorVest",
            Eyewear: "Eyewear",
            ArmBand: "ArmBand",
            TacticalVest: "TacticalVest",
            Pockets: "Pockets",
            Backpack: "Backpack",
            SecuredContainer: "SecuredContainer",
            FirstPrimaryWeapon: "FirstPrimaryWeapon",
            SecondPrimaryWeapon: "SecondPrimaryWeapon",
            Holster: "Holster",
            Scabbard: "Scabbard"
        };
        this.bossBotArr = [
            this.botDB["bosssanitar"],
            this.botDB["bosskojaniy"],
            this.botDB["bosskilla"],
            this.botDB["bossgluhar"],
            this.botDB["bossbully"],
            this.botDB["bossknight"],
            this.botDB["bosstagilla"],
            this.botDB["followerbigpipe"],
            this.botDB["followerbirdeye"],
            this.botDB["sectantpriest"],
            this.botDB["bosszryachiy"]
        ];
        this.bossFollowerArr = [
            this.botDB["followerbully"],
            this.botDB["followergluharassault"],
            this.botDB["followergluharscout"],
            this.botDB["followergluharsecurity"],
            this.botDB["followergluharsnipe"],
            this.botDB["followerkojaniy"],
            this.botDB["followersanitar"],
            this.botDB["followertagilla"],
            this.botDB["followerzryachiy"],
        ];
        this.pmcList = [
            this.botDB["usec"],
            this.botDB["bear"],
        ];
        this.rogueRaiderList = [
            this.botDB["pmcbot"],
            this.botDB["exusec"],
        ];
        this.cultistArr = [
            this.botDB["sectantwarrior"],
            this.botDB["sectantpriest"],
        ];
        this.standardBotHPArr = [
            this.botDB["marksman"],
            this.botDB["usec"],
            this.botDB["bear"],
            this.botDB["cursedassault"],
            this.botDB["assault"]
        ];
        this.midBotHPArr = [
            this.botDB["followerbully"],
            this.botDB["followergluharassault"],
            this.botDB["followergluharscout"],
            this.botDB["followergluharsecurity"],
            this.botDB["followergluharsnipe"],
            this.botDB["followerkojaniy"],
            this.botDB["followersanitar"],
            this.botDB["followertagilla"],
            this.botDB["sectantwarrior"],
            this.botDB["pmcbot"],
            this.botDB["exusec"],
            this.botDB["followerzryachiy"]
        ];
        this.nonScavBotArr = [
            this.botDB["followerbully"],
            this.botDB["followergluharassault"],
            this.botDB["followergluharscout"],
            this.botDB["followergluharsecurity"],
            this.botDB["followergluharsnipe"],
            this.botDB["followerkojaniy"],
            this.botDB["followersanitar"],
            this.botDB["followertagilla"],
            this.botDB["usec"],
            this.botDB["bear"],
            this.botDB["sectantwarrior"],
            this.botDB["sectantpriest"],
            this.botDB["marksman"],
            this.botDB["bosstagilla"],
            this.botDB["bosssanitar"],
            this.botDB["bosskojaniy"],
            this.botDB["bosskilla"],
            this.botDB["bossgluhar"],
            this.botDB["bossbully"],
            this.botDB["pmcbot"],
            this.botDB["exusec"],
            this.botDB["bossknight"],
            this.botDB["followerbigpipe"],
            this.botDB["followerbirdeye"],
            this.botDB["followerbirdeye"],
            this.botDB["bosszryachiy"]
        ];
        this.botArr = [
            this.botDB["followerbully"],
            this.botDB["followergluharassault"],
            this.botDB["followergluharscout"],
            this.botDB["followergluharsecurity"],
            this.botDB["followergluharsnipe"],
            this.botDB["followerkojaniy"],
            this.botDB["followersanitar"],
            this.botDB["followertagilla"],
            this.botDB["usec"],
            this.botDB["bear"],
            this.botDB["sectantwarrior"],
            this.botDB["sectantpriest"],
            this.botDB["assault"],
            this.botDB["marksman"],
            this.botDB["cursedassault"],
            this.botDB["bosstagilla"],
            this.botDB["bosssanitar"],
            this.botDB["bosskojaniy"],
            this.botDB["bosskilla"],
            this.botDB["bossgluhar"],
            this.botDB["bossbully"],
            this.botDB["pmcbot"],
            this.botDB["exusec"],
            this.botDB["bossknight"],
            this.botDB["followerbigpipe"],
            this.botDB["followerbirdeye"],
            this.botDB["bosszryachiy"],
            this.botDB["followerzryachiy"]
        ];
        this.modTypes = {
            "FlashHider": "550aa4bf4bdc2dd6348b456b",
            "MuzzleCombo": "550aa4dd4bdc2dc9348b4569",
            "Silencer": "550aa4cd4bdc2dd8348b456c",
            "Barrel": "555ef6e44bdc2de9068b457e",
            "Mount": "55818b224bdc2dde698b456f",
            "Receiver": "55818a304bdc2db5418b457d",
            "Stock": "55818a594bdc2db9688b456a",
            "Charge": "55818a6f4bdc2db9688b456b",
            "CompactCollimator": "55818acf4bdc2dde698b456b",
            "Collimator": "55818ad54bdc2ddc698b4569",
            "AssaultScope": "55818add4bdc2d5b648b456f",
            "Scope": "55818ae44bdc2dde698b456c",
            "IronSight": "55818ac54bdc2d5b648b456e",
            "SpecialScope": "55818aeb4bdc2ddc698b456a",
            "Magazine": "5448bc234bdc2d3c308b4569",
            "AuxiliaryMod": "5a74651486f7744e73386dd1",
            "Foregrip": "55818af64bdc2d5b648b4570",
            "PistolGrip": "55818a684bdc2ddd698b456d",
            "Gasblock": "56ea9461d2720b67698b456f",
            "Handguard": "55818a104bdc2db9688b4569",
            "Bipod": "55818afb4bdc2dde698b456d",
            "Flashlight": "55818b084bdc2d5b648b4571",
            "TacticalCombo": "55818b164bdc2ddc698b456c",
            "CylinderMagazine": "610720f290b75a49ff2e5e25",
            "GrenadeLauncherMagazine": "627a137bf21bc425b06ab944"
        };
        this.conflNVGomponents = [
            "5c0695860db834001b735461",
            "5c11046cd174af02a012e42b",
            "5a16b8a9fcdbcb00165aa6ca"
        ];
        this.conflHats = [
            "60bf74184a63fc79b60c57f6",
            "5df8a58286f77412631087ed",
            "5d96141523f0ea1b7f2aacab",
            "572b7fa124597762b472f9d2",
            "59e770f986f7742cbe3164ef",
            "60361b5a9a15b10d96792291",
            "603618feffd42c541047f771",
            "60361a7497633951dc245eb4",
            "6040de02647ad86262233012",
            "60361b0b5a45383c122086a1",
            "603619720ca681766b6a0fc4",
            "572b7d8524597762b472f9d1",
            "5aa2b8d7e5b5b00014028f4a",
            "5aa2ba19e5b5b00014028f4e",
            "5b40e5e25acfc4001a599bea",
            "5aa2b87de5b5b00016327c25",
            "5b40e61f5acfc4001a599bec",
            "5aa2a7e8e5b5b00016327c16",
            "5aa2b89be5b5b0001569311f",
            "5b4329075acfc400153b78ff",
            "5f60e7788adaa7100c3adb49",
            "5f60e6403b85f6263c14558c",
            "5f60e784f2bcbb675b00dac7",
            "5b43271c5acfc432ff4dce65",
            "61c18db6dfd64163ea78fbb4",
            "5aa2ba46e5b5b000137b758d"
        ];
        this.conflMasks = [
            "5b432c305acfc40019478128",
            "60363c0c92ec1c31037959f5",
            "5b432b6c5acfc4001a599bf0",
            "572b7f1624597762ae139822",
            "5ab8f4ff86f77431c60d91ba",
            "5b432f3d5acfc4704b4a1dfb",
            "5fd8d28367cb5e077335170f",
            "5b4325355acfc40019478126",
            "5ab8f85d86f7745cd93a1cf5",
            "5ab8f39486f7745cd93a1cca",
            "5b4326435acfc433000ed01d"
        ];
    }
}
exports.Arrays = Arrays;
