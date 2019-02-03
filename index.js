// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:
//   * Randomly selects a word and uses the `Word` constructor to store it
//   * Prompts the user for each guess and keeps track of the user's remaining guesses

const Word = require("./Word");
const inquirer = require("inquirer");
let secretWord = "happy";
let guessCount = 10;
let word = new Word(secretWord);

// inquirer prompt for entering letter
function gameLoop() {
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
        guessCount = guessCount - 1;
        // turns string with spaces into a normal string
        revealedWord = word.makeString().split(" ").join("");
        // check if game is lost or won. Otherwise, loop through function again
        if (guessCount === 0) {
            console.log("You Lose!");
        } else if (revealedWord === secretWord) {
            console.log("You Win!");
        } else {
            gameLoop();
        };
    });
};
// starts game
gameLoop();