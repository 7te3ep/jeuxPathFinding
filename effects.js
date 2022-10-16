import {c, ctx,canvasWidth} from "./main.js";

class Particle {
    constructor(color,size,x,y,speedX,speedY){
        if (speedX == 0 && speedY == 0){
            this.size = size
            this.toRetrieve = this.size/50
        }else {
            this.size = Math.random() * size  - 1.5
            this.toRetrieve = this.size/20
        }
        this.x = x
        this.y = y
        this.color = color
        this.speedX = ((Math.round(Math.random()) * 2 - 1)*3)*speedX;
        this.speedY = ((Math.round(Math.random()) * 2 - 1)*3)*speedY;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 5) this.size -= this.toRetrieve;
    }

    draw(dx,dy){
        dx = dx*-1
        dy = dy*-1
        this.x = this.x+(dx*50)
        this.y = this.y+(dy*50)
        ctx.fillStyle = this.color
        ctx.fillRect(this.x+(50-this.size)/2, this.y+(50-this.size)/2, this.size, this.size);
    }
}


export {Particle}

