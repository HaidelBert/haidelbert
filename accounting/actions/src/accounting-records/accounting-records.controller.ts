import {Controller, Post, Req} from "@nestjs/common";
import {Request, Response} from "express";

type InsertAccountingRecord = {
    newAccountingRecord: {
        taxRate: number,
        bookingDate: number,
        category: string,
        netAmount: number,
        grossAmount: number,
        receiptType: string,
        name: string,
        receiptBase64: string
    };
}

type InsertAccountingRecordsOutput = {
    id: number
};

@Controller()
export class AccountingRecordsController {
    constructor() {}

    @Post("/actions/accounting-records/insert")
    insertAccountingRecord(@Req() req: Request): InsertAccountingRecordsOutput {
        const body = req.body as HasuraAction<InsertAccountingRecord>;

        return {
            id: 1
        };
    }
}
