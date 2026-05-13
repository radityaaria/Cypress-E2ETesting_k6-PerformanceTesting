describe('Create Categories', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/categories');
    });

    it('berhasil membuka form tambah categories', () => {

        cy.contains('Tambah Kategori', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Kategori"]').clear().type('Cypress Category');

        cy.contains('Buat').click();
        
    });

});



