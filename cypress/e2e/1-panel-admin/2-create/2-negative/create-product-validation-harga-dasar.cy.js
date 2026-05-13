const h = require('../../../../support/product-create-validation-helpers');

/** Kolom pertama harga dasar di blok Paket #1 (sama seperti create-product.cy.js). */
const clearTypeHargaDasarPaketPertama = (nilai) => {
    cy.contains('span', 'Paket #1')
        .closest('div.mb-6')
        .within(() => {
            cy.contains('label', 'Harga Dasar')
                .closest('.v-field')
                .find('input.v-field__input')
                .clear()
                .type(nilai);
        });
};

const kosongkanHargaDasarPaketPertama = () => {
    cy.contains('span', 'Paket #1')
        .closest('div.mb-6')
        .within(() => {
            cy.contains('label', 'Harga Dasar')
                .closest('.v-field')
                .find('input.v-field__input')
                .clear();
        });
};

describe('Create Product Negative - Validation Harga Dasar', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('kolom harga dasar wajib diisi dan hanya angka lebih dari 0', () => {
        h.fillValidPremiumAccountProduct();
        clearTypeHargaDasarPaketPertama('0');

        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();
        cy.get('body').should(($body) => {
            const t = $body.text().toLowerCase();
            expect(/harga|wajib|tidak boleh|min|positif|angka/i.test(t)).to.be.true;
        });

        clearTypeHargaDasarPaketPertama('0');
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();

        kosongkanHargaDasarPaketPertama();
        h.clickSimpanProduk();
        h.assertCreateProductNotPosted();
        h.assertStaysOnCreatePage();

        cy.screenshotFull('create-product-validation-harga-dasar');
    });
});