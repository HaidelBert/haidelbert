import {EntityRepository, Repository} from "typeorm";
import {AssetDepreciation} from "../entity/assetDepreciation";

@EntityRepository(AssetDepreciation)
export class AssetDepreciationRepository extends Repository<AssetDepreciation>{

}
