const audioPlay = document.querySelector('.play-pause');
const playListPlayPause = document.querySelectorAll('.play-pause_list');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');
const cover = document.querySelector('.cover_background');
const nameTrack = document.querySelector('.name-track');
const trackList = document.querySelectorAll('.play-item');
const lengthSoundTrack = document.querySelector('.sound-time');
const currentTimeSoundTrack = document.querySelector('.current-time');
const progressLine = document.querySelector('.progress-bar');
const volumeLine = document.querySelector('.volume-bar');

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

//Загрузка всех треков
const audioContainer = document.createElement('div');
playList.forEach((track, index) => {
  const audio = document.createElement('audio');
  audio.preload = 'auto';
  audio.src = track.url;
  audio.id = `audio${index + 1}`;
  audioContainer.appendChild(audio);
});
document.body.appendChild(audioContainer);


let audio = new Audio();
let isPlay = false;
let playNum = 0;
const audioFirst = document.getElementById('audio1');


function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].url;
    //audio.currentTime = 0;
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
  trackActiveClass();
});



function playNext() {
  if (playNum < playList.length - 1) {
    playNum++;
  } else {
    playNum = 0;
  }
    isPlay = false;
    audio.currentTime = 0;
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

trackList.forEach((track, index) => {
  track.addEventListener('click', () => {
    const clickedIndex = Array.from(trackList).indexOf(track);
    console.log('Индекс элемента:', clickedIndex);
    playNum = clickedIndex;
    playAudio();
    trackActiveClass();
    changeBackground();
    changeName()
  });
});

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
  playListPlayPause.forEach(() => {
    playListPlayPause[playNum].classList.toggle('play-btn');
    playListPlayPause[playNum].classList.toggle('pause-btn');
  })
}

//Вычисление длины треков
audio.addEventListener('loadedmetadata', () => {
  let trackLength = audio.duration;
  let minutes = Math.floor(trackLength / 60);
  let seconds = Math.floor(trackLength % 60);
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(seconds).padStart(2, '0');
  let lengthTrack = `${formattedMinutes}:${formattedSeconds}`;
  lengthSoundTrack.textContent = lengthTrack;
});
//----------------------------------------------------------------------------------------------

//Вычисление текущего времени трека
audio.addEventListener('timeupdate', () => {
  let currentTime = audio.currentTime;
  console.log(currentTime);
  let duration = audio.duration;
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(seconds).padStart(2, '0');
  let currentTimeTrack = `${formattedMinutes}:${formattedSeconds}`;
  currentTimeSoundTrack.textContent = currentTimeTrack;
  let progressPercentage = (currentTime / audio.duration) * 100;
  progressLine.value = progressPercentage;
  progressLine.style.background = `linear-gradient(to right, #dbdb34 0%, #dbdb34 ${progressPercentage}%, #fff ${progressPercentage}%, white 100%)`;
});
//---------------------------------------------------------------------------------------------

//Клик по прогресслайн
progressLine.addEventListener('click', (e) => {
  console.log(2);
  let progressLineWidth = progressLine.offsetWidth;
  console.log(progressLineWidth);
  let timeToSeek = e.offsetX / parseInt(progressLineWidth) * (audio.duration || audioFirst.duration);
  console.log(55);
  console.log(timeToSeek);
  audio.currentTime = timeToSeek;
});

progressLine.addEventListener('input', (event) => {
  let progressPercentage = event.target.value;
  let duration = audio.duration || audioFirst.duration;
  console.log(duration)
  let currentTime = (progressPercentage / 100) * duration;
  console.log(currentTime);
  audio.currentTime = currentTime;
  event.target.style.background = 
  `linear-gradient(to right, #dbdb34 0%, #dbdb34 ${progressPercentage}%, #fff ${progressPercentage}%, white 100%)`
})
//--------------------------------------------------------------------------------------

//Клик по звуклайн
volumeLine.addEventListener('click', (e) => {
  let volumeLineWidth = volumeLine.offsetWidth;
  console.log(volumeLineWidth);
  let newVolume = e.offsetX / volumeLineWidth;
  audio.volume = newVolume;
});

volumeLine.addEventListener('input', (event) => {
  let progressPercentage = event.target.value;
  event.target.style.background = 
  `linear-gradient(to right, #dbdb34 0%, #dbdb34 ${progressPercentage}%, #fff ${progressPercentage}%, white 100%)`
})
//--------------------------------------------------------------------------------------