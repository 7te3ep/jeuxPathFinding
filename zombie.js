import {c, ctx,canvasWidth} from "./main.js";
var caseWidth = canvasWidth / 20

class Zombie {
    constructor(x,y){
        this.x = x*20
        this.y = y*20
    }
    update(caseArray,zombies){
        var comparatorArray = []
        for (let i = 0;i<caseArray.length;i++){
            if (caseArray[i].x == this.x+20 && caseArray[i].y == this.y ||
                caseArray[i].x == this.x-20 && caseArray[i].y == this.y ||
                caseArray[i].y == this.y+20 && caseArray[i].x == this.x ||
                caseArray[i].y == this.y-20 && caseArray[i].x == this.x){
                    if (caseArray[i].block == false){
                        comparatorArray.push(caseArray[i])
                    }
            }
        }
        comparatorArray.sort((a, b) => (a.score > b.score ? 1 : -1));
        var caseToGo = true
        if (comparatorArray.length>=1){
            for (let i = 0;i<zombies.length;i++){
                //if (comparatorArray[0].x == zombies[i].x && comparatorArray[0].y == zombies[i].y){
                //    caseToGo = false
                //}
                if (zombies[i].x == comparatorArray[0].x && zombies[i].y == comparatorArray[0].y){
                    caseToGo = false
                }
            }
            if (caseToGo){
                    this.x = comparatorArray[0].x
                    this.y = comparatorArray[0].y
            }
        }
    }

    draw(){
        ctx.fillStyle = 'lightgreen'
        ctx.fillRect(this.x, this.y, 20, 20);
    }
}

export {Zombie};
