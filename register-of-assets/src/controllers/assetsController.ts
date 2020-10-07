import {NextFunction, Request, Response} from "express";

function addAsset(req: Request, res: Response, next: NextFunction) {

}

function listAssets(req: Request, res: Response, next: NextFunction) {
   res.send(["Test"])
}

export const assetsController = {
    addAsset,
    listAssets
};
