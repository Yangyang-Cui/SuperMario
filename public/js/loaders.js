import Level from './Level.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import SpriteSheet from './SpriteSheet.js'

export function loadImage (url) {
  return new Promise(resolve => {
    const image = new window.Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

function createTiles (level, backgrounds) {
  function applyRange (background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen
    const yEnd = yStart + yLen

    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type
        })
      }
    }
  }
  backgrounds.forEach((background) => {
    background.ranges.forEach((range) => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range
        applyRange(background, xStart, xLen, yStart, yLen)
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range
        applyRange(background, xStart, xLen, yStart, 1)
      } else if (range.length === 2) {
        const [xStart, yStart] = range
        applyRange(background, xStart, 1, yStart, 1)
      }
    })
  })
}

function loadJSON (url) {
  return window.fetch(url).then(r => r.json())
}

export async function loadSpriteSheet (name) {
  const sheetSpec = await loadJSON(`../sprites/${name}.json`)
  const image = await loadImage(sheetSpec.imageURL)
  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)
  if (sheetSpec.tiles) {
    sheetSpec.tiles.forEach((tileSpec) => {
      sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1])
    })
  }
  if (sheetSpec.frames) {
    sheetSpec.frames.forEach((frameSpec) => {
      sprites.define(frameSpec.name, ...frameSpec.rect)
    })
  }
  return sprites
}

export async function loadLevel (name) {
  const levelSpec = await loadJSON(`../levels/${name}.json`)
  const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet)
  const level = new Level()
  createTiles(level, levelSpec.backgrounds)
  const backgroundLayer = createBackgroundLayer(
    level,
    backgroundSprites
  )
  level.comp.layers.push(backgroundLayer)
  const spriteLayer = createSpriteLayer(level.entities)
  level.comp.layers.push(spriteLayer)

  return level
}
