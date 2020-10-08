import {Repository} from "typeorm";
import {AssetDepreciation} from "../entity/assetDepreciation";
import {YearDepreciation} from "../entity/yearDepreciation";
import {NextFunction, Request, Response} from "express";
import {Asset} from "../entity/asset";
import {calculateDepreciations} from "../domain/depreciation";
import {AssetRepository} from "../repositories/assetsRepository";
import {AssetDepreciationRepository} from "../repositories/assetDepreciationRepository";
import {YearDepreciationRepository} from "../repositories/yearDepreciationRepository";

interface AssetDepreciationPreview {
    name: string;
    netDepreciationAmount: number;
    netRemainingBlockValue: number;
    active: boolean;
}

export class AssetDepreciationsController {

    private assetsRepository: AssetRepository;
    private assetDepreciationsRepository: AssetDepreciationRepository;
    private yearDepreciationsRepository: YearDepreciationRepository;


    constructor(assetsRepository: AssetRepository, assetDepreciationsRepository: AssetDepreciationRepository, yearDepreciationsRepository: YearDepreciationRepository) {
        this.assetsRepository = assetsRepository;
        this.assetDepreciationsRepository = assetDepreciationsRepository;
        this.yearDepreciationsRepository = yearDepreciationsRepository;
    }

    preview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.userId;
            const year = parseInt(req.query["year"] as string, 10);

            const existing = await this.yearDepreciationsRepository.findByYear(userId, year);
            if (existing) {
                res.status(409);
                res.send("forbidden");
                return;
            }

            const assets = await this.assetsRepository.findActive(userId, year);

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
