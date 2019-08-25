export function loadImage (url) {
  return new Promise(resolve => {
    const image = new window.Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

export function loadLevel (name) {
  return window.fetch(`../levels/${name}.json`)
    .then(r => r.json())
}
