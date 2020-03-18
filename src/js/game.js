import './spaceship.js'
const template = document.createElement('template')
template.innerHTML = `
<div id="container"></div>
`

export class BattleGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.createArray()
    this.moveSpaceship()
  }

  createArray () {
    const columns = (window.screen.width / 64).toPrecision(2)
    const rows = (window.screen.height / 64).toPrecision(2)
    let gamingArray = new Array(Number(rows)).fill()
    gamingArray = gamingArray.map(el => new Array(Number(columns)))
    return gamingArray
  }

  moveSpaceship () {
    const container = this.shadowRoot.querySelector('#container')

    const spaceship = document.createElement('space-ship')
    spaceship.style.position = 'absolute'
    spaceship.style.top = 0
    spaceship.style.left = 0
    container.appendChild(spaceship)

    let top = 0
    let left = 0

    document.addEventListener('keydown', () => {
      switch (event.keyCode) {
        case 39:
          if (this.validatePostionLeft(left, event.keyCode) === true) {
            spaceship.style.left = (left + 32) + 'px'
            left += 32
          }
          break
        case 37:
          if (this.validatePostionLeft(left, event.keyCode) === true) {
            spaceship.style.left = (left - 32) + 'px'
            left -= 32
          }
          break
        case 38:
          if (this.validatePostionTop(top, event.keyCode) === true) {
            spaceship.style.top = (top - 32) + 'px'
            top -= 32
          }
          break
        case 40:
          if (this.validatePostionTop(top, event.keyCode) === true) {
            spaceship.style.top = (top + 32) + 'px'
            top += 32
          }
          break
      }
    })
  }

  validatePostionLeft (left, code) {
    if (left < 1280 && code === 39) {
      return true
    } else if (left > 0 && code === 37) {
      return true
    }
    return false
  }

  validatePostionTop (top, code) {
    if (top > 0 && code === 38) {
      return true
    } else if (top < 544 && code === 40) {
      return true
    }
    return false
  }
}

window.customElements.define('battle-game', BattleGame)
