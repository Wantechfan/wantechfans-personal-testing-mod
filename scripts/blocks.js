// Fixed and perfected for Mindustry V7/V8 without engine crashes

const waterCable = extend(Block, "water-power-cable", {
    size: 1,
    health: 80,
    floating: true,
    placeableLiquid: true,
    solid: false,
    hasShadow: false,
    update: true,            // Tells the engine to tick this block every frame
    destructible: true,      // Ensures the player can deconstruct it safely
    drawLayer: Layer.floor,

    load: function() {
        this.super$load();
        
        // Base Textures
        this.singleRegion = Core.atlas.find(this.name + "-single");
        this.endRegion = Core.atlas.find(this.name + "-end");
        this.straightRegion = Core.atlas.find(this.name + "-straight");
        this.bendRegion = Core.atlas.find(this.name + "-bend");
        this.tRegion = Core.atlas.find(this.name + "-t");
        this.fourWayRegion = Core.atlas.find(this.name + "-four");

        // Glow Textures
        this.singleGlow = Core.atlas.find(this.name + "-single-glow");
        this.endGlow = Core.atlas.find(this.name + "-end-glow");
        this.straightGlow = Core.atlas.find(this.name + "-straight-glow");
        this.bendGlow = Core.atlas.find(this.name + "-bend-glow");
        this.tGlow = Core.atlas.find(this.name + "-t-glow");
        this.fourWayGlow = Core.atlas.find(this.name + "-four-glow");
    },

    canPlaceOn: function(tile, team, x, y, rotation) {
        if (tile == null) return false;
        return tile.floor().isLiquid;
    },

    // Fixes the blueprint dragging texture selection
    drawPlanConfig: function(plan, list) {
        this.super$drawPlanConfig(plan, list);
        var mask = 0;
        
        for (var i = 0; i < 4; i++) {
            var dx = Geometry.d4x[i];
            var dy = Geometry.d4y[i];
            var tx = plan.x + dx;
            var ty = plan.y + dy;
            
            var tile = Vars.world.tile(tx, ty);
            if (tile != null && tile.build != null && (tile.build.block === this || tile.build.block === cableTransitionNode)) {
                mask |= (1 << i);
                continue;
            }
            
            for (var j = 0; j < list.size; j++) {
                var other = list.get(j);
                if (other.x === tx && other.y === ty && (other.block === this || other.block === cableTransitionNode)) {
                    mask |= (1 << i);
                    break;
                }
            }
        }

        var region = this.singleRegion;
        var rotation = 0;

        if (mask === 0) { region = this.singleRegion; rotation = 0; }
        else if (mask === 1) { region = this.endRegion; rotation = 0; }
        else if (mask === 2) { region = this.endRegion; rotation = 90; }
        else if (mask === 4) { region = this.endRegion; rotation = 180; }
        else if (mask === 8) { region = this.endRegion; rotation = 270; }
        else if (mask === 5) { region = this.straightRegion; rotation = 0; }
        else if (mask === 10) { region = this.straightRegion; rotation = 90; }
        else if (mask === 3) { region = this.bendRegion; rotation = 0; }
        else if (mask === 6) { region = this.bendRegion; rotation = 90; }
        else if (mask === 12) { region = this.bendRegion; rotation = 180; }
        else if (mask === 9) { region = this.bendRegion; rotation = 270; }
        else if (mask === 7) { region = this.tRegion; rotation = 0; }
        else if (mask === 14) { region = this.tRegion; rotation = 90; }
        else if (mask === 13) { region = this.tRegion; rotation = 180; }
        else if (mask === 11) { region = this.tRegion; rotation = 270; }
        else if (mask === 15) { region = this.fourWayRegion; rotation = 0; }

        Draw.rect(region, plan.drawx(), plan.drawy(), rotation);
    }
});

waterCable.buildType = function() {
    // Extending base Building removes all backend vanilla power node hooks completely
    return extend(Building, waterCable, {
        
        // Tracks whether power is currently active across this custom chain link
        isCablePowered: false,

        updateTile: function() {
            this.super$updateTile();

            // Run a quick proximity check to inherit power state from an active transition node or powered cable
            var powered = false;
            for (var i = 0; i < 4; i++) {
                var neighbor = this.nearby(i);
                if (neighbor != null && neighbor.team == this.team) {
                    // If connected to a transition node that has power, or an already verified powered cable
                    if (neighbor.block === cableTransitionNode && neighbor.power != null && neighbor.power.graph.getPowerBalance() > 0) {
                        powered = true;
                        break;
                    } else if (neighbor.block === waterCable && neighbor.isCablePowered) {
                        powered = true;
                        break;
                    }
                }
            }
            this.isCablePowered = powered;
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

            Draw.rect(region, this.x, this.y, rotation);

            // Adapts its glowing state instantly depending on our clean custom variable
            if (this.isCablePowered) {
                Draw.color(Color.yellow); 
                Draw.blend(Blending.additive); 
                Draw.rect(glowRegion, this.x, this.y, rotation);
                Draw.blend(); 
                Draw.color(); 
            } else {
                Draw.color(Color.darkGray);
                Draw.rect(glowRegion, this.x, this.y, rotation);
                Draw.color();
            }
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

cableTransitionNode.buildType = function() {
    return extend(PowerNode.PowerNodeBuild, cableTransitionNode, {
        draw: function() {
            Draw.rect(cableTransitionNode.baseRegion, this.x, this.y);

            if (this.power != null && this.power.graph != null && (this.power.graph.getPowerBalance() > 0 || this.power.graph.getLastPowerStored() > 0)) {
                Draw.color(Color.yellow);
                Draw.blend(Blending.additive);
                Draw.rect(cableTransitionNode.glowRegion, this.x, this.y);
                Draw.blend();
                Draw.color();
            }
        },

        canConnectTo: function(other) {
            // Rejects connecting directly to the cables via laser line configurations
            return other.block !== waterCable; 
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
