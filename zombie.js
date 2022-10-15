import {c, ctx,canvasWidth} from "./main.js";

class Zombie {
    constructor(x,y){
        this.x = x*50
        this.y = y*50
    }
    update(caseArray,zombies){
        var comparatorArray = []
        var len = caseArray.length
        for (let i = 0;i<len;i++){
            if (caseArray[i].x == this.x+50 && caseArray[i].y == this.y ||
                caseArray[i].x == this.x-50 && caseArray[i].y == this.y ||
                caseArray[i].y == this.y+50 && caseArray[i].x == this.x ||
                caseArray[i].y == this.y-50 && caseArray[i].x == this.x){
                    if (caseArray[i].block == false){
                        comparatorArray.push(caseArray[i])
                    }
            }
        }
        comparatorArray.sort((a, b) => (a.score > b.score ? 1 : -1));
        var caseToGo = true
        if (comparatorArray.length>=1){
            for (let i = 0;i<zombies.length;i++){
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

    draw(dx,dy){
        dx = dx*-1
        dy = dy*-1
        this.x = this.x+(dx*50)
        this.y = this.y+(dy*50)
        ctx.fillStyle = 'lightgreen'
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}

export {Zombie};
