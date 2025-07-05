window.addEventListener('DOMContentLoaded', () => {
    const images = [
        'assets/images/1.jpg',
        'assets/images/2.jpg',
        'assets/images/3.jpg',
        'assets/images/4.jpg',
        'assets/images/5.jpg',
        'assets/images/6.jpg',
        'assets/images/7.jpg',
        'assets/images/8.jpg',
        'assets/images/9.jpg',
        'assets/images/10.jpg',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-11.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-12.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-13.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-14.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-15.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-16.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-17.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-18.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-18a.png' // Bild 18a als letztes Bild
    ];
    const captions = [
        'Panel 1 caption',
        'Panel 2 caption',
        'Panel 3 caption',
        'Panel 4 caption',
        'Panel 5 caption',
        'Panel 6 caption',
        'Panel 7 caption',
        'Panel 8 caption',
        'Panel 9 caption',
        'Panel 10 caption',
        'Panel 11 caption',
        'Panel 12 caption',
        'Panel 13 caption',
        'Panel 14 caption',
        'Panel 15 caption',
        'Panel 16 caption',
        'Panel 17 caption',
        'Panel 18 caption',
        'Panel 18a caption' // Caption für das letzte Bild
    ];

    let current = 0;
    const storyImage = document.getElementById('story-image');
    const caption = document.getElementById('caption');
    const storyContainer = document.getElementById('story-container');
    const progressBar = document.getElementById('progress-bar');

    // Fortschrittsbalken erzeugen
    images.forEach((_, i) => {
        const seg = document.createElement('div');
        seg.classList.add('progress-segment');
        if (i === 0) seg.classList.add('active');
        progressBar.appendChild(seg);
    });

    function updateProgressBar(index) {
        const segments = document.querySelectorAll('.progress-segment');
        segments.forEach((seg, i) => {
            seg.classList.toggle('active', i === index);
        });
    }

    function showPanel(index) {
        storyImage.src = images[index];
        caption.textContent = captions[index];
        updateProgressBar(index);
    }

    // Navigation: links/rechts tippen
    storyContainer.addEventListener('click', (e) => {
        const rect = storyContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) {
            // links: zurück
            current = (current - 1 + images.length) % images.length;
        } else {
            // rechts: weiter
            current = (current + 1) % images.length;
        }
        showPanel(current);
    });

    showPanel(current);
});
