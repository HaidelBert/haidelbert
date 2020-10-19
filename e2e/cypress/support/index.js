// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

beforeEach(() => {
    const mongoUrl = Cypress.env('MONGO_URL') || 'mongodb://root:root@localhost:27017';
    cy.task('db:teardown', mongoUrl);
    cy.task('db:seed', mongoUrl);
});

afterEach(() => {
    const mongoUrl = Cypress.env('MONGO_URL') || 'mongodb://root:root@localhost:27017';
    cy.task('db:teardown', mongoUrl);
    cy.task('db:seed', mongoUrl);
});
