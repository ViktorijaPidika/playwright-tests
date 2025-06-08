import { test, expect } from '@playwright/test'
import { UAPRegistryPage } from '../../../../pages/uapRegistry.page'
import { fillNewObservationForm } from '../../../../utils/uapRegistry.helper';

test.describe('UAP Registry with missing Description input', () => {

    let uapRegistryPage: UAPRegistryPage;
    const testData = {
        location: 'Riga, Latvia',
        date: '2025-04-06',
        image: 'https://i.ytimg.com/vi/Pws0Om4VquU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAhE0tn0U24HIjpIHKZ9H6A0ijurA',
    };

    test.beforeEach(async ({ page }) => {
        //authentication is not present on the page. Once issue resolved:
        //add additional log in steps here

        uapRegistryPage = new UAPRegistryPage(page);
        await uapRegistryPage.openUapRegistryPage();
        await expect(uapRegistryPage.newObservationDropDown).toBeVisible();
    });

    test('Verify an observation can be added with the "Description" field empty', async () => {
        await test.step('Fill in the "New Observation" form', async () => {
            await uapRegistryPage.newObservationDropDown.click();
            await expect(uapRegistryPage.newObservationForm).toBeVisible();

            await fillNewObservationForm(uapRegistryPage, testData);
            await uapRegistryPage.addButton.click();
        });

        await test.step('Verify new registry has been created without the description', async () => {
            // Success message is not present upon successful submition. Once issue resolved:
            // add additional assertation here that checks if the success message was returned

            await expect(uapRegistryPage
                .findObservationByTitle(testData.location, testData.date).last()
            ).toBeVisible();

            await expect(uapRegistryPage
                .findObservationByTitle(testData.location, testData.date).last()
                .locator('p')
            ).not.toBeVisible();
        });
    });

    test.afterEach(async ({ }) => {
        await uapRegistryPage
            .findObservationByTitle(testData.location, testData.date).last()
            .locator('[value="delete"]')
            .click();
    });
})