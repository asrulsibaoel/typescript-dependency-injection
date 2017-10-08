import { Injector } from "./Injector";
const config = require("./config/config.json");

let injector = new Injector(config);
injector.start();

/**
 * 1. Having initialization in configuration file made me easy to get which file
 * I must used as dependency. I just need to call it's key to get it.
 *
 * 2. Its called Inversion of Control (IoC) pattern.
 *
 * 3. Just change my json "file" value on "store" param to "compontents/store/db_store".
 */

// export to test module
export { injector };

