import {NextFunction, Request, Response} from "express";

export function log(req: Request, res: Response, next: NextFunction) {
    next();
    console.log(`${req.method} ${req.path} ${res.statusCode}`);
}
