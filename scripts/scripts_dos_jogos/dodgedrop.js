function voltar() {
    let pagina_home = window.location.href = "/index.html"
}

const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const restartButton = document.getElementById('restartButton');

        let score = 0;
        let speed = 2; // Velocidade inicial
        let gameOver = false;
        let player = { x: 200, y: 350, width: 20, height: 20 };
        let obstacle = { x: 200, y: 0, width: 50, height: 20 };

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenhar jogador
            ctx.fillStyle = 'blue';
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // Desenhar obstáculo
            ctx.fillStyle = 'red';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

            // Desenhar pontuação
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 10, 30);
        }

        function update() {
            if (!gameOver) {
                obstacle.y += speed;

                // Verificar colisão
                if (obstacle.y + obstacle.height > player.y &&
                    obstacle.y < player.y + player.height &&
                    obstacle.x + obstacle.width > player.x &&
                    obstacle.x < player.x + player.width) {
                    gameOver = true;
                    restartButton.style.display = 'block'; // Mostra o botão de restart
                }

                // Reposicionar obstáculo e aumentar score
                if (obstacle.y > canvas.height) {
                    obstacle.y = 0;
                    obstacle.x = Math.random() * (canvas.width - obstacle.width);
                    score += 10;

                    // Aumentar velocidade a cada 500 pontos
                    if (score % 50 === 0) {
                        speed += 1;
                        console.log('Velocidade aumentada para: ' + speed);
                    }
                }
            }
        }

        function gameLoop() {
            draw();
            update();
            if (!gameOver) requestAnimationFrame(gameLoop);
        }

        function restartGame() {
            score = 0;
            speed = 2;
            gameOver = false;
            obstacle.y = 0;
            obstacle.x = 200;
            restartButton.style.display = 'none'; // Esconde o botão
            gameLoop(); // Reinicia o jogo
        }

        // Controle do jogador (mover com setas)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && player.x > 0) player.x -= 10;
            if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) player.x += 10;
        });

        // Adiciona event listeners para orientação e redimensionamento
        /*document.addEventListener('DOMContentLoaded', () => {
            lockOrientation();
            resizeCanvas();
            
            window.addEventListener('resize', resizeCanvas);
            window.addEventListener('orientationchange', resizeCanvas);
        });*/

        gameLoop();