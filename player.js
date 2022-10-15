import {c, ctx,canvasWidth} from "./main.js";
import { reExpand } from "./main.js";

var zPressed = false
var sPressed = false
var qPressed = false
var dPressed = false
var len = ""

window.addEventListener("keydown", function(event) {
    switch(event.key){
        case "z":
            zPressed = true
            sPressed = false
            qPressed = false
            dPressed = false
            break
        case "s":
            sPressed = true
            zPressed = false
            qPressed = false
            dPressed = false
            break
        case "q":
            qPressed = true
            sPressed = false
            zPressed = false
            dPressed = false
            break
        case "d":
            dPressed = true
            sPressed = false
            qPressed = false
            zPressed = false
            break
            
    }
});


class Player {
    constructor(x,y,life){
        this.life = life
        this.x = x*50
        this.y = y*50
        this.dx = 0
        this.dy = 0
        this.particul = []
        this.collision = false
        this.caseDx = ""
        this.caseDy = ""
        this.posX =""
        this.posY =""
    }
    update(caseArray,gameFrame){
        this.collision = false
        this.dx = 0
        this.dy = 0
        if (zPressed){
                this.dx = 0
                this.dy = -1
        } else if(sPressed){
                this.dx = 0
                this.dy = 1
        }else if(qPressed){
                this.dy = 0
                this.dx = -1
        }else if(dPressed){
                this.dy = 0
                this.dx = 1
        }
        var one = false
        var len = caseArray.length
        if(gameFrame % 2 == 0){
            reExpand(this.x,this.y)
        }
        // get case to go and case where you are
        for (let i = 0;i<len;i++){
            if (caseArray[i].x == this.x && caseArray[i].y == this.y){
                this.posX = caseArray[i].x
                this.posY = caseArray[i].y
            }
            if (caseArray[i].x == this.x+(this.dx*50) && caseArray[i].y == this.y+(this.dy*50) && one == false){
                if (caseArray[i].block == false){
                    this.caseDx = this.dx
                    this.caseDy = this.dy
                    one = true
                    break
                }else {
                    if (this.collision == false){
                        this.caseDx = 0
                        this.caseDy = 0
                        this.collision = true
                    }
                }
            }else {
                this.caseDx = 0
                this.caseDy = 0
            }
        }
    }

    draw(){
        ctx.fillStyle = 'rgb(144, 0, 255)'
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}

//rgba(137, 43, 226


export {Player};
