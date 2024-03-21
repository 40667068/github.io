const actionButton = document.getElementById('actionButton');
const animationButton = document.getElementById('animationButton');
const comedyButton = document.getElementById('comedyButton');
const superheroButton = document.getElementById('superheroButton');

actionButton.addEventListener('click', () => {
  window.location.href = 'action.html';
});

animationButton.addEventListener('click', () => {
  window.location.href = 'animation.html';
});

comedyButton.addEventListener('click', () => {
  window.location.href = 'comedy.html';
});

superheroButton.addEventListener('click', () => {
  window.location.href = 'superhero.html';
});
