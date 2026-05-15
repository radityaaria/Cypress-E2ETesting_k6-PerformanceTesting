describe('Create Reseller Package Negative - Validation Fitur & Fasilitas', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('fitur wajib terchecklist dan kolom Nama Fitur wajib diisi', () => {
        let createRequestCount = 0;

        cy.intercept('POST', '**/reseller-packages**', (req) => {
            createRequestCount += 1;
            req.continue();
        });

        // Isi kolom utama dengan data valid
        cy.get('input[id*="Nama Paket"]').clear().type('Paket Cypress');
        cy.get('input[id*="Badge Text"]').clear().type('Cypress Reseller');

        // Kosongkan kolom Nama Fitur (placeholder "Nama Fitur")
        cy.get('input[placeholder="Nama fitur"]').each(($el) => {
            cy.wrap($el).clear();
        });

        cy.contains('button', 'Buat Paket').click();

        cy.wait(500).then(() => {
            expect(createRequestCount).to.eq(0);
        });

        cy.url().should('include', '/reseller-packages/create');

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/fitur.*wajib|wajib.*fitur|nama fitur.*diisi|fitur.*diisi/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-reseller-package-validation-fitur-wajib-diisi');
    });

});
