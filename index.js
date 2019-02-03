const Word = require("./Word");
const inquirer = require("inquirer");
let secretWord = "happy";
let guessCount = 10;
let word = new Word(secretWord);

// the word object is set as argument so it can be redefined 
function gameLoop(word) {
    // prints string of word with hidden/revealed characters
    console.log(word.makeString());
    inquirer.prompt([
        {
            type: "input",
            name: "guess",
            message: "GUESS A LETTER!",
            // makes sure input is single letter
            validate: function (value) {
                var pass = value.match(/[a-zA-z]/) && value.length === 1;
                if (pass) {
                    return true
                } else {
                    return "please enter a letter";
                }
            }
        }
    ]).then(user => {
        // check if guessed letter is in word
        word.guesser(user.guess);
        // one less guess
        guessCount -=1;
        // check if game is lost or won. Otherwise, loop through function again
        if (guessCount === 0) {
            console.log(word.makeString());
            console.log("You Lose!");
            playAgain();
            // win condition: no _ left to be guessed
        } else if (!word.makeString().includes("_")) {
            console.log(word.makeString());
            console.log("You Win!");
            playAgain();
        } else {
            gameLoop(word);
        };
    });
};
function playAgain(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "again",
            message: "Would you like to play again?",
            default: false
        }
    ]).then(play=>{
        // doesn't change secretWord
        if(play.again){
            let nextWord = "ah";
            let word = new Word(nextWord);
            gameLoop(word);
        }else{
            console.log("THANK YOU FOR PLAYING!");
            // console.clear();
        }
    })
}
// starts game
gameLoop(word);