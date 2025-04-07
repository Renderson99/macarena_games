        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const restartButton = document.getElementById('restartButton');

        // Sons do jogo
        const eatSound = new Audio('/som/som_jogos/som_snake/som_coleta.mp3');
        const gameOverSound = new Audio('/som/som_jogos/som_snake/som_derrota.mp3');

        // Variáveis do jogo
        let snake, food, score, gameOver;
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        // Função para iniciar o jogo
        function initGame() {
            snake = [
                {x: 10, y: 10},
            ];
            food = generateFood();
            score = 0;
            gameOver = false;
            startButton.style.display = 'none';
            restartButton.style.display = 'none';
            gameLoop();
        }

        // Gerar comida em posição aleatória
        function generateFood() {
            return {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        }

        // Desenhar cobra
        function drawSnake() {
            ctx.fillStyle = 'green';
            snake.forEach(segment => {
                ctx.fillRect(
                    segment.x * gridSize, 
                    segment.y * gridSize, 
                    gridSize - 2, 
                    gridSize - 2
                );
            });
        }

        // Desenhar comida
        function drawFood() {
            ctx.fillStyle = 'red';
            ctx.fillRect(
                food.x * gridSize, 
                food.y * gridSize, 
                gridSize - 2, 
                gridSize - 2
            );
        }

        // Movimento da cobra
        function moveSnake() {
            const head = {x: snake[0].x, y: snake[0].y};

            // Direção baseada nas teclas
            switch(direction) {
                case 'UP': head.y--; break;
                case 'DOWN': head.y++; break;
                case 'LEFT': head.x--; break;
                case 'RIGHT': head.x++; break;
            }

            // Atravessar paredes
            head.x = (head.x + tileCount) % tileCount;
            head.y = (head.y + tileCount) % tileCount;

            // Verificar colisão com comida
            if (head.x === food.x && head.y === food.y) {
                score++;
                food = generateFood();
                // Aumentar tamanho da cobra
                snake.push({...snake[snake.length - 1]});
                // Tocar som de comer
                eatSound.play();
            }

            // Adicionar nova cabeça
            snake.unshift(head);

            // Remover último segmento se não comeu
            if (snake.length > score + 1) {
                snake.pop();
            }
        }

        // Verificar colisões
        function checkCollision() {
            const head = snake[0];

            // Colisão com o próprio corpo
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    gameOver = true;
                    // Tocar som de game over
                    gameOverSound.play();
                }
            }
        }

        // Loop principal do jogo
        function gameLoop() {
            if (gameOver) {
                restartButton.style.display = 'block';
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            moveSnake();
            checkCollision();
            drawFood();
            drawSnake();

            // Pontuação
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText(`Pontuação: ${score}`, 10, 30);

            // Próximo frame
            setTimeout(gameLoop, 100);
        }

        // Controle de direção
        let direction = 'RIGHT';
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': 
                    if (direction !== 'DOWN') direction = 'UP'; 
                    break;
                case 'ArrowDown': 
                    if (direction !== 'UP') direction = 'DOWN'; 
                    break;
                case 'ArrowLeft': 
                    if (direction !== 'RIGHT') direction = 'LEFT'; 
                    break;
                case 'ArrowRight': 
                    if (direction !== 'LEFT') direction = 'RIGHT'; 
                    break;
            }
        });

        function voltar() {
            let pagina_home = window.location.href ="/index.html"
        }

        // Botões de início e restart
        startButton.addEventListener('click', initGame);
        restartButton.addEventListener('click', initGame);