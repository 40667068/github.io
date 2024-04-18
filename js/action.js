const actionQuiz = [
  {
    question: "What is the name of the retired CIA assassin John Wick is forced back into action for in the first movie?",
    options: ["His family", "His car", "His dog", "His country"],
    option: "His dog",
  },
  {
    question: "In the 'Matrix' franchise, what is the name of the red pill that allows Neo to see the true nature of reality?",
    options: ["The Red Pill", "The Blue Pill", "The Morpheus Pill", "The Oracle Pill"],
    option: "The Red Pill",
  },
  {
    question: "What is the name of the high-security prison on Alcatraz Island featured in 'The Rock'?",
    options: ["Alcatraz Federal Penitentiary", "San Francisco City Jail", "Angel Island Prison", "Golden Gate Prison"],
    option: "Alcatraz Federal Penitentiary",
  },
  {
    question: "What famous line does Maximus Decimus Meridius say before his final battle in 'Gladiator'?",
    options: ["Are you not entertained?", "This is Sparta!", "Strength and honor!", "Victory or death!"],
    option: "Are you not entertained?",
  },
  {
    question: "In the 'Fast & Furious' franchise, what is the name of Dominic Toretto's deceased lover?",
    options: ["Mia", "Letty", "Gisele", "Monica"],
    option: "Letty",
  },
  {
    question: "What is the name of the futuristic sport that combines motorcycle racing and martial arts in 'Alita: Battle Angel'?",
    options: ["Motorball", "Skyball", "Cyber Race", "Death Race"],
    option: "Motorball",
  },
  {
    question: "In the 'John Wick' movies, what type of currency do assassins use?",
    options: ["Gold Coins", "Bitcoin", "Dollars", "Euros"],
    option: "Gold Coins",
  },
  {
    question: "What is the name of the dystopian city depicted in the 'Hunger Games' franchise?",
    options: ["Panem", "Capitol", "District 12", "The Arena"],
    option: "Panem",
  },
  {
    question: "What famous catchphrase does Arnold Schwarzenegger utter in the 'Terminator' movies?",
    options: ["I'll be back", "Hasta la vista, baby!", "You're terminated!", "Come with me if you want to live!"],
    option: "I'll be back",
  },
  {
    question: "What is the name of the secret government agency that recruits Ethan Hunt in 'Mission: Impossible'?",
    options: ["IMF (Impossible Missions Force)", "CIA", "FBI", "MI6"],
    option: "IMF (Impossible Missions Force)",
  },
];
  
  const subContainer = document.getElementById('subcontainer');
  const displayScore = document.getElementById('displayscore');
  const submitBtn = document.getElementById('submitbtn');
  const retryBtn = document.getElementById('retrybtn');
  const displayAnsBtn = document.getElementById('displayoption');
  
  let presentIndex = 0;
  let userScore = 0;
  let wrongOptions = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    // Get the current question data:
    const questionData = actionQuiz[presentIndex];
  
    // Create DOM elements for question and options:
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    // Shuffle the option options for randomness:
    const shuffledOptions = [...questionData.options]; // Copy the options array
    shuffleArray(shuffledOptions); // Shuffle the copied options
  
    // Create and display each option with radio button:
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz'; // Group radio buttons for single selection
      radio.value = shuffledOptions[i]; // Set the option value
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    // Clear the quiz container and display the question and options:
    subContainer.innerHTML = '';
    subContainer.appendChild(questionElement);
    subContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    // Get the selected option option (if any):
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
  
    // If an option is selected:
    if (selectedOption) {
      // Extract the option value:
      const option = selectedOption.value;
  
      // Check if the option is correct:
      if (option === actionQuiz[presentIndex].option) {
        // Increase the user score:
        userScore++;
      } else {
        // Track incorrect option for later review:
        wrongOptions.push({
          question: actionQuiz[presentIndex].question,
          wrongOption: option,
          correctAnswer: actionQuiz[presentIndex].option,
        });
      }
  
      // Move to the next question:
      presentIndex++;
  
      // Uncheck the selected option:
      selectedOption.checked = false;
  
      // Decide whether to display the next question or the results:
      if (presentIndex < actionQuiz.length) {
        displayQuestion(); // Continue the quiz with the next question
      } else {
        displayResult();  // Quiz is over, show the final result
      }
    }
  }
  
  function displayResult() {
    // Hide the quiz container element (questions are no longer displayed)
    subContainer.style.display = 'none';
  
    // Hide the submit button (no more options to submit)
    submitBtn.style.display = 'none';
  
    // Show the retry button (user can restart the quiz)
    retryBtn.style.display = 'inline-block';
  
    // Optionally show the "show option" button (user can see options)
    displayAnsBtn.style.display = 'inline-block';
  
    // Update the result container content
    displayScore.innerHTML = `You scored ${userScore} out of ${actionQuiz.length}!`;
    //  - ${userScore} is replaced with the user's actual score
    //  - ${actionQuiz.length} is replaced with the total number of questions
  }
  
  function retryQuiz() {
    // Reset the current question index to 0 (start from the beginning)
    presentIndex = 0;
  
    // Reset the userScore to 0
    userScore = 0;
  
    // Clear the array of incorrect options
    wrongOptions = [];
  
    // Show the quiz container element
    subContainer.style.display = 'block';
  
    // Show the submit button
    submitBtn.style.display = 'inline-block';
  
    // Hide the retry button (user is restarting the quiz)
    retryBtn.style.display = 'none';
  
    // Hide the "show option" button (if present)
    displayAnsBtn.style.display = 'none';
  
    // Clear the result container (previous results)
    displayScore.innerHTML = '';
  
    // Call the displayQuestion function to start the quiz again
    displayQuestion();
  }
  
  function showAnswer() {
    // Hide quiz elements (questions and submit button):
    subContainer.style.display = 'none';
    submitBtn.style.display = 'none';
  
    // Show retry button and hide "show option" button (user has seen options):
    retryBtn.style.display = 'inline-block';
    displayAnsBtn.style.display = 'none';
  
    // Build HTML content for displaying incorrect options:
    let wrongOptionsHtml = '';
    for (let i = 0; i < wrongOptions.length; i++) {
      wrongOptionsHtml += `
        <p>
          <strong>Question:</strong> ${wrongOptions[i].question}<br>
          <strong>Your Answer:</strong> ${wrongOptions[i].wrongOption}<br>
          <strong>Correct Answer:</strong> ${wrongOptions[i].correctAnswer}
        </p>
      `;
    }
  
    // Update the result container content:
    displayScore.innerHTML = `
      <p>You scored ${userScore} out of ${actionQuiz.length}!</p>
      <p>Incorrect Answers:</p>
      ${wrongOptionsHtml}
    `;
  }
  
  submitBtn.addEventListener('click', checkAnswer);
  retryBtn.addEventListener('click', retryQuiz);
  displayAnsBtn.addEventListener('click', showAnswer);
  
  displayQuestion();