"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_repo_1 = require("./components/repo/conversation_repo");
const user_repo_1 = require("./components/repo/user_repo");
const api_server_1 = require("./components/server/api_server");
const Memstore = require("memstore").Store;
let store = new Memstore();
let convRepo = new conversation_repo_1.default(store);
let userRepo = new user_repo_1.default(store);
let server = new api_server_1.default(convRepo, userRepo);
exports.server = server;
server.start(5000);
//# sourceMappingURL=main_first.js.map