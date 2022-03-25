export class LocalStorageUtil {
  quizType;

  answersArray;

  constructor() {
    this.quizType = 'quizType';
    this.answersArray = 'answersArray';
  }

  getQuizType() {
    const quiz = localStorage.getItem(this.quizType);
    if (quiz !== null) {
      return quiz;
    }
    return '';
  }

  setQuizType(quiz) {
    localStorage.setItem(this.quizType, quiz);
  }

  getAnswersArray() {
    const arr = localStorage.getItem(this.answersArray);
    if (arr !== null) {
      return JSON.parse(arr);
    }
    return new Array(240).fill('0');
  }

  setAnswersArray(array) {
    localStorage.setItem(this.answersArray, JSON.stringify(array));
  }
}

export const localStorageUtil = new LocalStorageUtil();
