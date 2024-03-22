const superheroQuiz = [
  {
    question: "What is the real name of Clark Kent, better known as the superhero Superman?",
    options: ["Bruce Wayne", "Cal El", "Peter Parker", "Steve Rogers"],
    answer: "Cal El",
  },
  {
    question: "What fictional metal is Wolverine's skeleton and claws made of in the Marvel Universe?",
    options: ["Vibranium", "Adamantium", "Mithril", "Caradamantine"],
    answer: "Adamantium",
  },
  {
    question: "Which Infinity Stone allows the user to control the mind of others?",
    options: ["Mind Stone", "Space Stone", "Time Stone", "Reality Stone"],
    answer: "Mind Stone",
  },
  {
    question: "What is the name of the fictional city where Batman protects the citizens from crime?",
    options: ["Gotham City", "Metropolis", "Central City", "Starling City"],
    answer: "Gotham City",
  },
  {
    question: "What is the name of Wonder Woman's invisible jet?",
    options: ["Invisible Jet", "Themyscira's Wonder", "Golden Eagle", "Olympian Flyer"],
    answer: "Invisible Jet",
  },
  {
    question: "What is the superhero team name for Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye?",
    options: ["The Avengers", "The Defenders", "The Justice League", "The X-Men"],
    answer: "The Avengers",
  },
  {
    question: "What is the name of the fictional metal that Captain America's shield is made of?",
    options: ["Vibranium", "Adamantium", "Proto-Adamantium", "Caradamantine"],
    answer: "Vibranium",
  },
  {
    question: "What is the alternate name for the supervillain Thanos, who seeks the Infinity Stones?",
    options: ["The Mad Titan", "The Devourer", "The Conqueror", "The Destroyer"],
    answer: "The Mad Titan",
  },
  {
    question: "What superhero team, led by Professor X, fights for the peaceful coexistence of mutants and humans?",
    options: ["The Avengers", "The Justice League", "The X-Men", "The Inhumans"],
    answer: "The X-Men",
  },
  {
    question: "What is the name of the alien symbiote that bonds with Peter Parker, creating the black-suited Spider-Man?",
    options: ["Venom", "Carnage", "Symbiote", "Klyntar"],
    answer: "Venom",
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
  const questionData = superheroQuiz[currentQuestion];

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
    if (answer === superheroQuiz[currentQuestion].answer) {
      // Increase the score:
      score++;
    } else {
      // Track incorrect answer for later review:
      incorrectAnswers.push({
        question: superheroQuiz[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: superheroQuiz[currentQuestion].answer,
      });
    }

    // Move to the next question:
    currentQuestion++;

    // Uncheck the selected option:
    selectedOption.checked = false;

    // Decide whether to display the next question or the results:
    if (currentQuestion < superheroQuiz.length) {
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
  resultData.innerHTML = `You scored ${score} out of ${superheroQuiz.length}!`;
  //  - ${score} is replaced with the user's actual score
  //  - ${superheroQuiz.length} is replaced with the total number of questions
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
    <p>You scored ${score} out of ${superheroQuiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();