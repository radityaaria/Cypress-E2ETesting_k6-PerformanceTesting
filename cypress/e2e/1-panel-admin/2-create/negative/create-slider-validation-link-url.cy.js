describe('Create Slider Negative - Validation Link URL', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/sliders');
    });

    it('kolom Link URL wajib diisi', () => {
        let createSliderRequestCount = 0;

        cy.intercept('POST', '**/sliders**', (req) => {
            createSliderRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Slider', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Slider"]').clear().type('Cypress Slider');
        cy.get('#thumbnail-input').selectFile('cypress/fixtures/test-image.png');

        cy.get('.v-field__input[id*="Link URL"]').clear();

        cy.contains('Buat Slider').click();

        cy.wait(500).then(() => {
            expect(createSliderRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/link url.*wajib|wajib.*link url|link url.*diisi|url.*wajib/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-slider-validation-link-url-wajib-diisi');
    });

});
