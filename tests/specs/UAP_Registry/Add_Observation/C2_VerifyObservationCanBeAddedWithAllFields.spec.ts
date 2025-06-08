import { test, expect } from '@playwright/test'
import { UAPRegistryPage } from '../../../../src/pages/uapRegistryPage'
import { fillNewObservationForm } from '../../../../src/helpers/uapRegistryHelper';

test.describe('UAP Registry with valid inputs', () => {

    let uapRegistryPage: UAPRegistryPage;
    const testData = {
        location: 'Riga, Latvia',
        date: '2025-04-06',
        image: 'https://i.ytimg.com/vi/Pws0Om4VquU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAhE0tn0U24HIjpIHKZ9H6A0ijurA',
        description: `There were strange noises and bright lights outside the office, and the office's only developer has gone missing.`
    };

    test.beforeEach(async ({ page }) => {
        //authentication is not present on the page. Once issue resolved:
        //add additional log in steps here

        uapRegistryPage = new UAPRegistryPage(page);
        await uapRegistryPage.openUapRegistryPage();
        await expect(uapRegistryPage.newObservationDropDown).toBeVisible();
    });

    test('Verify observation can be added with all fields filled', async () => {
        await test.step('Fill in the "New Observation" form', async () => {
            await uapRegistryPage.newObservationDropDown.click();
            await expect(uapRegistryPage.newObservationForm).toBeVisible();

            await fillNewObservationForm(uapRegistryPage, testData);
            await uapRegistryPage.addButton.click();
        });

        await test.step('Verify new registry has been created', async () => {
            // Success message is not present upon successful submition. Once issue resolved:
            // add additional assertation here that checks if the success message was returned

            await expect(uapRegistryPage
                .findObservationByTitle(testData.location, testData.date).last()
            ).toBeVisible();
        });
    });

    test.afterEach(async ({ }) => {
        await uapRegistryPage
            .findObservationByTitle(testData.location, testData.date).last()
            .locator('[value="delete"]')
            .click();
    });
})