import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Asset} from "./asset";
import {YearDepreciation} from "./yearDepreciation";

@Entity({ name: "asset_depreciations" })
export class AssetDepreciation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    year: number = new Date().getFullYear();
    @Column({ name: "net_depreciation_amount" })
    netDepreciationAmount: number = 0;
    @Column({name: "net_remaining_block_value"})
    netRemainingBlockValue: number=0;

    @ManyToOne(() => Asset, asset => asset.depreciations)
    asset?: Promise<Asset>;
    @ManyToOne(() => YearDepreciation, yearDepreciation => yearDepreciation.depreciations)
    yearDepreciation?: Promise<YearDepreciation>;
}
