import './categories.scss';
import { localStorageUtil } from '../localStorage';
import question from '../question-page/question-page';
import { GENRES, QUESTIONS_COUNT } from '../consts';

class Categories {
  async render() {
    document.querySelector('.modal').innerHTML = '';
    const type = localStorageUtil.getQuizType();
    document.querySelector('.container').innerHTML = `
        <div class="header">
          <img class="header__logo" src="assets/svg/logo.svg" alt="Logo">
          <a class="header__home-link" href="#">Home</a>
          <span class="header__current-page" href="#">Categories</span>
        </div>
        <h3 class="quiz-title">${type[0].toUpperCase() + type.slice(1)} quiz:</h3>
        <div class="categories-container"></div>`;
    await this.renderCategories();
  }

  async renderCategories() {
    const type = localStorageUtil.getQuizType();
    const arr = localStorageUtil.getAnswersArray();
    let start;
    let end;
    if (type === 'artists') {
      start = 0;
      end = 120;
    } else {
      start = 120;
      end = 240;
    }
    let cardIndex = 0;
    const images = [];
    const wrapper = document.createElement('div');
    wrapper.className = 'cards';
    for (start; start < end; start += QUESTIONS_COUNT) {
      const results = arr.slice(start, start + QUESTIONS_COUNT).filter((x) => x === '1').length;
      let none = '';
      if (results === 0) {
        none = 'none';
      }
      const div = document.createElement('div');
      div.classList.add('card');
      div.id = cardIndex;
      div.innerHTML = `
        <div class="card__top">
          <div class="card__category">${GENRES[cardIndex]}</div>
          <a class="card__score ${none}" href="#/score">${results}/${QUESTIONS_COUNT}</a>
        </div>
        <a class="card__box" href="#/question">
            <img class="card__image card__image--grey" src="/assets/img/${start}.webp" alt="Picture">
            <div class="card__label ${none}">
              <img class="card__label-image" src="/assets/svg/again.svg">
              Play again
            </div>
        </a>`;

      images.push(`/assets/img/${start}.webp`);
      wrapper.appendChild(div);
      div.addEventListener('click', (e) => {
        if (e.target.classList.contains('score')) {
          question.categoryIndex = +div.id;
        } else {
          question.categoryIndex = +div.id;
        }
      });
      cardIndex += 1;
    }
    document.querySelector('.categories-container').append(wrapper);
  }
}

const categories = new Categories();
export default categories;
