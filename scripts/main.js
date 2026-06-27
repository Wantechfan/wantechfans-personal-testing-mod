// Keep music loading here as it's usually safe, or move inside if needed
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const darkMusic3 = Vars.tree.loadMusic("winterWind");
const ambientMusic1 = Vars.tree.loadMusic("dreitonPiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const ambientMusic3 = Vars.tree.loadMusic("marimba");
const bossMusic = Vars.tree.loadMusic("racethesun");

// Execution
require("blocks"); 
Events.on(ClientLoadEvent, e => {
    const researchCostTrans = ItemStack.with(
        Items.copper, 45,
        Items.lead, 30,
        Items.silicon, 15
    );
    
    const researchCostCab = ItemStack.with(
        Items.copper, 15,
        Items.lead, 9
    );

    // Fetch your custom blocks
    const waterCable = Vars.content.getByName(ContentType.block, "wantech-test-mod-water-power-cable");
    const transition = Vars.content.getByName(ContentType.block, "wantech-test-mod-cable-transition-node");
    const root = Blocks.powerNode;

    // Check if the vanilla powerNode and its techNode exist
    if (root && root.techNode != null) {
        
        // 1. Create the transition node attached to the vanilla powerNode's techNode
        const customNodeA = new TechTree.TechNode(root.techNode, transition, researchCostTrans);
        root.techNode.children.add(customNodeA);
        
        // FIX: The parent node for waterCable is customNodeA, NOT transition.techNode
        const customNodeB = new TechTree.TechNode(customNodeA, waterCable, researchCostCab);
        customNodeA.children.add(customNodeB);

        Log.info("Tech tree injection successful!");
    } else {
        Log.err("Failed to inject into tech tree: powerNode or its techNode is missing.");
    }
    
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
