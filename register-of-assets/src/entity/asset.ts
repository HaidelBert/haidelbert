import {BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {AssetDepreciation} from "./assetDepreciation";
import {bigint, date} from "../helpers/dbHelpers";

@Entity({ name: "assets" })
export class Asset{
    @PrimaryColumn("bigint", { transformer: [bigint] })
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string = "";
    @Column( "date", {name: "purchase_date", transformer: [date]})
    purchaseDate: Date = new Date();
    @Column("bigint", {name: "gross_amount", transformer: [bigint]})
    grossAmount: number = 0;
    @Column("bigint", {name: "net_amount", transformer: [bigint]})
    netAmount: number = 0;
    @Column({name: "depreciation_duration"})
    depreciationDuration: number = 3;
    @Column("bigint",{name: "net_remaining_block_value", transformer: [bigint]})
    netRemainingBlockValue: number = 0;
    @Column({name: "user_id"})
    userId: string = "";
    @Column({name: "active"})
    active: boolean = false;

    @OneToMany(() => AssetDepreciation, assetDepreciation => assetDepreciation.asset, {
        eager: true
    })
    @JoinColumn({ name: "asset_id" })
    depreciations?: AssetDepreciation[];
}
