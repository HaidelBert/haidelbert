import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Asset} from "./asset";
import {YearDepreciation} from "./yearDepreciation";
import {bigint} from "../helpers/dbHelpers";

@Entity({ name: "asset_depreciations" })
export class AssetDepreciation {
    @PrimaryColumn("bigint", { transformer: [bigint] })
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    year: number = new Date().getFullYear();
    @Column("bigint", { name: "net_depreciation_amount", transformer: [bigint] })
    netDepreciationAmount: number = 0;
    @Column("bigint", {name: "net_remaining_block_value", transformer: [bigint]})
    netRemainingBlockValue: number=0;

    @ManyToOne(() => Asset, asset => asset.depreciations)
    @JoinColumn({ name: "asset_id" })
    asset?: Promise<Asset>;
    @ManyToOne(() => YearDepreciation, yearDepreciation => yearDepreciation.depreciations)
    @JoinColumn({ name: "year_depreciation_id" })
    yearDepreciation?: Promise<YearDepreciation>;
}
