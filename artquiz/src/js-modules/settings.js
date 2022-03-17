class SettingsPage {
  render() {
    document.querySelector('.container').innerHTML = `<section>
    <h1>Settings</h1>
    <a href="#/" class="main-page__button" id="artists-quiz">Go to the start page</a>
  </section>`;
  }
}
const settingsPage = new SettingsPage();
export default settingsPage;
