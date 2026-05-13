const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Tipe Produk', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('dropdown tipe produk wajib dipilih', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk tanpa tipe');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        h.selectVarianCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();
        h.fillFormat1WithLabel();
        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        h.submitExpectingClientValidation(/tipe produk.*wajib|wajib.*tipe produk|tipe produk.*dipilih/i);
        cy.screenshotFull('create-product-validation-tipe-produk');
    });
});
