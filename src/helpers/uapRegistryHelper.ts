import { Page, expect } from '@playwright/test';
import { UAPRegistryPage } from '../pages/uapRegistryPage';

export interface Fields {
    location?: string;
    date?: string;
    image?: string;
    description?: string;
}

export async function fillNewObservationForm(uapRegistryPage: UAPRegistryPage, field: Fields) {

    if (field.location) {
        await uapRegistryPage.locationField.fill(field.location);
    }

    if (field.date) {
        await uapRegistryPage.dateField.fill(field.date);
    }

    if (field.image) {
        await uapRegistryPage.imageUrlField.fill(field.image);
    }

    if (field.description) {
        await uapRegistryPage.descriptionField.fill(field.description);
    }
}
