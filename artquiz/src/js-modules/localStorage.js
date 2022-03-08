export class LocalStorageUtil {
  quizType;

  constructor() {
    this.quizType = 'quizType';
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
}

export const localStorageUtil = new LocalStorageUtil();
