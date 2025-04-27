// Game elements
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultTextElement = document.getElementById('result-text');
const roundResultElement = document.getElementById('round-result');
const resetBtn = document.getElementById('reset-btn');

// Game variables
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

// Event listeners for buttons
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);

// Computer choice function
function getComputerChoice() {
    const randomNumber = Math.random();
    if (randomNumber < 0.34) return 'rock';
    else if (randomNumber <= 0.67) return 'paper';
    else return 'scissors';
}

// Play a single round
function playRound(playerSelection) {
    if (gameOver) return;
    
    const computerSelection = getComputerChoice();
    const result = determineWinner(playerSelection, computerSelection);
    
    updateScore(result);
    displayRoundResult(playerSelection, computerSelection, result);
    checkGameEnd();
}

// Determine the winner of a round
function determineWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'draw';
    }
    
    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'rock')
    ) {
        return 'player';
    }
    
    return 'computer';
}

// Update the score based on round result
function updateScore(result) {
    if (result === 'player') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (result === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

// Display the round result
function displayRoundResult(playerSelection, computerSelection, result) {
    const playerChoice = capitalizeFirstLetter(playerSelection);
    const computerChoice = capitalizeFirstLetter(computerSelection);
    
    if (result === 'draw') {
        roundResultElement.textContent = `Both chose ${playerChoice}. It's a draw!`;
        roundResultElement.style.color = '#666';
    } else if (result === 'player') {
        roundResultElement.textContent = `${playerChoice} beats ${computerChoice}. You win this round!`;
        roundResultElement.style.color = '#4CAF50';
    } else {
        roundResultElement.textContent = `${computerChoice} beats ${playerChoice}. Computer wins this round!`;
        roundResultElement.style.color = '#f44336';
    }
}

// Check if the game has ended
function checkGameEnd() {
    if (playerScore >= 5 || computerScore >= 5) {
        gameOver = true;
        if (playerScore > computerScore) {
            resultTextElement.textContent = 'Congratulations! You won the game!';
            resultTextElement.style.color = '#4CAF50';
        } else {
            resultTextElement.textContent = 'Game over! Computer won the game!';
            resultTextElement.style.color = '#f44336';
        }
    }
}

// Reset the game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultTextElement.textContent = 'Choose your weapon!';
    resultTextElement.style.color = '#333';
    roundResultElement.textContent = '';
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
