const photos = [
    'img1.jpg', 'img1.jpg', 'img2.jpg', 'img2.jpg', 'img3.jpg', 'img3.jpg',
    'img4.jpg', 'img4.jpg', 'img5.jpg', 'img5.jpg', 'img6.jpg', 'img6.jpg',
    'img7.jpg', 'img7.jpg', 'img8.jpg', 'img8.jpg', 'img9.jpg', 'img9.jpg',
    'img10.jpg', 'img10.jpg'
];

let timer;
let gameStarted = false;

const shuffledPhotos = photos.sort(() => (Math.random() > 0.5 ? 2 : -1));

document.querySelector('.start').addEventListener('click', startGame);

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    document.querySelector('.start').disabled = true; // Disable the start button after the game starts

    const gameContainer = document.querySelector('.game');
    gameContainer.style.pointerEvents = 'auto'; // Enable clicking

    let timeLeft = 50 // 50 seconds timer
    document.querySelector('.timer').textContent = `Time left: ${timeLeft}`; // Display initial timer

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.querySelector('.timer').textContent = `Time left: ${timeLeft}`; // Update timer on screen
        } else {
            endGame('loser');
        }
    }, 1000);
}

function endGame(result) {
    clearInterval(timer);
    const gameContainer = document.querySelector('.game');
    gameContainer.style.pointerEvents = 'none'; // Disable clicking

    const notification = document.getElementById(result + '-notification');
    notification.classList.remove('hidden');
    notification.classList.add('visible');

    if (result === 'loser') {
        console.log('Sorry, time’s up! You lose.');
    }
}

for (let i = 0; i < photos.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.style.backgroundImage = `url('images/${shuffledPhotos[i]}')`;
    box.style.backgroundSize = 'cover';
    box.dataset.photo = shuffledPhotos[i];

    box.onclick = function () {
        if (!gameStarted) return;

        this.classList.add('boxOpen');
        setTimeout(function () {
            const openBoxes = document.querySelectorAll('.boxOpen');
            if (openBoxes.length > 1) {
                if (openBoxes[0].dataset.photo === openBoxes[1].dataset.photo) {
                    openBoxes[0].classList.add('boxMatch');
                    openBoxes[1].classList.add('boxMatch');
                    openBoxes[0].classList.remove('boxOpen');
                    openBoxes[1].classList.remove('boxOpen');

                    if (document.querySelectorAll('.boxMatch').length === photos.length) {
                        endGame('win');
                    }
                } else {
                    openBoxes[0].classList.remove('boxOpen');
                    openBoxes[1].classList.remove('boxOpen');
                }
            }
        }, 500);
    };

    document.querySelector('.game').appendChild(box);
}
