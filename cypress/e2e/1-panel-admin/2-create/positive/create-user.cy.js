describe('Create Users', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('berhasil membuka form tambah user', () => {

        cy.contains('Tambah User', { timeout: 10000 })
            .should('be.visible')
            .click();

        const randomNumber = Math.floor(Math.random() * 1000);
        cy.get('[id*="app-text-field-Nomor"]').clear().type('08' + randomNumber * 1000000);
        cy.get('[id*="app-text-field-Username"]').clear().type('Automation_Cypress' + randomNumber);
        cy.get('[id*="app-text-field-Email"]').clear().type('cypress' + randomNumber + '@example.com');

        cy.get('[id*="app-text-field-Password"]').clear().type('2wsx1qaz');
        cy.get('[id*="app-text-field-Konfirmasi"]').clear().type('2wsx1qaz');

        cy.get('[id*="app-select-Peran"]').parent().parent().click();

        cy.contains('.v-list-item', 'SuperAdmin')
            .should('be.visible')
            .click();

        cy.contains('Buat User').click();
    });

});



