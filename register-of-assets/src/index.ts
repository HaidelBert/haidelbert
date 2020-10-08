import "reflect-metadata";
import * as express from 'express';
import {  config } from "dotenv";
import { connect } from "./connection";
import {Asset} from "./entity/asset";
import {withAssetsRouter} from "./routers/assetsRouter";
import {AssetsController} from "./controllers/assetsController";
import {log} from "./middlewares/accessLog";
import * as cors from 'cors';
import * as bodyParser from "body-parser";
import {AssetDepreciationsController} from "./controllers/assetDepreciationsController";
import {AssetDepreciation} from "./entity/assetDepreciation";
import {YearDepreciation} from "./entity/yearDepreciation";
import {withAssetDepreciationsRouter} from "./routers/assetDepreciationsRouter";
import {withYearDepreciationsRouter} from "./routers/yearDepreciationsRouter";
import {YearDepreciationsController} from "./controllers/yearDepreciationsController";
import {AssetRepository} from "./repositories/assetsRepository";
import {AssetDepreciationRepository} from "./repositories/assetDepreciationRepository";

config();

connect().then(connection => {
    const assetRepository = connection.getCustomRepository(AssetRepository);
    const assetDepreciationRepository = connection.getCustomRepository(AssetDepreciationRepository);
    const yearDepreciationRepository = connection.getRepository(YearDepreciation);

    const assetController = new AssetsController(assetRepository, yearDepreciationRepository)
    const assetDepreciationsController = new AssetDepreciationsController(assetRepository, assetDepreciationRepository, yearDepreciationRepository);
    const yearDepreciationsController = new YearDepreciationsController(assetRepository, yearDepreciationRepository, assetDepreciationRepository);

    const app = express();
    const {
        PORT = 3000,
    } = process.env;

    app.use(bodyParser.json());
    app.use(cors())
    app.use(log);
    app.use("/register-of-assets/api", withAssetsRouter(assetController));
    app.use("/register-of-assets/api", withAssetDepreciationsRouter(assetDepreciationsController));
    app.use("/register-of-assets/api", withYearDepreciationsRouter(yearDepreciationsController));

    if (require.main === module) { // true if file is executed
        app.listen(PORT, () => {
            console.log('server started at http://localhost:'+PORT);
        });
    }
});
