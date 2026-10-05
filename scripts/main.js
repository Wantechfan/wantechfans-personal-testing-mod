// Heading ig
const musics = new ObjectMap()

// Muziks
const darkMusic1 = Vars.tree.loadMusic("moonlightSonata3")
const darkMusic2 = Vars.tree.loadMusic("moonlightSonata1")
const darkMusic3 = Vars.tree.loadMusic("winterWind")
const darkMusic4 = Vars.tree.loadMusic("torrent")
const ambientMusic1 = Vars.tree.loadMusic("dreitonPiano")
const ambientMusic2 = Vars.tree.loadMusic("moonlightSonata2")
const ambientMusic3 = Vars.tree.loadMusic("moonlightSonata3Marimba")
const ambientMusic4 = Vars.tree.loadMusic("clairDeLune")
const ambientMusic5 = Vars.tree.loadMusic("hammerklavier")
const ambientMusic6 = Vars.tree.loadMusic("nocturne-9-2")
const ambientMusic7 = Vars.tree.loadMusic("laCampanella")
const ambientMusic8 = Vars.tree.loadMusic("symphony5")
const ambientMusic9 = Vars.tree.loadMusic("preludeGMinor")
const bossMusic = Vars.tree.loadMusic("raceTheSun")

// Komposers
const anu = "Anuke"
const bee = "Ludwig v. Beethoven"
const cho = "Frédéric Chopin"
const deb = "Claude Debussy"
const rac = "Sergei Rachmaninoff"
const liz = "Franz Lizst"
const sb = "Scott Buckley"
const c418 = "C418"

// Informetion
function MusicInfo(name, author) {
    this.name = name;
    this.author = author;
}

// Your average Mindihtry musics
musics.put("game1", new MusicInfo("Game 1", anu));
musics.put("game2", new MusicInfo("Game 2", anu));
musics.put("game3", new MusicInfo("Game 3", anu));
musics.put("game4", new MusicInfo("Game 4", anu));
musics.put("game5", new MusicInfo("Game 5", anu));
musics.put("game6", new MusicInfo("Game 6", anu));
musics.put("game7", new MusicInfo("Game 7", anu));
musics.put("game8", new MusicInfo("Game 8", anu));
musics.put("game9", new MusicInfo("Game 9", anu));
musics.put("fine", new MusicInfo("Fine", anu));
musics.put("boss1", new MusicInfo("Boss 1", anu));
musics.put("boss2", new MusicInfo("Boss 2", anu));

// Fire musics
musics.put("moonlightSonata3", new MusicInfo("Moonlight Sonata 3rd mvt", bee));
musics.put("moonlightSonata1", new MusicInfo("Moonlight Sonata 1st mvt", bee));
musics.put("winterWind", new MusicInfo("Winter Wind", cho));
musics.put("torrent", new MusicInfo("Torrent", cho));
musics.put("dreitonPiano", new MusicInfo("Dreiton Piano", c418));
musics.put("moonlightSonata2", new MusicInfo("Moonlight Sonata 2nd mvt", bee));
musics.put("moonlightSonata3Marimba", new MusicInfo("Moonlight Sonata 3rd mvt (Marimba)", bee));
musics.put("clairDeLune", new MusicInfo("Clair de Lune", deb));
musics.put("hammerklavier", new MusicInfo("Hammerklavier", bee));
musics.put("nocturne-9-2", new MusicInfo("Nocturne Op. 9 No. 2", cho));
musics.put("laCampanella", new MusicInfo("La Campanella", liz));
musics.put("symphony5", new MusicInfo("Symphony No. 5", bee));
musics.put("preludeGMinor", new MusicInfo("Prelude in G Minor", rac));
musics.put("raceTheSun", new MusicInfo("Race The Sun", sb));

var currentMusField = null;
try {
    currentMusField = Vars.control.sound.getClass().getDeclaredField("current");
    currentMusField.setAccessible(true);
} catch (e) {
    Log.err("Had a brain aneurysm when trying to reflect sound control music field: " + e);
}

function getCurrentMusic() {
    if (!currentMusField) return null;
    try {
        return currentMusField.get(Vars.control.sound);
    } catch (e) {
        return null;
    }
}

var lastMusic = null;

Events.run(Trigger.update, () => {
    if (!Vars.state.isGame()) return;

    var current = getCurrentMusic();

    if (current != null && current != lastMusic) {
        lastMusic = current;

        var filename = current.file.nameWithoutExtension();
        
        if (musics.containsKey(filename)) {
            var info = musics.get(filename);
            
            var iconDrawable;
            if (info.iconName && info.iconName !== none && Core.atlas.has(info.iconName)) {
                iconDrawable = new TextureRegionDrawable(Core.atlas.find(info.iconName));
            } else {
                iconDrawable = Icon.play;
            }

            var toast = new Table(Styles.black6);
            toast.margin(12);
            toast.image(iconDrawable).size(32).padRight(8);
            toast.add("Now Playing: " + info.name + " - " + info.author).color(Pal.accent);
            toast.pack();

            toast.setPosition(Core.graphics.getWidth() / 2, Core.graphics.getHeight() - 100, Align.center);
            toast.actions(
                Actions.fadeIn(0.3),
                Actions.delay(3.0),
                Actions.fadeOut(0.5),
                Actions.remove()
            );

            Vars.ui.hudGroup.addChild(toast);
        }
    }
});

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
        soundManager.darkMusic.addAll(darkMusic1, darkMusic2, darkMusic3, darkMusic4);
        soundManager.ambientMusic.addAll(ambientMusic1, ambientMusic2, ambientMusic3, ambientMusic4, ambientMusic5, ambientMusic6, ambientMusic7, ambientMusic8, ambientMusic9);
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
});
