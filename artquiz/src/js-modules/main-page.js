class StartPage {
  main;

  constructor() {
    this.main = document.createElement('main');
  }

  render = () => {
    this.main.classList.add('main');
    this.main.innerHTML = '<div class="container"></div>';
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `<a class="footer__RSS-link" href="https://rs.school/js/" target="_blank"><img src="/assets/svg/rs_school.svg"
                            alt="RSSchool">
                        </a>
                        <div class="footer__developer-link">App developer:
                           <a class="developer" target="_blank" href="https://github.com/lisaliza6428">Elizaveta
                          Ivanushenko</a> (2021)
                        </div>`;
    document.body.append(this.main, footer);
  };
}

const main = new StartPage();
export default main;
main.render();
