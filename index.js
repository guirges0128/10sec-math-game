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
    //insert generator fuction inside two variables
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

    //insert new objects within question object
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
    console.log(number1);
    console.log(number2);
    console.log(number3);
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
            renderNewQuestion();
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    }

   $('.maths').on('click', function() {
        selectOperator();
        console.log('clicked');
   })

    // start game and check answer on keyup from user
    $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
      });


    renderNewQuestion();
})