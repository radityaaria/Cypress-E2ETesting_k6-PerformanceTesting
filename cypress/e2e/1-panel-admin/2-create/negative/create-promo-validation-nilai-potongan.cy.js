describe('Create Promo Negative - Validation Nilai Potongan', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/promo/create');
    });

    it('nilai potongan tidak boleh diisi dengan angka 0', () => {
        let createPromoRequestCount = 0;

        cy.intercept('POST', '**/promo**', (req) => {
            createPromoRequestCount += 1;
            req.continue();
        });

        cy.contains('Produk').closest('[role="combobox"]').click();
        cy.contains('.v-list-item', 'Cypress')
            .click();

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Kode Promo"]').clear().type(`Cypress ${randomNumber}`);
        cy.get('.v-field__input[id*="Nama Promo"]').clear().type('Cypress Promo');
        cy.get('.v-field__input[id*="Durasi"]').clear().type('1');
        cy.get('.v-field__input[id*="Nilai Potongan"]').clear().type('0');
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
            expect(/nilai potongan.*tidak boleh|nilai potongan.*0|nilai potongan.*lebih|nilai potongan.*wajib|minimal.*1/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-promo-validation-nilai-potongan-tidak-boleh-0');
    });
});
