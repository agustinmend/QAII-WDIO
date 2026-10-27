import Page from './page.js';

class CatalogPage extends Page {
    get heading() { return $('h1=Catálogo'); }
    get productHeading() { return $('.item-sheet__title'); }
    get quantityInput() { return $('.item-sheet__qty-input'); }
    get btnAddToCart() { return $('.item-sheet__add-btn'); }
    get cartQuantity() { return $('.item-sheet__in-cart'); }

    async openProductSheet(productCode) {
        await this.heading.waitForDisplayed();
        const productLink = $(`a[href="/catalogo/${productCode}"]`);
        await productLink.waitForClickable();
        await productLink.click();
        await this.productHeading.waitForDisplayed();
        const actualCode = await $('.item-sheet__code').getText();
        if (actualCode !== productCode) {
            throw new Error(`Se esperaba la ficha ${productCode}, pero se abrió ${actualCode}.`);
        }
    }

    async addToCart(quantity) {
        const units = Number(quantity);
        if (!Number.isInteger(units) || units < 1 || units > 5) {
            throw new Error(`La cantidad debe ser un número entero entre 1 y 5; se recibió "${quantity}".`);
        }

        await this.quantityInput.setValue(String(units));
        await this.btnAddToCart.click();
        await browser.waitUntil(
            async () => {
                const cartText = await this.cartQuantity.getText();
                const cartUnits = Number(cartText.match(/\d+/)?.[0]);
                return cartUnits >= units;
            },
            { timeoutMsg: `El producto no se agregó al carrito en la cantidad solicitada (${units}).` }
        );
    }
}

export default new CatalogPage();
