const countdownElement = document.getElementById('countdown');

// Função para calcular o tempo restante até a meia-noite
function calculateEndTime() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime();
}

let endTime = localStorage.getItem('offerEndTime');

// Se não estiver armazenado ou se a oferta expirou, definimos o novo tempo final
if (!endTime || new Date().getTime() > endTime) {
    endTime = calculateEndTime();
    localStorage.setItem('offerEndTime', endTime);
}

// Função que atualiza o contador
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = endTime - now;

    if (timeRemaining > 0) {
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
    } else {
        endTime = calculateEndTime();
        localStorage.setItem('offerEndTime', endTime);
    }
}

// Atualiza o contador a cada segundo
setInterval(updateCountdown, 1000);

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.review-card');
    const totalSlides = slides.length;

    currentSlide += direction;

    // Reinicia o carrossel se o índice estiver fora do intervalo
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    const newTransformValue = -currentSlide * (300 + 20); // 300px é a largura do card + 20px de margem
    document.querySelector('.carousel-inner').style.transform = `translateX(${newTransformValue}px)`;
}

// Adicionando ouvintes de eventos para os botões de navegação
document.querySelector('.prev').addEventListener('click', () => moveSlide(-2));
document.querySelector('.next').addEventListener('click', () => moveSlide(2));
