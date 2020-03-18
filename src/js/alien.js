const template = document.createElement('template')
template.innerHTML = `
<img id="alien" src="../image/alien.png" alt="alien"></img>
`

export class Alien extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('evil-alien', Alien)
