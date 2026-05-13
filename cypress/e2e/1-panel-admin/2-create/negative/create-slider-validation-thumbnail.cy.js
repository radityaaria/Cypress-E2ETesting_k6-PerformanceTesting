describe('Create Slider Negative - Validation Thumbnail', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/sliders');
    });

    it('thumbnail slider wajib diunggah', () => {
        let createSliderRequestCount = 0;

        cy.intercept('POST', '**/sliders**', (req) => {
            createSliderRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Slider', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Slider"]').clear().type('Cypress Slider');
        cy.get('.v-field__input[id*="Link URL"]').clear().type('https://www.cypress.io/');

        // Sengaja tidak mengunggah thumbnail

        cy.contains('Buat Slider').click();

        cy.screenshotFull('create-slider-validation-thumbnail-wajib-diunggah');
    });

});
