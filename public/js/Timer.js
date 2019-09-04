export default class Timer {
  constructor (deltaTime = 1 / 60) {
    let lastTime = 0
    let accumulatedTime = 0
    this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime) / 1000
      while (accumulatedTime > deltaTime) {
        this.update(deltaTime)
        accumulatedTime -= deltaTime
      }
      this.enqueue()
      lastTime = time
    }
  }

  enqueue () {
    window.requestAnimationFrame(this.updateProxy)
  }

  start () {
    this.enqueue()
  }
}