const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Deskripsi', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('deskripsi produk wajib diisi', () => {
        cy.get('.v-field__input[id*="Nama Produk"]')
            .should('be.visible')
            .clear()
            .type('Produk tanpa deskripsi');
        cy.get('textarea[placeholder*="Deskripsi"]').clear();
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        h.selectVarianCypress();
        h.selectTipeProdukCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();
        h.fillFormat1WithLabel();
        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        h.submitExpectingClientValidation(/deskripsi.*wajib|wajib.*deskripsi|deskripsi.*diisi/i);
        cy.screenshotFull('create-product-validation-deskripsi');
    });
});
