import { test, expect } from '@playwright/test'
import { UAPRegistryPage } from '../../../pages/uapRegistry.page'
import { fillNewObservationForm } from '../../../utils/uapRegistry.helper';

test.describe('UAP Registry with invalid URL', () => {

    let uapRegistryPage: UAPRegistryPage;
    const testData = {
        location: 'Riga, Latvia',
        date: '12345-04-06',
        image: '1',
        description: 'There were strange noises and bright lights outside the office, and the office\'s only developer has gone missing.',
    };

    test.beforeEach(async ({ page }) => {
        //authentication is not present on the page. Once issue resolved:
        //add additional log in steps here

        uapRegistryPage = new UAPRegistryPage(page);
        await uapRegistryPage.openUapRegistryPage();
        await expect(uapRegistryPage.newObservationDropDown).toBeVisible();
    });

    test('Verify an observation can not be added with invalid Image URL', async () => {
        await test.step('Fill in the "New Observation" form', async () => {
            await uapRegistryPage.newObservationDropDown.click();
            await expect(uapRegistryPage.newObservationForm).toBeVisible();

            await fillNewObservationForm(uapRegistryPage, testData);
            await uapRegistryPage.addButton.click();
        });

        await test.step('Verify new registry has NOT been created', async () => {

            await expect(uapRegistryPage
                .findObservationByTitle(testData.location, testData.date).last()
            ).not.toBeVisible();
        });
    });
})