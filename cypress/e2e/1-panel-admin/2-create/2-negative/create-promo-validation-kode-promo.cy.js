describe('Create Promo Negative - Validation Kode Promo', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/promo/create');
    });

    it('kolom Kode Promo wajib diisi', () => {
        let createPromoRequestCount = 0;

        cy.intercept('POST', '**/promo**', (req) => {
            createPromoRequestCount += 1;
            req.continue();
        });

        cy.contains('Produk').closest('[role="combobox"]').click();
        cy.contains('.v-list-item', 'Cypress')
            .click();

        cy.get('.v-field__input[id*="Nama Promo"]').clear().type('Cypress Promo');
        cy.get('.v-field__input[id*="Durasi"]').clear().type('1');
        cy.get('.v-field__input[id*="Nilai Potongan"]').clear().type('1000');
        cy.get('.v-field__input[id*="Maksimal User"]').clear().type('1');
        cy.get('.v-field__input[id*="Maksimal Potongan"]').clear().type('1000');
        cy.get('.v-field__input[id*="Minimal Pembelian"]').clear().type('1000');

        cy.contains('Unggah Thumbnail').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });

        cy.get('.v-field__input[id*="Kode Promo"]').clear();

        cy.contains('button', 'Simpan Promo')
            .should('be.visible')
            .click();

        cy.wait(500).then(() => {
            expect(createPromoRequestCount).to.eq(0);
        });

        cy.url().should('include', '/promo/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/kode promo.*wajib|wajib.*kode promo|kode promo.*diisi/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-promo-validation-kode-promo-wajib-diisi');
    });
});
