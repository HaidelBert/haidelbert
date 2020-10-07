import "reflect-metadata";
import * as express from 'express';
import {assetsRouter} from "./routes/assetsRoutes";

const app = express();
const {
    PORT = 3000,
} = process.env;

app.set('base', '/register-of--assets/api"');

app.use("/assets", assetsRouter);

if (require.main === module) { // true if file is executed
    app.listen(PORT, () => {
        console.log('server started at http://localhost:'+PORT);
    });
}

export default app;
