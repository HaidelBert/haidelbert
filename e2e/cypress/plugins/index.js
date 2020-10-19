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

/*
*
* TaxAuthority Category = "TAX_AUTHORITY_PAYMENT"
	OfficeExpenditure Category = "OFFICE_EXPENDITURE"
	Marketing Category = "MARKETING"
	Travelling Category = "TRAVELLING"
	PostPhone Category = "POST_PHONE"
	Training Category = "TRAINING"
	MiscExpenditure Category = "MISC_EXPENDITURE"
	Sva Category = "SVA"
	ThirdPartyServices Category = "THIRD_PARTY_SERVICES"
	OfficeMaterials Category = "OFFICE_MATERIALS"
	Gwg Category = "GWG"
	InterestCharges Category = "INTEREST_CHARGES"
	Insurance Category = "INSURANCE"
	Literature Category = "LITERATURE"
	RevenueServices Category = "REVENUE_SERVICES"
	RevenueDepreciations Category = "REVENUE_DEPRECIATIONS"
* */
const { MongoClient } = require("mongodb");
const { Client } = require('pg')

function insertAccountingRecord(client, record, idUser) {
    return client.query("INSERT INTO accounting_records(booking_date, name, receipt_type, tax_rate, gross_amount, category, id_user, reverse_charge, storage_identifier, net_amount) values(TO_DATE('"+record.bookingDate+"', 'DD.MM.YYYY'), '"+record.name+"', '"+record.receiptType+"', "+record.taxRate+", "+record.grossAmount+", '"+record.category+"', '"+idUser+"', "+record.reverseCharge+", 'asdf', "+record.netAmount+")");
}

module.exports = (on) => {
    on('task', {
        'db:teardown': async (args) => {
            const {pgUser, pgHost, pgPassword, pgPort, mongoUrl} = args;
            const client = new MongoClient(mongoUrl);
            const vatClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'vat',
                password: pgPassword,
                port: pgPort,
            });
            const accountingClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'accounting',
                password: pgPassword,
                port: pgPort,
            });
            const afsClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'annual-financial-statements',
                password: pgPassword,
                port: pgPort,
            });
            const roaClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'register-of-assets',
                password: pgPassword,
                port: pgPort,
            });
            try {
                await vatClient.connect();
                await accountingClient.connect();
                await afsClient.connect();
                await roaClient.connect();
                await client.connect();
                const database = client.db('user');
                const collection = database.collection('users');
                await collection.deleteMany({});

                await vatClient.query("DELETE from annual_completions");
                await vatClient.query("DELETE from pre_registrations");

                await accountingClient.query("DELETE from accounting_records");

                await afsClient.query("DELETE from tax_authority_positions");
                await afsClient.query("DELETE from statements");

                await roaClient.query("DELETE from asset_depreciations");
                await roaClient.query("DELETE from year_depreciations");
                await roaClient.query("DELETE from assets");

                return "Test";
            }catch(e) {
                console.error(e);
                throw e;
            } finally {
                vatClient.end();
                accountingClient.end();
                afsClient.end();
                roaClient.end();
                client.close();
            }
        },
        'db:seed': async (args) => {
            const {pgUser, pgHost, pgPassword, pgPort, mongoUrl} = args;
            const client = new MongoClient(mongoUrl);
            const vatClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'vat',
                password: pgPassword,
                port: pgPort,
            });
            const accountingClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'accounting',
                password: pgPassword,
                port: pgPort,
            });
            const afsClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'annual-financial-statements',
                password: pgPassword,
                port: pgPort,
            });
            const roaClient = new Client({
                user: pgUser,
                host: pgHost,
                database: 'register-of-assets',
                password: pgPassword,
                port: pgPort,
            });
            try {
                await vatClient.connect();
                await accountingClient.connect();
                await afsClient.connect();
                await roaClient.connect();
                await client.connect();
                const database = client.db('user');
                const collection = database.collection('users');

                await collection.insertOne({
                    username: 'HaidelBert',
                    email: 'alexander_haider@hotmail.com',
                    password: '$2y$10$pd6TLjgQo2L3A6i6iXnnDO7XbWtAJJb2KXoogKcGTnKYXDxMZ95B6'
                });
                const user = await collection.findOne()


                const currentYear = new Date().getFullYear();
                const lastYear = new Date().getFullYear() - 1;
                const accountingRecords = [];
                const promises = [];

                accountingRecords.push({
                    bookingDate: `02.01.${lastYear}`,
                    name: 'GTE, Heizung, ant. Büro (20 %)',
                    receiptType: 'BANK',
                    taxRate: 20,
                    grossAmount: 2049,
                    netAmount: 1708,
                    category: 'OFFICE_EXPENDITURE',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `06.04.${lastYear}`,
                    name: 'Microsoft, Office',
                    receiptType: 'BANK',
                    taxRate: 20,
                    grossAmount: 1000,
                    netAmount: 833,
                    category: 'MISC_EXPENDITURE',
                    reverseCharge: false
                });

                accountingRecords.forEach(record => {
                    promises.push(insertAccountingRecord(accountingClient, record, user._id.toString()));
                });
                await Promise.all(promises);
                return "Test";
            }catch(e) {
                console.error(e);
                throw e;
            }finally {
                vatClient.end();
                accountingClient.end();
                afsClient.end();
                roaClient.end();
                client.close();
            }

        },
    })
}
