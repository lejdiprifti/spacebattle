import './game.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/start.css" />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<div id="container">
<div class="content shadow p-3 mb-5 bg-white rounded">
<h1>Welcome to Space Battle</h1>
<input type="text" id="username" placeholder="Pick a username" />
<button type="button" class="btn btn-primary btn-lg">Play</button>
</div>
</div>
`

export class StartGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.start()
    this.index = window.localStorage.length
  }

  start () {
    const button = this.shadowRoot.querySelector('button')
    button.addEventListener('click', () => {
      this.remove()
      this.saveUsername()
      const game = document.createElement('battle-game')
      document.body.appendChild(game)
    })
  }

  saveUsername () {
    const input = this.shadowRoot.querySelector('input')
    const object = {
      username: input.value || 'Unknown',
      score: 0
    }
    window.localStorage.setItem(this.index, JSON.stringify(object))
  }
}

window.customElements.define('start-game', StartGame)
