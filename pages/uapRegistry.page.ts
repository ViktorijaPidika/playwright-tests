import { Page, Locator } from '@playwright/test';

export class UAPRegistryPage {

    constructor(private page: Page) { }

    get newObservationDropDown(): Locator { return this.page.locator('[data-testid="new-observation-toggle"]'); }
    get newObservationForm(): Locator { return this.page.locator('[data-testid="new-observation-form"]'); }

    get locationField(): Locator { return this.page.locator('[data-testid="new-observation-location"]'); }
    get dateField(): Locator { return this.page.locator('[data-testid="new-observation-date"]'); }
    get imageUrlField(): Locator { return this.page.locator('[data-testid="new-observation-image-url"]'); }
    get descriptionField(): Locator { return this.page.locator('[data-testid="new-observation-description"]'); }

    get addButton(): Locator { return this.page.locator('[data-testid="new-observation-add-button"]'); }

    get observationArticle(): Locator { return this.page.locator('[data-testid="observations-container-div"] article'); }
    get observationsContainer(): Locator { return this.page.locator('[data-testid="observations-container-div"]'); }

    get observationArticleTitle(): Locator { return this.page.locator('[data-testid="observations-container-div"] article header'); }
    get observationArticleImage(): Locator { return this.page.locator('[data-testid="observations-container-div"] article img'); }
    get observationArticleText(): Locator { return this.page.locator('[data-testid="observations-container-div"] article p'); }

    openUapRegistryPage() {
        return this.page.goto('http://localhost:8000/');
    }

    findObservationByTitle(location: string, date: string): Locator {
        return this.observationArticle.filter({ hasText: `${location} (${date})` });
    }

    checkPartialObservationTitle(partialTitle: string): Locator {
        return this.observationArticle.filter({ hasText: `${partialTitle}` });
    }
}