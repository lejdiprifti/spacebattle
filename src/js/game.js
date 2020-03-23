import './spaceship.js'
import './alien.js'
import './endGame.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/style.css" />
</head>
<div id="score">
  <h1>Score</h1>
  <p>0</p>
</div>
<div id="line">
<div id="redLine"></div>
<img id="satelliteLeft" src="../image/satelliteLeft.png" alt="satellite" />
<img id="satelliteRight" src="../image/satelliteRight.png" alt="satellite" />
</div>
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
    this.moveSpaceship()
    this.createAliens()
    this.score = 0
    this.index = 0
    this.timeoutArray = []
    this.ended = false
  }

  moveSpaceship () {
    const container = this.shadowRoot.querySelector('#container')

    const spaceship = document.createElement('space-ship')
    spaceship.style.position = 'absolute'
    spaceship.style.left = 600 + 'px'
    spaceship.classList.add('spaceship')
    container.appendChild(spaceship)

    let left = 600
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
      }
    })
    this.shoot()
  }

  shoot () {
    document.addEventListener('keydown', event => {
      if (event.keyCode === 32) {
        this.createBomb()
        const audio = new Audio('../image/rocketSound.mp3')
        audio.play()
      }
    })
  }

  createBomb () {
    const container = this.shadowRoot.querySelector('#container')
    const spaceship = this.shadowRoot.querySelector('space-ship')
    const top = 544
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
    } else {
      bomb.remove()
    }
  }

  createAliens () {
    const container = this.shadowRoot.querySelector('#container')
    this.createAlien = setTimeout(timeout => {
      const alien = document.createElement('evil-alien')
      alien.setAttribute('index', this.index)
      alien.classList.add('aliens')
      alien.style.position = 'absolute'
      alien.style.top = 0 + 'px'
      alien.style.left = parseInt(Math.random() * 1000) + 'px'
      container.appendChild(alien)
      this.moveAliens(alien)
      this.createAliens()
      this.index += 1
    }, 2000)
  }

  moveAliens (alien) {
    const top = parseInt(alien.style.top)
    if (top < 523) {
      this.timeoutArray.push('alien' + alien.getAttribute('index') + ' ' + setTimeout(() => {
        alien.style.top = top + 16 + 'px'
        this.moveAliens(alien)
      }, 300))
    } else if (this.ended === false) {
      this.endGame()
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

  // check if the bomb and the alien are at the same positon and then remove them
  checkIfHit (bomb) {
    const aliens = this.shadowRoot.querySelectorAll('.aliens')
    const bombTop = parseInt(bomb.style.top)
    const bombLeft = parseInt(bomb.style.left)
    const audio = new Audio('../image/explosion_medium.mp3')
    aliens.forEach(alien => {
      const alienTop = parseInt(alien.style.top)
      const alienLeft = parseInt(alien.style.left)
      if (Math.abs(alienTop - bombTop) < 18 && Math.abs(alienLeft - bombLeft) < 18) {
        this.clearAlienMoving(alien)
        audio.play()
        alien.remove()
        bomb.remove()
        this.updateScore()
      }
    })
  }

  clearAlienMoving (alien) {
    this.timeoutArray.forEach(timeout => {
      const splitArray = timeout.split(' ') // [alien index, timeout number]
      if (splitArray[0] === 'alien' + alien.getAttribute('index')) {
        clearTimeout(parseInt(splitArray[1]))
      }
    })
  }

  endGame () {
    this.ended = true
    const alienArray = this.shadowRoot.querySelectorAll('.aliens')
    this.shadowRoot.innerHTML = ''
    alienArray.forEach(alien => {
      this.clearAlienMoving(alien)
    })
    const obj = JSON.parse(window.localStorage.getItem((window.localStorage.length - 1).toString()))
    obj.score = this.score
    window.localStorage.setItem((window.localStorage.length - 1).toString(), JSON.stringify(obj))
    const endGame = document.createElement('end-game')
    document.body.appendChild(endGame)
  }

  updateScore () {
    this.score = this.score + 1
    const scoreText = this.shadowRoot.querySelector('#score p')
    scoreText.innerHTML = `${this.score} <img src='../image/alien.png' alt='alien' />`
  }
}

window.customElements.define('battle-game', BattleGame)
