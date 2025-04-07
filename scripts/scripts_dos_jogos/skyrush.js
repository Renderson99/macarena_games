const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');
        const restartButton = document.getElementById('restartButton');
        
        function voltar() {
            let pagina_home = window.location.href = "/index.html"
        }   

        // Função para gerenciar controles móveis
        function handleMobileControl(key, isPressed) {
            keys[key] = isPressed;
        }

        // Função para redimensionar o canvas
        function resizeCanvas() {
            if (window.innerWidth <= 425) {
                // Em dispositivos móveis, ajusta o tamanho do canvas
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight * 0.8;
            } else {
                // Em desktop, mantém o tamanho original
                canvas.width = 800;
                canvas.height = 500;
            }
        }

        // Adiciona event listeners para redimensionamento
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('orientationchange', resizeCanvas);

        // Chama a função de redimensionamento inicial
        resizeCanvas();

        // Configurações do avião (quadrado azul)
        let plane = {
            x: 50,
            y: 200,
            width: 40,
            height: 20,
            speed: 5
        };

        // Variáveis do jogo
        let score = 0;
        let gameOver = false;
        let keys = {};
        let enemies = [];
        let items = [];
        let backgroundX = 0;
        let enemyBaseSpeed = 7; // Velocidade base dos inimigos

        // Escuta eventos de teclado
        window.addEventListener('keydown', (e) => keys[e.key] = true);
        window.addEventListener('keyup', (e) => keys[e.key] = false);

        // Criação de inimigos
        function spawnEnemy() {
            if (Math.random() < 0.02) { // Chance de spawn a cada frame
                enemies.push({
                    x: canvas.width,
                    y: Math.random() * (canvas.height - 30),
                    width: 30,
                    height: 30,
                    speed: enemyBaseSpeed + Math.random() * 2
                });
            }
        }

        // Criação de itens coletáveis
        function spawnItem() {
            if (Math.random() < 0.01) { // Menor chance de spawn
                items.push({
                    x: canvas.width,
                    y: Math.random() * (canvas.height - 20),
                    width: 20,
                    height: 20,
                    speed: 2
                });
            }
        }

        // Verifica colisão
        function checkCollision(a, b) {
            return a.x < b.x + b.width &&
                   a.x + a.width > b.x &&
                   a.y < b.y + b.height &&
                   a.y + a.height > b.y;
        }

        function update() {
            if (gameOver) return;

            // Movimento do avião
            if (keys['ArrowUp'] && plane.y > 0) plane.y -= plane.speed;
            if (keys['ArrowDown'] && plane.y < canvas.height - plane.height) plane.y += plane.speed;
            if (keys['ArrowLeft'] && plane.x > 0) plane.x -= plane.speed;
            if (keys['ArrowRight'] && plane.x < canvas.width - plane.width) plane.x += plane.speed;

            // Movimento do fundo
            backgroundX -= 2;
            if (backgroundX <= -canvas.width) backgroundX = 0;

            // Atualiza inimigos
            spawnEnemy();
            enemies.forEach((enemy, index) => {
                enemy.x -= enemy.speed;
                if (checkCollision(plane, enemy)) {
                    gameOver = true;
                    restartButton.style.display = 'block'; // Mostra o botão ao perder
                }
                if (enemy.x < -enemy.width) enemies.splice(index, 1);
            });

            // Atualiza itens
            spawnItem();
            items.forEach((item, index) => {
                item.x -= item.speed;
                if (checkCollision(plane, item)) {
                    score += 10;
                    items.splice(index, 1);
                }
                if (item.x < -item.width) items.splice(index, 1);
            });

            // Atualiza pontuação
            score += 0.1;
            scoreDisplay.textContent = `Pontuação: ${Math.floor(score)}`;

            // Aumenta a velocidade dos inimigos a cada 100 pontos
            if (Math.floor(score) % 100 === 0 && Math.floor(score) > 0) {
                enemyBaseSpeed += 1; // Aumenta a velocidade base
                enemies.forEach(enemy => enemy.speed = enemyBaseSpeed + Math.random() * 2); // Atualiza todos os inimigos
            }
        }

        function draw() {
            // Limpa a tela
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenha o fundo (simulado com retângulos)
            ctx.fillStyle = 'lightblue';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'green';
            ctx.fillRect(backgroundX, canvas.height - 50, canvas.width, 50);
            ctx.fillRect(backgroundX + canvas.width, canvas.height - 50, canvas.width, 50);

            // Desenha o avião
            ctx.fillStyle = 'blue';
            ctx.fillRect(plane.x, plane.y, plane.width, plane.height);

            // Desenha inimigos
            ctx.fillStyle = 'red';
            enemies.forEach(enemy => ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height));

            // Desenha itens
            ctx.fillStyle = 'yellow';
            items.forEach(item => ctx.fillRect(item.x, item.y, item.width, item.height));

            // Mensagem de game over
            if (gameOver) {
                ctx.fillStyle = 'black';
                ctx.font = '40px Arial';
                ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
            }
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        // Função para reiniciar o jogo
        function restartGame() {
            score = 0;
            gameOver = false;
            plane.x = 50;
            plane.y = 200;
            enemies = [];
            items = [];
            backgroundX = 0;
            enemyBaseSpeed = 7; // Reseta a velocidade base
            restartButton.style.display = 'none'; // Esconde o botão
            scoreDisplay.textContent = `Pontuação: 0`;
        }

        // Inicia o jogo
        gameLoop();

        