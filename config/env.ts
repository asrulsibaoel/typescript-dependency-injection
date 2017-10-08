import * as path from "path";

interface ConfigSettings {
    root: string;
    name: string;
    port: number;
    env: string;
    db: string;
    debug: boolean;
    github: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
    };
}

const env: string = process.env.NODE_ENV || "development";
// const debug: boolean = process.env.DEBUG || false;
const debug: boolean = true;

// default settings are for dev environment
const config: ConfigSettings = {
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


export { config };
