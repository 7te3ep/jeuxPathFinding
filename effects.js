import {c, ctx,canvasWidth} from "./main.js";

class Particle {
    constructor(color,size,x,y){
        this.x = x
        this.y = y
        this.color = color
        this.size = Math.random() * size  - 1.5
        this.speedX = Math.random() * 5 - 1.5;
        this.speedY = Math.random() * 5 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 5) this.size -= this.size/30;
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}


export {Particle}

