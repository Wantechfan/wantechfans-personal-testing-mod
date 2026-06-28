// Fixed and upgraded by Gemini for Mindustry V8 compatibility

const waterCable = extend(PowerNode, "water-power-cable", {
    size: 1,
    health: 80,
    maxNodes: 0,
    laserRange: 0,
    floating: true,
    placeableLiquid: true,  // FIX {1}: Ensures it can only be placed on liquids
    placeableOn: false,     // FIX {1}: Block placement validation forcing strictly liquid environments
    solid: false,
    hasShadow: false,
    drawLayer: Layer.floor, // Forces it to draw flat under units/ships

    load: function() {
        this.super$load();
        
        // 1. Load Base Sprites (Normal)
        this.singleRegion = Core.atlas.find(this.name + "-single");
        this.endRegion = Core.atlas.find(this.name + "-end");
        this.straightRegion = Core.atlas.find(this.name + "-straight");
        this.bendRegion = Core.atlas.find(this.name + "-bend");
        this.tRegion = Core.atlas.find(this.name + "-t");
        this.fourWayRegion = Core.atlas.find(this.name + "-four");

        // 2. Load Glow Sprites
        this.singleGlow = Core.atlas.find(this.name + "-single-glow");
        this.endGlow = Core.atlas.find(this.name + "-end-glow");
        this.straightGlow = Core.atlas.find(this.name + "-straight-glow");
        this.bendGlow = Core.atlas.find(this.name + "-bend-glow");
        this.tGlow = Core.atlas.find(this.name + "-t-glow");
        this.fourWayGlow = Core.atlas.find(this.name + "-four-glow");
    },

    // FIX {3}: Prevents any other standard power layout block from scanning and linking to this cable
    canLink: function(tile, other) {
        if (!other) return false;
        return other.block === this || other.block === cableTransitionNode;
    }
});

// V8 Building definition for the cable
waterCable.buildType = function() {
    return extend(PowerNode.PowerNodeBuild, waterCable, {
        
        // FIX {3}: This isolates proximity connectivity entirely at the grid level
        addPowerNodes: function() {
            // Do not call super$addPowerNodes() to stop default auto-linking behavior.
            // Manually add adjacent cables or transition nodes instead:
            for (var i = 0; i < 4; i++) {
                var neighbor = this.nearby(i);
                if (neighbor != null && neighbor.team == this.team && neighbor.power != null) {
                    if (neighbor.block === waterCable || neighbor.block === cableTransitionNode) {
                        this.power.graph.add(neighbor.power.graph);
                    }
                }
            }
        },

        draw: function() {
            var mask = 0;
            for (var i = 0; i < 4; i++) {
                var neighbor = this.nearby(i);
                if (neighbor != null && (neighbor.block === waterCable || neighbor.block === cableTransitionNode)) {
                    mask |= (1 << i);
                }
            }

            var region = waterCable.singleRegion;
            var glowRegion = waterCable.singleGlow;
            var rotation = 0;

            if (mask === 0) { region = waterCable.singleRegion; glowRegion = waterCable.singleGlow; rotation = 0; }
            else if (mask === 1) { region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 0; }
            else if (mask === 2) { region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 90; }
            else if (mask === 4) { region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 180; }
            else if (mask === 8) { region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 270; }
            else if (mask === 5) { region = waterCable.straightRegion; glowRegion = waterCable.straightGlow; rotation = 0; }
            else if (mask === 10) { region = waterCable.straightRegion; glowRegion = waterCable.straightGlow; rotation = 90; }
            else if (mask === 3) { region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 0; }
            else if (mask === 6) { region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 90; }
            else if (mask === 12) { region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 180; }
            else if (mask === 9) { region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 270; }
            else if (mask === 7) { region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 0; }
            else if (mask === 14) { region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 90; }
            else if (mask === 13) { region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 180; }
            else if (mask === 11) { region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 270; }
            else if (mask === 15) { region = waterCable.fourWayRegion; glowRegion = waterCable.fourWayGlow; rotation = 0; }

            // Draw the base sprite
            Draw.rect(region, this.x, this.y, rotation);

            // FIX {1}: Unpowered glow displays as flat gray
            if (this.power == null || this.power.graph.getPowerBalance() <= 0) {
                Draw.color(Color.gray);
                Draw.rect(glowRegion, this.x, this.y, rotation);
                Draw.color();
            } else {
                // FIX {2}: Direct Hex value force fixes alpha saturation to display classic yellow
                Draw.color(Color.valueOf("feb380")); 
                Draw.blend(Blending.additive); 
                Draw.rect(glowRegion, this.x, this.y, rotation);
                Draw.blend(); 
                Draw.color(); 
            }
        },

        canConnectTo: function(other) { 
            return other.block === waterCable || other.block === cableTransitionNode; 
        }
    });
};

waterCable.category = Category.power;
waterCable.buildVisibility = BuildVisibility.shown;
waterCable.requirements = ItemStack.with(Items.copper, 5, Items.lead, 3);


const cableTransitionNode = extend(PowerNode, "cable-transition-node", {
    size: 1,
    health: 120,
    maxNodes: 10,       
    laserRange: 6,

    load: function() {
        this.super$load();
        this.baseRegion = Core.atlas.find(this.name);
        this.glowRegion = Core.atlas.find(this.name + "-glow");
    }
});

// V8 Building definition for the transition node
cableTransitionNode.buildType = function() {
    return extend(PowerNode.PowerNodeBuild, cableTransitionNode, {
        draw: function() {
            Draw.rect(cableTransitionNode.baseRegion, this.x, this.y);

            if (this.power != null) {
                var graph = this.power.graph;
                if (graph.getPowerBalance() > 0 || graph.getLastPowerStored() > 0) {
                    Draw.color(Color.valueOf("feb380")); // Match yellow color profile
                    Draw.blend(Blending.additive);
                    Draw.rect(cableTransitionNode.glowRegion, this.x, this.y);
                    Draw.blend();
                    Draw.color();
                }
            }
        },

        canConnectTo: function(other) {
            // Allow transition nodes to hit normal targets and water cables
            return true; 
        }
    });
};

cableTransitionNode.category = Category.power;
cableTransitionNode.buildVisibility = BuildVisibility.shown;
cableTransitionNode.requirements = ItemStack.with(
    Items.copper, 15,
    Items.lead, 10,
    Items.silicon, 5
);
