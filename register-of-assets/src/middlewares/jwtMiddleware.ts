import {NextFunction, Request, Response} from "express";
import { verify }  from "jsonwebtoken";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
    if (!req.get("Authorization")) {
        res.status(401);
        res.send("UNAUTHORIZED");
        return;
    }
    const buf = Buffer.from(process.env.JWT_PUBLIC_KEY!!, 'base64');
    const token = req.get("Authorization")!!.replace("Bearer ", "");
    verify(token, buf, (err, decoded) => {
        if (!err) {
            res.locals.userId = (decoded as any).userId;
            next();
        } else {
            res.status(401);
            res.send("UNAUTHORIZED");
        }
    });
}
