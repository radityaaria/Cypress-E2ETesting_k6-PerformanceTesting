describe('Create Reseller Package Negative - Validation Harga Jual Lebih Besar dari Harga Asal', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('harga jual tidak boleh lebih besar dari harga asal', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        // Isi kolom utama dengan data valid
        cy.get('input[id*="Nama Paket"]').clear().type('Paket Cypress');
        cy.get('input[id*="Badge Text"]').clear().type('Cypress Reseller');

        // Isi Harga Jual lebih besar dari Harga Asal
        cy.get('[data-cy="reseller-package-variant-original-price-0"] input').clear().type('10000');
        cy.get('[data-cy="reseller-package-variant-selling-price-0"] input').clear().type('50000');

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/harga jual.*lebih besar|harga jual.*tidak boleh.*lebih|harga jual.*melebihi|harga asal.*lebih kecil|harga.*tidak valid/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-harga-jual-lebih-besar-dari-harga-asal');
    });

});
