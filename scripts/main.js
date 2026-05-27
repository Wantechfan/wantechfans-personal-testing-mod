const musik = Vars.tree.loadMusic("aufdieheide"); 

Events.on(ClientLoadEvent, e => { 
    Vars.control.sound.ambientMusic.add(musik); 
    UnitTypes.omura.weapons.get(0).shootSound = Sounds.wind3;
    Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit.maxRange = 12f;
    Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit.lifetime = 120f * 11f;
    Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit.targetAir = true;
    Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit.weapons.get(0).bullet.collidesAir = true;
    Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit.weapons.get(0).bullet.buildingDamageMultiplier = 1f;
    Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1f;
    Blocks.scathe.ammoTypes.get(Items.carbide).spawnUnit.weapons.get(0).bullet.fragBullet.lifetime = 46f;

    Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit.maxRange = 12f;
    Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit.lifetime = 120f * 19f;
    Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit.targetAir = true;
    Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit.weapons.get(0).bullet.collidesAir = true;
    Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit.weapons.get(0).bullet.buildingDamageMultiplier = 1f;
    Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit.weapons.get(0).bullet.fragBullet.buildingDamageMultiplier = 1f;
    Blocks.scathe.ammoTypes.get(Items.phaseFabric).spawnUnit.weapons.get(0).bullet.fragBullet.lifetime = 46f;

    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.maxRange = 12f;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.lifetime = 120f * 2.8f;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.targetAir = true;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.weapons.get(0).bullet.collidesAir = true;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.weapons.get(0).bullet.buildingDamageMultiplier = 1f;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.weapons.get(0).bullet.fragBullet.spawnUnit.maxRange = 12f;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.weapons.get(0).bullet.fragBullet.spawnUnit.lifetime = 120f * 7.4f;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.weapons.get(0).bullet.fragBullet.spawnUnit.targetAir = true;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.weapons.get(0).bullet.fragBullet.weapons.get(0).bullet.collidesAir = true;
    Blocks.scathe.ammoTypes.get(Items.surgeAlloy).spawnUnit.weapons.get(0).bullet.fragBullet.weapons.get(0).bullet.buildingDamageMultiplier = 1f;
});
