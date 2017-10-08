import ConversationRepo from "./components/repo/conversation_repo";
import UserRepo from "./components/repo/user_repo";
import ServerApi from "./components/server/api_server";

const Memstore = require("memstore").Store;

// 1. the typeof Memstore is Memory; cause its defined on the libary as "var Memory"
let store = new Memstore();

let convRepo = new ConversationRepo(store);
let userRepo = new UserRepo(store);

// 2. What design patterns do you recognize here?
// Its called basic DI pattern
let server = new ServerApi(convRepo, userRepo);

server.start(5000);

// export to test module
export { server };