describe('Create Blogs Negative - Validation Thumbnail', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/blogs/create');
    });

    it('Thumbnail wajib diunggah', () => {
        cy.get('.v-field__input[id*="Judul Blog"]').clear().type('Blog Valid Tanpa Thumbnail');
        cy.get('.v-field__input[id*="Link URL"]').clear().type('https://www.cypress.io/');
        cy.get('.ProseMirror').type('Konten valid untuk pengujian blog');
        cy.contains('Buat Blog').click();

        cy.url().should('include', '/blogs/create');
        cy.screenshotFull('create-blogs-validation-thumbnail');
    });
});
