import { localStorageUtil } from './localStorage';
import { QUESTIONS_COUNT } from './consts';

export async function getData() {
  const responce = await fetch('./assets/data.json');
  const data = await responce.json();
  return data;
}
// getData();

export function getRandomNum(min, max) {
  let minNum = min;
  let maxNum = max;
  minNum = Math.ceil(minNum);
  maxNum = Math.floor(maxNum);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

export function shuffle(arr) {
  const array = arr;
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    array[j] = arr[i];
    array[i] = temp;
  }
  return arr;
}

export async function getRoundData(categoryIndex) {
  let round;
  const data = await getData();
  const typeOfQuiz = localStorageUtil.getQuizType();
  if (typeOfQuiz === 'artists') {
    round = data.slice(
      categoryIndex * QUESTIONS_COUNT,
      categoryIndex * QUESTIONS_COUNT + QUESTIONS_COUNT,
    );
  } else {
    round = data.slice(
      categoryIndex * QUESTIONS_COUNT + 120,
      categoryIndex * QUESTIONS_COUNT + QUESTIONS_COUNT + 120,
    );
  }
  return round;
}
