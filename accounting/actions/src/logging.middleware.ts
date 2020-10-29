import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        next();
        console.log(req.method + " " + req.path + " " + res.statusCode);
        console.log('Headers:');
        for (let header in req.headers) {
            console.log(header + ' -> ' + req.headers[header]);
        }
        console.log('Body:');
        console.log(JSON.stringify(req.body));
    }
}
