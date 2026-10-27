import { Given, When } from '@wdio/cucumber-framework';
import RegistrationPage from '../../pageobjects/registration.page.js';

Given('estoy en la página de registro de la tienda', async () => {
    await RegistrationPage.open();
    await browser.takeScreenshot();
});

When(
    'registro {string}, {string}, {string}, {string}, {string}',
    async (fullName, email, alias, password, customerTier) => {
        await RegistrationPage.register(fullName, email, alias, password, customerTier);
        await browser.takeScreenshot();
    }
);
