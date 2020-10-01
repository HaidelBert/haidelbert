create table accounting_records
(
    id bigserial PRIMARY KEY,
    running_number int,
    booking_date date NOT NULL,
    name varchar NOT NULL,
    receipt_type varchar NOT NULL,
    tax_rate int NOT NULL,
    gross_amount bigint NOT NULL,
    category varchar NOT NULL,
    id_user varchar NOT NULL,
    created_ts timestamp NOT NULL default CURRENT_TIMESTAMP,
    updated_ts timestamp NOT NULL default CURRENT_TIMESTAMP
);