import { test, expect } from '@playwright/test'
import { UAPRegistryPage } from '../../../pages/uapRegistry.page'

test.describe('Deleting all UAP registries', () => {

    let uapRegistryPage: UAPRegistryPage;

    test.beforeEach(async ({ page }) => {
        //authentication is not present on the page. Once issue resolved:
        //add additional log in steps here

        uapRegistryPage = new UAPRegistryPage(page);
        await uapRegistryPage.openUapRegistryPage();
        await expect(uapRegistryPage.newObservationDropDown).toBeVisible();
    });

    test('Verify "Nothing here yet!" returned when deleting all observations', async () => {
        await test.step('Remove all observations ', async () => {
            const count = await uapRegistryPage.observationArticle.count();

            if (count > 1) {
                for (let i = 0; i < count; i++) {
                    const observation = uapRegistryPage.observationArticle.nth(0);
                    const deleteButton = observation.locator('[value="delete"]');
                    await deleteButton.click();
                }
                await expect(uapRegistryPage.observationArticle).not.toBeVisible();
            } else {
                await expect(uapRegistryPage.observationArticle).not.toBeVisible()
            }
        });
        // "Nothing here yet!" is missing. 
        // Update assertation with additional step, when issue will be resolved
    });
})