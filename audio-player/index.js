const audioPlay = document.querySelector('.play-pause');

function changeBackground() {
  document.body.style.backgroundImage = 'url("./assets/img/earth_wind_fire_boogie_wonderland.jpg")';
}
changeBackground();
let audio = new Audio();
let isPlay = false;

function playAudio() {
  if (!isPlay) {
    audio.src = 'http://127.0.0.1:5500/audio-player/assets/audio/Earth_Wind_Fire_-_Boogie_Wonderland_48181877.mp3';
    audio.currentTime = 0;
    audio.play();
    audioPlay.classList.remove('play-btn');
    audioPlay.classList.add('pause-btn');
  } else {
    audio.pause();
    audioPlay.classList.remove('pause-btn');
    audioPlay.classList.add('play-btn');
  }
  isPlay = !isPlay;
}

audioPlay.addEventListener('click', () => {
  playAudio();
});


