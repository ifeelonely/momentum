'use strict'
// Variables ============

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const text = document.querySelector('.clock__text');
const clockTitle = document.querySelector('.clock__title');
const body = document.querySelector('body');
const sliderButtons = document.querySelector('.slider__buttons');
const weather = document.querySelector('.weather');
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather__description');
const weatherForm = document.querySelector('.weather__form');
const refreshQuoteBtn = document.querySelector('.refresh__quote');
const quoteSpan = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const audio__player = document.querySelector('audio__player');
const playBtn = document.querySelector('.play');
const prevTrackBtn = document.querySelector('.prev__track')
const nextTrackBtn = document.querySelector('.next__track')
const audio = document.querySelector('audio');
const trackList = document.querySelector('.play__list');
let isPlay = false;
let randomNum = randomNumber();
let curTrack = 0;



// Functions ============
// Clock ++++++++++++++++
function showTime() {
    clockTitle.textContent = `Good ${dayTime()}`;
    time.textContent = new Date().toLocaleTimeString();
    date.textContent = new Intl.DateTimeFormat('en-US', {day: 'numeric',
    weekday: "long", month: 'long'}).format(new Date());
};

//Get time of the day
function dayTime() {
    const hour = +(new Date().getHours());
    return (
      hour >= 12 && hour < 18 ? 'afternoon' 
    : hour < 12 && hour > 6  ? 'morning' 
    : hour > 0 && hour < 6 ? 'night' 
    : 'evening'
    )
};

// Get random number 
function randomNumber() {
  return (Math.trunc(Math.random() * 20 + 1) + '').padStart(2, '0');
};

//Set background
function setBg(randomNum) {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${dayTime()}/${randomNum}.jpg`;
  img.addEventListener('load', (e) => {
    body.style.backgroundImage = `url(${img.src})`;
  })
};


//slider
function nextSlide() {
  if(+randomNum == 20) {
    randomNum = '01';
    return;
  }
  randomNum = (+randomNum + 1 + '').padStart(2, '0');
};

function prevSlide() {
  if(+randomNum == 1) {
    randomNum = '20';
    return;
  }
  randomNum = (+randomNum - 1 + '').padStart(2, '0');
};

function clock() {
  showTime();
  setInterval(showTime, 1000);
};

// Weather ++++++++++++++++
async function getWeather(city = 'Москва') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=a9d890906e88850294715088ecdd2188&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  const iconClass = `weather__icon owf owf-`;

  weatherIcon.className = `${iconClass}${data.weather[0].id}`;
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);
};


// Random quotes ++++++++++++++++
function getRandomQuote() {
  // const request = new XMLHttpRequest();
  // request.open('GET', `https://api.gameofthronesquotes.xyz/v1/random`);
  // request.send();

  // request.addEventListener('load', function() {
  //   const data = JSON.parse(request.responseText);
  //   quoteSpan.textContent = `"${data.sentence}"`;
  //   quoteAuthor.textContent = data.character.name;
  // });
  const url = `https://api.gameofthronesquotes.xyz/v1/random`;
  const request = fetch(url)
  .then(response => response.json())
  .then(data => {
    quoteSpan.textContent = `"${data.sentence}"`;
    quoteAuthor.textContent = data.character.name;
  })
};

function refreshQuote() {
  refreshQuoteBtn.addEventListener('click', function() {
    getRandomQuote();
  })
};

// Audio-player
// const audio__player = document.querySelector('audio__player');
// const playBtn = document.querySelector('.play');
// const prevTrackBtn = document.querySelector('.prev__track')
// const nextTrackBtn = document.querySelector('.next__track')
// const audio = document.querySelector('audio');

function setPlayList() {
  const html = `
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  `;
  trackList.insertAdjacentHTML('beforeend', html);
};

function playStop() {  
  const src = playList[curTrack].src;
 
  if(playBtn.classList.contains('fa-circle-stop')) {
    audio.pause();
    playBtn.classList.toggle('fa-circle-stop');
    isPlay = false;
  }
  else {
    isPlay = true;
    playBtn.classList.toggle('fa-circle-stop');
    audio.src = src;
    audio.currentTime = 0;
    audio.play().then(function(){}).catch(err => console.error(err));
  }
};

function nextTrack() {
  if(isPlay && curTrack < playList.length - 1){
    curTrack++;
    audio.src = playList[curTrack].src;
    audio.play();
  }
};

function prevTrack() {
  if(isPlay && curTrack > 0){
    curTrack--;
    audio.src = playList[curTrack].src;
    audio.play();
  }
};

function app() {
  clock();
  setBg(randomNum);
  getWeather();
  getRandomQuote();
  refreshQuote();
};




// Main ============
// Clock
app();



// Listeners ============
sliderButtons.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-arrow-left-long')) {
    prevSlide();
    setBg(randomNum);
  }
    
    if(e.target.classList.contains('fa-arrow-right-long')) {
      nextSlide();
      setBg(randomNum);
    }
});

weatherForm.addEventListener('submit', function(e) {
  e.preventDefault();
  getWeather(city.value)
});

// playBtn.addEventListener('click', playStop);
// nextTrackBtn.addEventListener('click', nextTrack);
// prevTrackBtn.addEventListener('click', prevTrack);
console.log(playList)

