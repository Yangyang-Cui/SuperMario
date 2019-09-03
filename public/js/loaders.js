import Level from './Level.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import { loadBackgroundSprites } from './sprites.js'

export function loadImage (url) {
  return new Promise(resolve => {
    const image = new window.Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

export async function loadLevel (name) {
  const [levelSpec, backgroundSprites] = await Promise.all([
    window.fetch(`../levels/${name}.json`)
      .then(r => r.json()),
    loadBackgroundSprites()
  ])
  const level = new Level()
  const backgroundLayer = createBackgroundLayer(
    levelSpec.backgrounds,
    backgroundSprites
  )
  level.comp.layers.push(backgroundLayer)
  const spriteLayer = createSpriteLayer(level.entities)
  level.comp.layers.push(spriteLayer)

  return level
}
