import { Given, When, Then } from '@wdio/cucumber-framework';
import CatalogPage from '../../pageobjects/catalog.page.js';
import CartPage from '../../pageobjects/cart.page.js';
import CheckoutPage from '../../pageobjects/checkout.page.js';
import OrdersPage from '../../pageobjects/orders.page.js';

When('consulto la ficha del producto {string}', async productCode => {
    await CatalogPage.openProductSheet(productCode);
    await browser.takeScreenshot();
});

When('agrego {string} unidades del producto al carrito', async quantity => {
    await CatalogPage.addToCart(quantity);
    await browser.takeScreenshot();
});

When('voy al carrito de compra y verifico el producto {string}', async productCode => {
    await CartPage.open();
    await CartPage.verifyProduct(productCode);
    await browser.takeScreenshot();
});

When('continúo con el pedido', async () => {
    await CartPage.continueToCheckout();
    await browser.takeScreenshot();
});

When(
    'completo y confirmo la entrega para {string}, zona {string}, dirección {string}, fecha {string} y franja {string}',
    async (recipient, zone, address, deliveryDate, timeSlot) => {
        await CheckoutPage.open();
        await CheckoutPage.completeAndConfirm(recipient, zone, address, deliveryDate, timeSlot);
        await browser.takeScreenshot();
    }
);

Then('debería ver el pedido con entrega el {string}', async deliveryDate => {
    await OrdersPage.verifyOrderForDelivery(deliveryDate);
    await browser.takeScreenshot();
});

When('voy a Mis pedidos', async () => {
    await OrdersPage.open();
    await browser.takeScreenshot();
});

When('reprogramo el pedido {string} para la fecha {string}', async (orderCode, deliveryDate) => {
    await OrdersPage.reschedule(orderCode, deliveryDate);
    await browser.takeScreenshot();
});

When('cancelo el pedido {string}', async orderCode => {
    await OrdersPage.cancel(orderCode);
    await browser.takeScreenshot();
});

Then('debería ver el pedido {string} cancelado', async orderCode => {
    const row = OrdersPage.orderRow(orderCode);
    await row.waitForDisplayed();
    const orderText = await row.getText();
    if (!orderText.includes('Cancelado')) {
        throw new Error(`El pedido ${orderCode} no muestra estado Cancelado.`);
    }
    await browser.takeScreenshot();
});
