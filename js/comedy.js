const comedyQuiz = [
  {
    indexQuest: "What 2004 comedy film stars Will Ferrell as a news anchor who wakes up with amnesia after a wild bachelor party?",
    choices: ["Anchorman: The Legend of Ron Burgundy", "The Hangover", "Bridesmaids", "21 Jump Street"],
    choice: "The Hangover",
  },
  {
    indexQuest: "What iconic comedy franchise features clueless Beverly Hills teenagers navigating high school life?",
    choices: ["Clueless", "Mean Girls", "Easy A", "10 Things I Hate About You"],
    choice: "Clueless",
  },
  {
    indexQuest: "What 2000 comedy film stars Jim Carrey as a delusional cable guy who believes he's a character from a television show?",
    choices: ["Ace Ventura: Pet Detective", "The Truman Show", "Liar Liar", "Dumb and Dumber"],
    choice: "The Truman Show",
  },
  {
    indexQuest: "What hilarious wedding comedy features bridesmaids competing in outrageous schemes to outdo each other?",
    choices: ["Bridesmaids", "The Wedding Planner", "27 Dresses", "Hitch"],
    choice: "Bridesmaids",
  },
  {
    indexQuest: "What classic comedy duo, Mike Myers and Dana Carvey, starred in the wacky adventure film 'Wayne's World'?",
    choices: ["Cheech & Chong", "Key & Peele", "Laurel & Hardy", "Wayne & Garth"],
    choice: "Wayne & Garth",
  },
  {
    indexQuest: "What comedy film features a group of misfit cops who go undercover at a high school?",
    choices: ["21 Jump Street", "22 Jump Street", "Superbad", "The Other Guys"],
    choice: "21 Jump Street",
  },
  {
    indexQuest: "What hilarious mockumentary follows the daily grind of office workers in a mundane paper company?",
    choices: ["The Office", "The professionals", "Workaholics", "Silicon Valley"],
    choice: "The Office", // Accept both versions for this question
  },
  {
    indexQuest: "What comedy film parodies classic disaster movies with a group of airplane passengers facing a series of in-flight mishaps?",
    choices: ["Airplane!", "Scary Movie", "Not Another Teen Movie", "Spaceballs"],
    choice: "Airplane!",
  },
  {
    indexQuest: "What action-comedy film stars Melissa McCarthy as a skilled but foul-mouthed undercover cop who infiltrates a high school?",
    choices: ["Bridesmaids", "Tammy", "The Heat", "Spy"],
    choice: "Spy",
  },
  {
    indexQuest: "What comedy film parodies classic superhero films with a group of dysfunctional superheroes forming a team?",
    choices: ["The Incredibles", "Watchmen", "Deadpool", "The Avengers"],
    choice: "The Avengers",
  },
];
  
const questionContainer = document.getElementById('questioncontainer');
const resultContainer = document.getElementById('resultcontainer');
const submitBtn = document.getElementById('submitbtn');
const retryBtn = document.getElementById('retrybtn');
const revealAnswerBtn = document.getElementById('revealanswer');

let questionIndexNow = 0;
let userScore = 0;
let wrongChoices = [];

// using the Fisher-Yates algorithm to shuffle the choices for the indexed question
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showCurrentQuestIndex() {
  // Get the current question index data:
  const indexQuestData = comedyQuiz[questionIndexNow];

  // Create DOM elements for indexed question and choices:
  const indexQuestElement = document.createElement('div');
  indexQuestElement.className = 'indexQuest';
  indexQuestElement.innerHTML = indexQuestData.indexQuest;

  const choicesElement = document.createElement('div');
  choicesElement.className = 'choices';

  // Shuffle the answer choices for randomness:
  const shuffledChoices = [...indexQuestData.choices]; // Copy the choices array
  shuffleArray(shuffledChoices); // Shuffle the copied choices

  // Create and display each choice with radio button:
  for (let i = 0; i < shuffledChoices.length; i++) {
    const choice = document.createElement('label');
    choice.className = 'choice';

    const radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.name = 'choice'; // Group radio buttons for single selection
    radioBtn.value = shuffledChoices[i]; // Set the choice value

    const choiceText = document.createTextNode(shuffledChoices[i]);

    choice.appendChild(radioBtn);
    choice.appendChild(choiceText);
    choicesElement.appendChild(choice);
  }

  // Clear the quiz container and display the question and choices:
  questionContainer.innerHTML = '';
  questionContainer.appendChild(indexQuestElement);
  questionContainer.appendChild(choicesElement);
}

