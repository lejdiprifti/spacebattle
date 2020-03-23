const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/end.css" />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
</head>
<div id="container">
    <div class="scoreboard">
    <div class="header">
    <img src="../image/cup.png" alt="trophy" />
    <h1>Scoreboard</h1>
    </div>
    <ol id="list" class="list-group">
    <template>
    <li class="list-group-item list-group-item-success">
    </li>
    </template>
    </ol>
    </div>
    <button type="button" id="play" class="btn btn-primary btn-lg">Play again</button>
</div>
`

export class EndGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.fillInList()
    this.playAgain()
  }

  fillInList () {
    const length = window.localStorage.length
    const array = []
    for (let i = 0; i < length; i++) {
      array.push(JSON.parse(window.localStorage.getItem('' + i)))
    }
    const sortedArray = array.sort((a, b) => {
      return b.score - a.score
    })

    console.log(sortedArray)
    let item = this.shadowRoot.querySelector('template').content.firstElementChild
    const list = this.shadowRoot.querySelector('#list')
    for (let i = 0; i < 5; i++) {
      console.log('enter', i)
      item = document.importNode(item, true)
      item.innerHTML = (i + 1) + '. ' + sortedArray[i].username + ' ' + sortedArray[i].score + ' <img src="../image/alien.png" alt="alien" />'
      list.appendChild(item)
    }
  }

  playAgain () {
    const button = this.shadowRoot.querySelector('#play')
    button.addEventListener('click', () => {
      this.shadowRoot.innerHTML = ''
      const start = document.createElement('start-game')
      document.body.appendChild(start)
    })
  }
}

window.customElements.define('end-game', EndGame)
