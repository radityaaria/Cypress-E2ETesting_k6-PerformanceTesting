describe('Create Types Negative - Validation Nama Tipe', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/types');
    });

    it('kolom Nama Tipe wajib diisi', () => {
        let createTypeRequestCount = 0;

        cy.intercept('POST', '**/types**', (req) => {
            createTypeRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Tipe', { timeout: 10000 })
            .should('be.visible')
            .click();

        // Isi dropdown Varian saja, Nama Tipe dikosongkan
        cy.get('[id*="app-select-Varian"]').parent().parent().click();
        cy.contains('.v-list-item', 'Cypress')
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Tipe"]').clear();

        cy.contains('button', 'Buat Tipe').click();

        cy.wait(500).then(() => {
            expect(createTypeRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/nama tipe.*wajib|wajib.*nama tipe|nama tipe.*diisi/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-types-validation-nama-tipe-wajib-diisi');
    });

});
