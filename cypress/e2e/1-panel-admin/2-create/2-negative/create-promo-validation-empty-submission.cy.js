describe('Create Promo Negative - Empty Submission', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/promo/create');
    });

    it('submit kosong — tidak mengirim POST promo dan menampilkan pesan validasi', () => {
        let createPromoRequestCount = 0;

        cy.intercept('POST', '**/promo**', (req) => {
            createPromoRequestCount += 1;
            req.continue();
        });

        cy.contains('button', 'Simpan Promo')
            .should('be.visible')
            .click();

        cy.wait(500).then(() => {
            expect(createPromoRequestCount).to.eq(0);
        });

        cy.url().should('include', '/promo/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/wajib|kosong|diisi|required/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-promo-validation-empty-submission');
    });
});
