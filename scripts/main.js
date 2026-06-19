// Keep music loading here as it's usually safe, or move inside if needed
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const ambientMusic1 = Vars.tree.loadMusic("dreitonpiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const bossMusic = Vars.tree.loadMusic("racethesun");

// Execution
Events.on(ClientLoadEvent, e => {
    Log.info("Блять!");

    // Safely fetch content now that ClientLoadEvent has fired
    const soundManager = Vars.control.sound;
    const scathe = Blocks.scathe;
    const scatheCarbide = Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit;
    const scathePhase = Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit;
    const scatheSurge = Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit;
    const verite = Vars.content.block("asthosus-03c-18-verite");
    const mortar = Vars.content.block("asthosus-03c-20-draysten-mortar");

    // Settings Configuration
    Vars.ui.settings.addCategory("@category.mod.name", Icon.settings, table => {
        table.Button("Epic Musics", Core.settings.getBool("epicMusics", false), cons(value => {
            Core.settings.put("epicMusics", value);
        })).row();
        
        table.Button("Scathe Cheat", Core.settings.getBool("scatheCheat", false), cons(value => {
            Core.settings.put("scatheCheat", value);
        })).row();
        
        table.Button("Asthosus Stuff", Core.settings.getBool("asthosusStuff", false), cons(value => {
            Core.settings.put("asthosusStuff", value);
        })).row();
    });


    // Music Setup (Fixed .addAll)
    if (Core.settings.getBool("epicMusics", false)) {
        soundManager.darkMusic.addAll(darkMusic1, darkMusic2);
        soundManager.ambientMusic.addAll(ambientMusic1, ambientMusic2);
        soundManager.bossMusic.add(bossMusic);
    }

    // Scathe Cheat
    if (Core.settings.getBool("scatheCheat", false) && scathe) {
        // General Scathe
        scathe.fogRadiusMultiplier = 1;
        scathe.shootSound = Sounds.wind3;
        scathe.targetAir = true;
        scathe.range = 2700;
        
        // Carbide
        if (scatheCarbide) {
            scatheCarbide.maxRange = 12;
            scatheCarbide.lifetime = 120 * 11;
            scatheCarbide.targetAir = true;
            scatheCarbide.weapons.get(0).bullet.collidesAir = true;
            scatheCarbide.weapons.get(0).bullet.buildingDamageMultiplier = 1;
            scatheCarbide.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
            scatheCarbide.weapons.get(0).bullet.fragBullet.lifetime = 46;
        }

        // Phase
        if (scathePhase) {
            scathePhase.maxRange = 12;
            scathePhase.lifetime = 120 * 19;
            scathePhase.targetAir = true;
            scathePhase.weapons.get(0).bullet.collidesAir = true;
            scathePhase.weapons.get(0).bullet.buildingDamageMultiplier = 1;
            scathePhase.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1;
            scathePhase.weapons.get(0).bullet.fragBullet.lifetime = 46;
        }

        // Surge Alloy
        if (scatheSurge) {
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
        }
    }

    // Asthosus Mod
    if (Core.settings.getBool("asthosusStuff", false)) {
        if (verite) {
            verite.range = 1000;
            verite.reload = 1;
        }
        if (mortar) {
            mortar.minRange = 1000;
            mortar.range = 1000;
            mortar.reload = 1;
        }
    }
});
