// CANVAS

const c = document.getElementById("canva");
const ctx = c.getContext("2d");
c.width = 1000
c.height = 1000


// IMPORT

import {Case} from "./case.js";
import { Zombie } from "./zombie.js";
import { Player } from "./player.js";

// MAIN

// var
var caseArray = []
var canContinu = true
var i = 0
var zombie = ""
var player = ""
var playerSpawnX = 1
var playerSpawnY = 1
var canvasWidth = c.width
var caseWidth = canvasWidth / 50

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

player = new Player(playerSpawnX,playerSpawnY)
player.draw()

caseArray.forEach(function(item){
    item.draw()
})



const canvas = document.querySelector('canvas')





let gameFrame = 0
zombie = new Zombie(30,30)
function gameLoop(){
    if (gameFrame%1==0){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        caseArray.forEach(function(item){
            item.draw()
        })
        player.update(caseArray)
        player.draw()
        zombie.draw()
    }
    if (gameFrame%8==0){
        zombie.update(caseArray)
    }
    gameFrame ++
        requestAnimationFrame(gameLoop)
}



gameLoop()

// EXPORT

export {c, ctx,canvasWidth};
export function reExpand(x,y){
    for (let i = 0;i<caseArray.length;i++){
        if (caseArray[i].x == x && caseArray[i].y == y){
            caseArray[i].score = 0
        }else {
            caseArray[i].score = "none"
        }
    }
    expand()
}
