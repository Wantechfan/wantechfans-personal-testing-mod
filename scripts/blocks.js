// Fixed and upgraded by Gemini for Mindustry V7 compatibility

const waterCable = extend(PowerNode, "water-power-cable", {
    size: 1,
    health: 80,
    maxNodes: 0,
    laserRange: 0,
    floating: true,
    placeableLiquid: true,

    load() {
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
    }
});

// V7 Building definition for the cable
waterCable.buildType = () => extend(PowerNode.PowerNodeBuild, waterCable, {
    draw() {
        // Bitmasking logic: Checks for either another water cable OR a transition node
        let mask = 0;
        for (let i = 0; i < 4; i++) {
            let neighbor = this.nearby(i);
            if (neighbor != null && (neighbor.block === waterCable || neighbor.block === cableTransitionNode)) {
                mask |= (1 << i);
            }
        }

        let region = waterCable.singleRegion;
        let glowRegion = waterCable.singleGlow;
        let rotation = 0;

        switch (mask) {
            case 0: region = waterCable.singleRegion; glowRegion = waterCable.singleGlow; rotation = 0; break;
            
            case 1: region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 0; break;
            case 2: region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 90; break;
            case 4: region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 180; break;
            case 8: region = waterCable.endRegion; glowRegion = waterCable.endGlow; rotation = 270; break;

            case 5:  region = waterCable.straightRegion; glowRegion = waterCable.straightGlow; rotation = 0; break;
            case 10: region = waterCable.straightRegion; glowRegion = waterCable.straightGlow; rotation = 90; break;

            case 3:  region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 0; break;
            case 6:  region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 90; break;
            case 12: region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 180; break;
            case 9:  region = waterCable.bendRegion; glowRegion = waterCable.bendGlow; rotation = 270; break;

            case 7:  region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 0; break;
            case 14: region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 90; break;
            case 13: region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 180; break;
            case 11: region = waterCable.tRegion; glowRegion = waterCable.tGlow; rotation = 270; break;

            case 15: region = waterCable.fourWayRegion; glowRegion = waterCable.fourWayGlow; rotation = 0; break;
        }

        // Draw the base sprite
        Draw.rect(region, this.x, this.y, rotation);

        // Visual glow effect logic
        if (this.power != null) {
            let graph = this.power.graph;
            if (graph.getPowerBalance() > 0 || graph.getLastPowerStored() > 0) {
                Draw.color(Pal.powerLight); 
                Draw.blend(Blending.additive); 
                Draw.rect(glowRegion, this.x, this.y, rotation);
                Draw.blend(); 
                Draw.color(); 
            }
        }
    },

    // Restrict laser connections so they only link between cables of this exact type
    canConnectTo(other) { 
        return other.block === waterCable; 
    }
});

waterCable.category = Category.power;
waterCable.buildVisibility = BuildVisibility.shown;
waterCable.requirements = ItemStack.with(Items.copper, 5, Items.lead, 3);


const cableTransitionNode = extend(PowerNode, "cable-transition-node", {
    size: 1,
    health: 120,
    maxNodes: 10,       
    laserRange: 6,  
    placeableLiquid: true,
    conductivePower: true,

    load() {
        this.super$load();
        this.baseRegion = Core.atlas.find(this.name);
        this.glowRegion = Core.atlas.find(this.name + "-glow");
    }
});

// V7 Building definition for the transition node
cableTransitionNode.buildType = () => extend(PowerNode.PowerNodeBuild, cableTransitionNode, {
    draw() {
        Draw.rect(cableTransitionNode.baseRegion, this.x, this.y);

        if (this.power != null) {
            let graph = this.power.graph;
            if (graph.getPowerBalance() > 0 || graph.getLastPowerStored() > 0) {
                Draw.color(Pal.powerLight);
                Draw.blend(Blending.additive);
                Draw.rect(cableTransitionNode.glowRegion, this.x, this.y);
                Draw.blend();
                Draw.color();
            }
        }
    },

    // Rejects direct laser connections to underwater cables
    canConnectTo(other) {
        if (other.block === waterCable) {
            return false;
        }
        return true; 
    }
});

cableTransitionNode.category = Category.power;
cableTransitionNode.buildVisibility = BuildVisibility.shown;
cableTransitionNode.requirements = ItemStack.with(
    Items.copper, 15,
    Items.lead, 10,
    Items.silicon, 5
);
