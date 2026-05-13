describe('Create Blogs', () => {

    beforeEach(() => {
        cy.login();
    });

    it('berhasil membuka form tambah Blog', () => {

        cy.visit('/blogs/create');

        cy.get('.v-field__input[id*="Judul Blog"]').clear().type('Cypress Blog');
        cy.get('.v-field__input[id*="Link URL"]').clear().type('https://www.cypress.io/');

        cy.get('.ProseMirror').type('Ini adalah konten blog untuk testing Cypress');

        cy.contains('Upload Thumbnail').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', {force: true});
        
        cy.contains('Buat Blog').click();

        cy.url().should('include', '/blogs');
    });

});