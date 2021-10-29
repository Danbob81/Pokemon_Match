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
    // {
    //     name: 'psyduck',
    //     img: 'assets/images/psyduck.png'
    // },
    // {
    //     name: 'psyduck',
    //     img: 'assets/images/psyduck.png'
    // },
    // {
    //     name: 'snorlax',
    //     img: 'assets/images/snorlax.png'
    // },
    // {
    //     name: 'snorlax',
    //     img: 'assets/images/snorlax.png'
    // },
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
        playAudio4()
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
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].removeEventListener('click', flipCard, )
        cards[optionTwoId].removeEventListener('click', flipCard, )
        cardsWon.push(cardsChosen)
        playAudio1()
    } else {
        cards[optionOneId].setAttribute('src', 'assets/images/pokeball.png')
        cards[optionTwoId].setAttribute('src', 'assets/images/pokeball.png')
        playAudio3()
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
        finish.innerHTML = 'Congratulations! You found them all!';
        document.getElementById('congrats').appendChild(finish);
        playAudio5()
    }
}

// flip the card
function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    playAudio2()
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}


// game sounds

function playAudio1() {
    let sound1 = document.getElementById('sound1')
    sound1.play();
}

function playAudio2() {
    let sound2 = document.getElementById('sound2')
    sound2.play();
}

function playAudio3() {
    let sound3 = document.getElementById('sound3')
    sound3.play();
}

function playAudio4() {
    let sound4 = document.getElementById('sound4')
    sound4.play();
}

function playAudio5() {
    let sound5 = document.getElementById('sound5')
    sound5.play();
}

// reload page
function restart() {
    location.reload();
}