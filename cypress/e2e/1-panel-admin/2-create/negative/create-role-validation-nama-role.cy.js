describe('Create Role Negative - Validation Nama Role', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/roles');
    });

    it('kolom Nama Role wajib diisi', () => {
        let createRoleRequestCount = 0;

        cy.intercept('POST', '**/roles**', (req) => {
            createRoleRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Role', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.get('.v-field__input[id*="Nama Role"]').clear();
        cy.contains('Pilih Semua').click();
        cy.contains('Buat Role').click();

        cy.wait(500).then(() => {
            expect(createRoleRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/nama role.*wajib|wajib.*nama role|nama role.*diisi/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-role-validation-nama-role-wajib-diisi');
    });

});
