const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const restartButton = document.getElementById('restartButton');
        const scoreDisplay = document.getElementById('score');

        let player = {
            x: 100,
            y: 100, // Começa no ar
            width: 30,
            height: 30,
            velocity: 0,
            gravity: 0.5,
            jump: -10
        };

        let obstacles = [];
        let gameSpeed = 2;
        let score = 0;
        let gameRunning = false;
        let frameCount = 0;

        function createObstacle() {
            const obstacle = {
                x: canvas.width,
                y: Math.random() * (canvas.height - 100),
                width: 50,
                height: 50,
                passed: false
            };
            obstacles.push(obstacle);
        }

        function drawPlayer() {
            ctx.fillStyle = 'darkorange';
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }

        function drawObstacles() {
            ctx.fillStyle = 'red';
            obstacles.forEach(obstacle => {
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            });
        }

        function update() {
            if (!gameRunning) return;

            // Física do jogador
            player.velocity += player.gravity;
            player.y += player.velocity;
            
            // Limites da tela
            if (player.y + player.height > canvas.height) {
                endGame(); // Perde se tocar o chão
                return;
            }
            if (player.y < 0) {
                player.y = 0;
                player.velocity = 0;
            }

            // Movimento dos obstáculos
            obstacles.forEach(obstacle => {
                obstacle.x -= gameSpeed;
                
                // Verifica colisão com obstáculos
                if (checkCollision(player, obstacle)) {
                    endGame();
                    return;
                }

                // Pontuação
                if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
                    obstacle.passed = true;
                    score++;
                    scoreDisplay.textContent = score;
                }
            });

            // Remove obstáculos fora da tela
            obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

            // Aumenta dificuldade
            frameCount++;
            if (frameCount % 120 === 0) { // A cada 2 segundos aproximadamente
                gameSpeed += 0.5;
                createObstacle();
            }

            // Cria novo obstáculo a cada 100 frames
            if (frameCount % 100 === 0) {
                createObstacle();
            }
        }

        function checkCollision(obj1, obj2) {
            return obj1.x < obj2.x + obj2.width &&
                   obj1.x + obj1.width > obj2.x &&
                   obj1.y < obj2.y + obj2.height &&
                   obj1.y + obj1.height > obj2.y;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlayer();
            drawObstacles();
        }

        function gameLoop() {
            update();
            draw();
            if (gameRunning) {
                requestAnimationFrame(gameLoop);
            }
        }

        function startGame() {
            gameRunning = true;
            startButton.style.display = 'none';
            restartButton.style.display = 'none';
            score = 0;
            scoreDisplay.textContent = score;
            gameSpeed = 2;
            frameCount = 0;
            obstacles = [];
            player.y = 100; // Começa no ar
            player.velocity = 0;
            createObstacle();
            gameLoop();
        }

        function endGame() {
            gameRunning = false;
            restartButton.style.display = 'inline';
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText('Game Over!', canvas.width/2 - 80, canvas.height/2);
        }

        // Controles
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || 'W' && gameRunning) {
                player.velocity = player.jump;
            }
        });

        startButton.addEventListener('click', startGame);
        restartButton.addEventListener('click', startGame);

        // butão voltar 
        function voltar() {
            let pagina_home = window.location.href = "/home.html"
        }
