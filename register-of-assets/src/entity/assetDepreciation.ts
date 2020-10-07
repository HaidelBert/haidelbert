import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Asset} from "./asset";
import {YearDepreciation} from "./yearDepreciation";

@Entity()
export class AssetDepreciation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    year: number = new Date().getFullYear();
    @Column()
    netDepreciationAmount: number = 0;
    @Column()
    netRemainingBlockValue: number=0;
    @ManyToOne(() => Asset, asset => asset.depreciations)
    asset?: Asset;
    @ManyToOne(() => YearDepreciation, yearDepreciation => yearDepreciation.depreciations)
    yearDepreciation?: YearDepreciation;
}
