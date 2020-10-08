import {ValueTransformer} from "typeorm";
import * as moment from "moment";

export const bigint: ValueTransformer = {
    to: (entityValue: number) => entityValue,
    from: (databaseValue: string): number => parseInt(databaseValue, 10)
}

export const date: ValueTransformer = {
    to: (entityValue: Date) => entityValue,
    from: (databaseValue: string): Date => {
        return moment(databaseValue).toDate();
    }
}
