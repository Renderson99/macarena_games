const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const restartButton = document.getElementById('restartButton');
        const scoreDisplay = document.getElementById('score');
        
        // Áudios prontos para uso - só substitua os arquivos
        const jumpSound = document.getElementById('jumpSound');
        const crashSound = document.getElementById('crashSound');

        let gameLoop;
        let gameSpeed = 5;
        let score = 0;
        let isGameOver = false;
        let isPlaying = false;
        let lastObstacleTime = 0;
        let minObstacleGap = 80;
        let obstacleCount = 0;

        // T-Rex
        const trex = {
            x: 50,
            y: canvas.height - 40,
            width: 40,
            height: 40,
            dy: 0,
            gravity: 0.6,
            jumpPower: -15,
            isJumping: false,
            rotation: 0 // Nova propriedade para rotação
        };

        // Obstáculos
        let obstacles = [];
        const smallObstacleWidth = 20;
        const smallObstacleHeight = 40;
        const largeObstacleWidth = 40;
        const largeObstacleHeight = 80;
        const doubleObstacleWidth = 60;
        const doubleObstacleHeight = 80;

        // Cenário de fundo (montanhas)
        let mountains = [];
        const mountainSpeed = 1;

        // Inicializar montanhas
        function initializeMountains() {
            mountains = [];
            for (let i = 0; i < 8; i++) {
                mountains.push({
                    x: Math.random() * canvas.width,
                    baseWidth: 60 + Math.random() * 40,
                    height: 50 + Math.random() * 50
                });
            }
        }

        // Controles
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !trex.isJumping && isPlaying) {
                trex.dy = trex.jumpPower;
                trex.isJumping = true;
                trex.rotation = 0; // Resetar rotação ao pular
                jumpSound.play(); // Som do pulo
            }
        });

        function spawnObstacle() {
            if (!isPlaying) return;

            if (score < 200) {
                if (score - lastObstacleTime > minObstacleGap && Math.random() < 0.015) {
                    obstacles.push({
                        x: canvas.width,
                        y: canvas.height - smallObstacleHeight,
                        width: smallObstacleWidth,
                        height: smallObstacleHeight
                    });
                    lastObstacleTime = score;
                    obstacleCount++;
                }
            } else if (score < 1000) {
                let currentGap = (obstacleCount % 2 === 0) ? 5 * smallObstacleWidth : 8 * smallObstacleWidth;
                if (score - lastObstacleTime > currentGap && Math.random() < 0.015) {
                    obstacles.push({
                        x: canvas.width,
                        y: canvas.height - (obstacleCount % 2 === 0 ? smallObstacleHeight : largeObstacleHeight),
                        width: obstacleCount % 2 === 0 ? smallObstacleWidth : largeObstacleWidth,
                        height: obstacleCount % 2 === 0 ? smallObstacleHeight : largeObstacleHeight
                    });
                    lastObstacleTime = score;
                    obstacleCount++;
                }
            } else {
                let currentGap = (obstacleCount % 2 === 0) ? 5 * smallObstacleWidth : 8 * smallObstacleWidth;
                if (score - lastObstacleTime > currentGap && Math.random() < 0.015) {
                    let type = obstacleCount % 3;
                    obstacles.push({
                        x: canvas.width,
                        y: canvas.height - (type === 0 ? smallObstacleHeight : (type === 1 ? largeObstacleHeight : doubleObstacleHeight)),
                        width: type === 0 ? smallObstacleWidth : (type === 1 ? largeObstacleWidth : doubleObstacleWidth),
                        height: type === 0 ? smallObstacleHeight : (type === 1 ? largeObstacleHeight : doubleObstacleHeight)
                    });
                    lastObstacleTime = score;
                    obstacleCount++;
                }
            }
        }

        function drawTRex() {
            ctx.save(); // Salvar o estado do contexto
            // Mover o ponto de rotação para o centro do T-Rex
            ctx.translate(trex.x + trex.width / 2, trex.y + trex.height / 2);
            ctx.rotate(trex.rotation); // Aplicar rotação
            ctx.fillStyle = 'blue';
            // Desenhar o T-Rex com origem no centro
            ctx.fillRect(-trex.width / 2, -trex.height / 2, trex.width, trex.height);
            ctx.restore(); // Restaurar o estado do contexto
        }

        function drawObstacles() {
            ctx.fillStyle = 'green';
            obstacles.forEach(obstacle => {
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            });
        }

        function drawBackground() {
            ctx.fillStyle = '#b0c4de';
            mountains.forEach(mountain => {
                ctx.beginPath();
                ctx.moveTo(mountain.x - mountain.baseWidth / 2, canvas.height);
                ctx.lineTo(mountain.x, canvas.height - mountain.height);
                ctx.lineTo(mountain.x + mountain.baseWidth / 2, canvas.height);
                ctx.closePath();
                ctx.fill();
            });

            mountains.forEach(mountain => {
                mountain.x -= mountainSpeed;
                if (mountain.x + mountain.baseWidth / 2 < 0) {
                    mountain.x = canvas.width + Math.random() * 50;
                    mountain.height = 50 + Math.random() * 50;
                    mountain.baseWidth = 60 + Math.random() * 40;
                }
            });
        }

        function update() {
            // Física do T-Rex
            trex.dy += trex.gravity;
            trex.y += trex.dy;

            // Girar no ar
            if (trex.isJumping) {
                trex.rotation += 0.2; // Velocidade de rotação (ajustável)
            }

            // Manter no chão e resetar rotação
            if (trex.y + trex.height > canvas.height) {
                trex.y = canvas.height - trex.height;
                trex.dy = 0;
                trex.isJumping = false;
                trex.rotation = 0; // Voltar a ficar em pé
            }

            // Movimento dos obstáculos
            obstacles.forEach(obstacle => {
                obstacle.x -= gameSpeed;
            });

            // Remover obstáculos fora da tela
            obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

            // Aumentar velocidade e score
            if (isPlaying) {
                score++;
                scoreDisplay.textContent = `Score: ${Math.floor(score/10)}`;
                if (score % 200 === 0) {
                    gameSpeed += 0.5;
                }
            }

            // Colisão
            obstacles.forEach(obstacle => {
                if (trex.x < obstacle.x + obstacle.width &&
                    trex.x + trex.width > obstacle.x &&
                    trex.y < obstacle.y + obstacle.height &&
                    trex.y + trex.height > obstacle.y) {
                    gameOver();
                }
            });

            spawnObstacle();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawTRex();
            drawObstacles();
        }

        function gameOver() {
            isGameOver = true;
            isPlaying = false;
            clearInterval(gameLoop);
            restartButton.style.display = 'block';
            crashSound.play();
        }

        function game() {
            if (!isGameOver) {
                update();
                draw();
            }
        }

        function startGame() {
            if (!isPlaying) {
                isPlaying = true;
                isGameOver = false;
                score = 0;
                gameSpeed = 5;
                obstacles = [];
                trex.y = canvas.height - trex.height;
                trex.dy = 0;
                trex.rotation = 0; // Garantir que começa em pé
                lastObstacleTime = 0;
                minObstacleGap = 80;
                obstacleCount = 0;
                initializeMountains();
                startButton.style.display = 'none';
                restartButton.style.display = 'none';
                gameLoop = setInterval(game, 1000/60);
            }
        }

        function voltar() {
           let pagina_home = window.location.href = "/home.html" 
        }
        

        startButton.addEventListener('click', startGame);
        restartButton.addEventListener('click', startGame);

        // Criar botões de controle para tablet
        const controlsContainer = document.createElement('div');
        controlsContainer.id = 'tabletControls';
        controlsContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: none;
            z-index: 1000;
        `;

        // Botões de direção
        const leftButton = document.createElement('button');
        leftButton.innerHTML = '←';
        leftButton.className = 'control-button left';
        
        const rightButton = document.createElement('button');
        rightButton.innerHTML = '→';
        rightButton.className = 'control-button right';

        const jumpButton = document.createElement('button');
        jumpButton.innerHTML = '↑';
        jumpButton.className = 'control-button jump';

        // Estilo dos botões
        const style = document.createElement('style');
        style.textContent = `
            .control-button {
                width: 60px;
                height: 60px;
                margin: 5px;
                border: none;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                font-size: 24px;
                cursor: pointer;
                touch-action: manipulation;
            }
            .control-button:active {
                background-color: rgba(0, 0, 0, 0.8);
            }
            #tabletControls {
                display: none;
            }
            @media (max-width: 768px) {
                #tabletControls {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                .jump {
                    margin-left: 20px;
                }
            }
        `;
        document.head.appendChild(style);

        // Organizar botões em layout
        controlsContainer.appendChild(leftButton);
        controlsContainer.appendChild(rightButton);
        controlsContainer.appendChild(jumpButton);
        document.body.appendChild(controlsContainer);

        // Event listeners para os botões
        leftButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveLeft();
        });

        rightButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveRight();
        });

        jumpButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            jump();
        });