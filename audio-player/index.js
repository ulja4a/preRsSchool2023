const audioPlay = document.querySelector('.play-pause');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');

const playList = [
  {
    url: 'http://127.0.0.1:5500/audio-player/assets/audio/Earth_Wind_Fire_-_Boogie_Wonderland_48181877.mp3',
    name: 'Boogie Wonderland',
    autor: 'Earth, Wind & Fire',
    cover: 'http://127.0.0.1:5500/audio-player/assets/img/earth_wind_fire_boogie_wonderland.jpg'
  },
  {
    url: 'http://127.0.0.1:5500/audio-player/assets/audio/behappy.mp3',
    name: "Don't Worry Be Happy",
    autor: 'Bobby McFerrin',
    cover: 'http://127.0.0.1:5500/audio-player/assets/img/behappy.jpg'
  }
]

function changeBackground() {
  document.body.style.backgroundImage = 'url("./assets/img/earth_wind_fire_boogie_wonderland.jpg")';
}
changeBackground();

let audio = new Audio();
let isPlay = false;
let playNum = 0;



function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].url;
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

function playNext() {
  if (playNum < playList.length - 1) {
    playNum++;
  } else {
    playNum = 0;
  }
  if (isPlay) {
    playAudio();
  }
  console.log(playNum);
}

buttonNext.addEventListener('click', () => {
  playNext();
})

function playPrev() {
  if (playNum > 0) {
    playNum--;
  } else {
    playNum = playList.length - 1;
  }
  if (isPlay) {
    playAudio();
  }
  console.log(playNum);
}

buttonPrev.addEventListener('click', () => {
  playPrev();
})

