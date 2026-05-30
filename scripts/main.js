const musik = Vars.tree.loadMusic("aufdieheide"); 
let unit = Blocks.scathe;

Events.on(ClientLoadEvent, e => { 
    Vars.control.sound.ambientMusic.add(musik); 
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

    UnitTypes.emanate.weapons.add(new Weapon("large-weapon") {{
        reload = 20;
        x = 4;
        y = 0;
        shootSound = Sounds.wind3;
        bullet = new BasicBulletType(4, 50) {{
            lifetime = 60;
            width = 10
            height = 12;
            speed = 4;
            damage = 100000;
        }};
    }});
    if Vars.content.block("asthosus-03c-01-catapult") {
        Log.info("Asthosus content found!");
    } else {
        Log.info("Nu Asthosus?")
    }
});
