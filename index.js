const buttons = document.querySelectorAll("button");
const pScore = document.getElementById("pScore");
const cScore = document.getElementById("cScore");
const gameMessage = document.querySelector(".gameMessage");
const playerMove = document.querySelector(".playerMove");
const cpuMove = document.querySelector(".cpuMove");
const gameRound = document.querySelector(".round");
const shoot = document.getElementById("hide");

const messageText = document.createElement("p");
const pMove = document.createElement("p");
const cMove = document.createElement("p");
gameMessage.appendChild(messageText);
cpuMove.appendChild(cMove);
playerMove.appendChild(pMove);
var round = 0;
var cpuScore = 0;
var playerScore = 0;
var result;

//while (round < 5) {
// console.log(buttons);
buttons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		checkRoundWinner(playRound(e.target.value));
		if (document.getElementById("startText")) {
			gameMessage.removeChild(document.getElementById("startText"));
		}
		if (playerScore == 5 || cpuScore == 5) {
			messageText.textContent = checkWinner();
			round = 0;
			cpuScore = 0;
			playerScore = 0;
		}
	});
});

//}

// Function to handle win/lose conditions
function playRound(selection) {
	gameRound.textContent = `Round: ${round + 1}`;
	round++;
	let player = selection;
	let cpu = computerPlay();
	pMove.textContent = `Player Chose: ${player}`;
	cMove.textContent = `CPU Chose: ${cpu}`;
	//Draw scenario
	if (player == cpu) {
		return "Draw";
	}
	// Computer wins Scenarios
	else if (player == "Rock" && cpu == "Paper") {
		return `You Lose! ${cpu} beats ${player}`;
	} else if (player == "Paper" && cpu == "Scissors") {
		return `You Lose! ${cpu} beats ${player}`;
	} else if (player == "Scissors" && cpu == "Rock") {
		return `You Lose! ${cpu} beats ${player}`;
	}

	// Player wins scenarios
	else if (player == "Rock" && cpu == "Scissors") {
		return `You Win! ${player} beats ${cpu} `;
	} else if (player == "Paper" && cpu == "Rock") {
		return `You Win! ${player} beats ${cpu}`;
	} else if (player == "Scissors" && cpu == "Paper") {
		return `You Win! ${player} beats ${cpu}`;
	}

	//Edge case playerSelection != Rock, Paper, or Scissors
	else return "Player did not enter a valid choice";
}

function checkRoundWinner(result) {
	// parse result string to add score
	messageText.textContent = result;
	result.includes("Lose!")
		? cpuScore++
		: result.includes("Win!")
		? playerScore++
		: "No score change";
	pScore.textContent = `Player Score: ${playerScore}`;
	cScore.textContent = `CPU Score: ${cpuScore}`;
}

//Check winner based on score
function checkWinner() {
	if (cpuScore > playerScore) {
		return `Computer wins! ${cpuScore} to ${playerScore}`;
	} else if (playerScore > cpuScore) {
		return `Player wins! ${playerScore} to ${cpuScore}`;
	} else "Draw!";
}

//Computer selection function
function computerPlay() {
	var selection = Math.floor(Math.random() * 3) + 1;
	switch (selection) {
		case 1:
			return "Rock";
			break;
		case 2:
			return "Paper";
			break;
		case 3:
			return "Scissors";
			break;
		default:
			break;
	}
}
