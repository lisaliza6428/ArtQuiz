import './question-page.scss';
import { QUESTIONS_COUNT } from '../consts';
import { localStorageUtil } from '../localStorage';
import {
  shuffleArray, getRandomNumber, getData, getRoundData,
} from '../functions';
import { sounds } from '../sounds';

class Question {
  categoryIndex = 0;

  currentQustionIndex = 0;

  correctAnswerCount = 0;

  typeOfQuiz;

  timer;

  roundData;

  currentTimer;

  currentTimerAnimation;

  async render() {
    this.typeOfQuiz = localStorageUtil.getQuizType();
    this.timer = localStorageUtil.getSettings().timer;
    this.roundData = await getRoundData(this.categoryIndex);

    document.querySelector('.container').innerHTML = `
      <div class="question-page">
          <div class="question-page__top">
            <a class="question-page__close" href="#/categories">
              <img class="question-page__close-img" src="/assets/svg/close.svg" alt="">
            </a>
            ${this.insertTimerHTML()}
          </div>
          <p class="question" id="question"></p>
          <div class="picture-container"></div>
          <div class="question-dots">
            ${'<span class="question-dots__dot"></span>'.repeat(QUESTIONS_COUNT)}
          </div>
          <div class="question-answers"></div>
      </div>`;

    document.querySelector('.question-page__close').addEventListener('click', () => {
      if (this.timer) {
        clearInterval(this.currentTimer);
        clearInterval(this.currentTimerAnimation);
      }
    });

    if (this.typeOfQuiz === 'artists') {
      await this.generateArtistsQuestion();
    } else {
      await this.generatePicturesQuestion();
    }
  }

  insertTimerHTML() {
    if (this.timer) {
      return `
      <div class="timer">
          <div class="timer__line"></div>
          <div class="timer__line timer__line--colored" id="line" ></div>
      </div>
      <span class="time" id="time"></span>`;
    }
    return '';
  }

