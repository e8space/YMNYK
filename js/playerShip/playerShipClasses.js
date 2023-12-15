/**
 * Class A
 */
class ClassAShip {

  static resourceObject = new ResourceObject({
    id : "ship01ClassA",
    filename : "ship_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/ships/ship_01/images/ship_01.png"
  })

  static properties = {
    posX: 100,
    posY: 100,
    posDX: 0,
    posDY: 0,
    velX: 0,
    velY: 0,
    maxVelX: 4,
    maxVelY: 4,
    accX: 0.3,
    accY: 0.3
  }

  static engineTrail = {
    posDX : 20,
    posDY :16
  };
  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: 20,
    posDY: 16
  }
  static shield = {
    type: ShieldFactory.SHIELD_TYPES.classAShield,
    posDX: -70,
    posDY: -115
  }

  static terminationSequence = {
    type: ExplosionFactory.EXPLOSION_TYPES.classAPlayerShipExplosion,
    posDX: -40,
    posDY: -50
  }

  static weapons = {

    PhotonTorpedo : {
      controlAssignment : "Space",
      type: WeaponFactory.WEAPON_TYPES.photonTorpedo,
      amount: 10,
      posDX: 60,
      posDY: 27
    },

    PhotonTorpedoFireAndForget : {
      controlAssignment : "ControlRight",
      type : WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget,
      amount: 10,
      posDX : 60,
      posDY : 27
    }
  }
}

/**
 * Class B
 */
class ClassBShip {

  static #resourceObject = new ResourceObject({
    id : "ship01ClassA",
    filename : "ship_01",
    type : ResourceObject.TYPES.png,
    resourcePath : "/resources/ships/ship_02/images/ship_02.png"
  })

  static properties = {
    posX: 100,
    posY: 100,
    posDX: 0,
    posDY: 0,
    velX: 0,
    velY: 0,
    maxVelX: 4,
    maxVelY: 4,
    accX: 0.3,
    accY: 0.3
  }

  static engineTrail = {
    posDX : -10,
    posDY :32
  };
  static propulsion = {
    type : PropulsionFactory.PROPULSION_TYPES.ionA,
    posDX: -10,
    posDY: 30
  }
  static shield = {
    type: ShieldFactory.SHIELD_TYPES.classAShield,
    posDX: -70,
    posDY: -115
  }

  static terminationSequence = {
    type: ExplosionFactory.EXPLOSION_TYPES.classAPlayerShipExplosion,
    posDX: -40,
    posDY: -50
  }

  static weapons = {

    PhotonTorpedo : {
      controlAssignment : "Space",
      type: WeaponFactory.WEAPON_TYPES.photonTorpedo,
      amount: 10,
      posDX: 60,
      posDY: 27
    },

    PhotonTorpedoFireAndForget : {
      controlAssignment : "ControlRight",
      type : WeaponFactory.WEAPON_TYPES.photonTorpedoFireAndForget,
      amount: 10,
      posDX : 60,
      posDY : 27
    }
  }

}