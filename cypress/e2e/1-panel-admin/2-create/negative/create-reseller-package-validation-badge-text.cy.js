describe('Create Reseller Package Negative - Validation Badge Text', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('kolom Badge Text wajib diisi', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        // Isi kolom lain dengan data valid
        cy.get('input[id*="Nama Paket"]').clear().type('Paket Cypress');

        // Kosongkan Badge Text
        cy.get('input[id*="Badge Text"]').clear();

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/badge text.*wajib|wajib.*badge text|badge text.*diisi|badge.*wajib/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-badge-text-wajib-diisi');
    });

});
