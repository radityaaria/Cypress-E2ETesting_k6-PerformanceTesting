const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Nama Produk', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('nama produk wajib diisi', () => {
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi tanpa nama produk');
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        h.selectVarianCypress();
        h.selectTipeProdukCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();
        h.fillFormat1WithLabel();
        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        cy.get('.v-field__input[id*="Nama Produk"]').clear();

        h.submitExpectingClientValidation(/nama produk.*wajib|wajib.*nama produk|nama produk.*diisi/i);
        cy.screenshotFull('create-product-validation-nama-produk');
    });
});
