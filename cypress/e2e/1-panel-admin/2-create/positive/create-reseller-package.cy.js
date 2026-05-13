describe('Create Reseller Package', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages/create');
    });

    it('berhasil membuat Reseller Package', () => {

        cy.get('input[id*="Nama Paket"]')
            .clear()
            .type('Paket Cypress');
        
        cy.get('input[id*="Badge Text"]')
            .clear()
            .type('Cypress Reseller');
        
        cy.get('#input-19')
            .clear()
            .type('10000');

        cy.get('#input-21')
            .clear()
            .type('8000');

        cy.get('#input-23')
            .clear()
            .type('20%');
        
        cy.get('#input-30')
            .clear()
            .type('Cypress Priority');
        
        cy.contains('button', 'Buat Paket').click();

        cy.url().should('include', '/reseller-packages');
    });
});