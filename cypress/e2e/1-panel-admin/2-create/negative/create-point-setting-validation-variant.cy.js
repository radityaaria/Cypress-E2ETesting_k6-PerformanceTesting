describe('Create Point Settings Negative - Validation Variant', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/point-settings');
    });

    const openCreatePointSettingModal = () => {
        cy.contains('button', 'Tambah Pengaturan', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('.v-card', 'Tambah Pengaturan Poin')
            .should('be.visible');
    };

    const selectProductType = () => {
        cy.get('[id*="app-select-Tipe Produk"]')
            .eq(1)
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Cypress Type')
            .should('be.visible')
            .click();
    };

    const assertCreateRequestNotSent = () => {
        let createPointSettingRequestCount = 0;

        cy.intercept('POST', '**/point-settings', (req) => {
            createPointSettingRequestCount += 1;
            req.continue();
        });

        cy.contains('button', 'Buat')
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        cy.wait(500).then(() => {
            expect(createPointSettingRequestCount).to.eq(0);
        });

        cy.contains('.v-card', 'Tambah Pengaturan Poin').should('be.visible');
    };

    it('dropdown Variant wajib dipilih', () => {
        openCreatePointSettingModal();
        selectProductType();

        cy.get('input[id*="Point"]')
            .not('[id*="Konversi Point"]')
            .first()
            .clear()
            .type('10');

        cy.get('input[id*="Konversi Point"]')
            .clear()
            .type('100');

        assertCreateRequestNotSent();
        cy.screenshotFull('create-point-setting-validation-variant-wajib-dipilih');
    });
});
