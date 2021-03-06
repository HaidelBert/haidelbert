describe('Main Usecase', () => {
    it('works as exepceted', () => {
        const currentYear = new Date().getFullYear();
        const lastYear = new Date().getFullYear() - 1;
        cy.server();
        cy.route('POST', 'user/api/public/token').as('token');
        cy.route('GET', 'user/api/protected/me').as('me');
        cy.route('PATCH', '/vat/api/protected/pre-registration/*').as('patchPreRegistration');
        cy.route('POST', '/vat/api/protected/pre-registration').as('postPreRegistration');
        cy.route('GET', '/vat/api/protected/pre-registration*').as('getPreRegistration');
        cy.route('POST', '/vat/api/protected/annual-completion').as('postAnnualCompletion');
        cy.route('POST', '/vat/api/protected/annual-completion/simulate*').as('postSimulateAnnualCompletion');
        cy.route('GET', '/vat/api/protected/annual-completion').as('getAnnualCompletions');
        cy.route('PATCH', '/vat/api/protected/annual-completion/*').as('patchAnnualCompletion');
        cy.route('POST', '/annual-financial-statements/api/protected/annual-financial-statements*').as('postAfs');
        cy.route('GET', '/annual-financial-statements/api/protected/annual-financial-statements*').as('getAfs');
        cy.route('POST', '/register-of-assets/api/protected/year-depreciations?year=*').as('postRoaYd');
        cy.visit("");
        cy.location('pathname').should('eq', '/login');
        cy.get('input[placeholder="Username"]').type('HaidelBert');
        cy.get('input[placeholder="Password"]').type('HaidelBert');
        cy.get('button').click();

        cy.wait("@token");
        cy.contains('Username or password wrong!').should('be.visible');

        cy.get('input[placeholder="Username"]').clear();
        cy.get('input[placeholder="Username"]').type('HaidelBert');
        cy.get('input[placeholder="Password"]').clear();
        cy.get('input[placeholder="Password"]').type('test123');
        cy.get('button').click();

        cy.wait("@token");
        cy.wait("@me");

        cy.get('a[href="/vat"]').click();

        [1, 2, 3, 4].forEach(quarter => {
            cy.get('button[cy-data="new-pre-registration"]').click();
            cy.wait(100);
            cy.get('input[formcontrolname="year"]').eq(0).should('be.visible');
            cy.get('input[formcontrolname="year"]').eq(0).type(lastYear.toString(10));
            cy.get('nz-select[formcontrolname="interval"]').eq(0).click()
            cy.contains('Quartal').click();
            cy.get('nz-select[formcontrolname="quarter"]').eq(0).click()
            cy.get('.ant-select-item-option-content').contains(quarter).click();
            cy.contains('Speichern').click();
            cy.wait("@postPreRegistration");
        });
        cy.get('nz-select[cy-data="year-filter"]').click();
        cy.contains(lastYear).click();
        cy.wait("@getPreRegistration");

        [1, 2, 3, 4].forEach(() => {
            cy.wait(10);
            cy.get('button[cy-data="mark-tx-authority-done"]').eq(0).click();
            cy.wait("@patchPreRegistration");
            cy.wait("@getPreRegistration");
            cy.wait(10);
        });

        cy.get('button[cy-data="new-annual-completion"]').click();
        cy.wait(100);
        cy.get('input[formcontrolname="year"]').should('be.visible');
        cy.get('input[formcontrolname="year"]').eq(1).type(lastYear);
        cy.contains('Speichern').focus();
        cy.wait("@postSimulateAnnualCompletion");
        cy.get('button[cy-data="save-annual-completion"]').click();
        cy.wait("@postAnnualCompletion");
        cy.wait("@getAnnualCompletions");
        cy.get('button[cy-data="mark-tx-authority-done"]').eq(0).click();
        cy.wait("@patchAnnualCompletion");
        cy.wait("@getAnnualCompletions");
        cy.wait(100);

        cy.get('a[href="/register-of-assets"]').click();
        cy.get('button[cy-data="new-yearly-depreciations"]').click();
        cy.contains('Weiter').click();
        cy.contains('Durchführen').click();
        cy.wait('@postRoaYd');

        cy.get('a[href="/annual-financial-statements"]').click();
        cy.get('button[cy-data="new-afs"]').click();
        cy.wait(100);
        cy.get('input[formcontrolname="year"]').type(lastYear);
        cy.get('button[cy-data="save-afs"]').click();
        cy.wait('@postAfs');
        cy.wait('@getAfs');

        cy.contains('€15,915.86').should('be.visible');
    });
});
