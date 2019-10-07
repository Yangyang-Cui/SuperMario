import Level from '../Level.js'
import { createBackgroundLayer, createSpriteLayer } from '../layers.js'
import { loadJSON, loadSpriteSheet } from '../loaders.js'

export async function loadLevel (name) {
  const levelSpec = await loadJSON(`../levels/${name}.json`)
  const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet)
  const level = new Level()
  createTiles(level, levelSpec.tiles, levelSpec.patterns)
  const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
  level.comp.layers.push(backgroundLayer)
  const spriteLayer = createSpriteLayer(level.entities)
  level.comp.layers.push(spriteLayer)
  return level
}

function * expandSpan (xStart, xLen, yStart, yLen) {
  const xEnd = xStart + xLen
  const yEnd = yStart + yLen
  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      yield { x, y }
    }
  }
}

function expandRange (range) {
  if (range.length === 4) {
    const [xStart, xLen, yStart, yLen] = range
    return expandSpan(xStart, xLen, yStart, yLen)
  } else if (range.length === 3) {
    const [xStart, xLen, yStart] = range
    return expandSpan(xStart, xLen, yStart, 1)
  } else if (range.length === 2) {
    const [xStart, yStart] = range
    return expandSpan(xStart, 1, yStart, 1)
  }
}

function * expandRanges (ranges) {
  for (const range of ranges) {
    yield * expandRange(range)
  }
}

function createTiles (level, tiles, patterns, offsetX = 0, offsetY = 0) {
  for (const tile of tiles) {
    for (const { x, y } of expandRanges(tile.ranges)) {
      const deriveX = x + offsetX
      const deriveY = y + offsetY
      if (tile.pattern) {
        const tiles = patterns[tile.pattern].tiles
        createTiles(level, tiles, patterns, deriveX, deriveY)
      } else {
        level.tiles.set(deriveX, deriveY, {
          name: tile.name,
          type: tile.type
        })
      }
    }
  }
}
