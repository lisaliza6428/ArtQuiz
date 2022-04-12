import question from './question-page';
import { localStorageUtil } from './localStorage';
import { GENRES, QUESTIONS_COUNT } from './consts';
import { getRoundData } from './functions';

class ScorePage {
  async render() {
    const typeOfQuiz = localStorageUtil.getQuizType();
    const responce = await this.generateCardsBlock();
    const quiz = `${'<'} ${typeOfQuiz.toUpperCase()[0] + typeOfQuiz.slice(1)} quiz`;
    const score = `${GENRES[question.categoryIndex]} ${responce.score}/${QUESTIONS_COUNT}`;
    document.querySelector('.container').innerHTML = `
      <div class="header">
        <img class="header__logo" src="assets/svg/logo.svg" alt="Logo">
        <a href="#/categories" class="header__home-link">${quiz}</a>
        <span href="#"class="header__categories">Score</span>
      </div>
      <h3 class="score-title">${score}</h3>
      <div class="results-container">
        ${responce.cardsBlock}
      </div>`;
    document.querySelector('.results-container').addEventListener('click', (e) => {
      const picture = e.target.closest('.picture');
      if (picture) {
        picture.lastElementChild.classList.toggle('none');
      }
    });
  }

  async generateCardsBlock() {
    const data = await getRoundData(question.categoryIndex);
    const arr = localStorageUtil.getAnswersArray();
    let cardsBlock = '';
    let card = '';
    let score = 0;
    for (let i = 0; i < QUESTIONS_COUNT; i += 1) {
      score += +arr[data[i].imageNum];
      let grey = 'grey';
      if (arr[data[i].imageNum] === '1') grey = '';
      card = `
        <div class="picture">
          <img class="picture__img ${grey}" src="/assets/img/${data[i].imageNum}.webp" alt="Picture">
          <div class="picture__description none">
            <p>${data[i].authorEN}</p>
            <p>${data[i].nameEN}</p>
            <p>${data[i].year}</p>
          </div>
        </div>`;
      cardsBlock += card;
    }
    return { score, cardsBlock };
  }
}
const scorePage = new ScorePage();
export default scorePage;
