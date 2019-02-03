// imports Letter constructor
var Letter = require("./Letter");

function Word(wordToGuess) {
    // array to store letter objects in
    this.letterArr = [];
    // creates letterArr (this runs automatically when new Word is constructed)
    for (i = 0; i < wordToGuess.length; i++) {
        // for each letter, create a new object to store it in
        let l = wordToGuess.charAt(i);
        let letter = new Letter(l);
        this.letterArr.push(letter);
    };
    // method to create string user will see
    this.shownString = function(){
        let string = " ";
        // runs letter.reveal method to display either the letter or "_" then concatenates results
        this.letterArr.forEach(letter => {
            let char = letter.reveal();
            string = string + char +" ";
        });
        return string;
    };
    // takes in letter guessed by user
    this.checkLetter = function(guessedLetter){
        // runs check() method to compare guess to each letter in word
        this.letterArr.forEach(letter =>{
            letter.check(guessedLetter);
        });
        // no need to return anything; adjusts the shownString function's output
    };
};
// export Word constructor
module.exports = Word;
