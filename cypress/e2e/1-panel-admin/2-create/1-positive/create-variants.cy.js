describe('Create Variants', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/variants');
    });

    it('berhasil membuka form tambah Variants', () => {

        cy.contains('Tambah Varian', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Varian"]').clear().type('Cypress Variants');
        cy.contains('Buat Varian').click();
    });

});