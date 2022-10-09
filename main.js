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
var zombie = []
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
zombie.push(new Zombie(30,30)) 
zombie.push(new Zombie(40,40)) 
zombie.push(new Zombie(45,45)) 
function gameLoop(){
    var spawn = false
    if (gameFrame%1==0){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        caseArray.forEach(function(item){
            if (gameFrame%100==0 && spawn == false && gameFrame!=0){
                if (item.score >= 50 && item.score != 100){
                    zombie.push(new Zombie(item.x/20,item.y/20))
                    zombie[zombie.length-1].update(caseArray,zombie)
                    spawn = true
                }
            }
            item.draw()
        })
        player.update(caseArray)
        player.draw()
        zombie.forEach(function (item){
            item.draw()
        })
    }
    if (gameFrame%13==0){
        zombie.forEach(function (item){
            item.update(caseArray,zombie)
        })
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
