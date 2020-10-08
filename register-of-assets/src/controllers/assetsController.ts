import {NextFunction, Request, Response} from "express";
import {Repository} from "typeorm";
import {Asset} from "../entity/asset";

export class AssetsController {

    private assetRepository: Repository<Asset>;

    constructor(assetRepository: Repository<Asset>) {
        this.assetRepository = assetRepository;
    }

    addAsset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tmp = req.body as Asset;
            tmp.userId = res.locals.userId;
            tmp.netRemainingBlockValue=tmp.netAmount;
            const newAsset = await this.assetRepository.save<Asset>(tmp)
            res.json(newAsset);
        } catch(e) {
            next(e);
        }
    }

    listAssets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const assets = await this.assetRepository.find();
            assets.forEach(value => value.depreciations);
            res.json(assets);
        } catch(e) {
            next(e);
        }
    }
}
