describe('Create Blogs Negative - Validation Judul', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/blogs/create');
    });

    it('Judul Blog wajib diisi', () => {
        cy.get('.v-field__input[id*="Link URL"]').clear().type('https://www.cypress.io/');
        cy.get('.ProseMirror').type('Konten valid untuk pengujian blog');
        cy.contains('Upload Thumbnail').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });

        cy.contains('Buat Blog')
            .click();

        cy.url().should('include', '/blogs/create');
        cy.screenshotFull('create-blogs-validation-judul');
    });
});
