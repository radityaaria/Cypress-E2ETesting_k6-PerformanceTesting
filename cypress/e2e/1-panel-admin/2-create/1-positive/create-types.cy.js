describe('Create Types', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/types');
    });

    it('berhasil membuka form tambah type', () => {

        cy.contains('Tambah Tipe', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Tipe"]').clear().type('Cypress Type');
        cy.get('[id*="app-select-Varian"]').parent().parent().click();

        cy.contains('.v-list-item', 'Cypress')
            .should('be.visible')
            .click();
        cy.contains('Buat Tipe').click();

        cy.url().should('include', '/types');
    });

});