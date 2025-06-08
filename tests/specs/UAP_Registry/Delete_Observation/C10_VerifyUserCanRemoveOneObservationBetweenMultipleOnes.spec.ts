import { test, expect } from '@playwright/test'
import { UAPRegistryPage } from '../../../../src/pages/uapRegistryPage'

test.describe('Deleting one UAP Registry', () => {

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

    test('Verify user can remove one observation between multiple ones', async () => {
        await test.step('Delete added registry', async () => {
            await uapRegistryPage
                .findObservationByTitle(testData.location, testData.date).last()
                .locator('[value="delete"]')
                .click();
        });

        await test.step('Verify registry is not visible anymore', async () => {
            await expect(uapRegistryPage
                .findObservationByTitle(testData.location, testData.date).last()
            ).not.toBeVisible();
        });
    });
})

