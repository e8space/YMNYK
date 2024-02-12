'use strict'
class Planet extends GameObject {

  constructor({
                image,
                width,
                height,
                posX,
                posY,
                posDX,
                posDY,
                velX,
                velY,
                canvas
              }) {
    super({
      isActive: true,
      image,
      width,
      height,
      posX,
      posY,
      posDX,
      posDY,
      velX,
      velY,
      canvas,
      isDestroyable: false
    })
  }

  update=(deltaTime)=>{
    if (this.posX > (-this.width)) {
      this.posX = this.posX + this.velX * deltaTime;
    } else {
      this.destroy();
    }
  }
}