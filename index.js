window.addEventListener('DOMContentLoaded', () => {
    const images = [
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-1.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-2...png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-3.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-4.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-5.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-6 (nochmal verändern).png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-7.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-8.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-9.2.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-9.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-10.2.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-10.3.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-11..png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-12.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-13.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-14.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-15.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-16.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-17.png',
        'https://hbk-bs.github.io/a-generative-graphic-novel-team-anna-luca-pauline/tools/bild-18.png',
    ];
    const captions = images.map(() => '');

    let current = 0;
    let timer = null;
    const storyImage = document.getElementById('story-image');
    const caption = document.getElementById('caption');
    const storyContainer = document.getElementById('story-container');
    const progressBar = document.getElementById('progress-bar');
    const profilePage = document.getElementById('profile-page');
    const storyPage = document.getElementById('story-page');
    const storyBubble = document.getElementById('story-bubble');

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
            storyPage.style.display = 'none';
            profilePage.style.display = 'block';
            current = 0; // Story zurücksetzen
        }
    }

    function startTimer() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            nextPanel();
        }, 5000);
        animateProgressBar(current, 5000);
    }

    let touchFired = false;

    storyContainer.addEventListener('click', (e) => {
        // Click nach Touch ignorieren!
        if (touchFired) {
            touchFired = false;
            return;
        }
        if ('ontouchstart' in window) return;
        if (timer) clearTimeout(timer);

        let x = e.clientX;
        const rect = storyContainer.getBoundingClientRect();
        const clickX = x - rect.left;

        if (clickX > rect.width / 2) {
            nextPanel();
        } else {
            if (current > 0) {
                current--;
                showPanel(current);
                startTimer();
            } else {
                showPanel(current);
                startTimer();
            }
        }
    });

    storyContainer.addEventListener('touchstart', (e) => {
        touchFired = true;
        e.preventDefault(); // Verhindert zusätzliches click-Event!
        if (timer) clearTimeout(timer);

        let x = e.touches[0].clientX;
        const rect = storyContainer.getBoundingClientRect();
        const clickX = x - rect.left;

        if (clickX > rect.width / 2) {
            nextPanel();
        } else {
            if (current > 0) {
                current--;
                showPanel(current);
                startTimer();
            } else {
                showPanel(current);
                startTimer();
            }
        }
    });

    // Story von vorne starten, wenn man erneut auf die Story-Kugel klickt
    storyBubble.onclick = function () {
        profilePage.style.display = 'none';
        storyPage.style.display = 'flex';
        current = 0;
        showPanel(current);
        startTimer();
    };

    // Initial anzeigen
    showPanel(current);
    startTimer();
});
