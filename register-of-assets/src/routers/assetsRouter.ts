import {Router} from "express";
import {AssetsController} from "../controllers/assetsController";
import {checkJwt} from "../middlewares/jwtMiddleware";

export function withAssetsRouter(controller: AssetsController): Router {
    const router = Router();
    router.get("/protected/assets", checkJwt, controller.listAssets)
    router.post("/protected/assets", checkJwt, controller.addAsset)

    return router;
}
