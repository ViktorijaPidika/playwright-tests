import { test, expect } from '@playwright/test'
import { UAPRegistryPage } from '../../../pages/uapRegistry.page'
import { fillNewObservationForm } from '../../../utils/uapRegistry.helper';

test.describe('UAP Registry with missing Image URL input', () => {

    let uapRegistryPage: UAPRegistryPage;
    const testData = {
        location: 'Riga, Latvia',
        date: '2025-04-06',
        description: 'There were strange noises and bright lights outside the office, and the office\'s only developer has gone missing.',
    };

    test.beforeEach(async ({ page }) => {
        //authentication is not present on the page. Once issue resolved:
        //add additional log in steps here

        uapRegistryPage = new UAPRegistryPage(page);
        await uapRegistryPage.openUapRegistryPage();
        await expect(uapRegistryPage.newObservationDropDown).toBeVisible();
    });

    test('Verify an observation can not be added with the "Image URL" field empty', async () => {
        await test.step('Fill in the "New Observation" form', async () => {
            await uapRegistryPage.newObservationDropDown.click();
            await expect(uapRegistryPage.newObservationForm).toBeVisible();

            await fillNewObservationForm(uapRegistryPage, testData);
            await uapRegistryPage.addButton.click();
        });

        await test.step('Verify new registry has NOT been created', async () => {
            // Warning message is not present upon unsuccessful submition. Once issue resolved:
            // add additional assertation here that checks if the warning message was returned

            await expect(uapRegistryPage
                .findObservationByTitle(testData.location, testData.date).last()
            ).not.toBeVisible();
        });
    });
})
