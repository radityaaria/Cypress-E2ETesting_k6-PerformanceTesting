describe('Create Point Settings', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/point-settings');
    });

    it('berhasil membuat pengaturan poin baru', () => {
        cy.contains('button', 'Tambah Pengaturan', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('.v-card', 'Tambah Pengaturan Poin')
            .should('be.visible')
            .within(() => {

                cy.get('[id*="app-select-Varian"]')
                    .eq(0)
                    .closest('[role="combobox"]')
                    .click();
            });

        cy.get('.v-list-item').contains('Cypress').click();

        cy.get('[id*="app-select-Tipe Produk"]')
            .eq(1)
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Cypress Type')
            .should('be.visible')
            .click();

        cy.get('input[id*="Konversi Point"]')
            .clear()
            .type('100');

        cy.contains('button', 'Buat').click();

    });
});