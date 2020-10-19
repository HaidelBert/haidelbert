/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const { MongoClient } = require("mongodb");

module.exports = (on) => {
    on('task', {
        'db:teardown': async (mongoUrl) => {
            try {
                const client = new MongoClient(mongoUrl);
                await client.connect();
                const database = client.db('user');
                const collection = database.collection('users');
                await collection.deleteMany({});

                return "Test";
            }catch(e) {
                console.error(e);
                throw e;
            }
        },
        'db:seed': async (mongoUrl) => {
            const client = new MongoClient(mongoUrl);
            await client.connect();
            const database = client.db('user');
            const collection = database.collection('users');

            await collection.insertOne({
                username: 'HaidelBert',
                email: 'alexander_haider@hotmail.com',
                password: '$2y$10$pd6TLjgQo2L3A6i6iXnnDO7XbWtAJJb2KXoogKcGTnKYXDxMZ95B6'

            });
            return "Test";
        },
    })
}
