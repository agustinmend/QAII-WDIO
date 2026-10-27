import Page from './page.js';

class CheckoutPage extends Page {
    get form() { return $('form[name="checkout_form"]'); }
    get inputRecipientName() { return $('input[name="recipient_name"]'); }
    get selectShippingZone() { return $('select[name="shipping_zone"]'); }
    get inputAddress() { return $('input[name="shipping_address"]'); }
    get inputDeliveryDate() { return $('#deliveryDateInput'); }
    get btnDeliveryCalendar() { return $('#deliveryCalendarButton'); }
    get btnConfirmOrder() { return $('#checkoutConfirmButton'); }

    async open() {
        await this.form.waitForDisplayed();
    }

    async completeAndConfirm(recipient, zone, address, deliveryDate, timeSlot) {
        await this.inputRecipientName.setValue(recipient);
        await this.selectShippingZone.selectByVisibleText(zone);
        await this.inputAddress.setValue(address);
        await this.selectCalendarDate(
            '#deliveryDateInput',
            '#deliveryCalendarButton',
            'deliveryCalendar',
            deliveryDate
        );
        const slot = $(`input[name="delivery_slot"][value="${timeSlot}"]`);
        await slot.waitForDisplayed();
        await slot.click();

        const selectedDate = await this.inputDeliveryDate.getValue();
        if (selectedDate !== deliveryDate) {
            throw new Error(`Se esperaba la entrega el ${deliveryDate}, pero se seleccionó ${selectedDate}.`);
        }

        await browser.takeScreenshot();
        await this.btnConfirmOrder.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).endsWith('/mis-pedidos'),
            { timeoutMsg: 'La confirmación no redirigió a Mis pedidos.' }
        );
    }
}

export default new CheckoutPage();
