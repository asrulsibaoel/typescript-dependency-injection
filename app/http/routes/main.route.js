"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./../../../config/env");
exports.default = (server) => {
    const api = server.app;
    const user = server.userRepo;
    const conversation = server.convRepo;
    api.get("/", (req, res, next) => {
        return res.json(200, {
            "message": "SEVER IS RUNNING ON PORT " + env_1.config.port
        });
    });
    api.get("/users", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let newUser = user;
        let listUser = yield newUser.list(0, 5);
        return res.json(200, listUser);
    }));
    api.post("/users", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let newUser = user;
        newUser.id = 1;
        newUser.name = "Asrul Sani";
        newUser.city = "Malang";
        newUser.email = "asrulsibaoel@gmail.com";
        newUser.gender = "male";
        newUser.create(newUser);
        return res.json({ data: newUser });
    }));
    api.get("/users/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let newUser = user;
        return res.json({ data: yield newUser.get(req.params.id) });
    }));
    api.put("/users/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let updateUser = user;
        updateUser.name = "Asrul Sani Ariesandy";
        updateUser.city = "Turen";
        updateUser.email = "asrulsibaoel@gmail.com";
        updateUser.gender = "male";
        yield updateUser.update(req.params.id, updateUser);
        return res.json({ data: updateUser });
    }));
    api.del("/users/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let deleteUser = user;
        yield deleteUser.remove(req.params.id);
        return res.json({ data: deleteUser });
    }));
    api.get("/conversations", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let data = conversation;
        let list = yield data.list(0, 10);
        return res.json(200, list);
    }));
    api.post("/conversations", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let newConv = conversation;
        newConv.id = 2;
        newConv.userId = "1";
        newConv.direction = "outgoing";
        newConv.timestamp = 15000;
        yield newConv.create(newConv);
        return res.json({ data: newConv });
    }));
    api.get("/conversations/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let getConv = conversation;
        return res.json({ data: yield getConv.get(req.params.id) });
    }));
    api.put("/conversations/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let updateConv = conversation;
        updateConv.id = 2;
        updateConv.userId = "1";
        updateConv.direction = "incoming";
        updateConv.timestamp = 15000;
        yield updateConv.update(req.params.id, updateConv);
        return res.json({ data: updateConv });
    }));
    api.del("/conversations/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let deleteConv = conversation;
        yield deleteConv.remove(req.params.id);
        return res.json({ data: deleteConv });
    }));
};
//# sourceMappingURL=main.route.js.map