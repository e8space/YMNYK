class EnemyShipType1 {

  #proceduralEnemyShipType1Image;
  #particleGenerator;
  #canvasHandler;
  #resourceHandler;

  static shipTypeVariations = {
    0: {
      shipSize: 1,
      scale: 0.4,
      weapons: [WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      particles: [],
      shield: {
        type: ShieldFactory.SHIELD_TYPES.classBShield,
        posDX:-105,
        posDY:-40
      },
    },
    1: {
      shipSize: 3,
      scale: 0.6,
      particles: [],
      weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      shield: {
        type: ShieldFactory.SHIELD_TYPES.classBShield,
        posDX:-105,
        posDY:-40
      },
    },
    2: {
      shipSize: 7,
      scale: 1,
      particles: [],
      weapons : [ WeaponFactory.WEAPON_TYPES.photonTorpedoEnemy],
      shield: {
        type: ShieldFactory.SHIELD_TYPES.classBShield,
        posDX:-105,
        posDY:-30
      },
    }
  }

  constructor({resourceHandler, canvasHandler, particleGenerator}){
    this.#resourceHandler = resourceHandler;
    this.#canvasHandler = canvasHandler;
    this.#particleGenerator = particleGenerator;

    this.#proceduralEnemyShipType1Image = new ProceduralEnemyShipImageType1({
      resourceHandler,
      canvasHandler
    })
  }

  invoke = async () =>{
    await this.#proceduralEnemyShipType1Image.invoke();

    await this.#createParticlesForAllShipTypeVariations({
      shipType: this.#proceduralEnemyShipType1Image,
      shipTypeVariations: EnemyShipType1.shipTypeVariations
    })
  }

  createImage = async ({typeVariation}) =>{
    return await this.#proceduralEnemyShipType1Image.create({
      shipSize: typeVariation.shipSize,
      scale: typeVariation.scale
    });
  }


  #createParticlesForAllShipTypeVariations = async ({shipType, shipTypeVariations}) =>{
    for (const variation in shipTypeVariations) {
      const shipTypeImageData = await shipType.create({
        shipSize: shipTypeVariations[variation].shipSize,
        scale: shipTypeVariations[variation].scale
      });

      shipTypeVariations[variation].particles = this.#particleGenerator.createParticles({
        imageData: shipTypeImageData.imageData,
        stride: 22,
        particleWidthRange: 8,
        particleHeightRange: 8,
        velocityRangeX: 5,
        velocityRangeY: 5,
        colorRange: 0,
        colorOffset: 255
      });
    }
  }
}