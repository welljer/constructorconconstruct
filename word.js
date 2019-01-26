var Letter = require("./letter.js");


var Word = function (buildWord) {

    this.buildWord = buildWord;
    this.letters = [];
    this.underscores = [];
    this.splitWord = function(){
        this.letters = this.buildWord.split('');
        numberUnderscoresNeeded = this.letters.length;
        console.log(this.underscores.join(''));
    };
    this.generateLetters = function() {
		for (i=0; i < this.letters.length; i++){
            this.letters[i] = new Letter (this.letters[i]);
            this.letters[i].showCharacter();
        };
    };
};

//     for (var i = 0; i < word.length; i++) {
//             var currentLetter = new Letter(word[i]);
//             lettersStore.push(currentLetter);
//         }
//         return lettersStore;
//     }

//     this.letters = this.buildWord();
//     this.chosenWord = word;

//     this.checkGuess = function (guess) {

//         for (var i = 0; i < this.letters.length; i++) {
//             this.letters[i].letterGuess(guess);

//         }
//     }

//     this.display = function () {
//         var lettersStore = '';
//         for (var i = 0; i < this.letters.length; i++) {
//             lettersStore += this.letters[i].display();
//         }
//         return lettersStore;
//     }
// }

module.exports = Word;