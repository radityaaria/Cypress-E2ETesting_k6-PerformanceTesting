describe('login negative validation minimum digit', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('validasi nomor HP — minimal 10 digit', () => {
        cy.get('[id*="app-text-field-Nomor"]').clear().type('081234567');
        cy.get('[id*="app-text-field-Password"]').clear().type('PasswordAcak123!');
        cy.contains('Masuk')
            .closest('button')
            .should('exist')
            .and('be.disabled');

        cy.url().should('include', '/login');
        cy.screenshotFull('login-negative-validasi-min-digit-nomor-hp');
    });
});
