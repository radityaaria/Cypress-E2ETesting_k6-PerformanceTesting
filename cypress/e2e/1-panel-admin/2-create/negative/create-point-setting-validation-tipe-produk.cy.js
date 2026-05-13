describe('Create Point Settings Negative - Validation Tipe Produk', () => {
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

    const selectVariant = () => {
        cy.contains('.v-card', 'Tambah Pengaturan Poin')
            .within(() => {
                cy.get('[id*="app-select-Varian"]')
                    .eq(0)
                    .closest('[role="combobox"]')
                    .click();
            });

        cy.get('.v-list-item')
            .contains('Cypress')
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

    it('dropdown Tipe Produk wajib dipilih', () => {
        openCreatePointSettingModal();
        selectVariant();

        cy.get('input[id*="Point"]')
            .not('[id*="Konversi Point"]')
            .first()
            .clear()
            .type('10');

        cy.get('input[id*="Konversi Point"]')
            .clear()
            .type('100');

        assertCreateRequestNotSent();
        cy.screenshotFull('create-point-setting-validation-tipe-produk-wajib-dipilih');
    });
});
