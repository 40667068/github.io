const superheroQuiz = [
  {
    indexQuest: "What is the real name of Clark Kent, better known as the superhero Superman?",
    choices: ["Bruce Wayne", "Cal El", "Peter Parker", "Steve Rogers"],
    choice: "Cal El",
  },
  {
    indexQuest: "What fictional metal is Wolverine's skeleton and claws made of in the Marvel Universe?",
    choices: ["Vibranium", "Adamantium", "Mithril", "Caradamantine"],
    choice: "Adamantium",
  },
  {
    indexQuest: "Which Infinity Stone allows the user to control the mind of others?",
    choices: ["Mind Stone", "Space Stone", "Time Stone", "Reality Stone"],
    choice: "Mind Stone",
  },
  {
    indexQuest: "What is the name of the fictional city where Batman protects the citizens from crime?",
    choices: ["Gotham City", "Metropolis", "Central City", "Starling City"],
    choice: "Gotham City",
  },
  {
    indexQuest: "What is the name of Wonder Woman's invisible jet?",
    choices: ["Invisible Jet", "Themyscira's Wonder", "Golden Eagle", "Olympian Flyer"],
    choice: "Invisible Jet",
  },
  {
    indexQuest: "What is the superhero team name for Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye?",
    choices: ["The Avengers", "The Defenders", "The Justice League", "The X-Men"],
    choice: "The Avengers",
  },
  {
    indexQuest: "What is the name of the fictional metal that Captain America's shield is made of?",
    choices: ["Vibranium", "Adamantium", "Proto-Adamantium", "Caradamantine"],
    choice: "Vibranium",
  },
  {
    indexQuest: "What is the alternate name for the supervillain Thanos, who seeks the Infinity Stones?",
    choices: ["The Mad Titan", "The Devourer", "The Conqueror", "The Destroyer"],
    choice: "The Mad Titan",
  },
  {
    indexQuest: "What superhero team, led by Professor X, fights for the peaceful coexistence of mutants and humans?",
    choices: ["The Avengers", "The Justice League", "The X-Men", "The Inhumans"],
    choice: "The X-Men",
  },
  {
    indexQuest: "What is the name of the alien symbiote that bonds with Peter Parker, creating the black-suited Spider-Man?",
    choices: ["Venom", "Carnage", "Symbiote", "Klyntar"],
    choice: "Venom",
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
  const indexQuestData = superheroQuiz[questionIndexNow];

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
    if (choice === superheroQuiz[questionIndexNow].choice) {
      // Increase the score:
      userScore++;
    } else {
      // Track incorrect choice for later review:
      wrongChoices.push({
        indexQuest: superheroQuiz[questionIndexNow].indexQuest,
        incorrectChoice: choice,
        correctChoice: superheroQuiz[questionIndexNow].choice,
      });
    }

    // Move to the next question:
    questionIndexNow++;

    // Uncheck the selected choice:
    selectedChoice.checked = false;

    // Decide whether to display the next question or the results:
    if (questionIndexNow < superheroQuiz.length) {
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
  resultContainer.innerHTML = `You scored ${userScore} out of ${superheroQuiz.length}!`;
  //  - ${userScore} is replaced with the user's actual score
  //  - ${superheroQuiz.length} is replaced with the total number of questions
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
    <p>You scored ${userScore} out of ${superheroQuiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${wrongChoicesHtml}
  `;
}

submitBtn.addEventListener('click', checkSelectedChoice);
retryBtn.addEventListener('click', retryQuiz);
revealAnswerBtn.addEventListener('click', showAnswer);

showCurrentQuestIndex();