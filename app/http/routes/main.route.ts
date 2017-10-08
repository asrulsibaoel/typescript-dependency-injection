import * as restify from "restify";
import { config } from "./../../../config/env";
import ServerApi from "../../../components/server/api_server";
import User from "../../../components/repo/user";
import UserRepo from "../../../components/repo/user_repo";
import Conversation from "../../../components/repo/conversation";
import ConversationRepo from "../../../components/repo/conversation_repo";

export default (server: ServerApi) => {
    const api: restify.Server = server.app;
    const user: User = server.userRepo;
    const conversation: Conversation = server.convRepo;

    api.get("/", (req: restify.Request, res: restify.Response, next: restify.Next) => {
        return res.json(200, {
            "message": "SEVER IS RUNNING ON PORT " + config.port
        });
    });
// user CRUD
    api.get("/users", async (req: restify.Request, res: restify.Response, next: restify.Next) => {
        let newUser: UserRepo = <UserRepo> user;
        let listUser: Array<User> = await newUser.list(0, 5);
        return res.json(200, listUser);
    });

    api.post("/users", async (req: restify.Request, res: restify.Response, next: restify.Next) => {
        let newUser: UserRepo = <UserRepo> user;
        newUser.id = 1;
        newUser.name = "Asrul Sani";
        newUser.city = "Malang";
        newUser.email = "asrulsibaoel@gmail.com";
        newUser.gender = "male";
        newUser.create(newUser);
        return res.json({ data: newUser });

    });

    api.get(
        "/users/:id",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let newUser: UserRepo = <UserRepo> user;

            return res.json({ data: await newUser.get(<number> req.params.id) });

        });
    api.put(
        "/users/:id",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let updateUser: UserRepo = <UserRepo> user;
            updateUser.name = "Asrul Sani Ariesandy";
            updateUser.city = "Turen";
            updateUser.email = "asrulsibaoel@gmail.com";
            updateUser.gender = "male";
            await updateUser.update(req.params.id, updateUser);
            return res.json({ data: updateUser });
        });
    api.del(
        "/users/:id",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let deleteUser: UserRepo = <UserRepo> user;
            await deleteUser.remove(req.params.id);
            return res.json({ data: deleteUser });
        });

// conversations CRUD
    api.get(
        "/conversations",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let data: ConversationRepo = <ConversationRepo> conversation;
            let list = await data.list(0, 10);
            return res.json(200, list);
        });

    api.post(
        "/conversations",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let newConv: ConversationRepo = <ConversationRepo> conversation;
            newConv.id = 2;
            newConv.userId = "1";
            newConv.direction = "outgoing";
            newConv.timestamp = 15000;
            await newConv.create(newConv);
            return res.json({ data: newConv });

        });

    api.get(
        "/conversations/:id",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let getConv: ConversationRepo = <ConversationRepo> conversation;

            return res.json({ data: await getConv.get(req.params.id) });

        });
    api.put(
        "/conversations/:id",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let updateConv: ConversationRepo = <ConversationRepo> conversation;
            updateConv.id = 2;
            updateConv.userId = "1";
            updateConv.direction = "incoming";
            updateConv.timestamp = 15000;
            await updateConv.update(req.params.id, updateConv);
            return res.json({ data: updateConv });
        });
    api.del(
        "/conversations/:id",
        async (req: restify.Request, res: restify.Response, next: restify.Next) => {
            let deleteConv: ConversationRepo = <ConversationRepo> conversation;
            await deleteConv.remove(req.params.id);
            return res.json({ data: deleteConv });
        });
};
