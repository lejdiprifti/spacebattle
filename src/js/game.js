import './spaceship.js'
const template = document.createElement('template')
template.innerHTML = `
<div id="container">
<template>
<img id="bomb" src="../image/bomb.png" alt="bomb"></img>
</template>
</div>
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
    spaceship.style.top = 32
    spaceship.style.left = 32
    container.appendChild(spaceship)

    let top = 32
    let left = 32
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
    this.shoot()
  }

  shoot () {
    document.addEventListener('keydown', event => {
      if (event.keyCode === 32) {
        this.createBomb()
      }
    })
  }

  createBomb () {
    const container = this.shadowRoot.querySelector('#container')
    const spaceship = this.shadowRoot.querySelector('space-ship')
    const top = parseInt(spaceship.style.top)
    let bomb = this.shadowRoot.querySelector('template').content.firstElementChild
    bomb = document.importNode(bomb, true)
    bomb.style.position = 'absolute'
    bomb.style.top = (top - 32) + 'px'
    bomb.style.left = parseInt(spaceship.style.left) + 15 + 'px'
    this.moveBomb(bomb, top - 32)
    container.appendChild(bomb)
  }

  moveBomb (bomb, top) {
    console.log(bomb)
    if (top > 0) {
      console.log('executing')
      setTimeout(timeout => {
        bomb.style.top = top + 'px'
        top = top - 16
        this.moveBomb(bomb, top)
      }, 1000)
    } else {
      bomb.src = '../image/boom.png'
    }
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
