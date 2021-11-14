const dino       = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumpin     = false;
let position     = 0;
let score        = 0;

function handleKeyUp(event) {
  if(event.keyCode === 32) {
    if(!isJumpin) {
      jump();
    }
  }
}

function jump() {
  isJumpin = true;

  let upInterval = setInterval(() => {
    if( position >= 150 ) {
      clearInterval(upInterval);

      // descendo
      let downInterval = setInterval(() => {
        if( position <= 0) {
          clearInterval(downInterval);
          isJumpin = false;
        }
        //position -= 20;
        if(position > 0) {
          position -= 20;
        } else {
          position = 0;
          score += 10;
        }
        dino.style.bottom = position + 'px';
      }, 20);
    } else {
      // subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if(cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // game over
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1 class="game-over">Fim do jogo!</h1><h2 class="game-over">score:${score}</h2>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);

}

createCactus();
document.addEventListener('keypress', handleKeyUp);