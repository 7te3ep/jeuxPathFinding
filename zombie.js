import {c, ctx,canvasWidth} from "../main.js";
var caseWidth = canvasWidth / 20

class Zombie {
    constructor(x,y){
        this.x = x*20
        this.y = y*20
        this.arrived = false
    }
    update(caseArray){
        var comparatorArray = []
        for (let i = 0;i<caseArray.length;i++){
            if (caseArray[i].x == this.x+20 && caseArray[i].y == this.y ||
                caseArray[i].x == this.x-20 && caseArray[i].y == this.y ||
                caseArray[i].y == this.y+20 && caseArray[i].x == this.x ||
                caseArray[i].y == this.y-20 && caseArray[i].x == this.x){
                    if (caseArray[i].block == false && this.arrived == false){
                        comparatorArray.push(caseArray[i])
                    }
            }
        }
        comparatorArray.sort((a, b) => (a.score > b.score ? 1 : -1));
        this.x = comparatorArray[0].x
        this.y = comparatorArray[0].y
        if (comparatorArray[0].objective == true){
            this.arrived = true
        }
    }

    draw(){
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)'
        if (this.arrived == false){
            ctx.fillRect(this.x, this.y, 20, 20);
        }
    }
}

export {Zombie};