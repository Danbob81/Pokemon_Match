// card options
const cardArray = [{
        name: 'bulbasaur',
        img: 'assets/images/bulbasaur.png'
    },
    {
        name: 'bulbasaur',
        img: 'assets/images/bulbasaur.png'
    },
    {
        name: 'charmander',
        img: 'assets/images/charmander.png'
    },
    {
        name: 'charmander',
        img: 'assets/images/charmander.png'
    },
    {
        name: 'eevee',
        img: 'assets/images/eevee.png'
    },
    {
        name: 'eevee',
        img: 'assets/images/eevee.png'
    },
    {
        name: 'jigglypuff',
        img: 'assets/images/jigglypuff.png'
    },
    {
        name: 'jigglypuff',
        img: 'assets/images/jigglypuff.png'
    },
    {
        name: 'pikachu',
        img: 'assets/images/pikachu.png'
    },
    {
        name: 'pikachu',
        img: 'assets/images/pikachu.png'
    },
    {
        name: 'squirtle',
        img: 'assets/images/squirtle.png'
    },
    {
        name: 'squirtle',
        img: 'assets/images/squirtle.png'
    },
]

cardArray.sort(() => 0.5 - Math.random())


const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
let finish = document.createElement('p')


// create board
function createBoard() {

    for (let i = 0; i < cardArray.length; i++) {
        let grid = document.querySelector('.grid')
        let card = document.createElement('img')
        card.setAttribute('src', 'assets/images/pokeball.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
        playAudio('game-load')
    }
}

// check for matches
function checkForMatch() {
    let cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'assets/images/pokeball.png')
        cards[optionTwoId].setAttribute('src', 'assets/images/pokeball.png')
        playAudio('same-card')
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].removeEventListener('click', flipCard, )
        cards[optionTwoId].removeEventListener('click', flipCard, )
        cardsWon.push(cardsChosen)
        playAudio('card-match')
    } else {
        cards[optionOneId].setAttribute('src', 'assets/images/pokeball.png')
        cards[optionTwoId].setAttribute('src', 'assets/images/pokeball.png')
        playAudio('no-match')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
        finish.innerHTML = 'Congratulations! You found them all!';
        document.getElementById('congrats').appendChild(finish);
        playAudio('game-finish')
    }
}

// flip the card
function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    playAudio('card-flip')
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

// game sounds
function playAudio(audioElementId) {
    let soundElement = document.getElementById(audioElementId);
    soundElement.play();
}

// reload page
function restart() {
    location.reload();
}