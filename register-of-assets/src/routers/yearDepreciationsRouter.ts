import {Router} from "express";
import {YearDepreciationsController} from "../controllers/yearDepreciationsController";
import {checkJwt} from "../middlewares/jwtMiddleware";
import {checkServiceBasicAuth} from "../middlewares/checkServiceBasicAuth";

export function withYearDepreciationsRouter(controller: YearDepreciationsController): Router {
    const router = Router();

    router.post("/protected/year-depreciations", checkJwt, controller.add)
    router.get("/protected/year-depreciations", checkJwt, controller.list)
    router.get("/internal/year-depreciations", checkServiceBasicAuth, controller.listInternal)

    return router;
}
