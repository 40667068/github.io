const quizData = [
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