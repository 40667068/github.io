const actionQuiz = [
  {
    indexQuest: "What is the name of the retired CIA assassin John Wick is forced back into action for in the first movie?",
    choices: ["His family", "His car", "His dog", "His country"],
    choice: "His dog",
  },
  {
    indexQuest: "In the 'Matrix' franchise, what is the name of the red pill that allows Neo to see the true nature of reality?",
    choices: ["The Red Pill", "The Blue Pill", "The Morpheus Pill", "The Oracle Pill"],
    choice: "The Red Pill",
  },
  {
    indexQuest: "What is the name of the high-security prison on Alcatraz Island featured in 'The Rock'?",
    choices: ["Alcatraz Federal Penitentiary", "San Francisco City Jail", "Angel Island Prison", "Golden Gate Prison"],
    choice: "Alcatraz Federal Penitentiary",
  },
  {
    indexQuest: "What famous line does Maximus Decimus Meridius say before his final battle in 'Gladiator'?",
    choices: ["Are you not entertained?", "This is Sparta!", "Strength and honor!", "Victory or death!"],
    choice: "Are you not entertained?",
  },
  {
    indexQuest: "In the 'Fast & Furious' franchise, what is the name of Dominic Toretto's deceased lover?",
    choices: ["Mia", "Letty", "Gisele", "Monica"],
    choice: "Letty",
  },
  {
    indexQuest: "What is the name of the futuristic sport that combines motorcycle racing and martial arts in 'Alita: Battle Angel'?",
    choices: ["Motorball", "Skyball", "Cyber Race", "Death Race"],
    choice: "Motorball",
  },
  {
    indexQuest: "In the 'John Wick' movies, what type of currency do assassins use?",
    choices: ["Gold Coins", "Bitcoin", "Dollars", "Euros"],
    choice: "Gold Coins",
  },
  {
    indexQuest: "What is the name of the dystopian city depicted in the 'Hunger Games' franchise?",
    choices: ["Panem", "Capitol", "District 12", "The Arena"],
    choice: "Panem",
  },
  {
    indexQuest: "What famous catchphrase does Arnold Schwarzenegger utter in the 'Terminator' movies?",
    choices: ["I'll be back", "Hasta la vista, baby!", "You're terminated!", "Come with me if you want to live!"],
    choice: "I'll be back",
  },
  {
    indexQuest: "What is the name of the secret government agency that recruits Ethan Hunt in 'Mission: Impossible'?",
    choices: ["IMF (Impossible Missions Force)", "CIA", "FBI", "MI6"],
    choice: "IMF (Impossible Missions Force)",
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
  const indexQuestData = actionQuiz[questionIndexNow];

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
    if (choice === actionQuiz[questionIndexNow].choice) {
      // Increase the score:
      userScore++;
    } else {
      // Track incorrect choice for later review:
      wrongChoices.push({
        indexQuest: actionQuiz[questionIndexNow].indexQuest,
        incorrectChoice: choice,
        correctChoice: actionQuiz[questionIndexNow].choice,
      });
    }

    // Move to the next question:
    questionIndexNow++;

    // Uncheck the selected choice:
    selectedChoice.checked = false;

    // Decide whether to display the next question or the results:
    if (questionIndexNow < actionQuiz.length) {
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
  resultContainer.innerHTML = `You scored ${userScore} out of ${actionQuiz.length}!`;
  //  - ${userScore} is replaced with the user's actual score
  //  - ${actionQuiz.length} is replaced with the total number of questions
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
    <p>You scored ${userScore} out of ${actionQuiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${wrongChoicesHtml}
  `;
}

submitBtn.addEventListener('click', checkSelectedChoice);
retryBtn.addEventListener('click', retryQuiz);
revealAnswerBtn.addEventListener('click', showAnswer);

showCurrentQuestIndex();