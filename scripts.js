// global variables
const buttons = Array.from(document.querySelectorAll('.btn'));
const roundNumDisplay = document.querySelector('#roundNumber');
const roundResult = document.querySelector('#roundResult');
const playerTotalScore = document.querySelector('#playerScore p');
const computerTotalScore = document.querySelector('#computerScore p');
const gameWinMsg = document.querySelector('#gameWinner');
const resetButton = document.querySelector('#reset');

// Add event listeners
buttons.forEach(button => button.addEventListener('click', game));
resetButton.addEventListener('click', resetGame);

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;

function game(e){
  let playerSelection = e.target.textContent;
  playerSelection = playerSelection.toLowerCase();
  let computerSelection = computerPlay();

  roundNumber++;
  playRound(playerSelection, computerSelection);
  roundNumDisplay.textContent = "Current Round: " + roundNumber;
  if (playerScore == 5 || computerScore == 5){
    endGame(playerScore, computerScore);
    return;
  }
}

function playRound(playerSelection, computerSelection){

  if (playerSelection == computerSelection){
      roundNumber--;
      roundResult.textContent = "It's a draw! Replay this round.";
  } else if (playerSelection == "rock" && computerSelection == "scissors"){
      playerScore++;
      roundResult.textContent = "You won Round " + roundNumber + "! Rock beats Scissors.";
  } else if (playerSelection == "rock" && computerSelection == "paper"){
      computerScore++;
      roundResult.textContent = "You lost Round " + roundNumber + "! Paper beats Rock.";
  } else if (playerSelection == "paper" && computerSelection == "scissors"){
      computerScore++;
      roundResult.textContent = "You lost Round " + roundNumber + "! Scissors beats Paper.";
  } else if (playerSelection == "paper" && computerSelection == "rock"){
      playerScore++;
      roundResult.textContent = "You won Round " + roundNumber + "! Paper beats Rock.";
  } else if (playerSelection == "scissors" && computerSelection == "rock"){
      computerScore++;
      roundResult.textContent = "You lost Round " + roundNumber + "! Rock beats Scissors.";
  } else if (playerSelection == "scissors" && computerSelection == "paper"){
      playerScore++;
      roundResult.textContent = "You won Round " + roundNumber + "! Scissors beats Paper.";
  } else {
      roundNumber--;
      roundResult.textContent =  "This is not a correct throw value! Please type rock, paper, or scissors to replay the round."
  }

  playerTotalScore.textContent = playerScore;
  computerTotalScore.textContent = computerScore;
  revealItem(roundResult);
}

function computerPlay(){
  let computerChoice = Math.floor(Math.random() * 3);
  if (computerChoice == 0){
    return "rock";
  }else if (computerChoice == 1){
    return "paper";
  }else{
    return "scissors";
  }
}

function resetGame(){
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  playerTotalScore.textContent = playerScore;
  computerTotalScore.textContent = computerScore;
  roundNumDisplay.textContent = "Current Round: " + roundNumber;
  hideItem(roundResult);
  hideItem(gameWinner);
  buttons.forEach(button => button.disabled = false);
}


function endGame(playerScore, computerScore){
  if (playerScore > computerScore){
      gameWinner.textContent = "The game is over. You win!";
  } else {
      gameWinner.textContent = "The game is over. You lose!";
  }
  gameWinner.classList.remove('hidden');
  buttons.forEach(button => button.disabled = true);
}

function hideItem(item){
  item.classList.add('hidden');
}
function revealItem(item) {
  item.classList.remove('hidden');
}
