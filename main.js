// CANVAS

const c = document.getElementById("canva");
var lifeBar = document.getElementById("progressBar");
var score = document.getElementById("scoreBox");
const ctx = c.getContext("2d");
c.width = 1000
c.height = 1000

const canvas = document.querySelector('canvas')

// IMPORT

import {Case} from "./case.js";
import { Zombie } from "./zombie.js";
import { Player } from "./player.js";
import { Particle } from "./effects.js";

// MAIN

// var
var caseArray = []
var canContinu = true
var i = 0
var newScore = 0
var zombie = []
var player = ""
var playerSpawnX = 9
var playerSpawnY = 9
var canvasWidth = c.width
var particleArray = []
var caseWidth = canvasWidth / 20


player = new Player(playerSpawnX,playerSpawnY,100)


// GENERATION

for (let i = 0; i < 50;i++){
    for (let g = 0; g <50;g++){
        if (Math.random() <=0.15 || g == 0 || i == 0 || g == 40 || i == 40){
            if( i != playerSpawnX || g != playerSpawnY){
                caseArray.push(new Case(i*caseWidth,g*caseWidth,true,"none"))
            }else {
                if (i == playerSpawnX && g == playerSpawnY){
                    caseArray.push(new Case(i*caseWidth,g*caseWidth,true,0))
                }else{
                    caseArray.push(new Case(i*caseWidth,g*caseWidth,false,"none"))
                }
            }
        }else{
            if (i == playerSpawnX && g == playerSpawnY){
                caseArray.push(new Case(i*caseWidth,g*caseWidth,false,0))
            }else{
                caseArray.push(new Case(i*caseWidth,g*caseWidth,false,"none"))
            }
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



// Effect 

function explosionEffect(x,y,color,size,speedX,speedY){
        for (let i = 0;i<4;i++){
            particleArray.push(new Particle(color,size,x,y,speedX,speedY))
        }
}

function collisionEffect(x,y,color,size,speedX,speedY){
    for (let i = 0;i<2;i++){
        particleArray.push(new Particle(color,size,x,y,speedX,speedY))
    }
}

function zombieBack(x,y,color,size,speedX,speedY){
    for (let i = 0;i<1;i++){
        particleArray.push(new Particle(color,size,x,y,speedX,speedY))
    }
}

function handleParticle(){
    if (particleArray.length!=0){
        for (let i = 0;i<particleArray.length;i++){
            particleArray[i].draw(player.caseDx,player.caseDy)
            particleArray[i].update()
            if (particleArray[i].size <=10){
                particleArray.splice(i,1)
            }
        }
    }

}


// EXPAND
function expand(){
    i = 0
    canContinu = true
    while (canContinu == true){
        canContinu = false
        caseArray.forEach(function(item){
            if (item.score == i){
                item.expand(caseArray)
                canContinu = true
            }
        })
        i ++
    }
}
expand()

// GameLoop


let gameFrame = 0
let gameloop = setInterval(function(){
    
    var spawn = false
    ctx.clearRect(0,0,canvas.width,canvas.height)
    //shuffleArray(caseArray)


    // spawn Zombie and draw Case
    caseArray.forEach(function(item){
        if (gameFrame%50==0 && spawn == false && gameFrame!=0){
            if (item.score >= 50 && item.score != 100){
                zombie.push(new Zombie(item.x/50,item.y/50))
                spawn = true
            }
        }
        if (item.x <= player.x+1 && item.x <= player.x|| item.x >= player.x-1 && item.x >= player.x){
            if (item.y <= player.y+1 && item.y <= player.y|| item.y >= player.y-1 && item.y >= player.y){
            item.draw(player.caseDx,player.caseDy)
        }}
    })

    // handle Particle
        handleParticle()
    
    // update player
    player.update(caseArray,gameFrame)
    if (player.collision == false){
        collisionEffect(player.x+5,player.y+5,"rgba(144, 0, 255,0.8)",50,1,1)
    }
    player.draw()

    // handle zombies
    
    for (let i = 0;i<zombie.length;i++){
        if (gameFrame%10==0){
            zombieBack(zombie[i].x,zombie[i].y,"rgba(0, 128, 0,0.6)",50,0,0)
            zombie[i].update(caseArray,zombie)
        }
        zombie[i].draw(player.caseDx,player.caseDy,gameFrame)
        // check player collision
        if (zombie[i].x == player.x && zombie[i].y == player.y ){
            if (player.collision == true){
                player.life -= 10
                lifeBar.style.width = player.life + "%"
            }
            console.log("aha")
            zombie.splice(i,1)
            if (player.collision == false){
                newScore = newScore +1
                score.innerHTML = newScore
                explosionEffect(player.x+5,player.y+5,"rgb(144, 238, 144,0.6)",100,1,1)
            }
        }
    }

    gameFrame ++
    if (player.life <= 0){
        clearInterval(gameloop)
    }
},20) 



gameloop

// EXPORT
export {c, ctx,canvasWidth};
export function reExpand(x,y){
    var len = caseArray.length
    for (let i = 0;i<len;i++){
        if (caseArray[i].x == x && caseArray[i].y == y){
            caseArray[i].score = 0
        }else {
            caseArray[i].score = "none"
        }
    }
    expand()
    }
