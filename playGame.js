const SCORE_TO_WIN = 5;
let playerScore = 0;
let computerScore = 0;
let numOfRounds = 0;
let gameOver = false;

const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', startAGame));

const divResult = document.querySelector('#results');
const roundDisplay = document.querySelector('#roundDisplay');
const playScoreDisplay = document.querySelector('#playerScoreDisplay');
const compScoreDisplay = document.querySelector('#compScoreDisplay');
const overallResult = document.createElement('h3');

function resetGame() {
    roundDisplay.textContent = "";
    playScoreDisplay.textContent = "";
    compScoreDisplay.textContent = "";
    divResult.removeChild(overallResult);
    playerScore = 0;
    computerScore = 0;
    numOfRounds = 0;
    console.log("RESET DONE");
}

function startAGame(e) {
    let winner = "";
    if(gameOver) {
        console.log("Resetting game...");
        resetGame();
        gameOver = false;
    }
    else {
        console.log("New round started.");
        let compSelection = computerPlay();
        let playerSelection = formatChoice(e.srcElement.id.substr(4));
        
        console.log(`> Player played ${playerSelection}`);

        let play = playRound(playerSelection, compSelection);
        console.log(play);

        numOfRounds++;

        if(playerScore === SCORE_TO_WIN || computerScore === SCORE_TO_WIN) {
            winner = determineWinner();
            gameOver = true;
        }

        updateResults(numOfRounds, winner);
    }
}

function computerPlay() {
    let rand = Math.floor((Math.random() * 3) + 1);
    let choice = "";

    if(rand === 1) 
        choice = 'Rock';
    else if(rand === 2)
        choice = 'Paper';
    else if(rand === 3)
        choice = 'Scissors';

    console.log('> Computer played ' + choice);
    return choice;
}

function playRound(player, comp) {
    let outcomes = [`You win! ${player} beats ${comp}!`,
                    `You lose! ${comp} beats ${player}!`,
                    `It's a tie!`];
    if((player === 'Scissors' && comp === 'Paper') ||
        (player === 'Paper' && comp === 'Rock') ||
        (player === 'Rock' && comp === 'Scissors')) {
            playerScore++;
            return outcomes[0];
        }
    else if((player === 'Paper' && comp === 'Scissors') ||
            (player === 'Rock' && comp === 'Paper') ||
            (player === 'Scissors' && comp === 'Rock')) {
            computerScore++;
            return outcomes[1];
        }
    else
        return outcomes[2];
}

function determineWinner() {
    let winner = "";
    if (playerScore > computerScore) {
        winner = "YOU";
    }
    else if (computerScore > playerScore) {
        winner = "COMPUTER";
    }
    else winner = "no one! It's a tie!"
    
    return winner;
}

function updateResults(numOfRounds, winner) {
    roundDisplay.textContent = numOfRounds;
    playScoreDisplay.textContent = playerScore;
    compScoreDisplay.textContent = computerScore;
    if(winner) {
        overallResult.textContent = `In ${numOfRounds} rounds, the overall winner is: ${winner}!`;
        divResult.appendChild(overallResult);
    }
}

function formatChoice(input) {
    let loweredInput = input.toLowerCase();
    return loweredInput.replace(input.charAt(0),input.charAt(0).toUpperCase());
}
