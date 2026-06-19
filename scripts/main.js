// Vars
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const ambientMusic1 = Vars.tree.loadMusic("dreitonpiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const bossMusic = Vars.tree.loadMusic("racethesun");
const soundManager = Vars.control.sound;
const mod = Vars.mods.getMod("your-mod-name");

// Execution
Events.on(ClientLoadEvent, e => {
    // 1. Build the UI Settings Table
    mod.uiTable.build(prov(() => {
        mod.uiTable.clear();
        mod.uiTable.add("Insyaallah akan terbuka 19 juta lapangan pekerjaan.").row();
        
        // Epic Musics Checkbox
        mod.uiTable.check("Epic Musics", Core.settings.getBool("epicMusics", false), cons(value => {
            Core.settings.put("epicMusics", value);
        })).row();
        
        // Scathe Cheat Checkbox
        mod.uiTable.check("Scathe Cheat", Core.settings.getBool("scatheCheat", false), cons(value => {
            Core.settings.put("scatheCheat", value);
        })).row();
        
        // Asthosus Stuff Checkbox
        mod.uiTable.check("Asthosus Stuff", Core.settings.getBool("asthosusStuff", false), cons(value => {
            Core.settings.put("asthosusStuff", value);
        })).row();
    }));

    // 2. Apply modifications based on saved settings when client loads
    
    // Music Mod
    if (Core.settings.getBool("epicMusics", false)) {
        soundManager.darkMusic.add(darkMusic1, darkMusic2);
        soundManager.ambientMusic.add(ambientMusic1, ambientMusic2);
        soundManager.bossMusic.add(bossMusic);
    }

    // Scathe Cheat Mod
    if (Core.settings.getBool("scatheCheat", false)) {
        let unit = Blocks.scathe;
        unit.fogRadiusMultiplier = 1;
        unit.shootSound = Sounds.wind3;
        unit.targetAir = true;
        unit.range = 2700;
        
        let unit1 = Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit;
        unit1.maxRange = 12;
        unit1.lifetime = 120 * 11;
        unit1.targetAir = true;
        unit1.weapons.get(0).bullet.collidesAir = true;
        unit1.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        unit1.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
        unit1.weapons.get(0).bullet.fragBullet.lifetime = 46;

        let unit2 = Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit;
        unit2.maxRange = 12;
        unit2.lifetime = 120 * 19;
        unit2.targetAir = true;
        unit2.weapons.get(0).bullet.collidesAir = true;
        unit2.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        unit2.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
        unit2.weapons.get(0).bullet.fragBullet.lifetime = 46;

        let unit3 = Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit;
        unit3.maxRange = 12;
        unit3.lifetime = 120 * 2.8;
        unit3.targetAir = true;
        unit3.weapons.get(0).bullet.collidesAir = true;
        unit3.weapons.get(0).bullet.buildingDamageMultiplier = 1;
        unit3.weapons.get(0).bullet.fragBullet.spawnUnit.maxRange = 12;
        unit3.weapons.get(0).bullet.fragBullet.spawnUnit.lifetime = 120 * 7.4;
        unit3.weapons.get(0).bullet.fragBullet.spawnUnit.targetAir = true;
        unit3.weapons.get(0).bullet.fragBullet.spawnUnit.weapons.get(0).bullet.collidesAir = true;
        unit3.weapons.get(0).bullet.fragBullet.spawnUnit.weapons.get(0).bullet.buildingDamageMultiplier = 1;
    }

    Log.info("Блять!");

    // Asthosus Mod
    if (Core.settings.getBool("asthosusStuff", false)) {
        let asthoturret = Vars.content.block("asthosus-03c-18-verite");
        if (asthoturret != null) {
            asthoturret.range = 1000;
            asthoturret.reload = 1;
        }
        
        let asthomortar = Vars.content.block("asthosus-03c-20-draysten-mortar");
        if (asthomortar != null) {
            asthomortar.minRange = 1000;
            asthomortar.range = 1000;
            asthomortar.reload = 1;
        }
    }
});
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
