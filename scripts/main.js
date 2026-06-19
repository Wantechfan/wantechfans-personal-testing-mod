// ============================================
// Audio Configuration
// ============================================
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const ambientMusic1 = Vars.tree.loadMusic("dreitonpiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const bossMusic = Vars.tree.loadMusic("racethesun");
const soundManager = Vars.control.sound;

// ============================================
// Constants
// ============================================
const SURGE_TOWER_MAX_NODES = 5;
const SCATHE_FOG_MULTIPLIER = 1;
const SCATHE_RANGE = 2700;
const SCATHE_SHOOT_SOUND = Sounds.wind3;
const OMURA_SHOOT_SOUND = Sounds.wind3;

// Ammo type configurations
const CARBIDE_LIFETIME = 120 * 11;
const PHASE_FABRIC_LIFETIME = 120 * 19;
const SURGE_ALLOY_LIFETIME = 120 * 2.8;
const SURGE_ALLOY_FRAG_LIFETIME = 120 * 7.4;

const UNIT_MAX_RANGE = 12;
const FRAG_UNIT_MAX_RANGE = 12;
const FRAG_UNIT_LIFETIME = 120 * 7.4;
const FRAG_BULLET_LIFETIME = 46;

// ============================================
// Helper Functions
// ============================================

let scatheCheat = false;
/**
 * Configure weapon bullet properties for a unit
 * @param {Object} unit - The unit to configure
 */
function configureUnitWeapon(unit) {
    if (unit.weapons && unit.weapons.length > 0) {
        const weapon = unit.weapons.get(0);
        if (weapon.bullet) {
            weapon.bullet.collidesAir = true;
            weapon.bullet.buildingDamageMultiplier = 1;
            
            // Configure fragment bullet if it exists
            if (weapon.bullet.fragBullet) {
                weapon.bullet.fragBullet.buildingDamageMultiplier = 1;
                weapon.bullet.fragBullet.lifetime = FRAG_BULLET_LIFETIME;
            }
        }
    }
}

/**
 * Configure spawn unit properties for fragment bullets
 * @param {Object} spawnUnit - The spawn unit to configure
 */
function configureFragmentSpawnUnit(spawnUnit) {
    spawnUnit.maxRange = FRAG_UNIT_MAX_RANGE;
    spawnUnit.lifetime = FRAG_UNIT_LIFETIME;
    spawnUnit.targetAir = true;
    
    if (spawnUnit.weapons && spawnUnit.weapons.length > 0) {
        const weapon = spawnUnit.weapons.get(0);
        if (weapon.bullet) {
            weapon.bullet.collidesAir = true;
            weapon.bullet.buildingDamageMultiplier = 1;
        }
    }
}

/**
 * Configure standard ammo unit (Carbide or Phase Fabric)
 * @param {Object} unit - The unit to configure
 * @param {number} lifetime - Unit lifetime in ticks
 */
function configureStandardAmmoUnit(unit, lifetime) {
    unit.maxRange = UNIT_MAX_RANGE;
    unit.lifetime = lifetime;
    unit.targetAir = true;
    configureUnitWeapon(unit);
}

/**
 * Configure surge alloy ammo unit with fragment spawning
 * @param {Object} unit - The surge alloy unit to configure
 */
function configureSurgeAlloyUnit(unit) {
    unit.maxRange = UNIT_MAX_RANGE;
    unit.lifetime = SURGE_ALLOY_LIFETIME;
    unit.targetAir = true;
    
    // Configure main weapon
    if (unit.weapons && unit.weapons.length > 0) {
        const weapon = unit.weapons.get(0);
        if (weapon.bullet) {
            weapon.bullet.collidesAir = true;
            weapon.bullet.buildingDamageMultiplier = 1;
            
            // Configure fragment spawn unit if it exists
            if (weapon.bullet.fragBullet && weapon.bullet.fragBullet.spawnUnit) {
                configureFragmentSpawnUnit(weapon.bullet.fragBullet.spawnUnit);
            }
        }
    }
}

// ============================================
// Main Event Handler
// ============================================
Events.on(ClientLoadEvent, e => {
    // Configure audio tracks
    soundManager.darkMusic.add(darkMusic1, darkMusic2);
    soundManager.ambientMusic.add(ambientMusic1, ambientMusic2);
    soundManager.bossMusic.add(bossMusic);

    Vars.ui.settings.game.addSettingsTable("Tetapi Hari Ini Di Jogja Saya Sampaikan Saya Akan Lawan!", extend(SettingsTable, {
        build(table) {
            table.check("Scathe Cheat", Core.settings.getBool("scatheCheat", b);
        }).row();
    
    // Configure Surge Tower
    Blocks.surgeTower.maxNodes = SURGE_TOWER_MAX_NODES;
    if scatheCheat == true {
        // ============================================
        // Configure Scathe Block
        // ============================================
        let scatheUnit = Blocks.scathe;
        scatheUnit.fogRadiusMultiplier = SCATHE_FOG_MULTIPLIER;
        scatheUnit.shootSound = SCATHE_SHOOT_SOUND;
        scatheUnit.targetAir = true;
        scatheUnit.range = SCATHE_RANGE;
    
        // ============================================
        // Configure Scathe Ammo Types
        // ============================================
    
        // Carbide ammo
        let carbideUnit = Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit;
        configureStandardAmmoUnit(carbideUnit, CARBIDE_LIFETIME);
    
        // Phase Fabric ammo
        let phaseFabricUnit = Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit;
        configureStandardAmmoUnit(phaseFabricUnit, PHASE_FABRIC_LIFETIME);
    
        // Surge Alloy ammo (with fragment spawning)
        let surgeAlloyUnit = Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit;
        configureSurgeAlloyUnit(surgeAlloyUnit);
    }
    // ============================================
    // Asthosus Mod Support (Optional)
    // ============================================
    Log.info("Checking for Asthosus content...");
    
    if (Vars.content.block("asthosus-03c-18-verite")) {
        Log.info("Asthosus content found! Modifying it...");
        
        // Configure Verite turret
        let asthoVerite = Vars.content.block("asthosus-03c-18-verite");
        asthoVerite.range = 1000;
        asthoVerite.reload = 1;
        
        // Configure Draysten Mortar turret
        let asthoDraysten = Vars.content.block("asthosus-03c-20-draysten-mortar");
        asthoDraysten.minRange = 1000;
        asthoDraysten.range = 1000;
        asthoDraysten.reload = 1;
    } else {
        Log.info("Asthosus mod not found. Skipping Asthosus modifications.");
    }*/ //Disabled for a while.
    
    // ============================================
    // Crawler Unit Configuration (Optional)
    // ============================================
    // Note: This code is currently disabled as it may cause imbalance
    // Uncomment if needed:
    /*
    if (UnitTypes.crawler && UnitTypes.crawler.weapons && UnitTypes.crawler.weapons.length > 0) {
        let crawlerBullet = UnitTypes.crawler.weapons.get(0).bullet;
        crawlerBullet.splashDamageRadius = 10000;
        crawlerBullet.buildingDamageMultiplier = 1;
        crawlerBullet.splashDamage = 10000;
        crawlerBullet.rangeOverride = 10000;
    }
    */
});
