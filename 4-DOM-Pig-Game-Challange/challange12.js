/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
*/
var scores, roundScore, activePlayer, dice, state, lastDice, winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    //console.log("Button clicked");
    if (state) {
        // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;

        //2. Display
        var diceDom = document.querySelector(".dice");
        diceDom.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";
        // 3. Update the round score
        if(dice === 6 && lastDice === 6){
            // Player looses score
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";
            nextPlayer();

        }else if (dice === 1) {
            // Next Player
            nextPlayer();
        } else {
            // Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        lastDice = dice;
    }
});


document.querySelector(".btn-hold").addEventListener("click", function () {
    if (state) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;
        // 2. Update UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        // 3. Check if player won the game

        var input = document.querySelector(".final-score").value;
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
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
    lastDice = 0;
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
    lastDice = 0;

    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".dice").style.display = "none";

    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 1";
}
