describe('Create Slider Negative - Validation Nama Slider', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/sliders');
    });

    it('kolom Nama Slider wajib diisi', () => {
        let createSliderRequestCount = 0;

        cy.intercept('POST', '**/sliders**', (req) => {
            createSliderRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Slider', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Link URL"]').clear().type('https://www.cypress.io/');
        cy.get('#thumbnail-input').selectFile('cypress/fixtures/test-image.png');

        cy.get('.v-field__input[id*="Nama Slider"]').clear();

        cy.contains('Buat Slider').click();

        cy.wait(500).then(() => {
            expect(createSliderRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/nama slider.*wajib|wajib.*nama slider|nama slider.*diisi/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-slider-validation-nama-slider-wajib-diisi');
    });

});
