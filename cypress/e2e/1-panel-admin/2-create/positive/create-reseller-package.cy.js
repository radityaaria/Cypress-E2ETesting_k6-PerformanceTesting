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
        
        cy.get('[data-cy="reseller-package-variant-original-price-0"] input')
            .clear()
            .type('10000');

        cy.get('[data-cy="reseller-package-variant-selling-price-0"] input')
            .clear()
            .type('8000');

        cy.get('[data-cy="reseller-package-variant-discount-badge-0"] input')
            .clear()
            .type('20%');
        
        cy.get('input[placeholder="Nama fitur"]').first()
            .clear()
            .type('Cypress Priority');
        
        cy.contains('button', 'Buat Paket').click();

        cy.url().should('include', '/reseller-packages');
    });
});