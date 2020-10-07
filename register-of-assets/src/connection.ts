import {Connection, ConnectionManager, createConnection} from "typeorm";
import {Asset} from "./entity/asset";
import {AssetDepreciation} from "./entity/assetDepreciation";
import {YearDepreciation} from "./entity/yearDepreciation";

export const connect = async (): Promise<Connection> => {
    return await createConnection({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT!!, 10),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [Asset, AssetDepreciation, YearDepreciation]
    });
};
