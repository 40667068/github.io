const quizData = [
  {
    question: "What is the name of the pixar movie where a toy cowboy goes on an adventure to find his way back to his owner?",
    options: ["A Bug's Life", "Toy Story", "Monsters, Inc.", "Finding Nemo"],
    answer: "Toy Story",
  },
  {
    question: "What famous anime features a young ninja named Naruto Uzumaki?",
    options: ["Dragon Ball Z", "Sailor Moon", "Naruto", "Attack on Titan"],
    answer: "Naruto",
  },
  {
    question: "In the movie 'Spirited Away', what is the name of the spirit world Chihiro travels to?",
    options: ["The Spirit Realm", "The Dream World", "The Underworld", "Kami-no-Chi (Land of the Gods)"],
    answer: "Kami-no-Chi (Land of the Gods)",
  },
  {
    question: "What studio is famous for creating iconic animated characters like Mickey Mouse and Bugs Bunny?",
    options: ["Pixar", "Studio Ghibli", "Walt Disney Animation Studios", "Warner Bros. Animation"],
    answer: "Walt Disney Animation Studios",
  },
  {
    question: "What is the name of the grumpy yeti featured in the animated movie 'Smallfoot'?",
    options: ["Bigfoot", "Everest", "Percy", "Migo"],
    answer: "Migo",
  },
  {
    question: "In the Japanese anime series 'My Hero Academia', what is the name of the quirkless protagonist who dreams of becoming a hero?",
    options: ["Izuku Midoriya", "Katsuki Bakugo", "Shoto Todoroki", "All Might"],
    answer: "Izuku Midoriya",
  },
  {
    question: "What stop-motion animation technique was used to create the characters in 'Wallace and Gromit'?",
    options: ["Cel animation", "Digital animation", "Claymation", "Rotoscoping"],
    answer: "Claymation",
  },
  {
    question: "What is the name of the mischievous rabbit from the classic Looney Tunes cartoons?",
    options: ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Wile E. Coyote"],
    answer: "Bugs Bunny",
  },
  {
    question: "What is the name of the pixar movie where a robot named Wall-E falls in love with a sleek probe named EVE?",
    options: ["Ratatouille", "WALL-E", "Up", "Finding Dory"],
    answer: "WALL-E",
  },
  {
    question: "In the movie 'How to Train Your Dragon', what is the name of the young Viking protagonist who befriends a Night Fury dragon?",
    options: ["Hiccup Horrendous Haddock III", "Astrid Hofferson", "Gobber the Blacksmith", "Stoick the Vast"],
    answer: "Hiccup Horrendous Haddock III",
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