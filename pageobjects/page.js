export default class Page {
    async open(path) {
        await browser.url(`https://tienda-qa.pages.dev/${path}`);
    }

    async selectCalendarDate(inputSelector, buttonSelector, calendarId, date) {
        const [day, month, year] = date.split('/');
        if (!day || !month || !year) {
            throw new Error(`La fecha "${date}" debe tener formato dd/mm/aaaa.`);
        }

        const dateInput = $(inputSelector);
        await dateInput.click();
        if ((await dateInput.getAttribute('aria-expanded')) !== 'true') {
            await $(buttonSelector).click();
        }

        const calendar = $(`#${calendarId}`);
        const monthLabel = $(`#${calendarId}Month`);
        await calendar.waitForDisplayed();

        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const requestedMonth = Number(year) * 12 + Number(month) - 1;

        for (let attempts = 0; attempts < 12; attempts += 1) {
            const visibleMonth = (await monthLabel.getText()).toLocaleLowerCase('es');
            const monthIndex = months.findIndex(name => visibleMonth.includes(name));
            const visibleYear = Number(visibleMonth.match(/\d{4}/)?.[0]);
            if (monthIndex < 0 || !visibleYear) {
                throw new Error(`No se pudo interpretar el mes del calendario: "${visibleMonth}".`);
            }

            const calendarMonth = visibleYear * 12 + monthIndex;
            if (calendarMonth === requestedMonth) {
                break;
            }
            if (calendarMonth > requestedMonth) {
                throw new Error(`La fecha ${date} es anterior al mes visible en el calendario.`);
            }
            await $(`#${calendarId}Next`).click();
        }

        const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const dayButton = $(`#${calendarId} [data-day="${isoDate}"]`);
        await dayButton.waitForClickable();
        await dayButton.click();
        await browser.waitUntil(
            async () => (await dateInput.getValue()) === date,
            { timeoutMsg: `El calendario no seleccionó la fecha ${date}.` }
        );
    }
}
