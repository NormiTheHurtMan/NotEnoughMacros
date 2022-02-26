////////////////////////////////////////////////

//AutoSpeedBoost//

////////////////////////////////////////////////

ChatLib.chat(Client.getKeyBindFromDescription("Mithril Macro Toggle").toString())


////////////////////////////////////////////////

//Basic Vars//

////////////////////////////////////////////////
const prefix = '&7[&bBarryBunsClient&7]&r '
const mc = Client.getMinecraft()
const RightClick = new KeyBind(mc.field_71474_y.field_74313_G);
const WalkRight = new KeyBind(mc.field_71474_y.field_74366_z);
const WalkLeft = new KeyBind(mc.field_71474_y.field_74370_x);
const Shift = new KeyBind(mc.field_71474_y.field_74311_E);

////////////////////////////////////////////////

//Starting Command//

////////////////////////////////////////////////
let ToggleOn_AutoFish = 0
let OnOrOff_AutoFish = false
let slotRod_AutoFish
let OnOrOff_LavaFish = false

register("command", () => {
    if (ToggleOn_AutoFish === 0) {
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes("Rod")) {
            slotRod_AutoFish = i
            ChatLib.chat(prefix + " found Fishing Rod in slot " + (slotRod_AutoFish + 1))
            break;
            } else if(i === 8 && Player.getInventory().getStackInSlot(i).getName().includes("Rod") === false) {
            ChatLib.chat(prefix + " could not find a Fishing Rod")
        } 
    }
        if(WeaponSlot_AutoFish === undefined) {
            ChatLib.chat(prefix + " select a WeaponSlot first, do that with /weaponslot")
        } else if(WeaponSlot_AutoFish !== undefined && slotRod_AutoFish !== null){
        ToggleOn_AutoFish = 1
        ChatLib.chat(prefix + "-> AutoFish turned &a&lOn");
        ChatLib.chat(prefix + " WeaponSlot is " + (WeaponSlot_AutoFish + 1))
        OnOrOff_AutoFish = true
        setPlayerYaw(53)
        ThrowAndFail()
    }
}
    else if (ToggleOn_AutoFish === 1) {
        ToggleOn_AutoFish = 0
        ChatLib.chat(prefix + "-> AutoFish turned &c&lOff")
        OnOrOff_AutoFish = false
        resetNow()
    }
}).setName("AutoFish");

register("command", () => {
    if (ToggleOn_AutoFish === 0) {
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes("Rod")) {
            slotRod_AutoFish = i
            ChatLib.chat(prefix + " found Fishing Rod in slot " + (slotRod_AutoFish + 1))
            break;
            } else if(i === 8 && Player.getInventory().getStackInSlot(i).getName().includes("Rod") === false) {
            ChatLib.chat(prefix + " could not find a Fishing Rod")
        } 
    }
        if(WeaponSlot_AutoFish === undefined) {
            ChatLib.chat(prefix + " select a WeaponSlot first, do that with /weaponslot")
        } else if(WeaponSlot_AutoFish !== undefined && slotRod_AutoFish !== null){
        ToggleOn_AutoFish = 1
        ChatLib.chat(prefix + "-> AutoLava turned &a&lOn");
        ChatLib.chat(prefix + " WeaponSlot is " + (WeaponSlot_AutoFish + 1))
        OnOrOff_AutoFish = true
        OnOrOff_LavaFish = true
        setPlayerYaw(53)
        ThrowAndFail()
    }
}
    else if (ToggleOn_AutoFish === 1) {
        ToggleOn_AutoFish = 0
        ChatLib.chat(prefix + "-> AutoLava turned &c&lOff")
        OnOrOff_AutoFish = false
        OnOrOff_LavaFish = false
        resetNow()
    }
}).setName("AutoLava");

////////////////////////////////////////////////

//WeaponSlotCommand//

////////////////////////////////////////////////
let WeaponSlot_AutoFish

register("command", WeaponSlotSelect_AutoFish => {
    if(WeaponSlotSelect_AutoFish < 1 || WeaponSlotSelect_AutoFish > 9) {
        ChatLib.chat(prefix + " Only slots 1 until 9 exist")
    } else if(WeaponSlotSelect_AutoFish === undefined) {
        ChatLib.chat(prefix + " select a slot with /weaponSlot (Slot)")
    } else if(WeaponSlotSelect_AutoFish >= 1 || WeaponSlotSelect_AutoFish <= 9) {
    WeaponSlot_AutoFish = WeaponSlotSelect_AutoFish - 1
    ChatLib.chat(prefix + " Weapon Killing slot set to slot " + WeaponSlotSelect_AutoFish)
    }
}).setName("weaponslot");

