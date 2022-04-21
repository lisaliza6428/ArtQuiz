import startPage from './start-page/start-page';
import categories from './categories-page/categories-page';
import question from './question-page/question-page';
import settingsPage from './settings-page/settings';
import scorePage from './score-page/score-page';

const ErrorPage = {
  render: () => {
    document.querySelector('.container').innerHTML = `
    <div>
      <h1>Something went wrong!</h1>
      <a href="#/" class="main-page__button">Go back to the start page</a>
    </div>
  `;
  },
};

const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const routes = [
  { path: '/', component: startPage },
  { path: '/question', component: question },
  { path: '/categories', component: categories },
  { path: '/settings', component: settingsPage },
  { path: '/score', component: scorePage },
];

const router = async () => {
  const path = parseLocation();
  const { component = ErrorPage } = findComponentByPath(path, routes) || {};
  question.currentQustionIndex = 0;
  question.correctAnswerCount = 0;
  await component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
