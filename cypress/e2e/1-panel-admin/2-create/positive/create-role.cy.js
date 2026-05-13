describe('Create Role', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/roles');
    });

    it('berhasil membuka form tambah roles', () => {

        cy.contains('Tambah Role', { timeout: 10000 })
            .should('be.visible')
            .click();

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Role"]').clear().type(`Cypress Role ${randomNumber}`);
        cy.contains('Pilih Semua').click();
        cy.contains('Buat Role').click();
    });

});



