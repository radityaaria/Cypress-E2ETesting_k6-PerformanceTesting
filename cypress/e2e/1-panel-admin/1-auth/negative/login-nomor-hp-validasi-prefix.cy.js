describe('login negative validation prefix', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('validasi nomor HP — harus diawali dengan 08 atau 628', () => {
        cy.get('[id*="app-text-field-Nomor"]').clear().type('07123456789012');
        cy.get('[id*="app-text-field-Password"]').clear().type('PasswordAcak123!');
        cy.contains('Masuk')
            .closest('button')
            .should('exist')
            .and('be.disabled');

        cy.url().should('include', '/login');
        cy.screenshotFull('login-negative-nomor-hp-validasi-prefix');
    });
});
