describe('Create Slider Negative - Empty Submission', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/sliders');
    });

    it('submit kosong — tidak mengirim POST slider dan menampilkan pesan validasi', () => {
        let createSliderRequestCount = 0;

        cy.intercept('POST', '**/sliders**', (req) => {
            createSliderRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah Slider', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('Buat Slider').click();

        cy.wait(500).then(() => {
            expect(createSliderRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/wajib|kosong|diisi|required/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-slider-validation-empty-submission');
    });

});
