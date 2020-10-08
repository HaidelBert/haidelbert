import {Asset} from "../entity/asset";

export interface Depreciation {
    asset: Asset;
    netDepreciationAmount: number;
    netRemainingBlockValue: number;
    active: boolean;
}

export function calculateDepreciations(assets: Asset[]): Depreciation[] {
    return assets.map<Depreciation>(asset => {
        const isHalfDepreciation = asset.purchaseDate.getMonth() > 5;
        const isFirstDepreciation = !asset.depreciations || asset.depreciations.length === 0
        let netDepreciationAmount;
        if (isFirstDepreciation && isHalfDepreciation) {
            netDepreciationAmount = Math.round(asset.netAmount / asset.depreciationDuration / 2);
        } else {
            netDepreciationAmount = Math.round(asset.netAmount / asset.depreciationDuration);
        }
        let netRemainingBlockValue = asset.netRemainingBlockValue - netDepreciationAmount;
        const isLastDepreciation = netRemainingBlockValue <= 1;
        if (isLastDepreciation) {
            netRemainingBlockValue = 0;
            netDepreciationAmount = asset.netRemainingBlockValue;
        }

        return {
            asset,
            netDepreciationAmount,
            netRemainingBlockValue,
            active: !isLastDepreciation
        };
    });
}
