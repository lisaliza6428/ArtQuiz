/* eslint-disable no-unused-expressions */
import { QUESTIONS_COUNT } from './consts';
import { localStorageUtil } from './localStorage';
import {
  shuffleArray, getRandomNumber, getData, getRoundData,
} from './functions';
import { sounds } from './sounds';

class Question {
  categoryIndex = 0;

  currentQustionIndex = 0;

  correctAnswerCount = 0;

  typeOfQuiz;

  timer = localStorageUtil.getSettings().timer;

  async render() {
    let timer = '';
    if (this.timer) {
      timer = `
      <div class="question-page__time-line">
          <div class="time-line"></div>
          <div id="line" class="time-line_red"></div>
      </div>
      <div class="question-page__timer"><span id="time" class="time">00:10</span></div>`;
    }
    let container = '';
    let block = '';
    let generateQuestion;
    this.typeOfQuiz = localStorageUtil.getQuizType();
    if (this.typeOfQuiz === 'artists') {
      container = 'question-picture-wrapper';
      block = '<div class="question-answers"></div>';
      generateQuestion = this.generateArtistsQuestion();
    } else {
      container = 'pictures-container';
      generateQuestion = this.generatePicturesQuestion();
    }

    document.querySelector('.container').innerHTML = `
      <div class="question-page">
          <div class="question-page__top">
            <a href="#/categories"><img class="question-page__close" src="/assets/svg/close.svg" alt=""></a>
            ${timer}
          </div>
          <p id="question" class="question"></p>
          <div class="${container}"></div>
          <div class="question-dots">
            ${'<span class="question-dots__dot"></span>'.repeat(QUESTIONS_COUNT)}
          </div>
          ${block}
      </div>`;
    await generateQuestion;
  }

  async generateArtistsQuestion() {
    const data = await getRoundData(this.categoryIndex);
    const image = new Image();
    image.src = `/assets/img/${data[this.currentQustionIndex].imageNum}.webp`;

    image.onload = () => {
      document.getElementById('question').innerText = 'Who is the author of this picture?';
      document.querySelector('.question-picture-wrapper').innerHTML = `<img class="question-picture" src="/assets/img/${data[this.currentQustionIndex].imageNum}.webp" alt="picture">`;
    };

    document.querySelector('.question-answers').addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.classList.contains('correct')) {
        sounds.correctAnswer();
        this.updateAnswersArray('1', data);
        this.correctAnswerCount += 1;
        e.target.classList.add('correct-answer');
        document.querySelectorAll('.question-dots__dot')[this.currentQustionIndex].classList.add('correct');
        this.showAnswer(data, 'correct');
      } else {
        sounds.wrongAnswer();
        this.updateAnswersArray('0', data);
        this.showAnswer(data, 'wrong');
        e.target.classList.add('wrong-answer');
        document.querySelectorAll('.question-dots__dot')[this.currentQustionIndex].classList.add('wrong');
      }
    }, { once: true });

    document.querySelector('.question-answers').innerHTML = await this.getVariants(data[this.currentQustionIndex].authorEN);
  }

  async generatePicturesQuestion() {
    const data = await getRoundData(this.categoryIndex);
    document.getElementById('question').innerHTML = `<div>Which is <span class = "colored">${data[this.currentQustionIndex].authorEN}</span> picture?</div>`;
    const picturesContainer = document.querySelector('.pictures-container');
    const wrongAnswers = await
    this.generateWrongVariants(data[this.currentQustionIndex].imageNum);
    const arrayAnswers = [
      `<div class="image-wrapper correct">
        <img class="image-wrapper__picture" src="/assets/img/${data[this.currentQustionIndex].imageNum}.webp" alt="">
        <div class="image-wrapper__bg"></div>
      </div>`,
      `<div class="image-wrapper">
        <img class="image-wrapper__picture" src="/assets/img/${wrongAnswers[0]}.webp" alt="">
        <div class="image-wrapper__bg"></div>
      </div>`,
      `<div class="image-wrapper">
        <img class="image-wrapper__picture" src="/assets/img/${wrongAnswers[1]}.webp" alt="">
        <div class="image-wrapper__bg"></div>
      </div>`,
      `<div class="image-wrapper">
          <img class="image-wrapper__picture" src="/assets/img/${wrongAnswers[2]}.webp" alt="">
          <div class="image-wrapper__bg"></div>
      </div>`,
    ];
    picturesContainer.innerHTML = shuffleArray(arrayAnswers).join('');

    picturesContainer.addEventListener('click', (e) => {
      if (e.target.closest('.correct')) {
        sounds.correctAnswer();
        this.updateAnswersArray('1', data);
        this.correctAnswerCount += 1;
        e.target.closest('.image-wrapper__bg').classList.add('correct-answer');
        document.querySelectorAll('.question-dots__dot')[this.currentQustionIndex].classList.add('correct');
        this.showAnswer(data, 'correct');
      } else {
        sounds.wrongAnswer();
        this.updateAnswersArray('0', data);
        this.showAnswer(data, 'wrong');
        e.target.closest('.image-wrapper__bg').classList.add('wrong-answer');
        document.querySelectorAll('.question-dots__dot')[this.currentQustionIndex].classList.add('wrong');
      }
    }, { once: true });
  }

  updateAnswersArray(answer, data) {
    const arr = localStorageUtil.getAnswersArray();
    arr[data[this.currentQustionIndex].imageNum] = `${answer}`;
    localStorageUtil.setAnswersArray(arr);
  }

  showAnswer(data, param) {
    const modalContainer = document.querySelector('.modal');
    const html = `
    <div class="modal-window">
      <div class="modal-content">
      <div class="modal-image">
          <img class="modal-image__picture" src="/assets/img/${data[this.currentQustionIndex].imageNum}.webp" alt="">
          <img class="modal-image__icon" src="/assets/svg/${param}-answer.svg" alt="">
      </div> 
      <div class="picture-name">${data[this.currentQustionIndex].nameEN}</div>
      <div class="picture-info">${data[this.currentQustionIndex].authorEN}, ${data[this.currentQustionIndex].year}</div>
      <button id="next" class="button next">Next</button>
    </div>`;
    modalContainer.innerHTML = html;
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', () => {
      if (this.currentQustionIndex < 9) {
        this.currentQustionIndex += 1;
        modalContainer.innerHTML = '';
        if (this.typeOfQuiz === 'artists') {
          this.generateArtistsQuestion();
        } else {
          this.generatePicturesQuestion();
        }
      } else {
        sounds.finishRound();
        modalContainer.innerHTML = `
        <div class="modal-window">
          <div class="modal-content">
            <div class="modal_round_results">
            <img class="cup" src="/assets/svg/finish_round_cup.svg" width ="166" alt="">
            <div class="congratulations">Congratulations!</div>
            <div class="results">${this.correctAnswerCount}/${QUESTIONS_COUNT}!</div>
            <div class="results_buttons_wrapper">
                <a href="#/" class="results_button">Home</a>
                <a href="#/categories" class="results_button">Next Quiz</a>
            </div>
          </div>
        </div>`;
        this.currentQustionIndex = 0;
        this.correctAnswerCount = 0;
      }
    });
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
}
const question = new Question();

export default question;
