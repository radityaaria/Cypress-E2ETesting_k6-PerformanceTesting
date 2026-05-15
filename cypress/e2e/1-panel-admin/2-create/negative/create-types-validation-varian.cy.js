describe('Create Types Negative - Validation Varian', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/types');
    });

    it('dropdown Varian wajib dipilih', () => {
        let createTypeRequestCount = 0;

        cy.intercept('POST', '**/types**', (req) => {
            createTypeRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Tipe', { timeout: 10000 })
            .should('be.visible')
            .click();

        // Isi Nama Tipe saja, dropdown Varian dikosongkan
        cy.get('.v-field__input[id*="Nama Tipe"]').clear().type('Cypress Type Tanpa Varian');

        cy.contains('button', 'Buat Tipe').click();

        cy.wait(500).then(() => {
            expect(createTypeRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/varian.*wajib|wajib.*varian|varian.*dipilih/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-types-validation-varian-wajib-dipilih');
    });

});
