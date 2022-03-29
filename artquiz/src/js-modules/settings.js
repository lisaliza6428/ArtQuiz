/* eslint-disable no-use-before-define */
import { sound } from './music';
import question from './question-page';
import { localStorageUtil } from './localStorage';

class SettingsPage {
  render() {
    document.querySelector('.container').innerHTML = `
      <div class="header-settings">
          <div class="links-wrapper">
              <a href="#"><img src="/assets/svg/arrow.svg" alt="back"></a>
              <a href="#" class="setting">Settings</a>
          </div>
          <a href="#"><img class="close" src="/assets/svg/close.svg" alt="close"></a>
      </div>`;
    this.generateSoundBar();
    this.generateTimerSetter();
    this.generateTimerValue();
    this.generateDefaultButton();
  }

  generateSoundBar() {
    const div = generateElement('div', ['wrapper'], '');
    div.innerHTML = '<p class="settings-item">Volume</p>';
    const input = document.createElement('input');
    input.type = 'range';
    input.min = 0;
    input.max = 100;
    input.value = localStorageUtil.getSettings().sound;
    input.className = 'sound-bar';
    input.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${input.value}%, #C4C4C4 ${input.value}%, #C4C4C4 100%)`;

    const wrapper = generateElement('div', ['sound-bar-bottom'], '');
    wrapper.innerHTML = `<img src="/assets/svg/sound_off.svg" alt="On">
                         <img src="/assets/svg/sound_on.svg" alt="Off">`;
    div.append(input, wrapper);
    document.querySelector('.container').appendChild(div);

    input.oninput = function updateBar() {
      input.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${this.value}%, #C4C4C4 ${this.value}%, #C4C4C4 100%)`;
      sound.audio.volume = this.value / 100;
    };

    input.onchange = function updateBar() {
      sound.correctAnswer();
      const info = localStorageUtil.getSettings();
      info.sound = +input.value;
      localStorageUtil.setSettings(info);
    };
  }

  generateTimerSetter() {
    const div = generateElement('div', ['wrapper'], '');
    div.innerHTML = '<p class="settings-item">Time game</p>';

    const span = generateElement('span', ['on_off'], 'On');
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

    const wrapper = generateElement('div', ['button-switch'], '');
    wrapper.append(input, labelOff, labelOn);
    div.appendChild(wrapper);
    document.querySelector('.container').appendChild(div);

    input.addEventListener('click', () => {
      const info = localStorageUtil.getSettings();
      if (input.checked) {
        span.innerText = 'On';
        question.timer = true;
        info.timer = true;
        document.querySelector('.wrapper-time-setter').classList.remove('inactive');
      } else {
        span.innerText = 'Off';
        question.timer = false;
        info.timer = false;
        document.querySelector('.wrapper-time-setter').classList.add('inactive');
      }
      localStorageUtil.setSettings(info);
    });
  }

  generateTimerValue() {
    let div;
    if (localStorageUtil.getSettings().timer) {
      div = generateElement('div', ['wrapper-time-setter'], '');
    } else {
      div = generateElement('div', ['wrapper-time-setter', 'inactive'], '');
    }
    div.innerHTML = '<p class="settings-item">Time to answer</p>';
    const wrapper = generateElement('div', ['numborber'], '');
    const minusButton = generateElement('button', ['btnplus', 'numberbtn'], '-');
    const input = generateElement('input', ['number'], `${localStorageUtil.getSettings().timervalue}`);
    const plusButton = generateElement('button', ['btnplus', 'numberbtn'], '+');
    wrapper.append(minusButton, input, plusButton);
    div.appendChild(wrapper);
    document.querySelector('.container').appendChild(div);

    minusButton.addEventListener('click', () => {
      if (+input.value > 5) {
        input.value = +input.value - 5;
      }
      const info = localStorageUtil.getSettings();
      info.timervalue = +input.value;
      localStorageUtil.setSettings(info);
    });
    plusButton.addEventListener('click', () => {
      if (+input.value < 30) {
        input.value = +input.value + 5;
      }
      const info = localStorageUtil.getSettings();
      info.timervalue = +input.value;
      localStorageUtil.setSettings(info);
    });
  }

  generateDefaultButton() {
    const button = document.createElement('button');
    button.classList.add('button', 'default-button');
    button.innerText = 'Default';
    button.addEventListener('click', () => {
      localStorageUtil.setSettings({ sound: 20, timer: true, timervalue: 20 });
      this.render();
    });
    document.querySelector('.container').appendChild(button);
  }
}
const settingsPage = new SettingsPage();
export default settingsPage;

function generateElement(el, cl, text) {
  const element = document.createElement(el);
  if (el === 'input') {
    element.type = 'number';
    element.value = +text;
    element.readOnly = true;
    element.max = 30;
    element.min = 5;
  }
  element.classList.add(...cl);
  element.innerText = text;
  return element;
}
