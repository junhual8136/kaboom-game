import {loadMap} from './map.js'

kaboom({
    width: 1200,
    height: 800,
    font: "sans-serif",
    canvas: document.querySelector("game"),
})
setBackground(Color.fromHex('#ADD8E6'))

loadMap()

const grassTile16x = loadSprite("grass-tile-16", "assets/grass.png")
const enemyTile = loadSprite("grass-tile-16", "assets/grass.png")
let speed = 60
const mainPlayer = loadSprite("64xTile", "assets/64xTile.png")
const player = add([sprite("64xTile"), area(),body(),pos(30, 20),scale(0.5),"player"], )

let playerHealth = 100
const hpBar = add([
    text(`Health:${playerHealth}`, {size: 24,}),
    pos(player.pos.x-590, player.pos.y-400),
    { value: health },
])



// wasd movement
onKeyDown('w', () => {player.move(0, -speed)})
onKeyDown('a', () => {player.move(-speed, 0)})
onKeyDown('s', () => {player.move(0, speed)})
onKeyDown('d', () => {player.move(speed, 0)})
player.onUpdate(() => {camPos(player.pos )})
onUpdate(() => {
    // shift to run (2x speed)
    if (isKeyDown("shift")) speed = 120
    onKeyRelease("shift", () => {speed = 60})

    hpBar.pos.x = player.pos.x-590
    hpBar.pos.y = player.pos.y-400
    hpBar.text = `Health:${playerHealth}`
    hpBar.value = playerHealth

    if (hpBar.value <= 0 && hpBar.value > -1000) {
        const death = add([
            text(`you died`, {size: 100,}),
            pos(player.pos.x, player.pos.y),
        ])
        speed = 0
        hpBar.value = -1000
        hpBar.text = "dead"
    }


 })
 onMouseMove(() => {
    const playerPosition = player.pos;
    const mousePosition = mousePos();
    const angle = Math.atan2(mousePosition.y - playerPosition.y, mousePosition.x - playerPosition.x);
    const angleInDeg = (angle * 180) / Math.PI;
    player.angle = angleInDeg
 })

// debug stuff
 onKeyPress('f', () => {
    // player.move(3000,0)
    // drawCircle({
    //     pos: player.pos,
    //     radius: 50,
    //     color: rgb(255, 255, 0),
    // })
    playerHealth -= 20

})

onKeyPress('h', () => {

})

const enemyNumber = {}
onKeyPress('g', () => {
    // let newHostile = new spawnTest(1)
    // onKeyPress('h', () => {console.log(newHostile)})
    function createEnemyVariable(number) {
     enemyNumber[number] = new spawnTest(1);
    }
    function getEnemyVariable(number) {
    enemyNumber[number];
    }
    for (let i=0;i<=4;i++) {
        createEnemyVariable(i)
    }
    onKeyPress('l', () => {console.log(enemyNumber)})
})


function spawnTest(difficulty) {
    const level = difficulty
    let randomX = Math.ceil(Math.random() * 100)
    let randomY = Math.ceil(Math.random() * 100)
    let enemyHealth = (100 * level)
    const enemy = add([sprite("64xTile"), area(),body(),pos(randomX, randomY),scale(0.5),"hostile"],)
    const HostileHpBar = add([
        text(enemyHealth, {size: 12,}),
        pos(player.pos.x-10, player.pos.y-10),
        follow(enemy),
    ])
    onCollide("hostile", "player", () => {
        enemyHealth -= 20
        console.log(enemyHealth)
    })
    onUpdate(() => {
        HostileHpBar.text = enemyHealth
        if (enemyHealth <= 0) {
            destroy(enemy)
            destroy(HostileHpBar)
        }
    }
        )
    console.log(`X:${randomX}.  Y:${randomY}`)


}


export { grassTile16x }

