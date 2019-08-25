export function loadImage (url) {
  return new Promise(resolve => {
    const image = new window.Image()
    image.addEventListener('load', () => {
      setTimeout(resolve, 2000, image)
      // resolve(image)
    })
    image.src = url
  })
}

export function loadLevel (name) {
  return window.fetch(`../levels/${name}.json`)
    .then(r => r.json())
    .then((json) => {
      return new Promise((resolve) => {
        setTimeout(resolve, 3000, json)
      })
    })
}
