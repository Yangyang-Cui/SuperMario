import { Trait } from '../Entity.js'
export default class Go extends Trait {
  constructor () {
    super('go')
    this.dir = 0
    this.distance = 0
    this.heading = 1
    this.acceleration = 400
    this.dragFactor = 1 / 5000
    this.deceleration = 300
  }

  update (entity, deltaTime) {
    const absX = Math.abs(entity.vel.x)
    if (this.dir !== 0) {
      entity.vel.x += this.dir * this.acceleration * deltaTime
      if (entity.jump) {
        if (entity.jump.air === false) {
          this.heading = this.dir
        }
      } else {
        this.heading = this.dir
      }
    } else if (entity.vel.x !== 0) {
      const decel = Math.min(absX, this.deceleration * deltaTime)
      entity.vel.x += entity.vel.x > 0 ? -decel : decel
    } else {
      this.distance = 0
    }
    const drag = this.dragFactor * entity.vel.x * absX
    entity.vel.x -= drag
    this.distance += absX * deltaTime
  }
}
