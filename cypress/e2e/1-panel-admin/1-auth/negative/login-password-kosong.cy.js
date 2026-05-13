describe('login negative empty password', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('login gagal — password kosong', () => {
        cy.get('[id*="app-text-field-Nomor"]').type(Cypress.env('USER_PHONE'));

        cy.contains('Masuk')
            .closest('button')
            .should('exist')
            .and('be.disabled');

        cy.url({ timeout: 10000 }).should('include', '/login');
        cy.screenshotFull('login-negative-password-kosong');
    });
});
