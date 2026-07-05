// Keep music loading here as it's usually safe, or move inside if needed
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const darkMusic3 = Vars.tree.loadMusic("winterWind");
const ambientMusic1 = Vars.tree.loadMusic("dreitonPiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const ambientMusic3 = Vars.tree.loadMusic("marimba");
const bossMusic = Vars.tree.loadMusic("racethesun");

// 1. Declare a persistent global flag outside the event callback scope
// This value is preserved across multiple ClientLoadEvent executions
require("blocks");
// Wait for the game to initialize content before registering the planet
Events.on(ContentInitEvent, () => {
    
    // 1. Define a custom map generator (determines sector geography)
    const myGenerator = extend(PlanetGenerator, {
        // Basic noise-based height generation
        getHeight(position) {
            return Mathf.noise(position.x, position.y, 2, 0.55);
        },
        // Basic color mapping for the map preview
        getColor(position) {
            return Color.valueOf("5a8251"); // Mossy green
        }
    });

    // 2. Instantiate the Planet class
    // Parameters: ("internal-name", parentPlanet, radius)
    const myPlanet = extend(Planet, "my-planet", Planets.serpulo, 1, {
        generator: myGenerator,
        localizedName: "Test plenet",
        accessible: true, // Makes it playable
        alwaysUnlocked: true,
        visible: true,
        atmosphereColor: Color.valueOf("4b729f"),
        atmosphereRad: 0.25,
        startSector: 15,
        
        // Items allowed on this planet
        itemWhitelist: Seq.with(Items.copper, Items.lead, Items.silicon) 
    });

    // 3. Define the planet's visual 3D mesh (what it looks like in space)
    myPlanet.meshLoader = () => new HexSkyMesh(myPlanet, 6, 0.1, 0.2, 2, 
    Color.valueOf("5a8251"), 
    Color.valueOf("3a5e3b"), 
    Color.valueOf("2b422c")
    );

    // 4. Force register the content into the game's registry
    Vars.content.planets().add(myPlanet);
});
Events.on(ClientLoadEvent, () => {
    Log.info("Блять!");
    // Safely fetch content now that ClientLoadEvent has fired
    const soundManager = Vars.control.sound;
    const scathe = Blocks.scathe;
    const scatheCarbide = Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit;
    const scathePhase = Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit;
    const scatheSurge = Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit;
    // Settings Configuration
    Vars.ui.settings.addCategory("Insyaallah akan terbuka 19 juta lapangan pekerjaan", Icon.settings, table => {
    
    // Helper function to create checkboxes manually since checkPref is strict
    function addCustomCheck(title, key, defaultValue) {
        // Create the checkbox and initialize its state based on saved settings
        table.check(title, Core.settings.getBool(key, defaultValue), t => {
            Core.settings.put(key, t);
        }).left().row(); // Align left and move to the next row
    }

    // Now you can name them whatever you want!
    addCustomCheck("Epik Gyatthoven and Others Song", "epicMusics", false);
    addCustomCheck("Scathe Have Seizures", "scatheCheat", false);
    addCustomCheck("Verite and Mortar Have Serizures", "asthosusStuff", false);
    
});



    // Music Setup (Fixed .addAll)
    if (Core.settings.getBool("epicMusics", false)) {
        soundManager.darkMusic.addAll(darkMusic1, darkMusic2, darkMusic3);
        soundManager.ambientMusic.addAll(ambientMusic1, ambientMusic2, ambientMusic3);
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
