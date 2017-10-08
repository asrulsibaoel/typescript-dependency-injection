"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const restify = require("restify");
const path = require("path");
const env_1 = require("./../../config/env");
const logger_1 = require("./../../utils/logger");
class ServerApi {
    constructor(convRepo, userRepo) {
        this.userRepo = userRepo;
        this.convRepo = convRepo;
    }
    start(port) {
        this.app = restify.createServer({ name: env_1.config.name });
        this.app.use(restify.bodyParser());
        this.setupMiddleware();
        this.initRouter();
        this.app.listen(port, () => {
            logger_1.logger.info(`${env_1.config.name} is running at ${this.app.url}`);
        });
    }
    initRouter() {
        this.pathToRoutes = path.join(env_1.config.root, "/app/http/routes");
        fs.readdir(this.pathToRoutes, (err, files) => {
            if (err) {
                throw new Error(err);
            }
            else {
                files
                    .filter((file) => path.extname(file) === ".js")
                    .forEach((file) => {
                    const route = require(path.join(this.pathToRoutes, file));
                    route.default(this);
                });
            }
        });
    }
    setupMiddleware() {
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Cache-Control", "no-cache");
            logger_1.logger.info(`${req.method} ${req.url}`);
            logger_1.logger.info(`Params: ${JSON.stringify(req.params)}`);
            return next();
        });
    }
}
exports.default = ServerApi;
//# sourceMappingURL=api_server.js.map