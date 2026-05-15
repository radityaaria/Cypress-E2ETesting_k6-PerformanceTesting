describe('Create Types Negative - Validation Variants', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/variants');
    });

    it('kolom Nama Varian wajib diisi', () => {
        let createTypeRequestCount = 0;

        cy.intercept('POST', '**/variants**', (req) => {
            createTypeRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Varian', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Varian"]').clear();

        cy.contains('button', 'Buat Varian').click();

        cy.wait(500).then(() => {
            expect(createTypeRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/nama varian.*wajib|wajib.*nama varian|nama varian.*diisi/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-types-validation-nama-varian-wajib-diisi');
    });

});
