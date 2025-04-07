// Função para verificar se o dispositivo é móvel
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para bloquear a orientação em landscape
async function lockOrientation() {
    if (isMobileDevice()) {
        try {
            if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('landscape');
            }
        } catch (error) {
            console.log('Não foi possível bloquear a orientação:', error);
        }
    }
}

// Função para desbloquear a orientação
function unlockOrientation() {
    if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
    }
}

// Função para mostrar/esconder a mensagem de orientação
function toggleOrientationMessage(show) {
    let message = document.getElementById('orientation-message');
    if (!message) {
        message = document.createElement('div');
        message.id = 'orientation-message';
        message.innerHTML = 'Por favor, gire seu dispositivo para a orientação horizontal para jogar!';
        document.body.appendChild(message);
    }
    message.style.display = show ? 'block' : 'none';
}

// Função para verificar a orientação atual
function checkOrientation() {
    if (isMobileDevice()) {
        const isPortrait = window.innerHeight > window.innerWidth;
        toggleOrientationMessage(isPortrait);
        if (!isPortrait) {
            lockOrientation();
        }
    }
}

// Adicionar event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (isMobileDevice()) {
        checkOrientation();
        window.addEventListener('orientationchange', checkOrientation);
        window.addEventListener('resize', checkOrientation);
    }
}); 