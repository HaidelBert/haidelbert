import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {AssetDepreciation} from "./assetDepreciation";
import {bigint} from "../helpers/dbHelpers";

@Entity({name: "year_depreciations"})
export class YearDepreciation {
    @PrimaryColumn("bigint", { transformer: [bigint] })
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    year: number = new Date().getFullYear();
    @Column("bigint",{name: "sum_depreciations", transformer: [bigint]})
    sumDepreciations: number = 0;
    @Column({name: "user_id"})
    userId: string = "";
    @OneToMany(() => AssetDepreciation, assetDepreciation => assetDepreciation.yearDepreciation)
    depreciations?: Promise<AssetDepreciation[]>;
}
