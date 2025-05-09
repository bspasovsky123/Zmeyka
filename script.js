let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// Начальная позиция змейки
let snake = [{ x: 9, y: 9 }];
let direction = 'right';
let food = { x: 5, y: 5 };  // Позиция еды
let score = 0;  // Счет игры

// Функция рисования змейки
function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем холст

  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
  }

  // Рисуем еду
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Функция движения змейки
function moveSnake() {
  let head = { ...snake[0] };

  if (direction === 'right') head.x++;
  if (direction === 'left') head.x--;
  if (direction === 'up') head.y--;
  if (direction === 'down') head.y++;

  snake.unshift(head); // Добавляем новый элемент в начало змейки

  // Проверка на столкновение с едой
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFoodPosition();  // Генерируем новую еду
  } else {
    snake.pop();  // Убираем последний элемент змейки
  }

  // Проверка на столкновение с границами или самим собой
  if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || checkCollision(head)) {
    alert('Игра окончена! Ваш счёт: ' + score);
    resetGame();
  }
}

// Функция для генерации случайной позиции еды
function randomFoodPosition() {
  let x = Math.floor(Math.random() * (canvas.width / 20));
  let y = Math.floor(Math.random() * (canvas.height / 20));
  return { x, y };
}

// Функция для проверки столкновений змейки с самой собой
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

// Обработчик нажатий клавиш
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
  if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// Функция обновления игры
function update() {
  moveSnake();
  drawSnake();
}

// Функция для сброса игры
function resetGame() {
  snake = [{ x: 9, y: 9 }];
  direction = 'right';
  score = 0;
  food = randomFoodPosition();
}

// Обновление игры каждые 100 миллисекунд
setInterval(update, 100);
