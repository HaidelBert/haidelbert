create table accounting_records
(
    id bigserial PRIMARY KEY,
    running_number int,
    booking_date date NOT NULL,
    name varchar NOT NULL,
    receipt_type varchar NOT NULL,
    tax_rate int NOT NULL,
    gross_amount bigint NOT NULL,
    net_amount bigint NOT NULL,
    category varchar NOT NULL,
    id_user varchar NOT NULL,
    reverse_charge bool NOT NULL,
    storage_identifier varchar NOT NULL,
    created_ts timestamp NOT NULL default CURRENT_TIMESTAMP,
    updated_ts timestamp NOT NULL default CURRENT_TIMESTAMP
);

create table pre_registrations
(
    id bigserial PRIMARY KEY,
    gross_revenue bigint NOT NULL,
    gross_expenditure bigint NOT NULL,
    vat bigint NOT NULL,
    input_tax bigint NOT NULL,
    reverse_charge bigint NOT NULL,
    vat_payable bigint NOT NULL,
    from_date date NOT NULL,
    to_date date NOT NULL,
    year int NOT NULL,
    quarter int,
    month int,
    user_id varchar NOT NULL,
    interval varchar NOT NULL,
    tax_authority_submitted boolean NOT NULL default false
);

create table annual_completions
(
    id bigserial PRIMARY KEY,
    gross_revenue bigint NOT NULL,
    gross_expenditure bigint NOT NULL,
    vat bigint NOT NULL,
    input_tax bigint NOT NULL,
    reverse_charge bigint NOT NULL,
    vat_payable bigint NOT NULL,
    year int NOT NULL,
    user_id varchar NOT NULL,
    tax_authority_submitted boolean NOT NULL default false
);

create table assets
(
    id bigserial PRIMARY KEY,
    name varchar NOT NULL,
    purchase_date date NOT NULL,
    gross_amount bigint NOT NULL,
    net_amount bigint NOT NULL,
    depreciation_duration int NOT NULL,
    net_remaining_amount bigint NOT NULL,
    user_id varchar NOT NULL
);

create table year_depreciations(
    id bigserial PRIMARY KEY,
    year int NOT NULL,
    user_id varchar NOT NULL
);

create table asset_depreciations
(
    id bigserial PRIMARY KEY,
    year int NOT NULL,
    net_depreciation_amount bigint NOT NULL,
    net_remaining_amount bigint NOT NULL,
    asset_id bigint NOT NULL references assets(id),
    year_depreciation_id bigint references year_depreciations(id)
);

create table financial_statements(
    id bigserial PRIMARY KEY,
    year int NOT NULL,
    sum_gross_expenditure bigint NOT NULL,
    sum_net_expenditure bigint NOT NULL,
    sum_gross_revenue bigint NOT NULL,
    sum_net_revenue bigint NOT NULL,
    result bigint NOT NULL,
    user_id varchar NOT NULL,
    tax_authority_submitted boolean NOT NULL default false
);

create unique index uidx_statements_user_id_year on financial_statements(user_id, year);

create table tax_authority_positions(
    id bigserial PRIMARY KEY,
    tax_number varchar NOT NULL,
    gross_amount bigint NOT NULL,
    net_amount bigint NOT NULL,
    financial_statement_id bigint references financial_statements(id)
);

create unique index uidx_tax_authority_positions_tax_number_statement_id on tax_authority_positions(tax_number, financial_statement_id);
