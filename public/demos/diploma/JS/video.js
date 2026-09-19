document.getElementById('videoContainer').addEventListener('click', function() {
    const cover = document.getElementById('videoCover');
    const video = document.getElementById('mainVideo');

    // Если картинка еще показывается (не скрыта)
    if (cover.style.display !== 'none') {
        cover.style.display = 'none';    // Полностью прячем картинку
        video.style.display = 'block';   // Показываем видео
        video.play();                    // Запускаем воспроизведение
    }
});