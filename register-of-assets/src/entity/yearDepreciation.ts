import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AssetDepreciation} from "./assetDepreciation";

@Entity({name: "year_depreciation"})
export class YearDepreciation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    year: number = new Date().getFullYear();
    @OneToMany(() => AssetDepreciation, assetDepreciation => assetDepreciation.yearDepreciation)
    depreciations?: Promise<AssetDepreciation[]>;
}
