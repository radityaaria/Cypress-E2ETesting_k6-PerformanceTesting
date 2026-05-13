const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Empty Submission', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('submit kosong — tidak mengirim POST produk dan tetap di halaman buat', () => {
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();
        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/wajib|kosong|diisi|required/i.test(t)).to.be.true;
        });
        cy.screenshotFull('create-product-validation-empty-submission');
    });
});
