import {YearDepreciation} from "../entity/yearDepreciation";
import {NextFunction, Request, Response} from "express";
import {AssetDepreciation} from "../entity/assetDepreciation";
import {calculateDepreciations} from "../domain/depreciation";
import {AssetRepository} from "../repositories/assetsRepository";
import {YearDepreciationRepository} from "../repositories/yearDepreciationRepository";
import {AssetDepreciationRepository} from "../repositories/assetDepreciationRepository";

export class YearDepreciationsController {

    private assetsRepository: AssetRepository;
    private yearDepreciationsRepository: YearDepreciationRepository;
    private assetDepreciationsRepository: AssetDepreciationRepository;


    constructor(assetsRepository: AssetRepository, yearDepreciationsRepository: YearDepreciationRepository, assetDepreciationsRepository: AssetDepreciationRepository) {
        this.assetsRepository = assetsRepository;
        this.yearDepreciationsRepository = yearDepreciationsRepository;
        this.assetDepreciationsRepository = assetDepreciationsRepository;
    }

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = res.locals.userId;
            const years = await this.yearDepreciationsRepository.find({ where: { userId }})

            res.json(years);
        } catch(e) {
            next(e);
        }
    }

    add = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const year = parseInt(req.query["year"] as string, 10);
            const userId = res.locals.userId;

            const existing = await this.yearDepreciationsRepository.findByYear(userId, year);
            if (existing) {
                res.status(409);
                res.send("forbidden");
                return;
            }

            const assets = await this.assetsRepository.findActive(userId, year);
            const depreciations = calculateDepreciations(assets);
            await this.assetsRepository.manager.transaction(async entityManager => {
                const assetDepreciations: AssetDepreciation[] = [];
                for(let depreciation of depreciations) {
                    depreciation.asset.netRemainingBlockValue = depreciation.netRemainingBlockValue;
                    depreciation.asset.active = depreciation.active;
                    delete depreciation.asset.depreciations;
                    await entityManager.save(depreciation.asset);

                    const assetDepreciation= new AssetDepreciation();
                    assetDepreciation.asset = Promise.resolve(depreciation.asset);
                    assetDepreciation.year = year;
                    assetDepreciation.netRemainingBlockValue = depreciation.netRemainingBlockValue;
                    assetDepreciation.netDepreciationAmount = depreciation.netDepreciationAmount;

                    await entityManager.save(assetDepreciation)
                    assetDepreciations.push(assetDepreciation);
                }
                const totalDepreciations = assetDepreciations
                    .map(assetDepreciation => assetDepreciation.netDepreciationAmount)
                    .reduce((accumulator, currentValue) => accumulator + currentValue);
                const yearDepreciation: YearDepreciation = new YearDepreciation();
                yearDepreciation.sumDepreciations = totalDepreciations;
                yearDepreciation.year = year;
                yearDepreciation.depreciations=Promise.resolve(assetDepreciations);
                yearDepreciation.userId = userId;

                await entityManager.save(yearDepreciation);

                for(let assetDepreciation of assetDepreciations) {
                    assetDepreciation.yearDepreciation = Promise.resolve(yearDepreciation);
                    await entityManager.save(assetDepreciation)
                }
            });
            res.status(201);
            res.json(undefined);
        }catch(e) {
            next(e);
            return;
        }
    }

    listInternal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const year = parseInt(req.query["year"] as string, 10);
            const userId = req.query["user_id"] as string;
            const yearDepreciation = await this.yearDepreciationsRepository.findByYear(userId, year);

            res.json(yearDepreciation);
            res.status(200);
        }catch(e) {
            next(e);
        }
    }
}
