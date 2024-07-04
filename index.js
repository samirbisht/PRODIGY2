const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const CentiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];

let isPlay = false;
let secCounter = 0;
let sec;
let min;
let minCounter = 0;
let centiSec;
let centiCounter = 0;
let isReset = false;
let lapItem=0;

const toggleButton = () => {
  lapButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");
}

const play = () => {
  if (!isPlay && !isReset) {
    playButton.innerHTML = 'Pause';
    min = setInterval(() => {
      if (secCounter === 60) {
        secCounter = 0;
      }
      minute.innerHTML = `${++minCounter} :`;
    }, 60 * 1000);
    sec = setInterval(() => {
      if (secCounter === 60) {
        secCounter = 0;
      }
      second.innerHTML = `&nbsp;${++secCounter} : `;
    }, 1000);
    centiSec = setInterval(() => {
      if (centiCounter === 100) {
        centiCounter = 0;
      }
      CentiSecond.innerHTML = `${++centiCounter}`;
    }, 10);
    isPlay = true;
    isReset=true;
  }
  else {
    playButton.innerHTML = 'Play';
    clearInterval(sec);
    clearInterval(min);
    clearInterval(centiSec);
    isPlay = false;
    isReset = false;
  }
  toggleButton();
}



const reset = () => {
  isReset = true;
  play();
  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  second.innerHTML = '0 :';
  CentiSecond.innerHTML = '0 ';
  minute.innerHTML = '0 :';
}

const lap=()=>{
  const li=document.createElement("li");
  const number =document.createElement("span");
  const timeStamp=document.createElement("span");
  li.setAttribute("class","lap-item");
  number.setAttribute("class","number");
  timeStamp.setAttribute("class","time-stamp");
  
  number.innerText=`#${++lapItem}`;

  timeStamp.innerHTML=`${minCounter} : ${secCounter} : ${centiCounter}`;
  li.append(number,timeStamp);
  laps.append(li);
}

const clearAll=()=>{
  laps.innerHTML='';
  laps.append(clearButton); 
}
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click",clearAll);