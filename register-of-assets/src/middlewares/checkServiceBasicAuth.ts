import {NextFunction, Request, Response} from "express";

export function checkServiceBasicAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization")
    if (!authHeader) {
        res.status(401)
        return;
    }
    const basicAuthBase64 = authHeader.replace("Basic ", "");
    const basicAuth = new Buffer(basicAuthBase64).toString('base64');
    const userNameAndPassword = basicAuth.split(":")
    if (process.env["CLIENT_"+userNameAndPassword[0]] != userNameAndPassword[1]) {
        res.status(401)
        return;
    }
    next();
}
