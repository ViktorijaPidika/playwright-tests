import { test, expect } from '@playwright/test'
import { UAPRegistryPage } from '../../../pages/uapRegistry.page'
import { fillNewObservationForm } from '../../../utils/uapRegistry.helper';

test.describe('Reading an UAP Registry', () => {

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

    test('Verify user can read an existing observation', async () => {
        await test.step('Add new observation', async () => {
            await uapRegistryPage.newObservationDropDown.click();
            await expect(uapRegistryPage.newObservationForm).toBeVisible();

            await fillNewObservationForm(uapRegistryPage, testData);
            await uapRegistryPage.addButton.click();
        });

        await test.step('Verify registry can be read', async () => {
            await expect(uapRegistryPage.observationArticleTitle.last()).toHaveText(`${testData.location} (${testData.date})`);
            await expect(uapRegistryPage.observationArticleImage.last()).toBeVisible();
            await expect(uapRegistryPage.observationArticleText.last()).toHaveText(`${testData.description}`);
        });
    });

    test.afterEach(async ({ }) => {
        await uapRegistryPage
            .findObservationByTitle(testData.location, testData.date).last()
            .locator('[value="delete"]')
            .click();
    });
})