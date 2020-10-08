import {calculateDepreciations} from "./depreciation";
import {Asset} from "../entity/asset";
import exp = require("constants");

describe("depreciation", () => {
    it("returns correct depreciation for first half depreciation", () => {
        const assets: Asset[] = [
            {
                name: "test",
                netAmount: 100000,
                grossAmount: 120000,
                netRemainingBlockValue: 100000,
                depreciationDuration: 3,
                active: true,
                purchaseDate: new Date(2019, 9, 1),
                userId: "",
            }
        ];
        const actual = calculateDepreciations(assets);

        expect(actual[0].active).toBe(true);
        expect(actual[0].netDepreciationAmount).toBe(16667)
        expect(actual[0].netRemainingBlockValue).toBe(83333)
    });

    it("returns correct depreciation for first full depreciation", () => {
        const assets: Asset[] = [
            {
                name: "test",
                netAmount: 100000,
                grossAmount: 120000,
                netRemainingBlockValue: 100000,
                depreciationDuration: 3,
                active: true,
                purchaseDate: new Date(2019, 1, 1),
                userId: "",
            }
        ];
        const actual = calculateDepreciations(assets);

        expect(actual[0].active).toBe(true);
        expect(actual[0].netDepreciationAmount).toBe(33333)
        expect(actual[0].netRemainingBlockValue).toBe(66667)
    });

    it("returns correct depreciations", () => {
        const assets: Asset[] = [
            {
                name: "test",
                netAmount: 100000,
                grossAmount: 120000,
                netRemainingBlockValue: 33334,
                depreciationDuration: 3,
                active: true,
                purchaseDate: new Date(2017, 1, 1),
                userId: "",
                depreciations: [
                    {
                        netDepreciationAmount: 33333,
                        netRemainingBlockValue: 66667,
                        year: 2017,
                    },
                    {
                        netDepreciationAmount: 33333,
                        netRemainingBlockValue: 33334,
                        year: 2018,
                    }
                ]
            }
        ];
        const actual = calculateDepreciations(assets);

        expect(actual[0].active).toBe(false);
        expect(actual[0].netDepreciationAmount).toBe(33334)
        expect(actual[0].netRemainingBlockValue).toBe(0)
    });

    it("returns correct depreciations for half remaining", () => {
        const assets: Asset[] = [
            {
                name: "test",
                netAmount: 100000,
                grossAmount: 120000,
                netRemainingBlockValue: 50000,
                depreciationDuration: 3,
                active: true,
                purchaseDate: new Date(2017, 9, 1),
                userId: "",
                depreciations: [
                    {
                        netDepreciationAmount: 16667,
                        netRemainingBlockValue: 83333,
                        year: 2017,
                    },
                    {
                        netDepreciationAmount: 33333,
                        netRemainingBlockValue: 50000,
                        year: 2018,
                    }
                ]
            }
        ];
        const actual = calculateDepreciations(assets);

        expect(actual[0].active).toBe(true);
        expect(actual[0].netDepreciationAmount).toBe(33333)
        expect(actual[0].netRemainingBlockValue).toBe(16667)
    });

    it("returns correct full depreciation for half", () => {
        const assets: Asset[] = [
            {
                name: "test",
                netAmount: 100000,
                grossAmount: 120000,
                netRemainingBlockValue: 16667,
                depreciationDuration: 3,
                active: true,
                purchaseDate: new Date(2016, 9, 1),
                userId: "",
                depreciations: [
                    {
                        netDepreciationAmount: 16667,
                        netRemainingBlockValue: 83333,
                        year: 2016,
                    },
                    {
                        netDepreciationAmount: 33333,
                        netRemainingBlockValue: 50000,
                        year: 2017,
                    },
                    {
                        netDepreciationAmount: 33333,
                        netRemainingBlockValue: 16667,
                        year: 2018,
                    }
                ]
            }
        ];
        const actual = calculateDepreciations(assets);

        expect(actual[0].active).toBe(false);
        expect(actual[0].netDepreciationAmount).toBe(16667)
        expect(actual[0].netRemainingBlockValue).toBe(0)
    });
});
