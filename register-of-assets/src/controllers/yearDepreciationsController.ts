import {Repository} from "typeorm";
import {YearDepreciation} from "../entity/yearDepreciation";
import {NextFunction, Request, Response} from "express";
import {Asset} from "../entity/asset";
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
                let promises = depreciations.map(async depreciation => {

                    depreciation.asset.netRemainingBlockValue = depreciation.netRemainingBlockValue;
                    await entityManager.save(depreciation.asset);

                    const assetDepreciation= new AssetDepreciation();
                    assetDepreciation.asset = Promise.resolve(depreciation.asset);
                    assetDepreciation.year = year;
                    assetDepreciation.netRemainingBlockValue = depreciation.netRemainingBlockValue;
                    assetDepreciation.netDepreciationAmount = depreciation.netDepreciationAmount;

                    return await entityManager.save(assetDepreciation)
                });
                const resolvedPromises = await Promise.all(promises);
                const totalDepreciations = resolvedPromises
                    .map(assetDepreciation => assetDepreciation.netDepreciationAmount)
                    .reduce((accumulator, currentValue) => accumulator + currentValue);
                const yearDepreciation: YearDepreciation = new YearDepreciation();
                yearDepreciation.sumDepreciations = totalDepreciations;
                yearDepreciation.year = year;
                yearDepreciation.depreciations=Promise.resolve(resolvedPromises);
                yearDepreciation.userId = userId;

                await entityManager.save(yearDepreciation);

                promises = resolvedPromises.map(async depreciation => {
                    depreciation.yearDepreciation = Promise.resolve(yearDepreciation);
                    return entityManager.save(depreciation)
                });

                await Promise.all(promises);

                res.status(201);
            });
        }catch(e) {
            next(e);
        }
    }
}
