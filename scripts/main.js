const music = loadMusic("aufdieheide");

    Events.on(ClientLoadEvent, e => {
        Vars.control.sound.ambientMusic.add(music);
    });
