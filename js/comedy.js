const comedyQuiz = [
  {
    question: "What 2004 comedy film stars Will Ferrell as a news anchor who wakes up with amnesia after a wild bachelor party?",
    options: ["Anchorman: The Legend of Ron Burgundy", "The Hangover", "Bridesmaids", "21 Jump Street"],
    answer: "The Hangover",
  },
  {
    question: "What iconic comedy franchise features clueless Beverly Hills teenagers navigating high school life?",
    options: ["Clueless", "Mean Girls", "Easy A", "10 Things I Hate About You"],
    answer: "Clueless",
  },
  {
    question: "What 2000 comedy film stars Jim Carrey as a delusional cable guy who believes he's a character from a television show?",
    options: ["Ace Ventura: Pet Detective", "The Truman Show", "Liar Liar", "Dumb and Dumber"],
    answer: "The Truman Show",
  },
  {
    question: "What hilarious wedding comedy features bridesmaids competing in outrageous schemes to outdo each other?",
    options: ["Bridesmaids", "The Wedding Planner", "27 Dresses", "Hitch"],
    answer: "Bridesmaids",
  },
  {
    question: "What classic comedy duo, Mike Myers and Dana Carvey, starred in the wacky adventure film 'Wayne's World'?",
    options: ["Cheech & Chong", "Key & Peele", "Laurel & Hardy", "Wayne & Garth"],
    answer: "Wayne & Garth (Mike Myers & Dana Carvey)",
  },
  {
    question: "What comedy film features a group of misfit cops who go undercover at a high school?",
    options: ["21 Jump Street", "22 Jump Street", "Superbad", "The Other Guys"],
    answer: "21 Jump Street",
  },
  {
    question: "What hilarious mockumentary follows the daily grind of office workers in a mundane paper company?",
    options: ["The Office (US)", "The Office (UK)", "Workaholics", "Silicon Valley"],
    answer: "The Office (US/UK)", // Accept both versions for this question
  },
  {
    question: "What comedy film parodies classic disaster movies with a group of airplane passengers facing a series of in-flight mishaps?",
    options: ["Airplane!", "Scary Movie", "Not Another Teen Movie", "Spaceballs"],
    answer: "Airplane!",
  },
  {
    question: "What action-comedy film stars Melissa McCarthy as a skilled but foul-mouthed undercover cop who infiltrates a high school?",
    options: ["Bridesmaids", "Tammy", "The Heat", "Spy"],
    answer: "Spy",
  },
  {
    question: "What comedy film parodies classic superhero films with a group of dysfunctional superheroes forming a team?",
    options: ["The Incredibles", "Watchmen", "Deadpool", "The Avengers"],
    answer: "The Avengers (as a superhero parody)", // Mention it's a parody for clarity
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
  const questionData = comedyQuiz[currentQuestion];

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
    if (answer === comedyQuiz[currentQuestion].answer) {
      // Increase the score:
      score++;
    } else {
      // Track incorrect answer for later review:
      incorrectAnswers.push({
        question: comedyQuiz[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: comedyQuiz[currentQuestion].answer,
      });
    }

    // Move to the next question:
    currentQuestion++;

    // Uncheck the selected option:
    selectedOption.checked = false;

    // Decide whether to display the next question or the results:
    if (currentQuestion < comedyQuiz.length) {
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
  resultData.innerHTML = `You scored ${score} out of ${comedyQuiz.length}!`;
  //  - ${score} is replaced with the user's actual score
  //  - ${comedyQuiz.length} is replaced with the total number of questions
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
    <p>You scored ${score} out of ${comedyQuiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();