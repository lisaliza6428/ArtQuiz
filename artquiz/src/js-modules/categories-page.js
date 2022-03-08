import { localStorageUtil } from './localStorage';
import getData from './functions';

class Categories {
  render() {
    const type = localStorageUtil.getQuizType();
    document.querySelector('.container').innerHTML = `
    <a class="settings" href="#/settings"><img  src="/assets/svg/settings.svg" alt="Settings"></a>
  
    <div class="header">
      <img class="header__logo" src="assets/svg/logo.svg" alt="Logo">
      <a href="#/" class="header__home-link">Home</a>
      <span href="#"class="header__categories">Categories</span>
    </div>
    <h3 class="quiz-title">${type[0].toUpperCase() + type.slice(1)} quiz:</h3>
    <div class="categories-container">
    </div>`;
    this.renderCategories();
  }

  async renderCategories() {
    const data = await getData();
    const type = localStorageUtil.getQuizType();
    let start;
    let end;
    if (type === 'artists') {
      start = 0;
      end = 120;
    } else {
      start = 120;
      end = 240;
    }
    for (start; start < end; start += 10) {
      const div = document.createElement('div');
      div.classList.add('category-block');
      div.innerHTML = `<div class="description">
                        <div class="category">Portrait</div>
                        <div class="score">1/10</div>
                      </div>
                      <div class="box-wrapper">
                          <img class="img-category grey" src="/assets/img/${start}.webp" alt="Picture">
                          <div class="results again">Play again</div>
                      </div>`;
      document.querySelector('.categories-container').appendChild(div);
    }
  }
}
const categories = new Categories();
export default categories;
