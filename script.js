const photos = [
    'img1.jpg', 'img1.jpg', 'img2.jpg', 'img2.jpg', 'img3.jpg', 'img3.jpg',
    'img4.jpg', 'img4.jpg', 'img5.jpg', 'img5.jpg', 'img6.jpg', 'img6.jpg',
    'img7.jpg', 'img7.jpg', 'img8.jpg', 'img8.jpg', 'img9.jpg', 'img9.jpg',
    'img10.jpg', 'img10.jpg'
];


const shuffledPhotos = photos.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < photos.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.style.backgroundImage = `url('images/${shuffledPhotos[i]}')`;
    box.style.backgroundSize = 'cover';
    box.dataset.photo = shuffledPhotos[i]; // Add a data attribute for matching

    box.onclick = function () {
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
                        const winNotification = document.getElementById('win-notification');
                        winNotification.classList.remove('hidden');
                        winNotification.classList.add('visible');  // Show the win notification
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