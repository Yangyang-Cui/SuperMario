import { Trait, Sides } from '../Entity.js'
export default class Jump extends Trait {
  constructor () {
    super('jump')
    this.duration = 0.3
    this.velocity = 200
    this.engageTime = 0
    this.already = 0
    this.requestTime = 0
    this.gracePeriod = 0.1
    this.speedBoost = 0.2
  }

  get air () {
    return this.already < 0
  }

  start () {
    this.requestTime = this.gracePeriod
  }

  cancel () {
    this.engageTime = 0
    this.requestTime = 0
  }

  obstruct (entity, side) {
    if (side === Sides.BOTTOM) {
      this.already = 1
    } else if (side === Sides.TOP) {
      this.cancel()
    }
  }

  update (entity, deltaTime) {
    if (this.requestTime > 0) {
      if (this.already > 0) {
        this.engageTime = this.duration
        this.requestTime = 0
      }
      this.requestTime -= deltaTime
    }
    if (this.engageTime > 0) {
      entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost)
      this.engageTime -= deltaTime
    }
    this.already--
  }
}
