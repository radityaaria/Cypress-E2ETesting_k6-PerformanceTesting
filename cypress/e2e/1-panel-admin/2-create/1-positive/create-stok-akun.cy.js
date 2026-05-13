describe('Create Product', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/stok-akun/create-stock');
    });

    it('berhasil membuat Stok Akun', () => {
        cy.get('[id*="app-select-Varian"]')
            .eq(0)
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Cypress')
            .should('be.visible')
            .click();

        cy.get('[id*="app-select-Tipe Produk"]')
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Cypress Type')
            .should('be.visible')
            .click();

        cy.get('[id*="app-select-Produk"]')
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Produk Cypress')
            .should('be.visible')
            .click();

        cy.get('input[id*="Email"]')
            .clear()
            .type('Cypress@example.com');
        
        cy.get('input[id*="Password"]')
            .clear()
            .type('Cypress123');
        
        cy.contains('button', 'Simpan Stok Akun').click();

        cy.url().should('include', '/stok-akun');
    });
});