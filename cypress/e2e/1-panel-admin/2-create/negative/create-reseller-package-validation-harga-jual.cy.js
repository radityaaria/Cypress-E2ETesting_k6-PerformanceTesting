describe('Create Reseller Package Negative - Validation Harga Jual', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('kolom Harga Jual tidak boleh menerima input nilai negatif atau 0', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        // Isi kolom utama dengan data valid
        cy.get('input[id*="Nama Paket"]').clear().type('Paket Cypress');
        cy.get('input[id*="Badge Text"]').clear().type('Cypress Reseller');

        // Isi Harga Asal valid, Harga Jual dengan 0
        cy.get('[data-cy="reseller-package-variant-original-price-0"] input').clear().type('10000');
        cy.get('[data-cy="reseller-package-variant-selling-price-0"] input').clear().type('0');

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/harga jual.*tidak boleh|harga jual.*0|harga jual.*lebih|minimal.*1|tidak boleh.*0/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-harga-jual-tidak-boleh-0');
    });

});
