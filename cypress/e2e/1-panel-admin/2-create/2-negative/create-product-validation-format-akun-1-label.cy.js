const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Format Akun 1 Label', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('kolom label format akun 1 wajib diisi saat format 1 dicentang', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk format 1 label kosong');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');
        h.selectSlugPremiumAccount();
        h.selectKategoriCypress();
        h.selectVarianCypress();
        h.selectTipeProdukCypress();
        cy.get('input[id*="Maksimal User"]').clear().type('2');
        h.selectRandomAkunTidak();

        cy.contains('label', 'Format 1').parent().find('input[type="checkbox"]').click();
        cy.get('input[placeholder*="Email, Password, Link"]').first().clear();

        h.fillNamaPaketDanHargaDasar();
        h.uploadThumbnail();

        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();
        cy.get('body').should(($body) => {
            const t = $body.text().toLowerCase();
            expect(/format|label|wajib|diisi/i.test(t)).to.be.true;
        });
        cy.screenshotFull('create-product-validation-format-akun-1-label-kosong');
    });
});
