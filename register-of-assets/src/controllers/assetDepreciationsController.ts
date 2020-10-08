import {Repository} from "typeorm";
import {AssetDepreciation} from "../entity/assetDepreciation";
import {YearDepreciation} from "../entity/yearDepreciation";
import {NextFunction, Request, Response} from "express";
import {Asset} from "../entity/asset";
import {calculateDepreciations} from "../domain/depreciation";

interface AssetDepreciationPreview {
    name: string;
    netDepreciationAmount: number;
    netRemainingBlockValue: number;
    active: boolean;
}

export class AssetDepreciationsController {

    private assetsRepository: Repository<Asset>;
    private assetDepreciationsRepository: Repository<AssetDepreciation>;
    private yearDepreciationsRepository: Repository<YearDepreciation>;


    constructor(assetsRepository: Repository<Asset>, assetDepreciationsRepository: Repository<AssetDepreciation>, yearDepreciationsRepository: Repository<YearDepreciation>) {
        this.assetsRepository = assetsRepository;
        this.assetDepreciationsRepository = assetDepreciationsRepository;
        this.yearDepreciationsRepository = yearDepreciationsRepository;
    }

    preview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.userId;
            const year = parseInt(req.query["year"] as string, 10);

            const existing = await this.yearDepreciationsRepository
                .createQueryBuilder("yd")
                .where(
                    "yd.user_id=:userId and yd.year=:year",
                    { userId, year })
                .getOne();
            if (existing) {
                res.status(409);
                res.send("forbidden");
                return;
            }

            const assets = await this.assetsRepository
                .createQueryBuilder("asset")
                .where(
                    "user_id=:userId and asset.active=:active and EXTRACT(year FROM asset.purchase_date)<=:year",
                    { active: true, year, userId })
                .getMany();

            const depreciations = calculateDepreciations(assets);
            const previews = depreciations.map<AssetDepreciationPreview>(depreciation => {
                return {
                    name: depreciation.asset.name,
                    ...depreciation
                };
            });

            res.json(previews);
        } catch (e) {
            next(e);
        }
    };
}
