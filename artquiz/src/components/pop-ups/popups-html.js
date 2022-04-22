import './popups.scss';
import { QUESTIONS_COUNT } from '../consts';

export function getFinishPopupHTML(correctAnswerCount) {
  return `
  <div class="popup">
    <div class="popup-wrapper">
      <div class="finish">
      <img class="finish__image" src="/assets/svg/finish_round_cup.svg" width ="166" alt="">
      <div class="finish__text">Congratulations!</div>
      <div class="finish__score">${correctAnswerCount}/${QUESTIONS_COUNT}</div>
      <div class="finish__wrapper">
        <a class="finish__button" href="#/" >Home</a>
        <a class="finish__button" href="#/categories">Next Quiz</a>
      </div>
    </div>
  </div>`;
}

export function getAnswerPopupHTML(item, answer) {
  return `
  <div class="popup">
    <div class="popup-wrapper">
    <div class="popup-image">
        <img class="popup-image__picture" src="/assets/img/${item.imageNum}.webp" alt="">
        <img class="popup-image__icon" src="/assets/svg/${answer}-answer.svg" alt="">
    </div> 
    <div class="picture-name">${item.nameEN}</div>
    <div class="picture-info">${item.authorEN}, ${item.year}</div>
    <button class="button next" id="next-button">Next</button>
  </div>`;
}
