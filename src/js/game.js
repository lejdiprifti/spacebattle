import './spaceship.js'
import './alien.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/style.css" />
</head>
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
    this.createAliens()
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
            spaceship.style.left = (left + 16) + 'px'
            left += 16
          }
          break
        case 37:
          if (this.validatePostionLeft(left, event.keyCode) === true) {
            spaceship.style.left = (left - 16) + 'px'
            left -= 16
          }
          break
        case 38:
          if (this.validatePostionTop(top, event.keyCode) === true) {
            spaceship.style.top = (top - 16) + 'px'
            top -= 16
          }
          break
        case 40:
          if (this.validatePostionTop(top, event.keyCode) === true) {
            spaceship.style.top = (top + 16) + 'px'
            top += 16
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
    if (top > 0) {
      this.bombMove = setTimeout(timeout => {
        bomb.style.top = top + 'px'
        top = top - 16
        this.moveBomb(bomb, top)
        this.checkIfHit(bomb)
      }, 100)
    }
  }

  createAliens () {
    const alien = document.createElement('evil-alien')
    const container = this.shadowRoot.querySelector('#container')
    alien.classList.add('aliens')
    setTimeout(timeout => {
      alien.style.position = 'absolute'
      alien.style.top = 0 + 'px'
      alien.style.left = parseInt(Math.random() * 1000) + 'px'
      container.appendChild(alien)
      this.moveAliens(alien)
      this.createAliens()
    }, 2000)
  }

  moveAliens (alien) {
    const top = parseInt(alien.style.top)
    if (top < 544) {
      this.movingAlien = setTimeout(timeout => {
        alien.style.top = top + 16 + 'px'
        this.moveAliens(alien)
      }, 1000)
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

  // check if the bomb and the alien are at the same positon and then remove them
  checkIfHit (bomb) {
    const aliens = this.shadowRoot.querySelectorAll('.aliens')
    const bombTop = parseInt(bomb.style.top)
    const bombLeft = parseInt(bomb.style.left)
    aliens.forEach(alien => {
      const alienTop = parseInt(alien.style.top)
      const alienLeft = parseInt(alien.style.left)
      if (Math.abs(alienTop - bombTop) < 16 && Math.abs(alienLeft - bombLeft) < 16) {
        alien.remove()
        bomb.remove()
        clearTimeout(this.movingAlien)
        clearTimeout(this.bombMove)
      }
    })
  }
}

window.customElements.define('battle-game', BattleGame)