function checkSelectedChoice() {
  // Get the selected choice (if any):
  const selectedChoice = document.querySelector('input[name="choice"]:checked');

  // If a choice is selected:
  if (selectedChoice) {
    // Extract the choice value:
    const choice = selectedChoice.value;

    // Check if the choice is correct:
    if (choice === comedyQuiz[questionIndexNow].choice) {
      // Increase the score:
      userScore++;
    } else {
      // Track incorrect choice for later review:
      wrongChoices.push({
        indexQuest: comedyQuiz[questionIndexNow].indexQuest,
        incorrectChoice: choice,
        correctChoice: comedyQuiz[questionIndexNow].choice,
      });
    }

    // Move to the next question:
    questionIndexNow++;

    // Uncheck the selected choice:
    selectedChoice.checked = false;

    // Decide whether to display the next question or the results:
    if (questionIndexNow < comedyQuiz.length) {
      showCurrentQuestIndex(); // Continue the quiz with the next question
    } else {
      displayResult();  // Quiz is over, show the final result
    }
  }
}

function displayResult() {
  // Hide the quiz container element (questions are no longer displayed)
  questionContainer.style.display = 'none';

  // Hide the submit button (no more choices to submit)
  submitBtn.style.display = 'none';

  // Show the retry button (user can restart the quiz)
  retryBtn.style.display = 'inline-block';

  // Optionally show the "reveal answers" button (user can see choices)
  revealAnswerBtn.style.display = 'inline-block';

  // Update the result container content
  resultContainer.innerHTML = `You scored ${userScore} out of ${comedyQuiz.length}!`;
  //  - ${userScore} is replaced with the user's actual score
  //  - ${comedyQuiz.length} is replaced with the total number of questions
}

function retryQuiz() {
  // Reset the current question index to 0 (start from the beginning)
  questionIndexNow = 0;

  // Reset the score to 0
  userScore = 0;

  // Clear the array of incorrect choices
  wrongChoices = [];

  // Show the quiz container element
  questionContainer.style.display = 'block';

  // Show the submit button
  submitBtn.style.display = 'inline-block';

  // Hide the retry button (user is restarting the quiz)
  retryBtn.style.display = 'none';

  // Hide the "reveal answers" button (if present)
  revealAnswerBtn.style.display = 'none';

  // Clear the result container (previous results)
  resultContainer.innerHTML = '';

  // Call the showCurrentQuestIndex function to start the quiz again
  showCurrentQuestIndex();
}

function showAnswer() {
  // Hide quiz elements (questions and submit button):
  questionContainer.style.display = 'none';
  submitBtn.style.display = 'none';

  // Show the try again button and hide "reveal answer" button (user has seen choices):
  retryBtn.style.display = 'inline-block';
  revealAnswerBtn.style.display = 'none';

  // Build HTML content for displaying incorrect choices:
  let wrongChoicesHtml = '';
  for (let i = 0; i < wrongChoices.length; i++) {
    wrongChoicesHtml += `
      <p>
        <strong>Question:</strong> ${wrongChoices[i].indexQuest}<br>
        <strong>Your Answer:</strong> ${wrongChoices[i].incorrectChoice}<br>
        <strong>Correct Answer:</strong> ${wrongChoices[i].correctChoice}
      </p>
    `;
  }

  // Update the result container content:
  resultContainer.innerHTML = `
    <p>You scored ${userScore} out of ${comedyQuiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${wrongChoicesHtml}
  `;
}

submitBtn.addEventListener('click', checkSelectedChoice);
retryBtn.addEventListener('click', retryQuiz);
revealAnswerBtn.addEventListener('click', showAnswer);

showCurrentQuestIndex();