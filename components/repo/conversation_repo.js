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
class ConversationRepo {
    constructor(store) {
        this.store = store;
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let partialData = yield this.store.get(id);
            let data = {
                id: partialData.id,
                userId: partialData.userId,
                direction: partialData.direction,
                message: partialData.message,
                timestamp: partialData.timestamp
            };
            return data;
        });
    }
    list(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataBag = [];
            let data = [];
            let keys = yield this.store.keys();
            keys.forEach((element, index) => __awaiter(this, void 0, void 0, function* () {
                dataBag = yield this.store.get(element);
                data[index] = {
                    id: dataBag[index].id,
                    userId: dataBag[index].userId,
                    direction: dataBag[index].direction,
                    message: dataBag[index].message,
                    timestamp: dataBag[index].timestamp
                };
            }));
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = yield this.store.get(data.id);
            if (check || check !== undefined)
                throw new Error("Conversation is already Exist!");
            let created = {
                id: data.id,
                userId: data.userId,
                direction: data.direction,
                message: data.message,
                timestamp: data.timestamp
            };
            let conversation = yield this.store.set(data.id, created);
            return conversation;
        });
    }
    update(id, partialData) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkData = yield this.store.get(id);
            if (!checkData || checkData == null || checkData === undefined)
                throw new Error("Conversation is not found");
            let updatedData = {
                id: partialData.id,
                userId: partialData.userId,
                direction: partialData.direction,
                message: partialData.message,
                timestamp: partialData.timestamp
            };
            let data = yield this.store.set(id, updatedData);
            return updatedData;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.store.get(id);
            let deleted = yield this.store.delete(id);
            if (deleted)
                return data;
            throw new Error("Data is already deleted.");
        });
    }
}
exports.default = ConversationRepo;
//# sourceMappingURL=conversation_repo.js.map