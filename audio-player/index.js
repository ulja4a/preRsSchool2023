const audioPlay = document.querySelector('.play-pause');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');
const cover = document.querySelector('.cover_background');
const nameTrack = document.querySelector('.name-track');
const trackList = document.querySelectorAll('.play-item');

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
  },
  {
    url: 'http://127.0.0.1:5500/audio-player/assets/audio/shampanskoch.mp3',
    name: "Шампанські очі",
    autor: 'Скрябін',
    cover: 'http://127.0.0.1:5500/audio-player/assets/img/shampanskochi.jpg'
  }
]


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
    isPlay = false;
    playAudio();
    trackActiveClass();
}

buttonNext.addEventListener('click', () => {
  playNext();
  changeBackground();
  changeName()
})

function playPrev() {
  if (playNum > 0) {
    playNum--;
  } else {
    playNum = playList.length - 1;
  }
  isPlay = false;
  playAudio();
  trackActiveClass();
}

buttonPrev.addEventListener('click', () => {
  playPrev();
  changeBackground();
  changeName()
})

function changeBackground() {
  let currentCover = playList[playNum].cover;
  document.body.style.backgroundImage = `url(${currentCover})`;
  cover.style.backgroundImage = `url(${currentCover})`;
}

function changeName() {
  let currentAutor = playList[playNum].autor;
  let currentName = playList[playNum].name;
  nameTrack.textContent = `${currentAutor} - ${currentName}`;
}

function trackActiveClass() {
  trackList.forEach((track) => {
    track.classList.remove('active');
    trackList[playNum].classList.add('active');
  })
}