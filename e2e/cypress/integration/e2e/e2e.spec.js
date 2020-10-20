describe('Main Usecase', () => {
    it('works as exepceted', () => {
        const currentYear = new Date().getFullYear();
        const lastYear = new Date().getFullYear() - 1;
        cy.server();
        cy.route('POST', 'user/api/public/token').as('token');
        cy.route('GET', 'user/api/protected/me').as('me');
        cy.route('PATCH', '/vat/api/protected/pre-registration/*').as('patchRecord');
        cy.route('POST', '/vat/api/protected/pre-registration').as('postRecord');
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
            cy.get('input[formcontrolname="year"]').eq(0).should('be.visible');
            cy.get('input[formcontrolname="year"]').eq(0).type(lastYear.toString(10));
            cy.get('nz-select[formcontrolname="interval"]').eq(0).click()
            cy.contains('Quartal').click();
            cy.get('nz-select[formcontrolname="quarter"]').eq(0).click()
            cy.get('.ant-select-item-option-content').contains(quarter).click();
            cy.contains('Speichern').click();
            cy.wait("@postRecord");
        });
        cy.get('nz-select[cy-data="year-filter"]').click();
        cy.contains(lastYear).click();

        cy.get('tbody[cy-data="pre-registration-table"]>tr')
            .each(($el, index, $list) => {
                cy.wait(10);
                cy.get('button[cy-data="mark-tx-authority-done"]').eq(0).click();
                cy.wait("@patchRecord");
            });
    });
});
