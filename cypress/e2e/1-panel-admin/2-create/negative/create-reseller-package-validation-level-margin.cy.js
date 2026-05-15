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

        // Isi Level Margin dengan nilai negatif
        cy.get('input[id*="Level Margin"]').clear().type('-1');

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/level margin.*tidak boleh|level margin.*negatif|level margin.*minimal|tidak boleh.*negatif|minimal.*0/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-level-margin-tidak-boleh-negatif');
    });

});
