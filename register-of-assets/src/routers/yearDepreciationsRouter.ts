import {Router} from "express";
import {YearDepreciationsController} from "../controllers/yearDepreciationsController";
import {checkJwt} from "../middlewares/jwtMiddleware";

export function withYearDepreciationsRouter(controller: YearDepreciationsController): Router {
    const router = Router();

    router.post("/protected/year-depreciations", checkJwt, controller.add)

    return router;
}
