const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Kategori', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('dropdown kategori wajib dipilih', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk tanpa kategori');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');
        h.selectSlugPremiumAccount();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();
        h.fillFormat1WithLabel();
        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        h.submitExpectingClientValidation(/kategori.*wajib|wajib.*kategori|kategori.*dipilih/i);
        cy.screenshotFull('create-product-validation-kategori');
    });
});
