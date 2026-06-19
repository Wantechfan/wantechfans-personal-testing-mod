// Vars
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const ambientMusic1 = Vars.tree.loadMusic("dreitonpiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const bossMusic = Vars.tree.loadMusic("racethesun");
const soundManager = Vars.control.sound;
const mod = Vars.mods.getMod("your-mod-name");
const scathe = Blocks.scathe;
const scatheCarbide = Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit;
const scathePhase = Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit;
const scatheSurge = Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit;
const verite = Vars.content.block("asthosus-03c-18-verite");
const mortar = Vars.content.block("asthosus-03c-20-draysten-mortar");

// Execution
Events.on(ClientLoadEvent, e => {
    // Блять!
    Log.info("Блять!");

    // Setings
    mod.uiTable.build(prov(() => {
        mod.uiTable.clear();
        mod.uiTable.add("Insyaallah akan terbuka 19 juta lapangan pekerjaan.").row();
        
        // Epic Musics
        mod.uiTable.check("Epic Musics", Core.settings.getBool("epicMusics", false), cons(value => {
            Core.settings.put("epicMusics", value);
        })).row();
        
        // Scathe Cheat
        mod.uiTable.check("Scathe Cheat", Core.settings.getBool("scatheCheat", false), cons(value => {
            Core.settings.put("scatheCheat", value);
        })).row();
        
        // Asthosus Stuff
        mod.uiTable.check("Asthosus Stuff", Core.settings.getBool("asthosusStuff", false), cons(value => {
            Core.settings.put("asthosusStuff", value);
        })).row();
    }));

    // Music
    if (Core.settings.getBool("epicMusics", false)) {
        soundManager.darkMusic.add(darkMusic1, darkMusic2);
        soundManager.ambientMusic.add(ambientMusic1, ambientMusic2);
        soundManager.bossMusic.add(bossMusic);
    }

    // Scathe Cheat
    if (Core.settings.getBool("scatheCheat", false)) {
        // General Scathe
        scathe.fogRadiusMultiplier = 1;
        scathe.shootSound = Sounds.wind3;
        scathe.targetAir = true;
        scathe.range = 2700;
        
        // Carbide
        scatheCarbide.maxRange = 12;
        scatheCarbide.lifetime = 120 * 11;
        scatheCarbide.targetAir = true;
        scatheCarbide.weapons.get(0).bullet.collidesAir = true;
        scatheCarbide.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        scatheCarbide.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
        scatheCarbide.weapons.get(0).bullet.fragBullet.lifetime = 46;

        // Phase
        scathePhase.maxRange = 12;
        scathePhase.lifetime = 120 * 19;
        scathePhase.targetAir = true;
        scathePhase.weapons.get(0).bullet.collidesAir = true;
        scathePhase.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        scathePhase.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
        scathePhase.weapons.get(0).bullet.fragBullet.lifetime = 46;

        // Surge Alloy
        scatheSurge.maxRange = 12;
        scatheSurge.lifetime = 120 * 2.8;
        scatheSurge.targetAir = true;
        scatheSurge.weapons.get(0).bullet.collidesAir = true;
        scatheSurge.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        scatheSurge.weapons.get(0).bullet.fragBullet.spawnUnit.maxRange = 12;
        scatheSurge.weapons.get(0).bullet.fragBullet.spawnUnit.lifetime = 120 * 7.4;
        scatheSurge.weapons.get(0).bullet.fragBullet.spawnUnit.targetAir = true;
        scatheSurge.weapons.get(0).bullet.fragBullet.spawnUnit.weapons.get(0).bullet.collidesAir = true;
        scatheSurge.weapons.get(0).bullet.fragBullet.spawnUnit.weapons.get(0).bullet.buildingDamageMultiplier = 1;
    };

    // Asthosus Mod
    if (Core.settings.getBool("asthosusStuff", false)) {
        verite.range = 1000;
        verite.reload = 1;
        
        mortar.minRange = 1000;
        mortar.range = 1000;
        mortar.reload = 1;
    };
});