const videoContainer = document.getElementById('videoContainer');

const startVideo = () => {
    const cover = document.getElementById('videoCover');
    const video = document.getElementById('mainVideo');

    if (cover.style.display !== 'none') {
        cover.style.display = 'none';
        video.style.display = 'block';

        if (!video.src && video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
        }

        video.play().catch(() => {
            video.controls = true;
        });
    }
};

videoContainer?.addEventListener('click', startVideo);
videoContainer?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startVideo();
    }
});
