export function createAnim (frames, frameLen) {
  return function resolveAnim (distance) {
    const frameIndex = Math.ceil(distance / frameLen) % frames.length
    const frameName = frames[frameIndex]
    return frameName
  }
}
