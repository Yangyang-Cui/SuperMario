import SpriteSheet from './SpriteSheet.js'
import { createAnim } from './anim.js'

export function loadImage (url) {
  return new Promise(resolve => {
    const image = new window.Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

export function loadJSON (url) {
  return window.fetch(url).then(r => r.json())
}

export async function loadSpriteSheet (name) {
  const sheetSpec = await loadJSON(`../sprites/${name}.json`)
  const image = await loadImage(sheetSpec.imageURL)
  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)
  if (sheetSpec.tiles) {
    sheetSpec.tiles.forEach((tilesSpec) => {
      sprites.defineTile(tilesSpec.name, tilesSpec.index[0], tilesSpec.index[1])
    })
  }
  if (sheetSpec.frames) {
    sheetSpec.frames.forEach((frameSpec) => {
      sprites.define(frameSpec.name, ...frameSpec.rect)
    })
  }
  if (sheetSpec.animations) {
    sheetSpec.animations.forEach((animSpec) => {
      const animation = createAnim(animSpec.frames, animSpec.frameLen)
      sprites.defineAnim(animSpec.name, animation)
    })
  }
  return sprites
}
