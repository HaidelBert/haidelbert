import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Init1602069989105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "assets",
            columns: [
                {
                    name: "id",
                    type: "bigserial",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "purchase_date",
                    type: "date",
                    isNullable: false
                },
                {
                    name: "gross_amount",
                    type: "bigint",
                    isNullable: false
                },
                {
                    name: "net_amount",
                    type: "bigint",
                    isNullable: false
                },
                {
                    name: "depreciation_duration",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "net_remaining_block_value",
                    type: "bigint",
                    isNullable: false
                },
                {
                    name: "user_id",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "asset_depreciations",
            columns: [
                {
                    name: "id",
                    type: "bigserial",
                    isPrimary: true
                },
                {
                    name: "year",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "net_depreciation_amount",
                    type: "bigint",
                    isNullable: false
                },
                {
                    name: "net_remaining_block_value",
                    type: "bigint",
                    isNullable: false
                },
                {
                    name: "asset_id",
                    type: "bigint",
                    isNullable: false
                },
                {
                    name: "year_depreciation_id",
                    type: "bigint",
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "year_depreciations",
            columns: [
                {
                    name: "id",
                    type: "bigserial",
                    isPrimary: true
                },
                {
                    name: "year",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "user_id",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKey("asset_depreciations", new TableForeignKey({
            name: "asset_depreciations_assets_fk",
            columnNames: ["asset_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "assets"
        }));

        await queryRunner.createForeignKey("asset_depreciations", new TableForeignKey({
            name: "asset_depreciations_year_fk",
            columnNames: ["year_depreciation_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "year_depreciations"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const assetDepreciationsTable = await queryRunner.getTable("asset_depreciations");
        await queryRunner.dropForeignKeys("asset_depreciations", assetDepreciationsTable!!.foreignKeys)
        await queryRunner.dropTable("asset_depreciations");
        await queryRunner.dropTable("year_depreciations");
        await queryRunner.dropTable("assets");
    }
}
