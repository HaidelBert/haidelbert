import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ActiveAndDepreciationsAmount1602138123425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("assets", new TableColumn({
            name: "active",
            type: "boolean",
            isNullable: false,
            default: false
        }));
        await queryRunner.addColumn("year_depreciations", new TableColumn({
            name: "sum_depreciations",
            type: "bigint",
            isNullable: false,
            default: 0
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("assets", "active");
        await queryRunner.dropColumn("year_depreciations", "sum_depreciations");
    }

}
