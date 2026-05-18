describe('Create Reseller Package Negative - Validation Badge Diskon', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('kolom Badge Diskon tidak boleh nilai negatif/0 dan harus diakhiri dengan "%"', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        // Isi kolom utama dengan data valid
        cy.get('input[id*="Nama Paket"]').clear().type('Paket Cypress');
        cy.get('input[id*="Badge Text"]').clear().type('Cypress Reseller');
        cy.get('input[placeholder="Nama fitur"]').first().clear().type('Cypress Priority');
        cy.get('[data-cy="reseller-package-variant-original-price-0"] input').clear().type('10000');
        cy.get('[data-cy="reseller-package-variant-selling-price-0"] input').clear().type('12500');

        // Isi Badge Diskon dengan 0 (tanpa %)
        cy.get('[data-cy="reseller-package-variant-discount-badge-0"] input').clear().type('0');

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/badge diskon.*tidak boleh|diskon.*0|diskon.*%|badge.*%|tidak boleh.*0|format.*%/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-badge-diskon-tidak-valid');
    });

});
