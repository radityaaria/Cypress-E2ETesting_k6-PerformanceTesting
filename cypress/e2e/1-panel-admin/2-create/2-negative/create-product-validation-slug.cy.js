const h = require('../../../../support/product-create-validation-helpers');

describe('Create Product Negative - Validation Slug', () => {
    beforeEach(() => {
        h.setupCreateProductValidationTest();
    });

    it('dropdown slug wajib dipilih (Top Up Game / Premium Account)', () => {
        cy.get('.v-field__input[id*="Nama Produk"]').clear().type('Produk tanpa slug');
        cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi');

        h.submitExpectingClientValidation(/slug.*wajib|wajib.*slug|slug.*dipilih/i);
        cy.screenshotFull('create-product-validation-slug');
    });
});
