import {Module} from "@nestjs/common";
import {AccountingRecordsController} from "./accounting-records.controller";

@Module({
    imports: [],
    controllers: [AccountingRecordsController],
    providers: [],
})
export class AccountingRecordsModule {}
