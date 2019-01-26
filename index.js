var inquirer = require("inquirer");
var figlet = require('figlet');
var isLetter = require('is-letter');
var chalk = require('chalk');

var Word = require("./word.js");

var guessesRemaining = 10;
var wins = 0;
var losses = 0;

var wordsToGuess = ['interpol', 'joydivision', 'sonicyouth', 'talkingheads', 'atthedrivein', 'blackflag', 'badreligion', 'thedamned', 'fugazi', 'socialdistortion', 'operationivy', 'minorthreat'];
var randomWord;
var chosenWord;

var userGuess = '';

var lettersAlreadyGuessedList = '';
var lettersAlreadyGuessedListArray = [];

var slotsFilledIn = 0;


figlet('Word guess Game', function(err, data) {
    if (err) {
        console.log(chalk.blue('Failed Transmission'));
        console.dir(err);
        return;
    }
    console.log(data)
    console.log(chalk.red('let\'s play guess the punk band!'));
    var howToPlay = 
    '----------------------------------------------------------------------------------------------------------' + '\n' +
    'How to play' + '\n' +
    '----------------------------------------------------------------------------------------------------------' + '\n' +
    'When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter.' + '\n' +
    'Keep guessing letters. When you guess a letter, your choice is either correct or incorrect.' + '\n' +
    'If incorrect, the letter you guessed does not appear in the word.' + '\n' + 
    'For every incorrect guess, the number of guesses remaining decrease by 1.' + '\n' +
    'If correct, the letter you guessed appears in the word.' + '\n' +
    'If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win.' + '\n' +
    'If you run out of guesses before the entire word is revealed, you lose. Game over.' + '\n' + '----------------------------------------------------------------------------------------------------------'  + '\n' +
    'You can exit the game at any time by pressing Ctrl + C on your keyboard.' + '\n' + '----------------------------------------------------------------------------------------------------------'  
    console.log(chalk.green(howToPlay));
    confirmStart();
});

    function confirmStart() {
        var readyToStartGame = [
	 {
	 	type: 'text',
	 	name: 'playerName',
	 	message: 'What is your name?'
	 },
	 {
	    type: 'confirm',
	    name: 'readyToPlay',
	    message: 'Are you ready to play?',
	    default: true
	  }
	];

	inquirer.prompt(readyToStartGame).then(answers => {
		if (answers.readyToPlay){
			console.log(chalk.red(answers.playerName + '. Let\'s begin...'));
			startGame();
		}
		else {
			console.log(chalk.blue('Failed Transmission, ' + answers.playerName + 'Cut away, cut away'));
			return;
		}
	});
}

    function startGame(){
        guessesRemaining = 10;
        chooseRandomWord();
        lettersAlreadyGuessedList = '';
        lettersAlreadyGuessedListArray = [];
}

    function chooseRandomWord() {
        randomWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)].toUpperCase();
        chosenWord = new Word (randomWord);
        console.log(chalk.blue('Your word contains ' + randomWord.length + ' letters.'));
        console.log(chalk.blue('WORD TO GUESS:'));
        chosenWord.splitWord();
        chosenWord.generateLetters();
        guessLetter();
}
    
    function guessLetter(){
        if (slotsFilledIn < chosenWord.letters.length || guessesRemaining > 0) {
        inquirer.prompt([
    {
        name: 'letter',
        message: 'Guess a letter:',
        validate: function(value) {
        if(isLetter(value)){
          return true;
        } 
        else {
          return false;
        }
      }
  }
]).then(function(guess) {
            guess.letter.toUpperCase();
            console.log(chalk.green('You guessed: ' + guess.letter.toUpperCase()));
            userGuessedCorrectly = false;
        if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
            console.log(chalk.green('You already guessed that letter. Enter another one.'));
            console.log(chalk.green('-----------------------------------------------'));
            guessLetter();
        }

        else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {
		lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
		lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());
		console.log(chalk.green('Letters already guessed: ' + lettersAlreadyGuessedList));

		for (i=0; i < chosenWord.letters.length; i++) {
			if (guess.letter.toUpperCase() === chosenWord.letters[i].character && chosenWord.letters[i].letterGuessedCorrectly === false) {
				chosenWord.letters[i].letterGuessedCorrectly === true;
				userGuessedCorrectly = true;
				chosenWord.underscores[i] = guess.letter.toUpperCase();
				slotsFilledIn++
			}
		}
		console.log('WORD TO GUESS:');
		chosenWord.splitWord();
		chosenWord.generateLetters();

		if (userGuessedCorrectly) {
			console.log(chalk.green('Correct'));
			console.log(chalk.green('-----------------------------------------------'));
			checkIfUserWon();
		}

		else  {
			console.log(chalk.green('Incorrect'));
			guessesRemaining--;
			console.log(chalk.blue('You have ' + guessesRemaining + ' guesses left.'));
			console.log(chalk.green('-----------------------------------------------'));
			checkIfUserWon();
                }
            }
        });
    };
};
    function checkIfUserWon() {
        if (guessesRemaining === 0) {
            console.log(chalk.green('-----------------------------------------------'));
            console.log(chalk.blue('Self-destruct sequence this station is non-operational species growing bubbles in an IV loitering'));
            console.log(chalk.green('The correct band was: ' + randomWord));
            losses++;
            console.log(chalk.white('Wins: ' + wins));
            console.log(chalk.white('Losses: ' + losses));
            console.log(chalk.green('-----------------------------------------------'));
            playAgain();
        }
        else if (slotsFilledIn === chosenWord.letters.length) {
            console.log(chalk.green('-----------------------------------------------'));
            console.log(chalk.red('Banked on memory mummified circuitry skin graft machinery sputnik sickles found in the seats'));
            wins++;
            console.log(chalk.white('Wins: ' + wins));
            console.log(chalk.white('Losses: ' + losses));
            console.log(chalk.white('-----------------------------------------------'));
            playAgain();
        }
        else {
            guessLetter("");
	};

};
    function playAgain() {
	var playGameAgain = [
	 {
	    type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];

	inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain){
			lettersAlreadyGuessedList = '';
			lettersAlreadyGuessedListArray = [];
			slotsFilledIn = 0;
			console.log(chalk.blue('Cha-cha-cha-champion you\'ll get yours wipe out'));
			startGame();
		}

		else {
			console.log(chalk.black('Unkind and alone End of the idea'));
			return;
		}
	});
};