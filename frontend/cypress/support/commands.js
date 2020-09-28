// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//import "cypress-graphql-mock";
const gql = require('graphql-tag');

Cypress.Commands.add("mockGraphQl", (operation, response) => {

  cy.route2('http://localhost:9090/user/query', (req) => {
    if (req.method.toLowerCase() === 'options') {
      req.reply({
        headers: {
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Method': "GET,POST,PUT,DELETE,OPTIONS,PATCH",
          'Access-Control-Allow-Headers': "*",
        }
      });
      return;
    }
    const jsonBody = JSON.parse(req.body);
    const obj = gql`
      ${jsonBody.query}
    `;
    if(obj.definitions[0].selectionSet.selections[0].name.value === operation){
      req.reply(
        200,
        response,
        {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Method': "GET,POST,PUT,DELETE,OPTIONS,PATCH",
          'Access-Control-Allow-Headers': "*",
        });
    }
  });
})
