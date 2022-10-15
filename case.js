import {c, ctx,canvasWidth} from "./main.js";
class Case {
    constructor(x,y,block,score){
        this.x = x
        this.y = y
        this.score = score
        this.block = block
        this.hasExpand = false
    }

    expand(caseArray){
        if (this.hasExpand == false){
            for (let i = 0;i<caseArray.length;i++){
                if (caseArray[i].x == this.x+50 && caseArray[i].y == this.y ||
                    caseArray[i].x == this.x-50 && caseArray[i].y == this.y ||
                    caseArray[i].y == this.y+50 && caseArray[i].x == this.x ||
                    caseArray[i].y == this.y-50 && caseArray[i].x == this.x){
                    if (caseArray[i].score == "none" && caseArray[i].block == false){
                        caseArray[i].score = this.score + 1
                        this.hasExpand == true
                    }
                }
            }
        }
    }

    draw(dx,dy){
        dx = dx*-1
        dy = dy*-1
        this.x = this.x+(dx*50)
        this.y = this.y+(dy*50)
        ctx.fillStyle = 'black'
        if (this.objective){
            ctx.fillStyle = 'red'
        }
        if (this.block || this.score == "none"){
            ctx.fillStyle = 'grey'
            this.block = true
        }
        if (this.block){
            this.score = 100
        }
        ctx.fillRect(this.x, this.y, 50, 50);

        //ctx.font = "bold 15px arial";
        //ctx.fillStyle = "white";
        //if (this.score != "none" ||this.score != 100 ){
        //    ctx.fillText(`${this.score}`, this.x+20,this.y+25);
        //}
    }
}

export {Case};
