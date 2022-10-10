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
                if (caseArray[i].x == this.x+20 && caseArray[i].y == this.y ||
                    caseArray[i].x == this.x-20 && caseArray[i].y == this.y ||
                    caseArray[i].y == this.y+20 && caseArray[i].x == this.x ||
                    caseArray[i].y == this.y-20 && caseArray[i].x == this.x){
                    if (caseArray[i].score == "none" && caseArray[i].block == false){
                        caseArray[i].score = this.score + 1
                        this.hasExpand == true
                    }
                }
            }
        }
    }

    draw(){
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
        ctx.fillRect(this.x, this.y, 20, 20);

        //ctx.font = "bold 8px arial";
        //ctx.fillStyle = "white";
        //if (this.score != "none" ||this.score != 100 ){
        //    ctx.fillText(`${this.score}`, this.x+8,this.y+12);
        //}
    }
}

export {Case};
