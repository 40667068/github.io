const quizData = [
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