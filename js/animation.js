const animationQuiz = [
  {
    indexQuest: "What is the name of the pixar movie where a toy cowboy goes on an adventure to find his way back to his owner?",
    choices: ["A Bug's Life", "Toy Story", "Monsters, Inc.", "Finding Nemo"],
    choice: "Toy Story",
  },
  {
    indexQuest: "What famous anime features a young ninja named Naruto Uzumaki?",
    choices: ["Dragon Ball Z", "Sailor Moon", "Naruto", "Attack on Titan"],
    choice: "Naruto",
  },
  {
    indexQuest: "In the movie 'Spirited Away', what is the name of the spirit world Chihiro travels to?",
    choices: ["The Spirit Realm", "The Dream World", "The Underworld", "Kami-no-Chi (Land of the Gods)"],
    choice: "Kami-no-Chi (Land of the Gods)",
  },
  {
    indexQuest: "What studio is famous for creating iconic animated characters like Mickey Mouse and Bugs Bunny?",
    choices: ["Pixar", "Studio Ghibli", "Walt Disney Animation Studios", "Warner Bros. Animation"],
    choice: "Walt Disney Animation Studios",
  },
  {
    indexQuest: "What is the name of the grumpy yeti featured in the animated movie 'Smallfoot'?",
    choices: ["Bigfoot", "Everest", "Percy", "Migo"],
    choice: "Migo",
  },
  {
    indexQuest: "In the Japanese anime series 'My Hero Academia', what is the name of the quirkless protagonist who dreams of becoming a hero?",
    choices: ["Izuku Midoriya", "Katsuki Bakugo", "Shoto Todoroki", "All Might"],
    choice: "Izuku Midoriya",
  },
  {
    indexQuest: "What stop-motion animation technique was used to create the characters in 'Wallace and Gromit'?",
    choices: ["Cel animation", "Digital animation", "Claymation", "Rotoscoping"],
    choice: "Claymation",
  },
  {
    indexQuest: "What is the name of the mischievous rabbit from the classic Looney Tunes cartoons?",
    choices: ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Wile E. Coyote"],
    choice: "Bugs Bunny",
  },
  {
    indexQuest: "What is the name of the pixar movie where a robot named Wall-E falls in love with a sleek probe named EVE?",
    choices: ["Ratatouille", "WALL-E", "Up", "Finding Dory"],
    choice: "WALL-E",
  },
  {
    indexQuest: "In the movie 'How to Train Your Dragon', what is the name of the young Viking protagonist who befriends a Night Fury dragon?",
    choices: ["Hiccup Horrendous Haddock III", "Astrid Hofferson", "Gobber the Blacksmith", "Stoick the Vast"],
    choice: "Hiccup Horrendous Haddock III",
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
  const indexQuestData = animationQuiz[questionIndexNow];

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
    if (choice === animationQuiz[questionIndexNow].choice) {
      // Increase the score:
      userScore++;
    } else {
      // Track incorrect choice for later review:
      wrongChoices.push({
        indexQuest: animationQuiz[questionIndexNow].indexQuest,
        incorrectChoice: choice,
        correctChoice: animationQuiz[questionIndexNow].choice,
      });
    }

    // Move to the next question:
    questionIndexNow++;

    // Uncheck the selected choice:
    selectedChoice.checked = false;

    // Decide whether to display the next question or the results:
    if (questionIndexNow < animationQuiz.length) {
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
  resultContainer.innerHTML = `You scored ${userScore} out of ${animationQuiz.length}!`;
  //  - ${userScore} is replaced with the user's actual score
  //  - ${animationQuiz.length} is replaced with the total number of questions
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
    <p>You scored ${userScore} out of ${animationQuiz.length}!</p>
    <p>Incorrect Answers:</p>
    ${wrongChoicesHtml}
  `;
}

submitBtn.addEventListener('click', checkSelectedChoice);
retryBtn.addEventListener('click', retryQuiz);
revealAnswerBtn.addEventListener('click', showAnswer);

showCurrentQuestIndex();