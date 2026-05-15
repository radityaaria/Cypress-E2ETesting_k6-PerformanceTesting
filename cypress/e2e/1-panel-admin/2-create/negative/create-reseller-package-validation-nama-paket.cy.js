describe('Create Reseller Package Negative - Validation Nama Paket', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('kolom Nama Paket wajib diisi', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        // Isi kolom lain dengan data valid
        cy.get('input[id*="Badge Text"]').clear().type('Cypress Reseller');

        // Kosongkan Nama Paket
        cy.get('input[id*="Nama Paket"]').clear();

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/nama paket.*wajib|wajib.*nama paket|nama paket.*diisi/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-nama-paket-wajib-diisi');
    });

});
