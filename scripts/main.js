// Info for the AI, this is a Mindsutry mod
// Music constants and blocks
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3")
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1")
const darkMusic3 = Vars.tree.loadMusic("winterWind")
const ambientMusic1 = Vars.tree.loadMusic("dreitonPiano")
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2")
const ambientMusic3 = Vars.tree.loadMusic("marimba")
const bossMusic = Vars.tree.loadMusic("racethesun")
require("blocks")

/* // Plenet
Events.on(ContentInitEvent, () => {
    // BLYAAAAAAAAAAT
    Log.info("Блять!");
    
    // Obj
    const teknet = new Planet("teknet", Planets.sun, 1.5, 3);
    
    // Mesh from mesh.hjson
    teknet.meshLoader = () => {
        return new MultiMesh(
            new HexMesh(teknet, 6),
            new NoiseMesh(
                teknet,
                7,           // seed
                3.7,         // octaves
                1.1,         // persistence
                0.6,         // scale
                0.55,        // magnitude
                0.3,         // min
                0.8,         // max
                Color.valueOf("486ACD"),
                Color.valueOf("7090EA"),
                5,           // details
                1.5,         // distort
                1.1,         // blend
                0.7          // seed offset
            )
        );
    };

    // Jenerator
    teknet.generator = extend(PlanetGenerator, {
        init: function() {
            this.super$init(); 
        },
        generateSector: function(sector) {},
        getHeight: function(position) { 
            return 0.4; 
        },
        getColor: function(position) { 
            return Color.valueOf("3a8e47"); 
        } 
    });
    
    // Atmosfahh
    teknet.hasAtmosphere = true;
    teknet.atmosphereColor = Color.valueOf("2dbd53"); 
    teknet.atmosphereRadIn = 0.02;
    teknet.atmosphereRadOut = 0.28;

    // Orbit
    teknet.orbitRadius = 47.5;
    teknet.orbitTime = 327159.22;
    
    // Bullshits
    teknet.radius = 2.2; 
    teknet.accessible = true;
    teknet.visible = true;
    teknet.sectorSeed = 1337;
    teknet.startSector = 0;
    teknet.alwaysUnlocked = true;
    
    teknet.ruleSetter = rules => {
        rules.waveTimer = true;
        rules.waves = true;
    };
}); */

Events.on(ClientLoadEvent, () => {
    // Yet another constants
    const soundManager = Vars.control.sound;
    const scathe = Blocks.scathe;
    const scatheCarbide = Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit;
    const scathePhase = Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit;
    const scatheSurge = Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit;
    // Mana 19 juta lapangan pekerjaannya?
    Vars.ui.settings.addCategory("Insyaallah akan terbuka 19 juta lapangan pekerjaan", Icon.settings, table => {
        // Chek'
        function addCustomCheck(title, key, defaultValue) {
            // Chek'box
            table.check(title, Core.settings.getBool(key, defaultValue), t => {
                Core.settings.put(key, t);
            }).left().row(); // Align left and move to the next row
        }
        addCustomCheck("Epik Gyatthoven and Others Song", "epicMusics", false);
        addCustomCheck("Scathe Have Seizures", "scatheCheat", false);
        addCustomCheck("Verite and Mortar Have Serizures", "asthosusStuff", false);
    });

    // Music setting
    if (Core.settings.getBool("epicMusics", false)) {
        soundManager.darkMusic.addAll(darkMusic1, darkMusic2, darkMusic3);
        soundManager.ambientMusic.addAll(ambientMusic1, ambientMusic2, ambientMusic3);
        soundManager.bossMusic.add(bossMusic);
    }

    // Scathe cheat
    if (Core.settings.getBool("scatheCheat", false) && scathe) {
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

    // Asthosus
    if (Vars.mods.getMod("asthosus")) {
        if (Core.settings.getBool("asthosusStuff", false)) {
            const verite = Vars.content.block("asthosus-03c-18-verite");
            const mortar = Vars.content.block("asthosus-03c-20-draysten-mortar");
            verite.range = 1000;
            verite.reload = 1;
            mortar.minRange = 1000;
            mortar.range = 1000;
            mortar.reload = 1;
        }
    }
});
