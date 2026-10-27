import Page from './page.js';

class RegistrationPage extends Page {
    get form() { return $('form[name="signup_form"]'); }
    get inputFullName() { return $('input[name="full_name"]'); }
    get inputEmail() { return $('input[name="user_mail"]'); }
    get inputAlias() { return $('input[name="user_alias"]'); }
    get inputPassword() { return $('input[name="pass_word"]'); }
    get inputRepeatPassword() { return $('input[name="pass_word_repeat"]'); }
    get selectCustomerTier() { return $('select[name="customer_tier"]'); }
    get checkboxAcceptRules() { return $('input[name="accept_rules"]'); }
    get btnCreateAccount() { return $('button[name="create_account"]'); }

    async open() {
        await super.open('crear-cuenta');
        await this.form.waitForDisplayed();
    }

    async register(fullName, email, alias, password, customerTier) {
        await this.inputFullName.setValue(fullName);
        await this.inputEmail.setValue(email);
        await this.inputAlias.setValue(alias);
        await this.inputPassword.setValue(password);
        await this.inputRepeatPassword.setValue(password);
        await this.selectCustomerTier.selectByVisibleText(customerTier);
        await this.checkboxAcceptRules.click();
        await browser.takeScreenshot();
        await this.btnCreateAccount.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).endsWith('/ingresar'),
            { timeoutMsg: 'El registro no redirigió a la pantalla de ingreso.' }
        );
        await $('#signinUserInput').waitForDisplayed();
    }
}

export default new RegistrationPage();
