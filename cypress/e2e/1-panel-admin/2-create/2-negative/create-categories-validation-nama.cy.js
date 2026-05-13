describe('Create Categories Negative - Validation Nama Kategori', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/categories');
    });

    it('Nama kategori wajib diisi', () => {
        let createCategoryRequestCount = 0;

        // Intercept request untuk memastikan tidak ada request POST ke API categories
        cy.intercept('POST', '**/categories').as('createCategory');
        cy.intercept('POST', '**/categories', (req) => {
            createCategoryRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Kategori', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('Buat')
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        cy.wait(500).then(() => {
            expect(createCategoryRequestCount).to.eq(0);
        });

        cy.contains('Masukkan nama kategori').should('be.visible');
        cy.screenshotFull('create-categories-validation-nama-kosong');
    });
});