////////////////////////////////////////////////

//Reset//

////////////////////////////////////////////////

function resetNow() {
    waitingForCast = false
    waitingForCast2 = false
    waitingForCast3 = false
    delay = 100
    delayCount = 110
    SleepDone = false
    delay2 = 100
    delayCount2 = 110
    SleepDone2 = false
    delay3 = 100
    delayCount3 = 110
    SleepDone3 = false
    delay4 = 100
    delayCount4 = 110
    SleepDone4 = false
    delayLookCount = 0
    delayMoveCount = 0
    delaySafeCount = 0
}

////////////////////////////////////////////////

//FishingSoundDelay//

////////////////////////////////////////////////

let DelaySound = 5
let DelaySound2 = 10

// register("Command", SoundDelay => {
//     if(SoundDelay < 0) {
//         ChatLib.chat(prefix + " Ticks can only be a Positive numbers :/")
//     }
//     else if(SoundDelay > -1) {
//         DelaySound = SoundDelay
//         ChatLib.chat(prefix + " SoundDelay set to " + DelaySound + " Ticks")
//     }
// }).setName("SoundDelay")


////////////////////////////////////////////////

//Entity render//

////////////////////////////////////////////////
const entities_AutoFish = ["Squid", "Zombie", "Guardian", "Witch", "Skeleton", "Silverfish", "Ocelot", "Chicken", "Rabbit", "IronGolem", "Blaze", "PigZombie"]
let first = true

register("RenderEntity", (entity) => {
    //let playerName = Player.getName()
    let entityFound = false
    for (let i = 0; i < entities_AutoFish.length; i++) {
        if (entity.toString().includes(entities_AutoFish[i]) === true) {
            entityFound = true
            break
        }
    }
    if(entityFound === true && OnOrOff_AutoFish === true) {
        entitySwapXPos_AutoFish = entity.getX();
        entitySwapYPos_AutoFish = entity.getY();
        entitySwapZPos_AutoFish = entity.getZ();
        PlayerXPos_AutoFish = Player.getX();
        PlayerYPos_AutoFish = Player.getY();
        PlayerZPos_AutoFish = Player.getZ();
        let dx = entitySwapXPos_AutoFish - PlayerXPos_AutoFish
        let dy = entitySwapYPos_AutoFish - PlayerYPos_AutoFish
        let dz = entitySwapZPos_AutoFish - PlayerZPos_AutoFish
        let distance = dx^2 + dy^2 + dz^2
        distancePlayerMob_AutoFish = Math.sqrt(distance)
        if(distancePlayerMob_AutoFish <= 3.5 && OnOrOff_AutoFish === true && first === true) {
            first = false
            Sleep(40)
            RightClick.setState(false)
            ChatLib.chat(prefix + " Mob detected")
            Player.setHeldItemIndex(WeaponSlot_AutoFish)
            waitingForCast = "Kill"
        }
    } 
})  

////////////////////////////////////////////////

//FirstThrow and FailSafe and Entity Killing//

////////////////////////////////////////////////
let waitingForCast2 = false
let waitingForCast3 = false

function ThrowAndFail() {
    Player.setHeldItemIndex(slotRod_AutoFish)
    RightClick.setState(true)
    waitingForCast = "FirstCast"
    Sleep(1)
}

register("Tick", () => {
    if(OnOrOff_AutoFish === true && SleepDone === true && waitingForCast === "FirstCast") {
        waitingForCast = false
        RightClick.setState(false)
        SleepDone = false
        delaySafeCount = 0
    } 

    else if(OnOrOff_AutoFish === true && SleepDone === true && waitingForCast === true) {
        waitingForCast = false
        RightClick.setState(false)
        delaySafeCount = 0
    }

    else if(OnOrOff_AutoFish === true && SleepDone === true && waitingForCast === "Delay") {
        waitingForCast = true
        RightClick.setState(true)
        delaySafeCount = 0
        Sleep(6)
    }  

    else if(OnOrOff_AutoFish === true && SleepDone === true && waitingForCast === "Kill") {
        waitingForCast = false
        first = true
        Player.setHeldItemIndex(slotRod_AutoFish)
        delaySafeCount = 0
        ThrowAndFail()
    } 

    else if(OnOrOff_AutoFish === true && SleepDone2 === true && waitingForCast2 === "Look") {
        waitingForCast2 = false
        setPlayerYaw(56)
        delayLookCount = 0
    }

    else if(OnOrOff_AutoFish === true && SleepDone3 === true && waitingForCast3 === "MoveLeft") {
        waitingForCast3 = "MoveRight"
        WalkLeft.setState(false)
        WalkRight.setState(true)
        Sleep3(10)
    }

    else if(OnOrOff_AutoFish === true && SleepDone3 === true && waitingForCast3 === "MoveRight") {
        waitingForCast3 = false
        WalkRight.setState(false)
        Shift.setState(false)
        delayMoveCount = 0  
    }
})

