describe('Create Promo Negative - Validation Thumbnail', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/promo/create');
    });

    it('thumbnail promo wajib diunggah', () => {
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
        cy.get('.v-field__input[id*="Nilai Potongan"]').clear().type('1000');
        cy.get('.v-field__input[id*="Maksimal User"]').clear().type('1');
        cy.get('.v-field__input[id*="Maksimal Potongan"]').clear().type('1000');
        cy.get('.v-field__input[id*="Minimal Pembelian"]').clear().type('1000');

        // Sengaja tidak mengunggah thumbnail

        cy.contains('button', 'Simpan Promo')
            .should('be.visible')
            .click();

        cy.url().should('include', '/promo/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/thumbnail.*wajib|wajib.*thumbnail|thumbnail.*unggah|gambar.*wajib/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-promo-validation-thumbnail-wajib-diunggah');
    });
});
