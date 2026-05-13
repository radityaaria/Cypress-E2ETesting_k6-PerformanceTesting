describe('Create Product', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/products/create');
    });

    it('berhasil membuat produk baru', () => {
        cy.get('.v-field__input[id*="Nama Produk"]')
            .should('be.visible')
            .clear()
            .type('Produk Cypress');

        cy.get('textarea[placeholder*="Deskripsi"]')
            .clear()
            .type('Deskripsi produk cypress');

        cy.get('[id*="app-select-Slug"]')
            .eq(0)
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Premium Account')
            .should('be.visible')
            .click();

        cy.get('[id*="app-select-Kategori"]')
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Cypress')
            .should('be.visible')
            .click();

        cy.get('[id*="app-select-Varian"]')
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

        cy.get('input[id*="Maksimal User"]')
            .clear()
            .type('2');

        cy.get('[id*="app-select-Random Akun"]')
            .eq(1)
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Ya')
            .should('be.visible')
            .click();

        cy.contains('label', 'Format 1')
            .parent()
            .find('input[type="checkbox"]')
            .click();

        cy.get('input[placeholder*="Email, Password, Link"]')
            .clear()
            .type('Email');

        cy.contains('label', 'Format 2')
            .parent()
            .find('input[type="checkbox"]')
            .click();

        cy.get('input[placeholder*="Email, Password, Link"]')
            .eq(1)
            .clear()
            .type('Password');

        cy.contains('span', 'Paket #1')
            .closest('div.mb-6')
            .within(() => {
                cy.contains('label', 'Nama Paket')
                    .closest('.v-field')
                    .find('input.v-field__input')
                    .eq(0)
                    .clear()
                    .type('Paket Cypress');

                cy.contains('label', 'Harga Dasar')
                    .closest('.v-field')
                    .find('input.v-field__input')
                    .clear()
                    .type('1000');
            });

        cy.contains('Unggah Thumbnail').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });

        cy.contains('button', 'Simpan Produk').click();

        cy.url().should('include', '/products');
    });
});