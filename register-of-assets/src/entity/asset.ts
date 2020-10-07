import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AssetDepreciation} from "./assetDepreciation";

@Entity({ name: "assets" })
export class Asset extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string = "";
    @Column({name: "purchase_date"})
    purchaseDate: Date = new Date();
    @Column({name: "gross_amount"})
    grossAmount: number = 0;
    @Column({name: "net_amount"})
    netAmount: number = 0;
    @Column({name: "depreciation_duration"})
    depreciationDuration: number = 3;
    @Column({name: "net_remaining_block_value"})
    netRemainingBlockValue: number = 0;
    @Column({name: "user_id"})
    userId: string = "";

    @OneToMany(() => AssetDepreciation, assetDepreciation => assetDepreciation.asset)
    depreciations?: AssetDepreciation[];
}
