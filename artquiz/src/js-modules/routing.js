const StartPage = {
  render: () => `
  <a class="settings" href="#/settings"><img  src="/assets/svg/settings.svg" alt="Settings"></a>
  <div class="main-page-container">
  <div class="main-page">
      <img class="main-page__title" src="/assets/svg/title.svg" alt="Art Quiz">
      <a href="#/artists-quiz" class="main-page__button" id="artists-quiz">Artists quiz</a>
      <a href="#/pictures-quiz" class="main-page__button" id="pictures-quiz">Pictures quiz</a>
  </div>
</div>
    `,
};

const artistsQuiz = {
  render: () => `
      <section>
        <h1>artists-quiz</h1>
      </section>
    `,
};

const picturesQuiz = {
  render: () => `
      <section>
        <h1>pictures-quiz</h1>
      </section>
    `,
};

const settingsPage = {
  render: () => `
      <section>
        <h1>Settings</h1>
        <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
      </section>
    `,
};

const ScorePage = {
  render: () => `
      <section>
        <h1>ScorePage</h1>
        <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
      </section>
    `,
};

const ErrorPage = {
  render: () => `
      <section>
        <h1>Not found</h1>
        <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
      </section>
    `,
};

const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const routes = [
  { path: '/', component: StartPage },
  { path: '/artists-quiz', component: artistsQuiz },
  { path: '/pictures-quiz', component: picturesQuiz },
  { path: '/settings', component: settingsPage },
  { path: '/score', component: ScorePage },
];

const router = () => {
  const path = parseLocation();
  const { component = ErrorPage } = findComponentByPath(path, routes) || {};
  document.querySelector('.container').innerHTML = component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
