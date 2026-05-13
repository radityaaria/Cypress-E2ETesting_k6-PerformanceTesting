describe('Create Stok Akun Negative - Empty Submission', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/stok-akun/create-stock');
    });

    it('button Simpan Stok Akun harus terdisable saat semua kolom kosong', () => {
        cy.contains('button', 'Simpan Stok Akun')
            .should('be.visible')
            .and('be.disabled');

        cy.screenshotFull('create-stok-akun-validation-empty-submission-button-disabled');
    });

});
