const template = document.createElement('template')
template.innerHTML = `
<img id="spaceship" src="../image/spaceship.png" alt="spaceship"></img>
`

export class Spaceship extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('space-ship', Spaceship)
