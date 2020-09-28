/// <reference types="cypress" />


describe('login', () => {
  beforeEach(() => {
    cy.server();
  })

  it('show error on wrong credentials', () => {
    cy.mockGraphQl('token', {
      errors: {
        "message": "failed get token",
        "path": [
          "token"
        ]
      }});
    cy.mockGraphQl('me', {data: { me: { id: "asdf"}}});

    cy.visit('');
    cy.location('pathname').should('eq', '/login');
    cy.get('input[placeholder="Username"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('button').click();

    cy.contains('Username or password wrong!').should('be.visible');
  });

  it('successfully logs user in', () => {
    cy.mockGraphQl('token', {
      "data": {
        "token": {
          "accessToken": "asdf"
        }
      }
    });
    cy.mockGraphQl('me', { data: { me: { id: "asdf" }}});

    cy.visit('');
    cy.location('pathname').should('eq', '/login');
    cy.get('input[placeholder="Username"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('button').click();

    cy.location('pathname').should('eq', '/');
    cy.contains('Dashboard').should('be.visible');
  });
});
