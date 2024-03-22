const animationQuiz = [
  {
    question: "What is the name of the pixar movie where a toy cowboy goes on an adventure to find his way back to his owner?",
    options: ["A Bug's Life", "Toy Story", "Monsters, Inc.", "Finding Nemo"],
    answer: "Toy Story",
  },
  {
    question: "What famous anime features a young ninja named Naruto Uzumaki?",
    options: ["Dragon Ball Z", "Sailor Moon", "Naruto", "Attack on Titan"],
    answer: "Naruto",
  },
  {
    question: "In the movie 'Spirited Away', what is the name of the spirit world Chihiro travels to?",
    options: ["The Spirit Realm", "The Dream World", "The Underworld", "Kami-no-Chi (Land of the Gods)"],
    answer: "Kami-no-Chi (Land of the Gods)",
  },
  {
    question: "What studio is famous for creating iconic animated characters like Mickey Mouse and Bugs Bunny?",
    options: ["Pixar", "Studio Ghibli", "Walt Disney Animation Studios", "Warner Bros. Animation"],
    answer: "Walt Disney Animation Studios",
  },
  {
    question: "What is the name of the grumpy yeti featured in the animated movie 'Smallfoot'?",
    options: ["Bigfoot", "Everest", "Percy", "Migo"],
    answer: "Migo",
  },
  {
    question: "In the Japanese anime series 'My Hero Academia', what is the name of the quirkless protagonist who dreams of becoming a hero?",
    options: ["Izuku Midoriya", "Katsuki Bakugo", "Shoto Todoroki", "All Might"],
    answer: "Izuku Midoriya",
  },
  {
    question: "What stop-motion animation technique was used to create the characters in 'Wallace and Gromit'?",
    options: ["Cel animation", "Digital animation", "Claymation", "Rotoscoping"],
    answer: "Claymation",
  },
  {
    question: "What is the name of the mischievous rabbit from the classic Looney Tunes cartoons?",
    options: ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Wile E. Coyote"],
    answer: "Bugs Bunny",
  },
  {
    question: "What is the name of the pixar movie where a robot named Wall-E falls in love with a sleek probe named EVE?",
    options: ["Ratatouille", "WALL-E", "Up", "Finding Dory"],
    answer: "WALL-E",
  },
  {
    question: "In the movie 'How to Train Your Dragon', what is the name of the young Viking protagonist who befriends a Night Fury dragon?",
    options: ["Hiccup Horrendous Haddock III", "Astrid Hofferson", "Gobber the Blacksmith", "Stoick the Vast"],
    answer: "Hiccup Horrendous Haddock III",
  },
];
  
const mainData = document.getElementById('quiz');
const resultData = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  // Get the current question data:
  const questionData = animationQuiz[currentQuestion];

  // Create DOM elements for question and options:
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  // Shuffle the answer options for randomness:
  const shuffledOptions = [...questionData.options]; // Copy the options array
  shuffleArray(shuffledOptions); // Shuffle the copied options

  // Create and display each option with radio button:
  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz'; // Group radio buttons for single selection
    radio.value = shuffledOptions[i]; // Set the answer value

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  // Clear the quiz container and display the question and options:
  mainData.innerHTML = '';
  mainData.appendChild(questionElement);
  mainData.appendChild(optionsElement);
}

function checkAnswer() {
  // Get the selected answer option (if any):
  const selectedOption = document.querySelector('input[name="quiz"]:checked');

  // If an option is selected:
  if (selectedOption) {
    // Extract the answer value:
    const answer = selectedOption.value;

    // Check if the answer is correct:
    if (answer === animationQuiz[currentQuestion].answer) {
      // Increase the score:
      score++;
    } else {
      // Track incorrect answer for later review:
      incorrectAnswers.push({
        question: animationQuiz[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: animationQuiz[currentQuestion].answer,
      });
    }

    // Move to the next question:
    currentQuestion++;

    // Uncheck the selected option:
    selectedOption.checked = false;

    // Decide whether to display the next question or the results:
    if (currentQuestion < animationQuiz.length) {
      displayQuestion(); // Continue the quiz with the next question
    } else {
      displayResult();  // Quiz is over, show the final result
    }
  }
}

function displayResult() {
  // Hide the quiz container element (questions are no longer displayed)
  mainData.style.display = 'none';

  // Hide the submit button (no more answers to submit)
  submitButton.style.display = 'none';

  // Show the retry button (user can restart the quiz)
  retryButton.style.display = 'inline-block';

  // Optionally show the "show answer" button (user can see answers)
  showAnswerButton.style.display = 'inline-block';

  // Update the result container content
  resultData.innerHTML = `You scored ${score} out of ${animationQuiz.length}!`;
  //  - ${score} is replaced with the user's actual score
  //  - ${animationQuiz.length} is replaced with the total number of questions
}

function retryQuiz() {
  // Reset the current question index to 0 (start from the beginning)
  currentQuestion = 0;

  // Reset the score to 0
  score = 0;

  // Clear the array of incorrect answers
  incorrectAnswers = [];

  // Show the quiz container element
  mainData.style.display = 'block';

  // Show the submit button
  submitButton.style.display = 'inline-block';

  // Hide the retry button (user is restarting the quiz)
  retryButton.style.display = 'none';

  // Hide the "show answer" button (if present)
  showAnswerButton.style.display = 'none';

  // Clear the result container (previous results)
  resultData.innerHTML = '';

  // Call the displayQuestion function to start the quiz again
  displayQuestion();
}

function showAnswer() {
  // Hide quiz elements (questions and submit button):
  mainData.style.display = 'none';
  submitButton.style.display = 'none';

  // Show retry button and hide "show answer" button (user has seen answers):
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  // Build HTML content for displaying incorrect answers:
  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  // Update the result container content:
  resultData.innerHTML = `
    <p>You scored ${score} out of ${animationQuiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();