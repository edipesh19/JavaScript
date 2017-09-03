/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, state, winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    //console.log("Button clicked");
    if (state) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
        // 3. Update the round score
        if (dice1 === 1 || dice2 === 1) {
            // Next Player
            nextPlayer();
        } else {
            // Add score
            roundScore += dice1 + dice2;
            //previousScore = dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
    }
});


document.querySelector(".btn-hold").addEventListener("click", function () {
    if (state) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;
        // 2. Update UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector(".final-score").value;
        // Undefined, 0, null, ""  are COERCED to false
        if(input){ 
            winningScore = input;
        }else{
            winningScore = 100;
        }
        // 3. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner!!!";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            state = false;
        } else {
            // 4. next player 
            nextPlayer();

        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

function init(){
    state = true;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    previousScore = 0;
    finalScore = 0;

    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 1";
}