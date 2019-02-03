// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
//   * An array of `new` Letter objects representing the letters of the underlying word
//   * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.
//   * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)

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
    // method to create string user will see automatic
    this.makeString = function(){
        let string = " ";
        // runs letter.reveal method to display either the letter or "_" then concatenates results
        this.letterArr.forEach(letter => {
            let char = letter.reveal();
            string = string + char +" ";
        });
        return string;
    };
    // takes in letter guessed by user
    this.guesser = function(guessedLetter){
        // runs check() method to compare guess to each letter in word
        this.letterArr.forEach(letter =>{
            letter.check(guessedLetter);
        });
        // no need to return anything; adjusts the makeString function's output
    };
    // just plop this in here for now
    // this.makeString(wordToGuess);
};
// export Word constructor
module.exports = Word;
