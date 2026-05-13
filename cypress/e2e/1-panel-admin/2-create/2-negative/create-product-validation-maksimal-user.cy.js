const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Maksimal User', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('Premium Account — maksimal user wajib diisi dan tidak boleh 0 / negatif / non-angka', () => {
        h.fillValidPremiumAccountProduct();
        cy.get('input[id*="Maksimal User"]').clear().type('0');

        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();
        cy.get('body').should(($body) => {
            const t = $body.text().toLowerCase();
            expect(
                /maksimal|maximal|user|wajib|tidak boleh|min|angka|positif|lebih besar/i.test(t)
            ).to.be.true;
        });

        cy.get('input[id*="Maksimal User"]').clear().type('-1');
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();

        cy.get('input[id*="Maksimal User"]').clear().type('abc');
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();

        cy.get('input[id*="Maksimal User"]').clear();
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();

        cy.screenshotFull('create-product-validation-maksimal-user');
    });
});
