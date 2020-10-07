import { Router } from "express";
import {assetsController} from '../controllers/assetsController';

const router = Router();

router.get("", function(req, res, next) {
    assetsController.listAssets(req, res, next);
});

router.post("", function(req, res, next) {
    assetsController.addAsset(req, res, next);
});

export const assetsRouter = router;
