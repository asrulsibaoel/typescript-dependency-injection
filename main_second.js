"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = require("./Injector");
const config = require("./config/config.json");
let injector = new Injector_1.Injector(config);
exports.injector = injector;
injector.start();
//# sourceMappingURL=main_second.js.map