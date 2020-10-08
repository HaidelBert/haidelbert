import {Router} from "express";
import {checkJwt} from "../middlewares/jwtMiddleware";
import {AssetDepreciationsController} from "../controllers/assetDepreciationsController";

export function withAssetDepreciationsRouter(controller: AssetDepreciationsController): Router {
    const router = Router();
    router.post("/protected/asset-depreciations/preview", checkJwt, controller.preview)

    return router;
}
