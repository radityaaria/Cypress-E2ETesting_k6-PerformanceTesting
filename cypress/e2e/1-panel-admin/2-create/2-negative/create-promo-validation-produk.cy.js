describe('Create Promo Negative - Validation Produk', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/promo/create');
    });

    it('dropdown Produk wajib dipilih', () => {
        let createPromoRequestCount = 0;

        cy.intercept('POST', '**/promo**', (req) => {
            createPromoRequestCount += 1;
            req.continue();
        });

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Kode Promo"]').clear().type(`Cypress ${randomNumber}`);
        cy.get('.v-field__input[id*="Nama Promo"]').clear().type('Cypress Promo');
        cy.get('.v-field__input[id*="Durasi"]').clear().type('1');
        cy.get('.v-field__input[id*="Nilai Potongan"]').clear().type('1000');
        cy.get('.v-field__input[id*="Maksimal User"]').clear().type('1');
        cy.get('.v-field__input[id*="Maksimal Potongan"]').clear().type('1000');
        cy.get('.v-field__input[id*="Minimal Pembelian"]').clear().type('1000');

        cy.contains('Unggah Thumbnail').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });

        cy.contains('button', 'Simpan Promo')
            .should('be.visible')
            .click();

        cy.wait(500).then(() => {
            expect(createPromoRequestCount).to.eq(0);
        });

        cy.url().should('include', '/promo/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/produk.*wajib|wajib.*produk|produk.*dipilih/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-promo-validation-produk-wajib-dipilih');
    });
});
