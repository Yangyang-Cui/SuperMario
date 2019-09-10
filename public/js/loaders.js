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
function loadSpriteSheet (name) {
  return loadJSON(`../sprites/${name}.json`)
    .then((sheetSpec) => {
      return Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL)
      ]).then(([sheetSpec, image]) => {
        const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH)
        sheetSpec.tiles.forEach((tilesSpec) => {
          sprites.defineTile(tilesSpec.name, tilesSpec.index[0], tilesSpec.index[1])
        })
        return sprites
      })
    })
}
export function loadLevel (name) {
  return loadJSON(`../levels/${name}.json`)
    .then((levelSpec) => {
      return Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)
      ]).then(([levelSpec, backgroundSprites]) => {
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
      })
    })
}
