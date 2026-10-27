import Page from './page.js';

class LoginPage extends Page {
    get inputUsername() { return $('#signinUserInput'); }
    get inputPassword() { return $('#signinPassInput'); }
    get btnLogin() { return $('#signinSubmitButton'); }

    async open() {
        await super.open('ingresar');
        await this.btnLogin.waitForDisplayed();
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await browser.takeScreenshot();
        await this.btnLogin.click();
        await $('#headerCatalogLink').waitForDisplayed();
    }

    async verifyCatalog() {
        await $('#headerCatalogLink').waitForDisplayed();
        await $('h1=Catálogo').waitForDisplayed();
    }
}

export default new LoginPage();
