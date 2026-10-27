import Page from './page.js';

class CartPage extends Page {
    get linkCart() { return $('#headerCartLink'); }
    get heading() { return $('h1=Carrito'); }
    get btnContinueToCheckout() { return $('#cartCheckoutButton'); }
    get checkoutForm() { return $('form[name="checkout_form"]'); }

    async open() {
        await this.linkCart.waitForDisplayed();
        await this.linkCart.click();
        await this.heading.waitForDisplayed();
    }

    async verifyProduct(productCode) {
        const productRow = $(`//tr[.//td[normalize-space(.)="${productCode}"]]`);
        await productRow.waitForDisplayed();
    }

    async continueToCheckout() {
        await this.btnContinueToCheckout.waitForEnabled();
        await this.btnContinueToCheckout.click();
        await this.checkoutForm.waitForDisplayed();
    }
}

export default new CartPage();
