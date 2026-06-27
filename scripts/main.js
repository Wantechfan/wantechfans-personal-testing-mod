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
Events.on(ClientLoadEvent, () => {
    const waterCable = Vars.content.getByName(ContentType.block, "wantech-test-mod-water-power-cable");
    const transition = Vars.content.getByName(ContentType.block, "wantech-test-mod-cable-transition-node");
    const root = Blocks.powerNode;

    if (root && root.techNode != null && transition && waterCable) {
        
        // Ensure standard child tracking arrays are initialized
        if (root.techNode.children == null) root.techNode.children = new Seq();

        // --- STEP 1: PURGE PRE-EXISTING NODES TO STOP THE DUPLICATION ---
        // This strips out any duplicates remaining from previous layout compilations
        root.techNode.children.remove(t => t.content === transition || t.content === waterCable);
        
        const globalRoot = root.techNode.rootNode;
        if (globalRoot != null && globalRoot.all != null) {
            globalRoot.all.remove(t => t.content === transition || t.content === waterCable);
        }

        // --- STEP 2: BUILD CLEAN INSTANCES ---
        const researchCostTrans = ItemStack.with(
            Items.copper, 45,
            Items.lead, 30,
            Items.silicon, 15
        );
        
        const researchCostCab = ItemStack.with(
            Items.copper, 15,
            Items.lead, 9
        );

        const customNodeA = new TechTree.TechNode(root.techNode, transition, researchCostTrans);
        const customNodeB = new TechTree.TechNode(customNodeA, waterCable, researchCostCab);
        
        // --- STEP 3: ASSIGN FIXED INDICES (OVERWRITE, DO NOT USE .add()) ---
        transition.techNode = customNodeA;
        waterCable.techNode = customNodeB;

        // Force overwrite the internal list with a singular-element array
        transition.techNodes = Seq.with(customNodeA);
        waterCable.techNodes = Seq.with(customNodeB);

        // Inherit planet definitions
        if (root.techNode.shownPlanets != null) {
            customNodeA.shownPlanets.clear();
            customNodeB.shownPlanets.clear();
            customNodeA.shownPlanets.addAll(root.techNode.shownPlanets);
            customNodeB.shownPlanets.addAll(root.techNode.shownPlanets);
        }

        // --- STEP 4: RE-INJECT FRESH BRANCHES ---
        customNodeA.children = Seq.with(customNodeB);
        root.techNode.children.add(customNodeA);

        if (globalRoot != null && globalRoot.all != null) {
            globalRoot.all.add(customNodeA);
            globalRoot.all.add(customNodeB);
        }

        Log.info("Tech tree layout completely sanitized and refreshed!");
    } else {
        Log.err("Tech tree injection failed! Variable fields evaluating to null.");
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
