$(document).ready(function() {
    var currentQuestion;
var randomNumberGenerator = function(size) {
    //create a radom number generator using the Math.ceil and Math.random functions
    return Math.ceil(Math.random() * size);
}

var questionGenerator = function() {
    //create a new object
    var question = {};
    //insert generator fuction inside two variables
    var number1 = randomNumberGenerator(10);
    var number2 = randomNumberGenerator(10);
    //insert new objects within question object
    question.answer = number1 + number2;
    question.equation = String(number1) + ' + ' + String(number2);

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
        }
    }

    //event listner when user inputs answer on keyup
    $('#user-input').on('keyup', function () {
        checkAnswer(Number($(this).val()), currentQuestion.answer);
      });

      renderNewQuestion();
})