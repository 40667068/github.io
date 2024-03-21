const quizData = [
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
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
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
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
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
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();