import './settings.scss';
import { sounds } from '../sounds';
import question from '../question-page/question-page';
import { localStorageUtil } from '../localStorage';
import { generateHTMLElement } from '../functions';

class SettingsPage {
  render() {
    document.querySelector('.container').innerHTML = `
      <div class="settings">
          <div class="settings__controls">
              <a class="control__back" href="#"><img class="control__back-arrow" src="/assets/svg/arrow.svg" alt="back"></a>
              <a class="control__back-link" href="#">Settings</a>
          </div>
          <a class="control__close" href="#"><img class="control__close-img" src="/assets/svg/close.svg" alt="close"></a>
      </div>`;
    this.generateSoundBar();
    this.generateTimerSetter();
    this.generateTimerValue();
    this.generateDefaultButton();
    this.generateResetButton();
  }

  generateSoundBar() {
    const input = document.createElement('input');
    input.type = 'range';
    input.min = 0;
    input.max = 100;
    input.value = localStorageUtil.getSettings().sound;
    input.className = 'sound-bar';
    input.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${input.value}%, #C4C4C4 ${input.value}%, #C4C4C4 100%)`;

    input.oninput = function updateBar() {
      input.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${this.value}%, #C4C4C4 ${this.value}%, #C4C4C4 100%)`;
    };

    input.onchange = function updateBar() {
      sounds.audio.volume = +input.value / 100;
      sounds.correctAnswer();
      localStorageUtil.updateSettings('sound', +input.value);
    };

    const div = generateHTMLElement('div', ['wrapper'], '');
    div.innerHTML = '<p class="settings__item">Volume:</p>';
    const wrapper = generateHTMLElement('div', ['sound-bar-bottom'], '');
    wrapper.innerHTML = `<img src="/assets/svg/sound_off.svg" alt="On">
                         <img src="/assets/svg/sound_on.svg" alt="Off">`;
    div.append(input, wrapper);
    document.querySelector('.container').appendChild(div);
  }

  generateTimerSetter() {
    const div = generateHTMLElement('div', ['wrapper'], '');
    div.innerHTML = '<p class="settings__item">Time game:</p>';

    const span = generateHTMLElement('span', ['on_off'], 'On');
    div.append(span);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = localStorageUtil.getSettings().timer;
    if (input.checked) {
      span.innerText = 'On';
    } else {
      span.innerText = 'Off';
    }
    input.id = 'switch_timer';
    input.className = 'switch';

    const labelOff = document.createElement('label');
    labelOff.for = 'switch_timer';
    labelOff.className = 'lbl-off';

    const labelOn = document.createElement('label');
    labelOn.for = 'switch_timer';
    labelOn.className = 'lbl-on';

    const wrapper = generateHTMLElement('div', ['button-switch'], '');
    wrapper.append(input, labelOff, labelOn);
    div.appendChild(wrapper);
    document.querySelector('.container').appendChild(div);

    input.addEventListener('click', () => {
      if (input.checked) {
        span.innerText = 'On';
        question.timer = true;
        localStorageUtil.updateSettings('timer', true);
        document.querySelector('.wrapper-time-setter').classList.remove('inactive');
      } else {
        span.innerText = 'Off';
        question.timer = false;
        localStorageUtil.updateSettings('timer', false);
        document.querySelector('.wrapper-time-setter').classList.add('inactive');
      }
    });
  }

  generateTimerValue() {
    let div;
    if (localStorageUtil.getSettings().timer) {
      div = generateHTMLElement('div', ['wrapper-time-setter'], '');
    } else {
      div = generateHTMLElement('div', ['wrapper-time-setter', 'inactive'], '');
    }
    div.innerHTML = '<p class="settings__item">Time to answer:</p>';
    const wrapper = generateHTMLElement('div', ['numborber'], '');
    const minusButton = generateHTMLElement('button', ['btnplus', 'numberbtn'], '-');
    const input = generateHTMLElement('input', ['number'], `${localStorageUtil.getSettings().timervalue}`);
    const plusButton = generateHTMLElement('button', ['btnplus', 'numberbtn'], '+');
    wrapper.append(minusButton, input, plusButton);
    div.appendChild(wrapper);
    document.querySelector('.container').appendChild(div);

    minusButton.addEventListener('click', () => {
      if (+input.value > 5) {
        input.value = +input.value - 5;
        localStorageUtil.updateSettings('timervalue', +input.value);
      }
    });

    plusButton.addEventListener('click', () => {
      if (+input.value < 30) {
        input.value = +input.value + 5;
        localStorageUtil.updateSettings('timervalue', +input.value);
      }
    });
  }

  generateDefaultButton() {
    const button = document.createElement('button');
    button.classList.add('button', 'default-button');
    button.innerText = 'Default';
    button.addEventListener('click', () => {
      localStorageUtil.setSettings({ sound: 20, timer: true, timervalue: 20 });
      question.timer = true;
      this.render();
    });
    document.querySelector('.container').appendChild(button);
  }

  generateResetButton() {
    const button = document.createElement('button');
    button.classList.add('button', 'reset-button');
    button.innerText = 'Reset Progress';
    button.addEventListener('click', () => {
      localStorageUtil.clearAnswersArray();
    });
    document.querySelector('.container').appendChild(button);
  }
}

const settingsPage = new SettingsPage();
export default settingsPage;
