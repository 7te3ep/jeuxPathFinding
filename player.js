import {c, ctx,canvasWidth} from "./main.js";
import { reExpand } from "./main.js";

var caseWidth = canvasWidth / 20

var zPressed = false
var sPressed = false
var qPressed = false
var dPressed = false

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
        this.arrived = false
        this.particul = []
    }
    update(caseArray){
        if (this.particul.length >= 6){
            this.particul.splice(0,2)
        }
        this.particul.push(this.x,this.y)
        //console.log(this.particul)
        this.dx = 0
        this.dy = 0
        if (zPressed){
            this.dx = 0
            this.dy = -1
            reExpand(this.x,this.y)
        } else if(sPressed){
            this.dx = 0
            this.dy = 1
            reExpand(this.x,this.y)
        }else if(qPressed){
            this.dy = 0
            this.dx = -1
            reExpand(this.x,this.y)
        }else if(dPressed){
            this.dy = 0
            this.dx = 1
            reExpand(this.x,this.y)
        }
        var one = false
        for (let i = 0;i<caseArray.length;i++){
            if (caseArray[i].x == this.x+(this.dx*20) && caseArray[i].y == this.y+(this.dy*20) && caseArray[i].block == false && one == false){
                this.x = this.x+(this.dx*20)
                this.y = this.y+(this.dy*20)
                one = true
            }
        }
        sPressed = false
        zPressed = false
        qPressed = false
        dPressed = false
    }

    draw(){
        ctx.fillStyle = 'blue'
        if (this.arrived == false){
            ctx.fillRect(this.x, this.y, 20, 20);
        }
        if (this.particul[4] != this.x || this.particul[5] != this.y){
            ctx.fillStyle = "rgba(0, 0, 255,0.45)"
            ctx.fillRect(this.particul[4], this.particul[5], 20, 20);
        }
        if (this.particul[2] != this.x || this.particul[3] != this.y){
            ctx.fillStyle = "rgba(0, 0, 255,0.3)"
            ctx.fillRect(this.particul[2], this.particul[3], 20, 20);
        }
        if (this.particul[0] != this.x || this.particul[1] != this.y){
            ctx.fillStyle = "rgba(0, 0, 255,0.1)"
            ctx.fillRect(this.particul[0], this.particul[1], 20, 20);
        }
    }
}




export {Player};
