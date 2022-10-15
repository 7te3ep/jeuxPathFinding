import {c, ctx,canvasWidth} from "./main.js";

class Particle {
    constructor(color,size,x,y){
        this.x = x
        this.y = y
        this.color = color
        this.size = Math.random() * size  - 1.5
        this.speedX = Math.random() * 8 - 1.5;
        this.speedY = Math.random() * 8 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 5) this.size -= this.size/15;
    }

    draw(dx,dy){
        dx = dx*-1
        dy = dy*-1
        this.x = this.x+(dx*50)
        this.y = this.y+(dy*50)
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}


export {Particle}

