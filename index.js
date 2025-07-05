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
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/bild-18a.png'
    ];
    const captions = images.map(() => '');

    let current = 0;
    let timer = null;
    const storyImage = document.getElementById('story-image');
    const caption = document.getElementById('caption');
    const storyContainer = document.getElementById('story-container');
    const progressBar = document.getElementById('progress-bar');

    function renderProgressBar(index) {
        progressBar.innerHTML = '';
        images.forEach((_, i) => {
            const seg = document.createElement('div');
            seg.classList.add('progress-segment');
            if (i < index) {
                seg.classList.add('active');
                seg.style.background = '#fff';
            } else if (i === index) {
                seg.classList.add('active');
                seg.style.background = 'linear-gradient(90deg, #fff 0%, #fff 0%, rgba(255,255,255,0.3) 0%)';
            }
            progressBar.appendChild(seg);
        });
    }

    function animateProgressBar(index, duration) {
        const segments = document.querySelectorAll('.progress-segment');
        if (segments[index]) {
            segments[index].style.background = 'linear-gradient(90deg, #fff 0%, #fff 0%, rgba(255,255,255,0.3) 0%)';
            let start = null;
            function step(ts) {
                if (!start) start = ts;
                let progress = Math.min((ts - start) / duration, 1);
                segments[index].style.background = `linear-gradient(90deg, #fff ${progress*100}%, rgba(255,255,255,0.3) ${progress*100}%)`;
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);
        }
    }

    function showPanel(index) {
        storyImage.src = images[index];
        caption.textContent = captions[index];
        renderProgressBar(index);
        animateProgressBar(index, 5000);
    }

    function nextPanel() {
        if (current < images.length - 1) {
            current++;
            showPanel(current);
            startTimer();
        } else {
            // Zurück zur Hauptseite, wenn alle Bilder durch sind
            document.getElementById('story-page').style.display = 'none';
            document.getElementById('profile-page').style.display = 'block';
        }
    }

    function startTimer() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            nextPanel();
        }, 5000);
        animateProgressBar(current, 5000);
    }

    storyContainer.addEventListener('click', () => {
        nextPanel();
    });

    // Initial anzeigen
    showPanel(current);
    startTimer();
});
