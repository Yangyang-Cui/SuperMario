import Entity from './Entity.js'
import Jump from './traits/Jump.js'
import Go from './traits/Go.js'
import { loadSpriteSheet } from './loaders.js'
import { createAnim } from './anim.js'

export async function createMario () {
  const sprite = await loadSpriteSheet('mario')
  const mario = new Entity()

  mario.size.set(14, 16)
  mario.addTrait(new Go())
  mario.addTrait(new Jump())

  const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10)
  function routeAnim (mario) {
    if (mario.jump.air) {
      return 'jump'
    }
    if (mario.go.distance > 0) {
      if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
        return 'break'
      }
      return runAnim(mario.go.distance)
    }
    return 'idle'
  }
  mario.draw = function drawMario (context) {
    sprite.draw(routeAnim(this), context, 0, 0, this.go.heading < 0)
  }

  return mario
}
