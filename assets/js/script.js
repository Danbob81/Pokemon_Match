/*code based on YouTube video tutorial: https://www.youtube.com/watch?v=lhNdUVh3qCc&t=115s 
from https://www.freecodecamp.org/news/javascript-projects-for-beginners/#how-to-create-seven-classic-games-with-ania-kubow
with some changes and additions
*/


const cardArray = [{ // array to hold card options
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
    {
        name: 'psyduck',
        img: 'assets/images/psyduck.png'
    },
    {
        name: 'psyduck',
        img: 'assets/images/psyduck.png'
    },
    {
        name: 'snorlax',
        img: 'assets/images/snorlax.png'
    },
    {
        name: 'snorlax',
        img: 'assets/images/snorlax.png'
    },
];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

/**
 * create the game board
 * random layout each time board is loaded
 * audio file to play when board loads
 */
function createBoard() {
    cardArray.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cardArray.length; i++) {
        let grid = document.querySelector('.grid');
        let card = document.createElement('img');
        card.setAttribute('src', 'assets/images/pokeball.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
        playAudio('game-load');
    }
}

/**
 * check cards for matches
 * if same card clicked, notify user by playing a sound and resetting cards
 * if cards match, stop from being clicked again and play sound
 * if cards don't match, reset cards to be clicked again, also play sound
 * if all matches found, show message and play sound
 */
function checkForMatch() {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'assets/images/pokeball.png');
        cards[optionTwoId].setAttribute('src', 'assets/images/pokeball.png');
        playAudio('same-card'); //added to give user feedback that the same card has been chosen
    } else if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].removeEventListener('click', flipCard, );
        cards[optionTwoId].removeEventListener('click', flipCard, );
        cardsWon.push(cardsChosen);
        playAudio('card-match'); //added to give user feedback that the two chosen cards match
    } else {
        cards[optionOneId].setAttribute('src', 'assets/images/pokeball.png');
        cards[optionTwoId].setAttribute('src', 'assets/images/pokeball.png');
        playAudio('no-match'); //added to give user feedback that the two chosen cards don't match
    }
    cardsChosen = [];
    cardsChosenId = [];
    document.querySelector('.result').textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
        $('#finishModal').modal('show');
        playAudio('game-finish'); //added to give user feedback they have completed the game
    }
}

// flip the card
function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    playAudio('card-flip');
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

// game sounds - to be played under certain conditions during game play
function playAudio(audioElementId) {
    let soundElement = document.getElementById(audioElementId);
    soundElement.play();
}

/**
 * reload page when restart or replay button clicked
 */
function restart() {
    location.reload();
}

/** 
 * animation to show on play game button
 */
$("#play-ball").hover(function() {
    $(this).animate({ height: '103px', width: '103px' }),
        $(this).animate({ height: '100px', width: '100px' });
});

/**
 *game play area functions to hide play button when game grid is displayed. 
 *score and restart button also to be displayed when game grid is displayed.
 *congratulations message to display within modal when game completed.
 */
$('.play-button').click(function() {
    $('.play-button').hide();
    $('.grid').show();
    $('#restart').show();
    $('.score').show();
    $('#congrats').show();
    $('img').css('width', '25%');
    $('img').css('cursor', 'pointer');
});