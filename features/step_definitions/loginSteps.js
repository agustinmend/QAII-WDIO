import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../../pageobjects/login.page.js';

Given('estoy en la página de ingreso de la tienda', async () => {
    await LoginPage.open();
    await browser.takeScreenshot();
});

When('ingreso con el alias {string} y la contraseña {string}', async (alias, password) => {
    await LoginPage.login(alias, password);
});

Then('debería ver el catálogo', async () => {
    await LoginPage.verifyCatalog();
    await browser.takeScreenshot();
});
