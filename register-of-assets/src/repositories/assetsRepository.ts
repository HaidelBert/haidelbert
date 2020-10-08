import {Asset} from "../entity/asset";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Asset)
export class AssetRepository extends Repository<Asset>{
    async findActive(userId: string, year: number) {
        return await this
            .createQueryBuilder("asset")
            .where(
                "user_id=:userId and asset.active=:active and EXTRACT(year FROM asset.purchase_date)<=:year",
                { active: true, year, userId })
            .getMany();
    }
}
