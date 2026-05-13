describe('login negative wrong number or password', () => {
    const toastErrorKredensial = 'Nomor Handphone atau password salah';

    beforeEach(() => {
        cy.visit('/login');
    });

    it('login gagal — nomor tidak terdaftar', () => {
        cy.get('[id*="app-text-field-Nomor"]').type('0899999999999');
        cy.get('[id*="app-text-field-Password"]').type('PasswordAcak123!');
        cy.get(':nth-child(2) > .v-btn').click();

        cy.contains(toastErrorKredensial, { timeout: 15000 }).should('be.visible');
        cy.screenshot('login-negative-nomor-tidak-terdaftar-toast');
        cy.url().should('include', '/login');
    });

    it('login gagal — password salah', () => {
        cy.get('[id*="app-text-field-Nomor"]').type(Cypress.env('USER_PHONE'));
        cy.get('[id*="app-text-field-Password"]').type('SalahPasswordTidakValid123!');
        cy.get(':nth-child(2) > .v-btn').click();

        cy.contains(toastErrorKredensial, { timeout: 15000 }).should('be.visible');
        cy.screenshotFull('login-negative-password-salah-toast');
        cy.url().should('include', '/login');
    });
});