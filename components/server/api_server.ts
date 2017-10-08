import * as fs from "fs";
import * as restify from "restify";
import * as path from "path";
import { config } from "./../../config/env";
import { logger } from "./../../utils/logger";
import User from "../repo/user";
import Conversation from "../repo/conversation";

export default class ServerApi {

    [key: string]: any;
    public app: restify.Server;
    public userRepo: User;
    public convRepo: Conversation;
    private pathToRoutes: string;

    /**
     * initial constructor
     * @param conversation Conversation implementation
     * @param user User implementation
     */
    constructor(
        convRepo: Conversation,
        userRepo: User
    ) {
        this.userRepo = userRepo;
        this.convRepo = convRepo;
    }

    /**
     * Start the server
     * @param port port number
     */
    public start(port: number) {
        this.app = restify.createServer({ name: config.name });
        // parse the body of the request into req.params
        this.app.use(restify.bodyParser());
        this.setupMiddleware();
        this.initRouter();
        this.app.listen(port, () => {
            logger.info(`${config.name} is running at ${this.app.url}`);
        });
    }

    /**
     * initialize the router path
     */
    private initRouter(): void {
        // get path to route handlers
        this.pathToRoutes = path.join(config.root, "/app/http/routes");

        // add route handlers
        fs.readdir(this.pathToRoutes, (err: any, files: string[]) => {
            if (err) {
                throw new Error(err);
            } else {
                files
            .filter((file: string) => path.extname(file) === ".js")
            .forEach((file: string) => {
                const route = require(path.join(this.pathToRoutes, file));
                route.default(this);
            });
            }
        });
    }

    /**
     * setup the middleware
     */
    private setupMiddleware(): void {
        // user-defined middleware
        this.app.use((req: any, res: any, next: any) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader("Access-Control-Allow-Origin", "*");

            // disable caching so we'll always get the latest data
            res.setHeader("Cache-Control", "no-cache");

            // log the request method and url
            logger.info(`${req.method} ${req.url}`);

            // log the request body
            logger.info(`Params: ${JSON.stringify(req.params)}`);

            return next();
        });
    }
}