import { localStorageUtil } from './localStorage';

class StartPage {
  main = document.createElement('main');

  render = () => {
    document.querySelector('.modal').innerHTML = '';
    document.querySelector('.container').innerHTML = `<a class="settings" href="#/settings"><img  src="/assets/svg/settings.svg" alt="Settings"></a>
    <div class="main-page-container">
    <div class="main-page">
        <img class="main-page__title" src="/assets/svg/title.svg" alt="Art Quiz">
        <a href="#/categories" class="main-page__button" id="artists-quiz">Artists quiz</a>
        <a href="#/categories" class="main-page__button" id="pictures-quiz">Pictures quiz</a>
    </div>
    </div>`;
    document.getElementById('artists-quiz').addEventListener('click', () => {
      localStorageUtil.setQuizType('artists');
    });
    document.getElementById('pictures-quiz').addEventListener('click', () => {
      localStorageUtil.setQuizType('pictures');
    });
  };

  renderFooter = () => {
    this.main.classList.add('main');
    this.main.innerHTML = '<div class="container"></div>';
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `<a class="footer__RSS-link" href="https://rs.school/js/" target="_blank"><img src="/assets/svg/rs_school.svg"
                            alt="RSSchool">
                        </a>
                        <div class="footer__developer-link">App developer:
                           <a class="developer" target="_blank" href="https://github.com/lisaliza6428">Elizaveta
                          Ivanushenko</a> (2022)
                        </div>`;
    document.body.append(this.main, footer);
  };
}

const startPage = new StartPage();
startPage.renderFooter();
export default startPage;
