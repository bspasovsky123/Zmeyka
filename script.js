document.addEventListener("DOMContentLoaded", function() {
    // Настройки игры
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
  
    const gridSize = 20; // размер клетки
    const canvasSize = 400; // размер игрового поля
    let score = 0;
    let snake = [{x: 160, y: 160}];
    let direction = 'RIGHT';
    let food = generateFood();
  
    // Элементы для модального окна
    const gameOverModal = document.getElementById("gameOverModal");
    const gameOverText = document.getElementById("gameOverText");
    const restartButton = document.getElementById("restartButton");
  
    // Основной игровой цикл
    function gameLoop() {
      moveSnake();
      if (checkCollision()) {
        return gameOver();
      }
      if (eatFood()) {
        score++;
        document.getElementById("score").textContent = score;
        food = generateFood();
      }
      draw();
      setTimeout(gameLoop, 100); // Таймаут для обновления
    }
  
    // Отрисовка игры
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // очищаем экран
      ctx.fillStyle = "green";
      snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize)); // рисуем змейку
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, gridSize, gridSize); // рисуем еду
    }
  
    // Движение змейки
    function moveSnake() {
      let head = {x: snake[0].x, y: snake[0].y};
  
      switch (direction) {
        case 'UP': head.y -= gridSize; break;
        case 'DOWN': head.y += gridSize; break;
        case 'LEFT': head.x -= gridSize; break;
        case 'RIGHT': head.x += gridSize; break;
      }
  
      snake.unshift(head); // добавляем новую голову
      snake.pop(); // убираем хвост
    }
  
    // Проверка на столкновение с границами или с самой собой
    function checkCollision() {
      let head = snake[0];
  
      if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
      }
  
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          return true;
        }
      }
  
      return false;
    }
  
    // Проверка на съедание еды
    function eatFood() {
      let head = snake[0];
      return head.x === food.x && head.y === food.y;
    }
  
    // Генерация еды в случайной клетке
    function generateFood() {
      let x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
      let y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
      return {x, y};
    }
  
    // Обработка ввода с клавиатуры
    document.addEventListener("keydown", function(event) {
      if (event.code === "ArrowUp" && direction !== 'DOWN') {
        direction = 'UP';
      } else if (event.code === "ArrowDown" && direction !== 'UP') {
        direction = 'DOWN';
      } else if (event.code === "ArrowLeft" && direction !== 'RIGHT') {
        direction = 'LEFT';
      } else if (event.code === "ArrowRight" && direction !== 'LEFT') {
        direction = 'RIGHT';
      }
    });
  
    // Конец игры
    function gameOver() {
      gameOverText.textContent = `Игра окончена! Ваш счёт: ${score}`;
      gameOverModal.style.display = 'flex'; // Показываем модальное окно
    }
  
    // Сброс игры
    function resetGame() {
      snake = [{x: 160, y: 160}];
      direction = 'RIGHT';
      score = 0;
      document.getElementById("score").textContent = score;
      food = generateFood();
      gameLoop();
      gameOverModal.style.display = 'none'; // Скрываем модальное окно
    }
  
    // Обработчик кнопки "Начать заново"
    restartButton.addEventListener("click", resetGame);
  
    // Запуск игры
    gameLoop();
  });
    