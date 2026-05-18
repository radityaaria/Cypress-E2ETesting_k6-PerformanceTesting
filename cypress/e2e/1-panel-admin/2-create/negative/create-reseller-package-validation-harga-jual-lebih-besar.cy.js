describe('Create Reseller Package Negative - Validation Harga Asal Tidak Boleh Lebih Besar dari Harga Jual', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('harga asal tidak boleh lebih besar dari harga jual (harga jual harus >= harga asal)', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        cy.get('input[id*="Nama Paket"]').clear().type('Paket Cypress');
        cy.get('input[id*="Badge Text"]').clear().type('Cypress Reseller');
        cy.get('input[placeholder="Nama fitur"]').first().clear().type('Cypress Priority');

        // Seharusnya Harga Jual >= Harga Asal agar ada margin keuntungan
        cy.get('[data-cy="reseller-package-variant-original-price-0"] input').clear().type('12500');
        cy.get('[data-cy="reseller-package-variant-selling-price-0"] input').clear().type('10000');
cy.get('[data-cy="reseller-package-variant-discount-badge-0"] input').clear().type('10');
        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/harga asal.*lebih besar|harga jual.*lebih kecil|harga jual.*tidak boleh.*kurang|harga.*tidak valid|harga asal.*tidak boleh/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-harga-asal-tidak-boleh-lebih-besar-dari-harga-jual');
    });

});
