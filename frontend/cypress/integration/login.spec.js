/// <reference types="cypress" />


describe('login', () => {
  beforeEach(() => {
    cy.server();
  })

  it('show error on wrong credentials', () => {
    cy.route({
      method: 'POST',
      url: '**/user/api/public/token',
      status: 400,
      response:{},
    }).as('postToken');

    cy.visit('');
    cy.location('pathname').should('eq', '/login');
    cy.get('input[placeholder="Username"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('button').click();
    cy.wait('@postToken');

    cy.contains('Username or password wrong!').should('be.visible');
  });

  it('successfully logs user in', () => {
    cy.route({
      method: 'POST',
      url: '**/user/api/public/token',
      response:{
        accessToken: 'asdf'
      },
    }).as('postToken');
    cy.route({
      method: 'GET',
      url: '**/user/api/protected/me',
      response:{
        id: 1,
        username: 'HaidelBert',
        email: 'alexander_haider@hotmail.com',
      },
    }).as('getUserDetails');
    cy.visit('');
    cy.location('pathname').should('eq', '/login');
    cy.get('input[placeholder="Username"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('input[placeholder="Password"]').type('HaidelBert');
    cy.get('button').click();
    cy.wait('@postToken');
    cy.wait('@getUserDetails');

    cy.location('pathname').should('eq', '/');
    cy.contains('Dashboard').should('be.visible');
  });
});
