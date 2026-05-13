describe('Create Point Settings Negative - Validation Point', () => {
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

    const assertInvalidCreateSubmission = () => {
        cy.intercept('POST', '**/point-settings').as('createPointSetting');

        cy.contains('button', 'Buat')
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        cy.wait(500);

        cy.get('@createPointSetting.all').then((requests) => {
            if (requests.length > 0) {
                const lastRequest = requests[requests.length - 1];
                expect(lastRequest.response.statusCode).to.be.gte(400);
            }
        });

        cy.contains('.v-card', 'Tambah Pengaturan Poin').should('be.visible');
    };

    it('kolom Point hanya menerima angka dan tidak boleh 0 atau negatif', () => {
        openCreatePointSettingModal();
        selectVariant();
        selectProductType();

        cy.get('input[id*="Point"]')
            .not('[id*="Konversi Point"]')
            .first()
            .as('pointInput');

        cy.get('@pointInput').clear().type('abc');
        assertInvalidCreateSubmission();

        cy.get('@pointInput').clear().type('0');
        assertInvalidCreateSubmission();

        cy.get('@pointInput').clear().type('-10');
        assertInvalidCreateSubmission();

        cy.screenshotFull('create-point-setting-validation-point-input');
    });
});
