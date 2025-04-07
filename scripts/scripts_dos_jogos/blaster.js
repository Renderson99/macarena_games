    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');

    let gameRunning = false;
    let player, enemies, bullets, score, bulletCount, reloadTime;

    // Criando objetos de áudio (descomente e adicione seus arquivos de som)
    const shootSound = new Audio('/som/som_jogos/som_blaster/som_tiro.mp3');
    const hitSound = new Audio('/som/som_jogos/som_blaster/som_explosão.mp3');
    const gameOverSound = new Audio('/som/som_jogos/som_blaster/som_game-over.mp3');

    class Player {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height - 50;
            this.width = 40;
            this.height = 40;
            this.speed = 10;
        }

        draw() {
            ctx.fillStyle = '#4933F4';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        move(direction) {
            if (direction === 'left' && this.x > 0) this.x -= this.speed;
            if (direction === 'right' && this.x < canvas.width - this.width) this.x += this.speed;
        }
    }

    class Bullet {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = 5;
            this.height = 10;
            this.speed = 7;
        }

        draw() {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update() {
            this.y -= this.speed;
        }
    }

    class Enemy {
        constructor() {
            this.x = Math.random() * (canvas.width - 30);
            this.y = -30;
            this.width = 30;
            this.height = 30;
            this.speed = 2 + Math.random() * 2;
        }

        draw() {
            ctx.fillStyle = '#F43A00';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update() {
            this.y += this.speed;
        }
    }

    function initGame() {
        player = new Player();
        enemies = [];
        bullets = [];
        score = 0;
        bulletCount = 15;
        reloadTime = 0;
        gameRunning = true;
        startButton.style.display = 'none';
        restartButton.style.display = 'none';
        spawnEnemies();
        gameLoop();
    }

    function spawnEnemies() {
        if (gameRunning) {
            enemies.push(new Enemy());
            setTimeout(spawnEnemies, 1000 - Math.min(score * 10, 800));
        }
    }

    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (reloadTime > 0) reloadTime--;

        player.draw();

        bullets.forEach((bullet, index) => {
            bullet.update();
            bullet.draw();
            if (bullet.y < 0) bullets.splice(index, 1);
        });

        enemies.forEach((enemy, eIndex) => {
            enemy.update();
            enemy.draw();

            if (checkCollision(player, enemy)) {
                endGame();
                return;
            }

            bullets.forEach((bullet, bIndex) => {
                if (checkCollision(bullet, enemy)) {
                    enemies.splice(eIndex, 1);
                    bullets.splice(bIndex, 1);
                    score += 10;
                    // Tocar som quando o tiro acerta o inimigo
                    hitSound.play();
                }
            });

            if (enemy.y > canvas.height) {
                enemies.splice(eIndex, 1);
            }
        });

        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Pontuação: ${score}`, 10, 30);
        ctx.fillText(`Tiros: ${bulletCount}`, 10, 60);
        if (reloadTime > 0) {
            const secondsLeft = (reloadTime / 60).toFixed(1);
            ctx.fillText(`Recarga: ${secondsLeft}s`, 10, 90);
        } else if (bulletCount === 0) {
            ctx.fillText(`Pressione R para recarregar`, 10, 90);
        }

        requestAnimationFrame(gameLoop);
    }

    function checkCollision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }

    function endGame() {
        gameRunning = false;
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('GAME OVER', canvas.width/2 - 100, canvas.height/2);
        restartButton.style.display = 'block';
        // Tocar som quando o jogador perde
        gameOverSound.play();
    }

    // Controles
    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;
        if (e.key === 'ArrowLeft') player.move('left');
        if (e.key === 'ArrowRight') player.move('right');
        if (e.key === ' ' && bulletCount > 0 && reloadTime === 0) {
            bullets.push(new Bullet(player.x + player.width/2 - 2.5, player.y));
            bulletCount--;
            if (bulletCount === 0) reloadTime = 180;
            // Tocar som quando o jogador atira
            
            shootSound.play();
        }
        if (e.key === 'r' && bulletCount === 0 && reloadTime === 0) {
            reloadTime = 180;
            bulletCount = 15;
        }
    });

    function voltar() {
        let pagina_home = window.location.href = "/home.html"
    }

    startButton.addEventListener('click', initGame);
    restartButton.addEventListener('click', initGame);