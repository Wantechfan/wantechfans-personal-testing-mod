// I need to keep things simple so I can understand everything.
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3");
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1");
const ambientMusic1 = Vars.tree.loadMusic("dreitonpiano");
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2");
const bossMusic = Vars.tree.loadMusic("racethesun");
const soundManager = Vars.control.sound;
let unit = Blocks.scathe;

Events.on(ClientLoadEvent, e => {
    soundManager.darkMusic.add(darkMusic1, darkMusic2);
    soundManager.ambientMusic.add(ambientMusic1, ambientMusic2);
    soundManager.bossMusic.add(bossMusic);
    UnitTypes.omura.weapons.get(0).shootSound = Sounds.wind3;

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

    Log.info("Блять!");

    if (Vars.content.block("asthosus-03c-01-catapult")) {
        Log.info("Asthosus content found!");
    } else {
        Log.info("Nu Asthosus?");
    };
    unit = UnitTypes.crawler.weapons.get(0).bullet;
    unit.splashDamageRadius = 10000;
    unit.buildingDamageMultiplier = 1;
    unit.splashDamage = 10000;
    unit.rangeOverride = 10000;
});
