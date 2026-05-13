describe('login negative empty field', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('login gagal — nomor dan password kosong', () => {
        cy.url().should('include', '/login');

        cy.contains('Masuk')
            .closest('button')
            .should('exist')
            .and('be.disabled');

        cy.screenshotFull('login-negative-kolom-kosong');
    });
});
