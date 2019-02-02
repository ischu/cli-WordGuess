// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:
//   * Randomly selects a word and uses the `Word` constructor to store it
//   * Prompts the user for each guess and keeps track of the user's remaining guesses

const Word = require("./Word");
const inquirer = require("inquirer");
let secretWord = "happy";
let guessCount = 10;

// inquirer prompt for entering letter
function inquire(){
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
    ]).then(function (user) {
        {
            let guessLetter = user.guess;
            return guessLetter;
        }
    });
};

function guess() {

}