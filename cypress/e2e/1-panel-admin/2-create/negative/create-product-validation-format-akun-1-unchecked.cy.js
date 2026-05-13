const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Format Akun 1 Unchecked', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('format akun 1 wajib diceklis', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk format 1 tidak dicentang');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        h.selectVarianCypress();
        h.selectTipeProdukCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();

        cy.contains('label', 'Format 1')
            .parent()
            .find('input[type="checkbox"]')
            .then(($el) => {
                if ($el.is(':checked')) {
                    cy.wrap($el).click();
                }
            });

        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        h.submitExpectingClientValidation(/Format\s*1|format\s*1|format\s*akun|label.*wajib|wajib.*label|centang/i);
        cy.screenshotFull('create-product-validation-format-akun-1-unchecked');
    });
});
