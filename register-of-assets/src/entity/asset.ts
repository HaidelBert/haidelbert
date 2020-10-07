import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AssetDepreciation} from "./assetDepreciation";

@Entity()
export class Asset extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string = "";
    @Column()
    purchaseDate: Date = new Date();
    @Column()
    grossAmount: number = 0;
    @Column()
    netAmount: number = 0;
    @Column()
    depreciationDuration: number = 3;
    @Column()
    netRemainingBlockValue: number = 0;

    @OneToMany(() => AssetDepreciation, assetDepreciation => assetDepreciation.asset)
    depreciations?: Promise<AssetDepreciation[]>;
}
