// alert('hello')
const player = document.querySelector('.player');
const playButton = document.querySelector('.btn_play');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressBlock = document.querySelector('.progress_block');
const progress = document.querySelector('.progress');
const titleSound = document.querySelector('.title_sound');
const imgSrc = document.querySelector('.img_src');
const plusTen = document.querySelector('.right');
const minusTen = document.querySelector('.left');
const soundBtn = document.querySelector('.sound_btn')
const soundSrc = document.querySelector('.sound_src')

const songs = ['DavidRawlings', 'Nirvana'];
let songInd = 0;

function loadSong(song) {
  titleSound.innerHTML = song
  audio.src = `audio/${song}.mp3  `
}

loadSong(songs[songInd])

function playSong() {
  player.classList.add('play')
  playButton.style.clipPath = 'polygon(-7px -1px, 48px 0px, 54px 59px, -8px 59px)';
  playButton.style.shapeOutside = 'polygon(-7px -1px, 48px 0px, 54px 59px, -8px 59px)';
  imgSrc.src = 'img/stop.svg'
  audio.play()
}
function stopSong() {
  player.classList.remove('play')
  playButton.style.clipPath = 'polygon(7px 1px, 54px 28px, 54px 28px, 7px 56px)';
  playButton.style.shapeOutside = 'polygon(7px 1px, 54px 28px, 54px 28px, 7px 56px)';
  imgSrc.src = 'img/play.svg'
  audio.pause()
}

playButton.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play')
  isPlaying ? stopSong() : playSong()
})

function nextSong() {
  songInd = songInd + 1

  if (songInd > songs.length - 1) {
    songInd = 0
  }

  loadSong(songs[songInd])
  playSong()
}

next.addEventListener('click', () => {
  nextSong()
});

function prevSong() {
  songInd = songInd - 1

  if (songInd < 0) {
    songInd = songs.length - 1
  }

  loadSong(songs[songInd])
  playSong()
}

prev.addEventListener('click', () => {
  prevSong()
});

function updProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const percentProgressBar = (currentTime / duration) * 100
  progress.style.width = `${percentProgressBar}%`
}

audio.addEventListener('timeupdate', updProgress)

function changeProgress(event) {
  const { duration } = audio;

  const width = this.clientWidth
  const currentWidth = event.offsetX

  audio.currentTime = (currentWidth / width) * duration
  console.log(width);
  console.log(currentWidth);
}

progressBlock.addEventListener('click', changeProgress);

audio.addEventListener('ended', nextSong);

function plus() {
  audio.currentTime = audio.currentTime + 10;
  plusTen.innerHTML = `<svg width="35" height="20" viewBox="0 0 35 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 10L5 18.6603V1.33975L20 10Z" fill="#C4C4C4"/>
  <path d="M35 10L20 18.6603V1.33975L35 10Z" fill="#C4C4C4"/>
  </svg>  
  `
  setTimeout(() => {
    plusTen.innerHTML = ``
  }, 500)
}

plusTen.addEventListener('dblclick', plus)

function minus() {
  audio.currentTime = audio.currentTime - 10;
  minusTen.innerHTML = `<svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 9.00001L15 0.339752V17.6603L0 9.00001Z" fill="#C4C4C4"/>
  <path d="M15 9.00001L30 0.339752V17.6603L15 9.00001Z" fill="#C4C4C4"/>
  </svg>  
  `
  setTimeout(() => {
    minusTen.innerHTML = ``
  }, 500)
}

minusTen.addEventListener('dblclick', minus)

function soundOn() {
  soundBtn.classList.add('on')
  soundSrc.src = 'img/sound.svg'
  audio.muted = false
}

function soundOff() {
  soundBtn.classList.remove('on')
  soundSrc.src = 'img/soundOff.svg'
  audio.muted = true
}

soundBtn.addEventListener('click', () => {
  const isMuted = soundBtn.classList.contains('on')
  isMuted ? soundOff() : soundOn()
})