////////////////////////////////////////////////

//Sleep function//

////////////////////////////////////////////////
let delay = 100
let delayCount = 110
let SleepDone = false

//use Sleep(ticks)
function Sleep(delayInput) {
    delayCount = 0
    SleepDone = false
    delay = delayInput
}

register("Tick", () => {
    if(delayCount < delay) {
        delayCount += 1
    } else if(delayCount === delay) {
        delayCount += 10
        // Makes SleepDone = true, when the sleep ends. You can put this in a if statement
        SleepDone = true
    }
})

let delay2 = 100
let delayCount2 = 110
let SleepDone2 = false

    //use Sleep(ticks)
    function Sleep2(delayInput2) {
    delayCount2 = 0
    SleepDone2 = false
    delay2 = delayInput2
    }

    register("Tick", () => {
        if(delayCount2 < delay2) {
            delayCount2 += 1
        } else if(delayCount2 === delay2) {
            delayCount2 += 1
            // Makes SleepDone = true, when the sleep ends. You can put this in a if statement
            SleepDone2 = true
        }
    })

let delay3 = 100
let delayCount3 = 110
let SleepDone3 = false

    //use Sleep(ticks)
    function Sleep3(delayInput3) {
    delayCount3 = 0
    SleepDone3 = false
    delay3 = delayInput3
    }

    register("Tick", () => {
        if(delayCount3 < delay3) {
            delayCount3 += 1
        } else if(delayCount3 === delay3) {
            delayCount3 += 1
            // Makes SleepDone = true, when the sleep ends. You can put this in a if statement
            SleepDone3 = true
        }
    })

let delay4 = 100
let delayCount4 = 110
let SleepDone4 = false

//use Sleep(ticks)
function Sleep4(delayInput4) {
delayCount4 = 0
SleepDone4 = false
delay4 = delayInput4
}

register("Tick", () => {
    if(delayCount4 < delay4) {
        delayCount4 += 1
    } else if(delayCount4 === delay4) {
        delayCount4 += 1
        // Makes SleepDone = true, when the sleep ends. You can put this in a if statement
        SleepDone4 = true
    }
})

////////////////////////////////////////////////

//ReCast//

////////////////////////////////////////////////
let waitingForCast = false

register("SoundPlay", (sound) => {
    if(sound.toString().includes("Vector3f[0.0, 0.0, 0.0]") === true && OnOrOff_AutoFish === true && OnOrOff_LavaFish === false) {
        waitingForCast = "Delay"
        Sleep(DelaySound)
    }
    else if(sound.toString().includes("Vector3f[0.0, 0.0, 0.0]") === true && OnOrOff_AutoFish === true && OnOrOff_LavaFish === true) {
        waitingForCast = "Delay"
        Sleep(DelaySound2)
    }
})


////////////////////////////////////////////////

//Moving and looking//

////////////////////////////////////////////////
let delayLookCount = 0
let delayMoveCount = 0
let delaySafeCount = 0

register("Tick", () => {
    const delayLook = 100
    const delayMove = 200
    const delaySafe = 400
    if(delayLookCount < delayLook && OnOrOff_AutoFish === true) {
        delayLookCount += 1
    } else if(delayLookCount === delayLook && OnOrOff_AutoFish === true) {
        delayLookCount += 1
        setPlayerYaw(53)
        waitingForCast2 = "Look"
        Sleep2(100)
    }
    if(delayMoveCount < delayMove && OnOrOff_AutoFish === true) {
        delayMoveCount += 1
    } else if(delayMoveCount === delayMove && OnOrOff_AutoFish === true) {
        ChatLib.chat(prefix + " Walking for xp")
        delayMoveCount += 1
        WalkLeft.setState(true)
        Shift.setState(true)
        waitingForCast3 = "MoveLeft"
        Sleep3(10)   
    } 
    if(delaySafeCount < delaySafe && OnOrOff_AutoFish === true) {
        delaySafeCount += 1
    } else if(delaySafeCount === delaySafe && OnOrOff_AutoFish === true) {
        delaySafeCount = 0
        ChatLib.chat(prefix + " FailSafe")
        ThrowAndFail()
    }
})

function setPlayerYaw(Yaw){
    Client.getMinecraft().func_71410_x().field_71439_g.field_70125_A=Yaw}
  
function setPlayerPitch(Pitch){
    Client.getMinecraft().func_71410_x().field_71439_g.field_70177_z=Pitch}