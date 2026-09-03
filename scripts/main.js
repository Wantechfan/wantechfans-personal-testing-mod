const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3")
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1")
const darkMusic3 = Vars.tree.loadMusic("winterWind")
const ambientMusic1 = Vars.tree.loadMusic("dreitonPiano")
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2")
const ambientMusic3 = Vars.tree.loadMusic("marimba")
const bossMusic = Vars.tree.loadMusic("racethesun")

Events.on(WorldLoadEvent, e => {
    Vars.state.rules.borderDarkness = false;
});

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
    
    const oldWorld = Vars.world;
    const customWorld = extend(Packages.mindustry.core.World, {
        getDarkness(x, y) {
            let dark = 0;
            let edgeBlend = 2;
            let edgeDst;

            if (!Vars.state.rules.limitMapArea) {
                edgeDst = Math.min(x, Math.min(y, Math.min(-(x - (this.tiles.width - 1)), -(y - (this.tiles.height - 1)))));
            } else {
                edgeDst = Math.min(x - Vars.state.rules.limitX,
                    Math.min(y - Vars.state.rules.limitY,
                    Math.min(-(x - (Vars.state.rules.limitX + Vars.state.rules.limitWidth - 1)), -(y - (Vars.state.rules.limitY + Vars.state.rules.limitHeight - 1)))));
            }

            if (edgeDst <= edgeBlend) {
                dark = Math.max((edgeBlend - edgeDst) * (4 / edgeBlend), dark);
            }

            let tile = this.tile(x, y);
            if (tile != null && tile.isDarkened()) {
                dark = Math.max(dark, tile.data);
            }

            return dark;
        }
    });

    Vars.world = customWorld;

    if (oldWorld.tiles != null) {
        Vars.world.tiles = oldWorld.tiles;
    }

    function scrambleString(str) {
        var chars = str.split('');
        for (var i = chars.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;
        }
        return chars.join('');
    }

    function scrambleValue(value) {
        var valStr = String(value);
        var tagRegex = /(\[[^\]]*\]|\{[0-9]+\})/g;
        var parts = valStr.split(tagRegex);

        return parts
            .map(function(part) {
                if (part.match(/^(\[[^\]]*\]|\{[0-9]+\})$/)) {
                    return part;
                }
                return scrambleString(part);
            })
            .join('');
    }

    Events.on(ClientLoadEvent, function() {
        try {
            var properties = Core.bundle.getProperties();
        
            if (!properties) {
                Log.err("Core.bundle properties object is no exist!");
                return;
            }

            var keys = properties.keys();
            while (keys.hasNext()) {
                var key = keys.next();
                var originalValue = properties.get(key);

                if (originalValue) {
                    properties.put(key, scrambleValue(originalValue));
                }
            }

            Log.info("Bundle scrambled for good.");
        } catch(e) {
            Log.err("Had a brain failure when doing this: " + e);
        }
    });
});
