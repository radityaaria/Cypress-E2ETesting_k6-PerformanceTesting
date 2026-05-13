describe('Create Sliders', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/sliders');
    });

    it('berhasil membuka form tambah sliders', () => {

        cy.contains('Tambah Slider', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Slider"]').clear().type('Cypress Slider');
        cy.get('.v-field__input[id*="Link URL"]').clear().type('https://www.cypress.io/');

        // Upload gambar - pastikan ada file gambar di cypress/fixtures/
        cy.get('#thumbnail-input').selectFile('cypress/fixtures/test-image.png');

        cy.contains('Buat Slider').click();
    });

});