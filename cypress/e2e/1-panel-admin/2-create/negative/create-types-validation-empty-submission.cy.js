describe('Create Types Negative - Empty Submission', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/types');
    });

    it('button Buat Tipe harus terdisable saat semua kolom kosong', () => {
        cy.contains('Tambah Tipe', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('button', 'Buat Tipe')
            .should('be.visible')
            .click();

        cy.screenshotFull('create-types-validation-empty-submission-button-disabled');
    });

});
