const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Varian', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('dropdown varian wajib dipilih', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk tanpa varian');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();
        h.fillFormat1WithLabel();
        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        cy.contains('button', 'Simpan Produk').click();
        cy.screenshotFull('create-product-validation-varian');
    });
});
