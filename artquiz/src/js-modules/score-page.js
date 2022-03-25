import question from './question-page';
import { localStorageUtil } from './localStorage';

class ScorePage {
  async render() {
    document.querySelector('.container').innerHTML = `
      <div class="results_page">
      <div class="category_header_wrapper">
          <div class="header_category">
              <img class="logo" src="assets/svg/logo.svg" alt="Logo">
              <span id="back" class="home"></span>
              <span class="categories">Results</span>
          </div>
      </div>
      <p class="quiz_title result"></p>
      <div id="results_container" class="results_container">
      ${await this.generateCardsBlock()}
      </div>
    </div>`;
  }

  async generateCardsBlock() {
    const data = await question.getRoundData();
    const arr = localStorageUtil.getAnswersArray();
    let cardsBlock = '';
    let card;
    for (let i = 0; i < 10; i += 1) {
      let grey = 'grey';
      if (arr[data[i].imageNum] === '1') grey = '';
      card = `
      <div class="result_image">
        <img class="img_category ${grey}" src="/assets/img/${data[i].imageNum}.webp" alt="Picture">
        <div class="picture_description none">
          <p>${data[i].authorEN}</p>
          <p>${data[i].nameEN}</p>
          <p>${data[i].year}</p>
        </div>
      </div>`;
      cardsBlock += card;
    }
    return cardsBlock;
  }
}
const scorePage = new ScorePage();
export default scorePage;