  async generateArtistsQuestion() {
    const image = new Image();
    image.src = `/assets/img/${this.roundData[this.currentQustionIndex].imageNum}.webp`;
    image.onload = async () => {
      document.getElementById('question').innerText = 'Who is the author of this picture?';
      document.querySelector('.picture-container').classList.add('question-picture-wrapper');
      document.querySelector('.question-picture-wrapper').innerHTML = `<img class="question-picture" src="/assets/img/${this.roundData[this.currentQustionIndex].imageNum}.webp" alt="picture">`;

      document.querySelector('.question-answers').addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains('correct')) {
          this.correctAnswerActions();
          e.target.classList.add('correct-answer');
        }
        if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('correct')) {
          this.wrongAnswerActions();
          e.target.classList.add('wrong-answer');
        }
      });
      document.querySelector('.question-answers').innerHTML = await this.getVariants(this.roundData[this.currentQustionIndex].authorEN);
    };

    this.checkTimer();
  }

  async generatePicturesQuestion() {
    document.getElementById('question').innerHTML = `<div>Which is <span class = "colored">${this.roundData[this.currentQustionIndex].authorEN}</span> picture?</div>`;
    document.querySelector('.picture-container').classList.add('pictures-container');
    const picturesContainer = document.querySelector('.pictures-container');
    const wrongAnswers = await
    this.generateWrongVariants(this.roundData[this.currentQustionIndex].imageNum);
    const arraySRC = [
      `/assets/img/${this.roundData[this.currentQustionIndex].imageNum}.webp`,
      `/assets/img/${wrongAnswers[0]}.webp`,
      `/assets/img/${wrongAnswers[1]}.webp`,
      `/assets/img/${wrongAnswers[2]}.webp`,
    ];
    const arrayAnswers = [];
    arraySRC.forEach((src) => {
      let correctClass = '';
      if (src === `/assets/img/${this.roundData[this.currentQustionIndex].imageNum}.webp`) {
        correctClass = 'correct';
      }
      arrayAnswers.push(`
    <div class="image-wrapper ${correctClass}">
      <img class="image-wrapper__picture" src="${src}" alt="picture">
      <div class="image-wrapper__bg"></div>
    </div>`);
    });

    let counter = arraySRC.length;

    const checkLoaded = async () => {
      counter -= 1;
      if (counter === 0) {
        picturesContainer.innerHTML = shuffleArray(arrayAnswers).join('');

        picturesContainer.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          if (e.target.classList.contains('image-wrapper') && e.target.classList.contains('correct')) {
            this.correctAnswerActions();
            e.target.querySelector('.image-wrapper__bg').classList.add('correct-answer');
          }
          if (e.target.classList.contains('image-wrapper') && !e.target.classList.contains('correct')) {
            this.wrongAnswerActions();
            e.target.querySelector('.image-wrapper__bg').classList.add('wrong-answer');
          }
        });
      }
    };

    arraySRC.forEach((src) => {
      const image = new Image();
      image.src = src;
      image.onload = checkLoaded;
    });
    this.checkTimer();
  }

  correctAnswerActions() {
    clearInterval(this.currentTimer);
    clearInterval(this.currentTimerAnimation);
    sounds.correctAnswer();
    this.updateAnswersArray('1');
    this.correctAnswerCount += 1;
    this.showAnswer('correct');
    document.querySelectorAll('.question-dots__dot')[this.currentQustionIndex].classList.add('correct');
  }

  wrongAnswerActions() {
    clearInterval(this.currentTimer);
    clearInterval(this.currentTimerAnimation);
    sounds.wrongAnswer();
    this.updateAnswersArray('0');
    this.showAnswer('wrong');
    document.querySelectorAll('.question-dots__dot')[this.currentQustionIndex].classList.add('wrong');
  }

  updateAnswersArray(answer) {
    const arr = localStorageUtil.getAnswersArray();
    arr[this.roundData[this.currentQustionIndex].imageNum] = `${answer}`;
    localStorageUtil.setAnswersArray(arr);
  }

  showAnswer(answer) {
    const html = `
    <div class="popup">
      <div class="popup-wrapper">
      <div class="popup-image">
          <img class="popup-image__picture" src="/assets/img/${this.roundData[this.currentQustionIndex].imageNum}.webp" alt="">
          <img class="popup-image__icon" src="/assets/svg/${answer}-answer.svg" alt="">
      </div> 
      <div class="picture-name">${this.roundData[this.currentQustionIndex].nameEN}</div>
      <div class="picture-info">${this.roundData[this.currentQustionIndex].authorEN}, ${this.roundData[this.currentQustionIndex].year}</div>
      <button class="button next" id="next-button">Next</button>
    </div>`;

    const image = new Image();
    image.src = `/assets/img/${this.roundData[this.currentQustionIndex].imageNum}.webp`;
    image.onload = () => {
      document.querySelector('.modal').innerHTML = html;
      document.getElementById('next-button').addEventListener('click', () => {
        if (this.currentQustionIndex < (QUESTIONS_COUNT - 1)) {
          this.currentQustionIndex += 1;
          document.querySelector('.modal').innerHTML = '';
          if (this.typeOfQuiz === 'artists') {
            this.generateArtistsQuestion();
          } else {
            this.generatePicturesQuestion();
          }
        } else {
          this.finishRound();
        }
      });
    };
  }

  finishRound() {
    sounds.finishRound();
    const img = new Image();
    img.src = '/assets/svg/finish_round_cup.svg';
    img.onload = () => {
      document.querySelector('.modal').innerHTML = `
      <div class="popup">
        <div class="popup-wrapper">
          <div class="finish">
          <img class="finish__image" src="/assets/svg/finish_round_cup.svg" width ="166" alt="">
          <div class="finish__text">Congratulations!</div>
          <div class="finish__score">${this.correctAnswerCount}/${QUESTIONS_COUNT}</div>
          <div class="finish__wrapper">
            <a class="finish__button" href="#/" >Home</a>
            <a class="finish__button" href="#/categories">Next Quiz</a>
          </div>
        </div>
      </div>`;
      this.currentQustionIndex = 0;
      this.correctAnswerCount = 0;
    };
  }

  async getVariants(correct) {
    const wrongAnswers = await this.generateWrongVariants(correct);
    const array = [
      `<button class="button answer correct">${correct}</button>`,
      `<button class="button answer">${wrongAnswers[0]}</button>`,
      `<button class="button answer">${wrongAnswers[1]}</button>`,
      `<button class="button answer">${wrongAnswers[2]}</button>`,
    ];
    return shuffleArray(array).join('');
  }

  async generateWrongVariants(correct) {
    const data = await getData();
    const dataLength = data.length - 1;
    const wrongVariants = [...new Set([])];
    const wrongVariantsCount = 3;
    while (wrongVariants.length !== wrongVariantsCount) {
      let variant;
      if (this.typeOfQuiz === 'artists') {
        variant = data[getRandomNumber(0, dataLength)].authorEN;
      } else {
        variant = getRandomNumber(0, dataLength);
      }
      if (variant !== correct) {
        wrongVariants.push(variant);
      }
    }
    return wrongVariants;
  }

  checkTimer() {
    const isTimer = localStorageUtil.getSettings().timer;
    if (isTimer) {
      const time = +localStorageUtil.getSettings().timervalue;
      this.startTimer(time, this.currentQustionIndex);
    }
  }

  timeIsOver() {
    sounds.wrongAnswer();
    this.updateAnswersArray('0');
    this.showAnswer(this.roundData, 'wrong');
    document.querySelectorAll('.question-dots__dot')[this.currentQustionIndex].classList.add('wrong');
  }

  progressAnimation(time) {
    const line = document.getElementById('line');
    let width = 1;
    function frame() {
      if (width >= 100) {
        clearInterval(this.currentTimerAnimation);
      } else {
        width += 1;
        line.style.width = `${width}%`;
      }
    }
    this.currentTimerAnimation = setInterval(frame, time * 10);
  }

  startTimer(t) {
    let time = t;
    const timeField = document.getElementById('time');
    timeField.textContent = `00:${time}`;
    this.progressAnimation(time);
    const timer = () => {
      time -= 1;
      if (time <= 0) {
        clearInterval(this.currentTimer);
        timeField.textContent = '00:00';
        this.timeIsOver();
      } else if (time <= 9) {
        timeField.textContent = `00:0${time}`;
      } else {
        timeField.textContent = `00:${time}`;
      }
    };
    this.currentTimer = setInterval(timer, 1000);
  }
}

const question = new Question();

export default question;
