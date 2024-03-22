const actionQuiz = [
  {
    question: "What is the name of the retired CIA assassin John Wick is forced back into action for in the first movie?",
    options: ["His family", "His car", "His dog", "His country"],
    answer: "His dog",
  },
  {
    question: "In the 'Matrix' franchise, what is the name of the red pill that allows Neo to see the true nature of reality?",
    options: ["The Red Pill", "The Blue Pill", "The Morpheus Pill", "The Oracle Pill"],
    answer: "The Red Pill",
  },
  {
    question: "What is the name of the high-security prison on Alcatraz Island featured in 'The Rock'?",
    options: ["Alcatraz Federal Penitentiary", "San Francisco City Jail", "Angel Island Prison", "Golden Gate Prison"],
    answer: "Alcatraz Federal Penitentiary",
  },
  {
    question: "What famous line does Maximus Decimus Meridius say before his final battle in 'Gladiator'?",
    options: ["Are you not entertained?", "This is Sparta!", "Strength and honor!", "Victory or death!"],
    answer: "Are you not entertained?",
  },
  {
    question: "In the 'Fast & Furious' franchise, what is the name of Dominic Toretto's deceased lover?",
    options: ["Mia", "Letty", "Gisele", "Monica"],
    answer: "Letty",
  },
  {
    question: "What is the name of the futuristic sport that combines motorcycle racing and martial arts in 'Alita: Battle Angel'?",
    options: ["Motorball", "Skyball", "Cyber Race", "Death Race"],
    answer: "Motorball",
  },
  {
    question: "In the 'John Wick' movies, what type of currency do assassins use?",
    options: ["Gold Coins", "Bitcoin", "Dollars", "Euros"],
    answer: "Gold Coins",
  },
  {
    question: "What is the name of the dystopian city depicted in the 'Hunger Games' franchise?",
    options: ["Panem", "Capitol", "District 12", "The Arena"],
    answer: "Panem",
  },
  {
    question: "What famous catchphrase does Arnold Schwarzenegger utter in the 'Terminator' movies?",
    options: ["I'll be back", "Hasta la vista, baby!", "You're terminated!", "Come with me if you want to live!"],
    answer: "I'll be back",
  },
  {
    question: "What is the name of the secret government agency that recruits Ethan Hunt in 'Mission: Impossible'?",
    options: ["IMF (Impossible Missions Force)", "CIA", "FBI", "MI6"],
    answer: "IMF (Impossible Missions Force)",
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
    const questionData = actionQuiz[currentQuestion];
  
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
      if (answer === actionQuiz[currentQuestion].answer) {
        // Increase the score:
        score++;
      } else {
        // Track incorrect answer for later review:
        incorrectAnswers.push({
          question: actionQuiz[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: actionQuiz[currentQuestion].answer,
        });
      }
  
      // Move to the next question:
      currentQuestion++;
  
      // Uncheck the selected option:
      selectedOption.checked = false;
  
      // Decide whether to display the next question or the results:
      if (currentQuestion < actionQuiz.length) {
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
    resultData.innerHTML = `You scored ${score} out of ${actionQuiz.length}!`;
    //  - ${score} is replaced with the user's actual score
    //  - ${actionQuiz.length} is replaced with the total number of questions
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
      <p>You scored ${score} out of ${actionQuiz.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();