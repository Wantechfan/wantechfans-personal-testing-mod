const waterCable = extend(Block, "water-power-cable", {
    size: 1,
    health: 80,
    floating: true,
    placeableLiquid: true,
    solid: false,
    hasShadow: false,
    update: true,            
    destructible: true,      
    drawLayer: Layer.floor,

    load: function() {
        this.super$load();
        this.singleRegion = Core.atlas.find(this.name + "-single");
        this.endRegion = Core.atlas.find(this.name + "-end");
        this.straightRegion = Core.atlas.find(this.name + "-straight");
        this.bendRegion = Core.atlas.find(this.name + "-bend");
        this.tRegion = Core.atlas.find(this.name + "-t");
        this.fourWayRegion = Core.atlas.find(this.name + "-four");
        this.singleGlow = Core.atlas.find(this.name + "-single-glow");
        this.endGlow = Core.atlas.find(this.name + "-end-glow");
        this.straightGlow = Core.atlas.find(this.name + "-straight-glow");
        this.bendGlow = Core.atlas.find(this.name + "-bend-glow");
        this.tGlow = Core.atlas.find(this.name + "-t-glow");
        this.fourWayGlow = Core.atlas.find(this.name + "-four-glow");
    },

    setBars: function() {
        this.super$setBars();
        this.addBar("underwater-power", func(b => 
            new Bar(
                prov(() => "Power (Underwater)"), 
                prov(() => Color.yellow), 
                floatp(() => b.underwaterPower / b.maxPower)
            )
        ));
    },

    canPlaceOn: function(tile, team, x, y, rotation) {
        if (tile == null) return false;
        return tile.floor().isLiquid;
    },

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

waterCable.buildType = prov(() => {
    return extend(Building, {
        underwaterPower: 0,
        maxPower: 1000, 

        updateTile: function() {
            this.super$updateTile();

            var targets = new Seq();
            for (var i = 0; i < 4; i++) {
                var n = this.nearby(i);
                if (n != null && n.team == this.team && (n.block === waterCable || n.block === cableTransitionNode)) {
                    targets.add(n);
                }
            }

            if (targets.size > 0 && this.underwaterPower > 0) {
                var totalPower = this.underwaterPower;
                for (var i = 0; i < targets.size; i++) {
                    totalPower += targets.get(i).underwaterPower;
                }

                var share = totalPower / (targets.size + 1);
                this.underwaterPower = share;
                for (var i = 0; i < targets.size; i++) {
                    targets.get(i).underwaterPower = share;
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

            Draw.rect(region, this.x, this.y, rotation);

            if (this.underwaterPower > 0.1) {
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
});

waterCable.category = Category.power;
waterCable.buildVisibility = BuildVisibility.shown;
waterCable.requirements = ItemStack.with(Items.copper, 5, Items.lead, 3);


const cableTransitionNode = extend(PowerNode, "cable-transition-node", {
    size: 1,
    health: 120,
    maxNodes: 10,       
    laserRange: 6,
    // EXPLICIT CONFIG: Telling the map engine that this block participates in production/consumption tasks
    outputsPower: true,
    consumesPower: true,

    load: function() {
        this.super$load();
        this.baseRegion = Core.atlas.find(this.name);
        this.glowRegion = Core.atlas.find(this.name + "-glow");
    },

    setBars: function() {
        this.super$setBars();
        this.addBar("underwater-power", func(b => 
            new Bar(
                prov(() => "Power (Underwater Buffer)"), 
                prov(() => Color.orange), 
                floatp(() => b.underwaterPower / b.maxPower)
            )
        ));
    }
});

cableTransitionNode.buildType = prov(() => {
    return extend(PowerNode.PowerNodeBuild, cableTransitionNode, {
        underwaterPower: 0,
        maxPower: 2000,
        currentOp: 0, // State machine tracker: 1 = Drawing power, -1 = Distributing power

        // NEW: Tell the engine graph to consume excess energy when grid is stable
        getPowerRequired: function() {
            if (this.power != null && this.power.graph != null && this.underwaterPower < this.maxPower) {
                var graph = this.power.graph;
                if (graph.getSatisfaction() >= 1.0 && graph.getPowerProduction() > 0) {
                    return 30; // Ask for 30 units/sec from the network
                }
            }
            return 0;
        },

        // NEW: Provide power to the local network directly if there's a shortage
        getPowerProduction: function() {
            if (this.power != null && this.power.graph != null && this.underwaterPower > 0) {
                if (this.power.graph.getSatisfaction() < 1.0) {
                    return Math.min(this.underwaterPower / Time.delta, 40); // Generate up to 40 units/sec
                }
            }
            return 0;
        },

        updateTile: function() {
            this.super$updateTile();

            // Handle the internal buffer tracking based on engine calculation choices
            if (this.power != null && this.power.graph != null) {
                var graph = this.power.graph;
                
                if (graph.getSatisfaction() >= 1.0 && this.underwaterPower < this.maxPower && graph.getPowerProduction() > 0) {
                    // Siphon power into our custom internal array tracking
                    var taken = 30 * Time.delta * graph.getSatisfaction();
                    this.underwaterPower = Math.min(this.underwaterPower + taken, this.maxPower);
                } 
                else if (graph.getSatisfaction() < 1.0 && this.underwaterPower > 0) {
                    // Drain buffer storage to help handle brownouts
                    var provided = Math.min(40 * Time.delta, this.underwaterPower);
                    this.underwaterPower -= provided;
                }
            }

            // Standard chain distribution down adjacent cable lines
            var targets = new Seq();
            for (var i = 0; i < 4; i++) {
                var n = this.nearby(i);
                if (n != null && n.team == this.team && (n.block === waterCable || n.block === cableTransitionNode)) {
                    targets.add(n);
                }
            }

            if (targets.size > 0 && this.underwaterPower > 0) {
                var totalPower = this.underwaterPower;
                for (var i = 0; i < targets.size; i++) {
                    totalPower += targets.get(i).underwaterPower;
                }
                var share = totalPower / (targets.size + 1);
                this.underwaterPower = share;
                for (var i = 0; i < targets.size; i++) {
                    targets.get(i).underwaterPower = share;
                }
            }
        },

        draw: function() {
            this.super$draw(); 
            Draw.rect(cableTransitionNode.baseRegion, this.x, this.y);

            if (this.underwaterPower > 0.1) {
                Draw.color(Color.yellow);
                Draw.blend(Blending.additive);
                Draw.rect(cableTransitionNode.glowRegion, this.x, this.y);
                Draw.blend();
                Draw.color();
            }
        },

        canConnectTo: function(other) {
            return other.block !== waterCable && this.super$canConnectTo(other); 
        }
    });
});

cableTransitionNode.category = Category.power;
cableTransitionNode.buildVisibility = BuildVisibility.shown;
cableTransitionNode.requirements = ItemStack.with(Items.copper, 15, Items.lead, 10, Items.silicon, 5);
