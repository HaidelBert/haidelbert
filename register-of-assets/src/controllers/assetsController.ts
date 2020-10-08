import {NextFunction, Request, Response} from "express";
import moment = require("moment");
import {Repository} from "typeorm";
import {Asset} from "../entity/asset";
import {YearDepreciation} from "../entity/yearDepreciation";
import {AssetRepository} from "../repositories/assetsRepository";
import {YearDepreciationRepository} from "../repositories/yearDepreciationRepository";

export class AssetsController {

    private assetRepository: AssetRepository;
    private yearDepreciationsRepository: YearDepreciationRepository;

    constructor(assetRepository: AssetRepository, yearDepreciationsRepository: YearDepreciationRepository) {
        this.assetRepository = assetRepository;
        this.yearDepreciationsRepository = yearDepreciationsRepository;
    }

    addAsset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tmp = req.body as Asset;
            tmp.userId = res.locals.userId;
            tmp.netRemainingBlockValue=tmp.netAmount;

            const existingDepreciation = await this.yearDepreciationsRepository.findOne({ where: { userId: res.locals.userId, year: moment(tmp.purchaseDate).year() }})
            if (existingDepreciation) {
                res.status(409);
                res.send("Forbidden");
                return;
            }

            const newAsset = await this.assetRepository.save<Asset>(tmp)
            res.json(newAsset);
        } catch(e) {
            next(e);
        }
    }

    listAssets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.userId;
            const assets = await this.assetRepository.find({ where: { userId: userId }})
            res.json(assets);
        } catch(e) {
            next(e);
        }
    }
}
