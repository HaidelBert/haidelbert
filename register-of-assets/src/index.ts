import "reflect-metadata";
import * as express from 'express';
import {  config } from "dotenv";
import { connect } from "./connection";
import {Asset} from "./entity/asset";
import {withRouter} from "./routers/assetsRouter";
import {AssetsController} from "./controllers/assetsController";
import {log} from "./middlewares/accessLog";
import * as cors from 'cors';
import * as bodyParser from "body-parser";

config();

connect().then(connection => {
    const assetRepository = connection.getRepository(Asset);
    const assetController = new AssetsController(assetRepository)

    const app = express();
    const {
        PORT = 3000,
    } = process.env;

    app.use(bodyParser.json());
    app.use(cors())
    app.use(log);
    app.use("/register-of-assets/api", withRouter(assetController));

    if (require.main === module) { // true if file is executed
        app.listen(PORT, () => {
            console.log('server started at http://localhost:'+PORT);
        });
    }
});
