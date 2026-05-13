describe('Create Stok Akun Negative - Validation Data Akun', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/stok-akun/create-stock');
    });

    it('button Simpan tidak disabled setelah dropdown diisi, namun muncul error karena data akun belum diisi sesuai format', () => {
        let createStokAkunRequestCount = 0;

        cy.intercept('POST', '**/stok-akun**', (req) => {
            createStokAkunRequestCount += 1;
            req.continue();
        });

        // Isi semua dropdown
        cy.get('[id*="app-select-Varian"]')
            .eq(0)
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Cypress')
            .should('be.visible')
            .click();

        cy.get('[id*="app-select-Tipe Produk"]')
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Cypress Type')
            .should('be.visible')
            .click();

        cy.get('[id*="app-select-Produk"]')
            .parent()
            .parent()
            .click();

        cy.get('.v-list-item')
            .contains('Produk Cypress')
            .should('be.visible')
            .click();

        // Verifikasi button sudah tidak disabled setelah dropdown diisi
        cy.contains('button', 'Simpan Stok Akun')
            .should('be.visible')
            .and('not.be.disabled');

        // Klik simpan tanpa mengisi data akun (Email & Password)
        cy.contains('button', 'Simpan Stok Akun').click();

        // Verifikasi muncul error karena data akun belum diisi sesuai format
        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/wajib|diisi|required|format|tidak valid|email|password/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-stok-akun-validation-data-akun-belum-diisi');
    });

});
