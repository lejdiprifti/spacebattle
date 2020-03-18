const template = document.createElement('template')
template.innerHTML = `
`

export class BattleGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.createArray()
  }

  createArray () {
    console.log(window.screen.width)
  }
}

window.customElements.define('battle-game', BattleGame)
