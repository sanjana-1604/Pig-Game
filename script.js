'use strict';

const diceEl = document.querySelector(".dice");
const btn_new = document.querySelector(".btn--new");
const btn_roll = document.querySelector(".btn--roll");
const btn_hold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let activePlayer, CurrentScore, FinalScore, isPlaying;


const reset = function()
{
    activePlayer = 0;
    FinalScore = [0,0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    //score1El.textContent = 0;
    diceEl.classList.add("hidden");
    CurrentScore = 0;
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    isPlaying = 1;   
}
const switchPlayer = function()
{
    player1.classList.toggle("player--active");
    player0.classList.toggle("player--active");
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer===0?1:0;
    CurrentScore = 0;  
}
const rollDice = function()
{    
    if(isPlaying)
    {
        diceEl.classList.remove("hidden");        
        const diceNumber = Math.trunc(Math.random()*6) +1;
        diceEl.src = `dice-${diceNumber}.png`;   
        if(diceNumber == 1)
        {        
            switchPlayer();     
        }
        else
        {
            CurrentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = CurrentScore;
        }
    }
}
const holdScore = function()
{ 
    if(isPlaying)
    {
        FinalScore[activePlayer] += CurrentScore;             
        document.getElementById(`score--${activePlayer}`).textContent = FinalScore[activePlayer];

        if(FinalScore[activePlayer] >= 10)
        {
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            isPlaying=0;           
        }
        else
        switchPlayer();
    }
}

reset();

btn_new.addEventListener("click", reset);
btn_roll.addEventListener("click", rollDice);
btn_hold.addEventListener("click", holdScore);




