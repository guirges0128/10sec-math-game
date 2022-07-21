//make sure DOM is loaded before program execution
$(document).ready(function() {
//global variables
var interval;
var currentQuestion;
var timeLeft = 10;
var score = 0;
var add = document.getElementById('add');
var subtract = document.getElementById('subtract');
var multiply = document.getElementById('multiply');
var divide = document.getElementById('divide');
var operators;
var slider = $('#limit');
var sliderDisplay = $('#number-text');
sliderDisplay.html(slider.val());

//update amount of time
var updateTimeLeft = function(amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }
//display slider value
  slider.on('input', function() {
    sliderDisplay.html($(this).val());
  })

  //update score
  var updateScore = function(amount) {
    score += amount;
    $('#score').text(score);
  }

//set interval that counts down a timer of 10 sec and starts game
var startGame = function () {
    if (!interval) {
        if (timeLeft === 0) {
            updateTimeLeft(10);
            updateScore(-score);
        }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  }

//select operator of choice +, -, *, /
  var selectOperator = function() {
    var operator = [];

    if(add.checked === true) {
        operator.push('+');
    }
    if (subtract.checked === true) {
        operator.push('-');
    }
    if (multiply.checked === true) {
        operator.push('*');
    }
    if (divide.checked === true) {
        operator.push('/');
    }
    if (operator.length === 0) {
        operators = '+';
    }
    else if (operator.length === 1) {
        operators = operator[0];
    }
    else {
        var i = Math.floor(Math.random() * operator.length);
        operators = operator[i];
    }
    return operators;
  }

//create a radom number generator using the Math.ceil and Math.random functions
var randomNumberGenerator = function(size) {
    return Math.ceil(Math.random() * size);
}

var questionGenerator = function() {
    //create a new object
    var question = {};
    //insert generator fuction inside two variables and use slider value to determine size
    var number1 = randomNumberGenerator(slider.val());
    var number2 = randomNumberGenerator(slider.val());

    var smallestNumber;

    while(number1 === number2) {
        number1 = randomNumberGenerator(slider.val());
    }

    if (number1 < number2) {
        smallestNumber = number1;
        number1 = number2;
        number2 = smallestNumber;
    }

    var number3 = number1 * number2;

    //implement different answers and equations
    selectOperator();
    if (operators === '+') {
        question.answer = number1 + number2;
        question.equation = String(number1) + operators + String(number2);
    }
    else if (operators === '-') {
        question.answer = number1 - number2;
        question.equation = String(number1) + operators + String(number2);
    }
    else if (operators === '*') {
        question.answer = number1 * number2;
        question.equation = String(number1) + operators + String(number2);
    }
    else if (operators === '/') {
        question.answer = number3 / number1;
        question.equation = String(number3) + operators + String(number1);
    }
        return question;
}

    var renderNewQuestion = function() {
    //use global variable and combine it with questionGenerator function
    currentQuestion = questionGenerator();
    //inject to DOM
    $('#equation').text(currentQuestion.equation);

}
    //check to see if users input is correct answer
    var checkAnswer = function(userInput, answer) {
        if (userInput === answer) {
            //if correct display new question
            renderNewQuestion();
            //remove the users input value after correct answer
            $('#user-input').val('');
            //add 1 sec if answer is correct
            updateTimeLeft(+1);
            //add 1 point for every correct answer
            updateScore(+1);
        }
    }
    //switch to different operator when user clicks checkbox
   $('.maths').on('click', function() {
        selectOperator();
   })

    // start game and check answer on keyup from user
    $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
      });


    renderNewQuestion();
})