// *** Debug Purpose ***
// import { createCollisionLayer, createCameraLayer } from './layers.js'
// import { setupMouseControl } from './debug.js'
// **********************
import { loadLevel } from './loaders/level.js'
import { createMario } from './entities.js'
import Timer from './Timer.js'
import { setupKeyboard } from './setupKeyboard.js'
import Camera from './Camera.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

Promise.all([
  createMario(),
  loadLevel('1-1')
]).then(([mario, level]) => {
  const camera = new Camera()
  window.camera = camera

  mario.pos.set(64, 64)
  level.entities.add(mario)

  const input = setupKeyboard(mario)
  input.listenTo(window)

  // *** Debug Purpose ***
  // level.comp.layers.push(
  //   createCollisionLayer(level),
  //   createCameraLayer(camera))
  // setupMouseControl(canvas, mario, camera)
  // **********************

  const timer = new Timer(1 / 60)
  timer.update = function update (deltaTime) {
    level.update(deltaTime)
    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100
    }
    level.comp.draw(context, camera)
    // console.log('mario.pos.x :', mario.pos.x)
    // console.log('mario.pos.y :', mario.pos.y)
  }
  timer.start()
})
