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

function insertAccountingRecord(client, record, userId) {
    return client.query("INSERT INTO accounting_records(booking_date, name, receipt_type, tax_rate, gross_amount, category, id_user, reverse_charge, storage_identifier, net_amount) values(TO_DATE('"+record.bookingDate+"', 'DD.MM.YYYY'), '"+record.name+"', '"+record.receiptType+"', "+record.taxRate+", "+record.grossAmount+", '"+record.category+"', '"+userId+"', "+record.reverseCharge+", 'asdf', "+record.netAmount+")");
}

async function insertAsset(client, asset, userId) {
    const result = await client.query("SELECT nextval('assets_id_seq')");
    await client.query("INSERT INTO assets(id, name, purchase_date, gross_amount, net_amount, depreciation_duration, net_remaining_block_value, user_id, active) values("+result.rows[0].nextval+", '"+asset.name+"', TO_DATE('"+asset.purchaseDate+"', 'DD.MM.YYYY'), "+asset.grossAmount+", "+asset.netAmount+", "+asset.depreciationDuration+", "+asset.netRemainingBlockValue+", '"+userId+"', "+asset.active+")");
    return result.rows[0].nextval
}

async function insertDepreciation(client, assetId, year, netDepreciation, netRemainingBlockValue) {
    return await client.query("INSERT INTO asset_depreciations(year, net_depreciation_amount, net_remaining_block_value, asset_id) values("+year+", "+netDepreciation+", "+netRemainingBlockValue+", "+assetId+")");
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
            const afsClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'annual_financial_statements');
            const roaClient = buildPgClient(pgUser, pgHost, pgPassword, pgPort, 'register_of_assets');
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
                    receiptType: 'CASH',
                    taxRate: 20,
                    grossAmount: 12000,
                    netAmount: 10000,
                    category: 'GWG',
                    reverseCharge: false
                });
                accountingRecords.push({
                    bookingDate: `12.12.${lastYear}`,
                    name: 'Verkauf Laptop',
                    receiptType: 'CASH',
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

                const iMacId = await insertAsset(roaClient, {
                    name: 'iMac',
                    purchaseDate: `01.01.${(lastYear-3)}`,
                    grossAmount: 120000,
                    netAmount: 100000,
                    depreciationDuration: 3,
                    netRemainingBlockValue: 0,
                    active: false
                }, user._id.toString())
                await insertDepreciation(roaClient, iMacId, lastYear-3, 33333, 66667)
                await insertDepreciation(roaClient, iMacId, lastYear-2, 33333, 33334)
                await insertDepreciation(roaClient, iMacId, lastYear-1, 33334, 0)

                const iPhoneId = await insertAsset(roaClient, {
                    name: 'iPhone',
                    purchaseDate: `01.07.${(lastYear-3)}`,
                    grossAmount: 80000,
                    netAmount: 66667,
                    depreciationDuration: 3,
                    netRemainingBlockValue: 11112,
                    active: true
                }, user._id.toString())
                await insertDepreciation(roaClient, iPhoneId, lastYear-3, 11111, 55556)
                await insertDepreciation(roaClient, iPhoneId, lastYear-2, 22222, 33334)
                await insertDepreciation(roaClient, iPhoneId, lastYear-1, 22222, 11112)

                const iPadId = await insertAsset(roaClient, {
                    name: 'iPad',
                    purchaseDate: `01.01.${(lastYear-2)}`,
                    grossAmount: 90000,
                    netAmount: 75000,
                    depreciationDuration: 3,
                    netRemainingBlockValue: 25000,
                    active: true
                }, user._id.toString())
                await insertDepreciation(roaClient, iPadId, lastYear-2, 25000, 50000)
                await insertDepreciation(roaClient, iPadId, lastYear-1, 25000, 25000)

                await roaClient.query("INSERT INTO year_depreciations(year, user_id, sum_depreciations) values("+(lastYear-3)+", '"+user._id.toString()+"', (SELECT sum(net_depreciation_amount) from asset_depreciations WHERE year="+(lastYear-3)+"))");
                await roaClient.query("INSERT INTO year_depreciations(year, user_id, sum_depreciations) values("+(lastYear-2)+", '"+user._id.toString()+"', (SELECT sum(net_depreciation_amount) from asset_depreciations WHERE year="+(lastYear-2)+"))");
                await roaClient.query("INSERT INTO year_depreciations(year, user_id, sum_depreciations) values("+(lastYear-1)+", '"+user._id.toString()+"', (SELECT sum(net_depreciation_amount) from asset_depreciations WHERE year="+(lastYear-1)+"))");
                await roaClient.query("UPDATE asset_depreciations ad set year_depreciation_id=(SELECT id from year_depreciations where year=ad.year)");
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
