describe('Create Reseller Package Negative - Validation Level Margin', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('kolom Level Margin tidak boleh menerima input nilai negatif', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        // Isi kolom lain dengan data valid
        cy.get('input[id*="Nama Paket"]').clear().type('Paket Cypress');
        cy.get('input[id*="Badge Text"]').clear().type('Cypress Reseller');
        cy.get('input[placeholder="Nama fitur"]').first().clear().type('Cypress Priority');

        cy.get('input[id*="Level Margin"]').clear().type('0');
        cy.get('[data-cy="reseller-package-variant-original-price-0"] input').clear().type('10000');
        cy.get('[data-cy="reseller-package-variant-selling-price-0"] input').clear().type('12500');
        cy.get('[data-cy="reseller-package-variant-discount-badge-0"] input').clear().type('10');

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.screenshotFull('create-reseller-package-validation-level-margin-tidak-boleh-negatif');
    });

});
