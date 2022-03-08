import startPage from './start-page';
import categories from './categories-page';

const settingsPage = {
  render: () => {
    document.querySelector('.container').innerHTML = `<section>
      <h1>Settings</h1>
      <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
    </section>`;
  },
};

const scorePage = {
  render: () => {
    document.querySelector('.container').innerHTML = `
    <section>
      <h1>ScorePage</h1>
      <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
    </section>
  `;
  },
};

const ErrorPage = {
  render: () => {
    document.querySelector('.container').innerHTML = `
    <section>
      <h1>Error</h1>
      <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
    </section>
  `;
  },
};

const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const routes = [
  { path: '/', component: startPage },
  // { path: '/question', component: question },
  { path: '/categories', component: categories },
  { path: '/settings', component: settingsPage },
  { path: '/score', component: scorePage },
];

const router = async () => {
  const path = parseLocation();
  const { component = ErrorPage } = findComponentByPath(path, routes) || {};
  component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
