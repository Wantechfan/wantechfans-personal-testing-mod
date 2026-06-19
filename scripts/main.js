// I need to keep things simple so I can understand everything. Anyways
// Vars
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const ambientMusic1 = Vars.tree.loadMusic("dreitonpiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const bossMusic = Vars.tree.loadMusic("racethesun");
const soundManager = Vars.control.sound;
const mod = Vars.mods.getMod("your-mod-name")
let unit = Blocks.scathe;

// Execution
Events.on(ClientLoadEvent, e => {
    mod.uiTable.build(prov(() => {
        mod.uiTable.clear();
        mod.uiTable.add("Insyaallah akan terbuka 19 juta lapangan pekerjaan.").row();
        mod.uiTable.check("Epic Musics", Core.settings.getBool("epicMusics", false), cons(value => {
            Core.settings.put("epicMusics", false);
        mod.uiTable.check("Scathe Cheat", Core.settings.getBool("scatheCheat", false), cons(value => {
            Core.settings.put("scatheCheat", false);
        mod.uiTable.check("Asthosus Stuff", Core.settings.getBool("asthosusStuff", false), cons(value => {
            Core.settings.put("asthosusStuff", false);
        })).row();

    if (epicMusics == true) {
        soundManager.darkMusic.add(darkMusic1, darkMusic2);
        soundManager.ambientMusic.add(ambientMusic1, ambientMusic2);
        soundManager.bossMusic.add(bossMusic);
    };
    if (scatheCheat == true) {
        unit.fogRadiusMultiplier = 1;
        unit.shootSound = Sounds.wind3;
        unit.targetAir = true;
        unit.range = 2700;
        
        unit = Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit;
        unit.maxRange = 12;
        unit.lifetime = 120 * 11;
        unit.targetAir = true;
        unit.weapons.get(0).bullet.collidesAir = true;
        unit.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        unit.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
        unit.weapons.get(0).bullet.fragBullet.lifetime = 46;

        unit = Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit;
        unit.maxRange = 12;
        unit.lifetime = 120 * 19;
        unit.targetAir = true;
        unit.weapons.get(0).bullet.collidesAir = true;
        unit.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        unit.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
        unit.weapons.get(0).bullet.fragBullet.lifetime = 46;

        unit = Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit;
        unit.maxRange = 12;
        unit.lifetime = 120 * 2.8;
        unit.targetAir = true;
        unit.weapons.get(0).bullet.collidesAir = true;
        unit.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        unit.weapons.get(0).bullet.fragBullet.spawnUnit.maxRange = 12;
        unit.weapons.get(0).bullet.fragBullet.spawnUnit.lifetime = 120 * 7.4;
        unit.weapons.get(0).bullet.fragBullet.spawnUnit.targetAir = true;
        unit.weapons.get(0).bullet.fragBullet.spawnUnit.weapons.get(0).bullet.collidesAir = true;
        unit.weapons.get(0).bullet.fragBullet.spawnUnit.weapons.get(0).bullet.buildingDamageMultiplier = 1;
    };

    Log.info("Блять!");

    if (asthosusStuff == true) {
        let asthoturret = Vars.content.block("asthosus-03c-18-verite");
        asthoturret.range = 1000;
        asthoturret.reload = 1;
        asthoturret = Vars.content.block("asthosus-03c-20-draysten-mortar");
        asthoturret.minRange = 1000;
        asthoturret.range = 1000;
        asthoturret.reload = 1;
    };
});
