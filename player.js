import {c, ctx,canvasWidth} from "./main.js";
import { reExpand } from "./main.js";

var caseWidth = canvasWidth / 20

var zPressed = false
var sPressed = false
var qPressed = false
var dPressed = false
//var audio = new Audio('music.mp3');

window.addEventListener("keydown", function(event) {
    //audio.play();
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
    }
    update(caseArray){
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
        ctx.fillStyle = 'green'
        if (this.arrived == false){
            ctx.fillRect(this.x, this.y, 20, 20);
        }
    }
}




export {Player};
