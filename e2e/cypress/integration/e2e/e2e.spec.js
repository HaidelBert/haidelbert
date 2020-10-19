describe('Main Usecase', () => {
    it('works as exepceted', () => {
        cy.server();
        cy.route('POST', 'user/api/public/token').as('token')
        cy.route('GET', 'user/api/protected/me').as('me')
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

        cy.get('a[href="/accounting"]').click();
    });
});
