class ScorePage {
  render() {
    document.querySelector('.container').innerHTML = `<section>
      <h1>ScorePage</h1>
      <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
    </section>`;
  }
}
const scorePage = new ScorePage();
export default scorePage;
