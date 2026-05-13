const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Thumbnail', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('thumbnail produk wajib diunggah', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk tanpa thumbnail');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        h.selectVarianCypress();
        h.selectTipeProdukCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();
        h.fillFormat1WithLabel();
        h.fillNamaPaketDanHargaDasar();

        h.submitExpectingClientValidation(/thumbnail|unggah|gambar|wajib/i);
        cy.screenshotFull('create-product-validation-thumbnail');
    });
});
