describe('Create Point Settings Negative - Empty Submission', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/point-settings');
    });

    it('menampilkan error saat submit kolom varian dan tipe produk kosong', () => {
        let createPointSettingRequestCount = 0;

        cy.intercept('POST', '**/point-settings', (req) => {
            createPointSettingRequestCount += 1;
            req.continue();
        });

        cy.contains('button', 'Tambah Pengaturan', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('.v-card', 'Tambah Pengaturan Poin')
            .should('be.visible')
            .within(() => {
                cy.get('input[id*="Point"]')
                    .not('[id*="Konversi Point"]')
                    .first()
                    .should('have.value', '1');

                cy.get('input[id*="Konversi Point"]')
                    .should('have.value', '1');
            });

        cy.contains('button', 'Buat')
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        cy.wait(500).then(() => {
            expect(createPointSettingRequestCount).to.eq(0);
        });

        cy.contains('Variant wajib dipilih').should('be.visible');
        cy.contains('Tipe produk wajib dipilih').should('be.visible');
        cy.screenshotFull('create-point-setting-validation-empty-submission');
    });
});
