import { QUESTIONS_COUNT } from './consts';
import { localStorageUtil } from './localStorage';
import { shuffle, getRandomNum, getData } from './functions';

class Question {
  categoryIndex = 0;

  currentQustionIndex = 0;

  typeOfQuiz;

  async render() {
    const data = await this.getRoundData();
    this.typeOfQuiz = localStorageUtil.getQuizType();
    document.querySelector('.container').innerHTML = `
    <div class="question-page">
        <div class="question-page__top">
          <img class="question-page__close" src="/assets/svg/close.svg" alt="">
          <div class="question-page__time-line">
              <div class="time-line"></div>
              <div id="line" class="time-line_red"></div>
          </div>
          <div class="question-page__timer"><span id="time" class="time">00:10</span></div>
        </div>
        <p id="question" class="question">Who is the author of this picture?</p>
        <div class="question-picture-wrapper">
          <img class="question-picture" src="/assets/img/${data[this.currentQustionIndex].imageNum}.webp" alt="">
        </div>
        <div class="question-dots">
            ${'<span class="question-dots__dot"></span>'.repeat(QUESTIONS_COUNT)}
        </div>
        <div class="question-answers">
          ${await this.getVariants(data[this.currentQustionIndex].authorEN)}
        </div>
    </div>`;
  }

  async getVariants(correct) {
    const wrongAnswers = await this.generateWrongVariantsArtists(correct);
    const array = [
      `<button class="button answer correct">${correct}</button>`,
      `<button class="button answer">${wrongAnswers[0]}</button>`,
      `<button class="button answer">${wrongAnswers[1]}</button>`,
      `<button class="button answer">${wrongAnswers[2]}</button>`,
    ];
    const randomAnswers = shuffle(array);
    return randomAnswers.join('');
  }

  async generateWrongVariantsArtists(correct) {
    const data = await getData();
    const dataLength = data.length - 1;
    const wrongVariants = [...new Set([])];
    const wrongVariantsCount = 3;
    while (wrongVariants.length !== wrongVariantsCount) {
      const variant = data[getRandomNum(0, dataLength)].authorEN;
      if (variant !== correct) {
        wrongVariants.push(variant);
      }
    }
    return wrongVariants;
  }

  async getRoundData() {
    let round;
    const data = await getData();
    this.typeOfQuiz = localStorageUtil.getQuizType();
    if (this.typeOfQuiz === 'artists') {
      round = data.slice(
        this.categoryIndex * QUESTIONS_COUNT,
        this.categoryIndex * QUESTIONS_COUNT + QUESTIONS_COUNT,
      );
    } else {
      round = data.slice(
        this.categoryIndex * QUESTIONS_COUNT + 120,
        this.categoryIndex * QUESTIONS_COUNT + QUESTIONS_COUNT + 120,
      );
    }
    console.log(round);
    return round;
  }
}
const question = new Question();

export default question;
