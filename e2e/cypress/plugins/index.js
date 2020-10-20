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

function buildPgClient(pgUser, pgHost, pgPassword, pgPort, pgDb) {
    return new Client({
        user: pgUser,
        host: pgHost,
        database: pgDb,
        password: pgPassword,
        port: pgPort,
    });
}

module.exports = (on) => {
    on('task', {
        'db:teardown': async (args) => {
            const {pgUser, pgHost, pgPassword, pgPort, mongoUrl} = args;
            const client = new MongoClient(mongoUrl);
            const vatClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'vat');
            const accountingClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'accounting');
            const afsClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'annual-financial-statements');
            const roaClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'register-of-assets');
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
            const vatClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'vat');
            const accountingClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'accounting');
            const afsClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'annual-financial-statements');
            const roaClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'register-of-assets');
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
                    bookingDate: `03.01.${lastYear}`,
                    name: 'Hausverwaltung. ant. Büro (20 %)',
                    receiptType: 'BANK',
                    taxRate: 20,
                    grossAmount: 2145,
                    netAmount: 1788,
                    category: 'OFFICE_EXPENDITURE',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `07.01.${lastYear}`,
                    name: 'Microsoft, Office',
                    receiptType: 'BANK',
                    taxRate: 20,
                    grossAmount: 1000,
                    netAmount: 834,
                    category: 'MISC_EXPENDITURE',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `08.01.${lastYear}`,
                    name: 'Wiener Linien',
                    receiptType: 'BANK',
                    taxRate: 10,
                    grossAmount: 3300,
                    netAmount: 3000,
                    category: 'TRAVELLING',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `08.01.${lastYear}`,
                    name: 'Phantasy Gmbh',
                    receiptType: 'BANK',
                    taxRate: 0,
                    grossAmount: 1260000,
                    netAmount: 1260000,
                    category: 'REVENUE_SERVICES',
                    reverseCharge: true
                });
                accountingRecords.push({
                    bookingDate: `04.03.${lastYear}`,
                    name: 'SVA, Beitragszahlung',
                    receiptType: 'BANK',
                    taxRate: 0,
                    grossAmount: 711330,
                    netAmount: 711330,
                    category: 'SVA',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `31.03.${lastYear}`,
                    name: 'Bankspesen, Sollzinsen',
                    receiptType: 'BANK',
                    taxRate: 0,
                    grossAmount: 3642,
                    netAmount: 3642,
                    category: 'INTEREST_CHARGES',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `1.04.${lastYear}`,
                    name: 'Phantasy Gmbh',
                    receiptType: 'BANK',
                    taxRate: 20,
                    grossAmount: 1200000,
                    netAmount: 1000000,
                    category: 'REVENUE_SERVICES',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `6.07.${lastYear}`,
                    name: 'Amanzon GA',
                    receiptType: 'KASSA',
                    taxRate: 20,
                    grossAmount: 12000,
                    netAmount: 10000,
                    category: 'GWG',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `12.12.${lastYear}`,
                    name: 'Verkauf Laptop',
                    receiptType: 'KASSA',
                    taxRate: 20,
                    grossAmount: 120000,
                    netAmount: 100000,
                    category: 'REVENUE_DEPRECIATIONS',
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
