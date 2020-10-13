import {EntityRepository, Repository} from "typeorm";
import {YearDepreciation} from "../entity/yearDepreciation";

@EntityRepository(YearDepreciation)
export class YearDepreciationRepository extends Repository<YearDepreciation>{
    async findByYear(userId: string, year: number): Promise<YearDepreciation | undefined> {
        return await this
            .createQueryBuilder("yd")
            .where(
                "yd.user_id=:userId and yd.year=:year",
                { userId, year })
            .getOne();
    }
}
