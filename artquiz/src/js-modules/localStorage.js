export class LocalStorageUtil {
  quizType;

  answersArray;

  settings;

  constructor() {
    this.quizType = 'quizType';
    this.answersArray = 'answersArray';
    this.settings = 'settings';
  }

  getQuizType() {
    const quiz = localStorage.getItem(this.quizType);
    if (quiz !== null) return quiz;
    return '';
  }

  setQuizType(quiz) {
    localStorage.setItem(this.quizType, quiz);
  }

  getAnswersArray() {
    const arr = localStorage.getItem(this.answersArray);
    if (arr !== null) return JSON.parse(arr);
    return new Array(240).fill('0');
  }

  setAnswersArray(array) {
    localStorage.setItem(this.answersArray, JSON.stringify(array));
  }

  getSettings() {
    const info = localStorage.getItem(this.settings);
    if (info !== null) return JSON.parse(info);
    return {
      sound: 20,
      timer: true,
      timervalue: 20,
    };
  }

  setSettings(info) {
    localStorage.setItem(this.settings, JSON.stringify(info));
  }
}

export const localStorageUtil = new LocalStorageUtil();
