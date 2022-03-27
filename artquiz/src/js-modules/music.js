import { localStorageUtil } from './localStorage';

export class Sound {
  audio;

  constructor() {
    this.audio = new Audio();
    this.audio.volume = localStorageUtil.getSettings().sound / 100;
  }

  correctAnswer() {
    this.audio.src = './assets/audio/correct-answer.mp3';
    this.audio.play();
  }

  wrongAnswer() {
    this.audio.src = './assets/audio/wrong-answer.mp3';
    this.audio.play();
  }

  finishRound() {
    this.audio.src = './assets/audio/finish.mp3';
    this.audio.play();
  }
}

export const sound = new Sound();
