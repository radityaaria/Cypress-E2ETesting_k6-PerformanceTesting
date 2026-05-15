describe('Create Reseller Package Negative - Empty Submission', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('klik Buat Paket dengan semua kolom kosong — tetap berada di halaman create', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        cy.contains('button', 'Buat Paket')
            .should('be.visible')
            .click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/wajib|kosong|diisi|required/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-empty-submission');
    });

});
