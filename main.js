// CANVAS

const c = document.getElementById("canva");
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
var zombie = []
var player = ""
var playerSpawnX = 1
var playerSpawnY = 1
var canvasWidth = c.width
var particleArray = []
var caseWidth = canvasWidth / 50


player = new Player(playerSpawnX,playerSpawnY)
zombie.push(new Zombie(45,45)) 


// GENERATION

for (let i = 0; i < c.width/caseWidth;i++){
    for (let g = 0; g <c.width/caseWidth;g++){
        if (Math.random() <=0.25){
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
                caseArray.push(new Case(i*caseWidth,g*caseWidth,true,0))
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

function explosionEffect(x,y,color,size){
        for (let i = 0;i<20;i++){
            particleArray.push(new Particle(color,size,x,y))
        }
}

function collisionEffect(x,y,color,size){
    for (let i = 0;i<10;i++){
        particleArray.push(new Particle(color,size,x,y))
    }
}


function handleParticle(){
    for (let i = 0;i<particleArray.length;i++){
        particleArray[i].update()
        particleArray[i].draw()
        if (particleArray[i].size <=5){
            particleArray.splice(i,1)
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
        if (gameFrame%80==0 && spawn == false && gameFrame!=0){
            if (item.score >= 50 && item.score != 100){
                zombie.push(new Zombie(item.x/20,item.y/20))
                spawn = true
            }
        }
        item.draw()
    })
    
    // update player
    player.update(caseArray)
    if (player.collision == false){
        collisionEffect(player.x+5,player.y+5,"rgba(144, 0, 255,0.8)",10)
    }
    player.draw()

    // handle zombies
    
    for (let i = 0;i<zombie.length;i++){
        zombie[i].draw()
        if (zombie[i].x == player.x && zombie[i].y == player.y ){
            zombie.splice(i,1)
            explosionEffect(player.x+5,player.y+5,"lightgreen",15)
        }
        if (gameFrame%13==0){
            console.log('i')
            zombie[i].update(caseArray,zombie)
        }
    }

    // particle
    if (particleArray.length!=0){
    handleParticle()
    }
    gameFrame ++
},50) 



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
