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
    const pgUser = Cypress.env('POSTGRES_USERNAME') || 'postgres';
    const pgHost = Cypress.env('POSTGRES_HOST') || 'localhost';
    const pgPassword = Cypress.env('POSTGRES_PASSWORD') || 'root';
    const pgPort = Cypress.env('POSTGRES_PORT') || '5432';
    cy.task('db:teardown', {mongoUrl, pgUser, pgHost, pgPassword, pgPort}, {log: true});
    cy.task('db:seed', {mongoUrl, pgUser, pgHost, pgPassword, pgPort}, {log: true});
});

afterEach(() => {
    const mongoUrl = Cypress.env('MONGO_URL') || 'mongodb://root:root@localhost:27017';
    const pgUser = Cypress.env('POSTGRES_USERNAME') || 'postgres';
    const pgHost = Cypress.env('POSTGRES_HOST') || 'localhost';
    const pgPassword = Cypress.env('POSTGRES_PASSWORD') || 'root';
    const pgPort = Cypress.env('POSTGRES_PORT') || '5432';
    cy.task('db:teardown', {mongoUrl, pgUser, pgHost, pgPassword, pgPort}, {log: true});
    cy.task('db:seed', {mongoUrl, pgUser, pgHost, pgPassword, pgPort}, {log: true});
});
