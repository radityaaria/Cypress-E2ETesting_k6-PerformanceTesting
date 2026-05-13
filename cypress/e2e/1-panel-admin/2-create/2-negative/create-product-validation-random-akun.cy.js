const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Random Akun', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('dropdown random akun wajib dipilih (Tidak / Ya)', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk tanpa random akun');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        h.selectVarianCypress();
        h.selectTipeProdukCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.fillFormat1WithLabel();
        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        h.submitExpectingClientValidation(/random akun.*wajib|wajib.*random akun|random akun.*dipilih/i);
        cy.screenshotFull('create-product-validation-random-akun');
    });
});
