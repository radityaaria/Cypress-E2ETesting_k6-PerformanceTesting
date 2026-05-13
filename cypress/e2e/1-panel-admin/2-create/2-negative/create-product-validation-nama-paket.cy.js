const h = require('../../../../support/product-create-validation-helpers');

/** Kolom nama paket di blok Paket #1 */
const clearTypeNamaPaketPertama = (nilai) => {
    cy.contains('span', 'Paket #1')
        .closest('div.mb-6')
        .within(() => {
            cy.contains('label', 'Nama Paket')
                .closest('.v-field')
                .find('input.v-field__input')
                .clear()
                .type(nilai);
        });
};

const kosongkanNamaPaketPertama = () => {
    cy.contains('span', 'Paket #1')
        .closest('div.mb-6')
        .within(() => {
            cy.contains('label', 'Nama Paket')
                .closest('.v-field')
                .find('input.v-field__input')
                .clear();
        });
};

describe('Create Product Negative - Validation Nama Paket', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('kolom nama paket wajib diisi', () => {
        h.fillValidPremiumAccountProduct();
        clearTypeNamaPaketPertama(' ');

        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();
        cy.get('body').should(($body) => {
            const t = $body.text().toLowerCase();
            expect(/harga|wajib|tidak boleh|min|positif|angka/i.test(t)).to.be.true;
        });

        clearTypeNamaPaketPertama(' ');
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();

        kosongkanNamaPaketPertama();
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();
        cy.screenshotFull('create-product-validation-nama-paket');
    });
});
