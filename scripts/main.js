const musik = Vars.tree.loadMusic("aufdieheide"); 

Events.on(ClientLoadEvent, e => { 
    Vars.control.sound.ambientMusic.add(musik); 
    UnitTypes.omura.weapons.get(0).shootSound = Sounds.wind3;
});
