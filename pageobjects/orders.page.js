import Page from './page.js';

class OrdersPage extends Page {
    get linkOrders() { return $('#headerOrdersLink'); }
    get heading() { return $('h1=Mis pedidos'); }
    get rescheduleSaveButton() { return $('#rescheduleSaveButton'); }
    get rescheduleDialog() { return $('#rescheduleDialog'); }
    get cancelConfirmButton() { return $('#orderCancelConfirmButton'); }
    get cancelDialog() { return $('#orderCancelDialog'); }

    async open() {
        await this.linkOrders.waitForDisplayed();
        await this.linkOrders.click();
        await this.heading.waitForDisplayed();
    }

    orderRow(orderCode) {
        return $(`//tr[.//td[normalize-space(.)="${orderCode}"]]`);
    }

    async verifyOrderForDelivery(deliveryDate) {
        const row = $(`//tr[.//td[normalize-space(.)="${deliveryDate}"]]`);
        await row.waitForDisplayed();
        const cells = await row.$$('td');
        const actualStatus = await cells[7].getText();
        if (actualStatus !== 'Pendiente') {
            throw new Error(`El pedido con entrega ${deliveryDate} quedó con estado "${actualStatus}".`);
        }
    }

    async reschedule(orderCode, newDeliveryDate) {
        const row = this.orderRow(orderCode);
        await row.waitForDisplayed();
        await $(`button[name="reschedule_${orderCode}"]`).click();
        await this.rescheduleDialog.waitForDisplayed();
        await this.selectCalendarDate(
            '#rescheduleDateInput',
            '#rescheduleCalendarButton',
            'rescheduleCalendar',
            newDeliveryDate
        );

        const dateText = await $('#rescheduleNewText').getText();
        if (!dateText.includes(newDeliveryDate)) {
            throw new Error(`El pedido no muestra la nueva fecha de entrega ${newDeliveryDate}.`);
        }
        await browser.takeScreenshot();
        await this.rescheduleSaveButton.waitForEnabled();
        await this.rescheduleSaveButton.click();
        await this.rescheduleDialog.waitForDisplayed({ reverse: true });
        await browser.waitUntil(
            async () => (await row.getText()).includes(newDeliveryDate),
            { timeoutMsg: `No se guardó la nueva fecha ${newDeliveryDate} para el pedido ${orderCode}.` }
        );
    }

    async cancel(orderCode) {
        const row = this.orderRow(orderCode);
        await row.waitForDisplayed();
        await $(`button[name="cancel_order_${orderCode}"]`).click();
        await this.cancelDialog.waitForDisplayed();
        await browser.takeScreenshot();
        await this.cancelConfirmButton.click();
        await this.cancelDialog.waitForDisplayed({ reverse: true });
        await browser.waitUntil(
            async () => (await row.getText()).includes('Cancelado'),
            { timeoutMsg: `El pedido ${orderCode} no aparece cancelado.` }
        );
    }
}

export default new OrdersPage();
