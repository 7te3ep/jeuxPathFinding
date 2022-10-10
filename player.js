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
    constructor(x,y){
        this.x = x*20
        this.y = y*20
        this.dx = 0
        this.dy = 0
        this.particul = []
        this.collision = false
    }
    update(caseArray){
        this.collision = false
        if (this.particul.length >= 15){
            this.particul.splice(0,2)
        }
        this.particul.push(this.x,this.y)
        this.dx = 0
        this.dy = 0
        if (zPressed){
            if (this.y != 0){
                this.dx = 0
                this.dy = -1
                reExpand(this.x+(this.dx*20),this.y+(this.dy*20))
            }
        } else if(sPressed){
            if (this.y != 980){
            this.dx = 0
            this.dy = 1
            reExpand(this.x+(this.dx*20),this.y+(this.dy*20))
            }
        }else if(qPressed){
            if (this.x != 0){
            this.dy = 0
            this.dx = -1
            reExpand(this.x+(this.dx*20),this.y+(this.dy*20))
            }
        }else if(dPressed){
            if (this.x != 980){
            this.dy = 0
            this.dx = 1
            reExpand(this.x+(this.dx*20),this.y+(this.dy*20))
            }
        }
        var one = false
        var len = caseArray.length
        for (let i = 0;i<len;i++){
            if (caseArray[i].x == this.x+(this.dx*20) && caseArray[i].y == this.y+(this.dy*20) && one == false){
                if (caseArray[i].block == false){
                    this.x = this.x+(this.dx*20)
                    this.y = this.y+(this.dy*20)
                    one = true
                }else {
                    if (this.collision == false){
                        this.collision = true
                    }
                }
            }
        }
    }

    draw(){
        ctx.fillStyle = 'rgb(144, 0, 255)'
        ctx.fillRect(this.x, this.y, 20, 20);
        len = this.particul.length
        for (let i = 0;i<len;i+=2){
            if (this.particul[i] != this.x || this.particul[i+1] != this.y){
                var opacity = 0+i/10
                var color = "rgba(137, 43, 226,"+opacity+")"
                ctx.fillStyle = color
                ctx.fillRect(this.particul[i], this.particul[i+1], 20, 20);
            }
        }
    }
}

//rgba(137, 43, 226


export {Player};
