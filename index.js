const Word = require("./Word");
const fs = require("fs");
const inquirer = require("inquirer");
let wordArr = ["hello", "goodbye", "mouse", "toothpaste", "delete"];
let secretWord = pickWord(wordArr);
let guessCount = 10;
let word = new Word(secretWord);

// the word object is set as argument so it can be redefined 
function gameLoop(word) {
    // prints string of word with hidden/revealed characters
    console.log(word.shownString());
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
        word.checkLetter(user.guess);
        // one less guess
        guessCount -= 1;
        // check if game is lost or won. Otherwise, loop through function again
        if (guessCount < 0) {
            console.log(word.shownString());
            console.log("You Lose!\n");
            playAgain();
            // win condition: no blanks left to be guessed
        } else if (!word.shownString().includes("_")) {
            console.log(word.shownString());
            console.log("You Win!\n");
            playAgain();
        } else {
            gameLoop(word);
        };
    });
};
function playAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "again",
            message: "Would you like to play again?",
            default: false
        }
    ]).then(play => {
        // needs to change secretWord
        if (play.again) {
            let nextWord = pickWord(wordArr);
            let word = new Word(nextWord);
            guessCount = 10;
            gameLoop(word);
        } else {
            console.log("THANK YOU FOR PLAYING!");
        }
    })
};
function pickWord(wordArr) {
    let randNum = (Math.ceil(Math.random() * wordArr.length) - 1);
    let pickedWord = wordArr[randNum];
    return pickedWord;
};
// starts game
gameLoop(word);