import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Asset {
    @PrimaryGeneratedColumn()
    id?: number;
}
