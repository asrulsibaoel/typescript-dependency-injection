import { Injector } from "./Injector";
const config = require("./config/config-2.json");

let injector = new Injector(config);
injector.start();

/**
 * 1. We don't need much class file as a model.
 *
 * 2. Just add a new attribute called "tokens" to "components" path on config-2.json file
 * example :
 * "components" : {
 * /..other components../
 * "tokens" : {
            "file" : "components/repo/generic_repo.js",
            "dependencies" : ["store"],
            "options" : {
                "schema" : {
                    "token": "string",
                    "expire": "int",
                }
            }
        },
 * }
 */

// export to test module
export { injector };