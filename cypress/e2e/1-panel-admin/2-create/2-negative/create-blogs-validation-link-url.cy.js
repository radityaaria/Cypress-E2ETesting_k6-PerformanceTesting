describe('Create Blogs Negative - Validation Link URL', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/blogs/create');
    });

    it('Link URL wajib diisi', () => {
        cy.get('.v-field__input[id*="Judul Blog"]').clear().type('Blog Valid Tanpa URL');
        cy.get('.ProseMirror').type('Konten valid untuk pengujian blog');
        cy.contains('Upload Thumbnail').click();
        cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });

        cy.contains('Buat Blog')
            .click();

        cy.url().should('include', '/blogs/create');
        cy.screenshotFull('create-blogs-validation-link-url');
    });
});
