"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const env = process.env.NODE_ENV || "development";
const debug = true;
const config = {
    name: "Kalimat.ai API Server",
    env: env,
    debug: debug,
    root: path.join(__dirname, "/.."),
    port: 5000,
    db: "none",
    github: {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: ""
    },
};
exports.config = config;
//# sourceMappingURL=env.js.map