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
class UserRepo {
    constructor(store) {
        this.store = store;
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.store.get(id);
            let data = {
                id: user.id,
                name: user.name,
                gender: user.gender,
                city: user.city,
                phone: user.phone,
                email: user.email
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
                dataBag[index] = yield this.store.get(element);
                data[index] = {
                    id: dataBag[index].id,
                    name: dataBag[index].name,
                    gender: dataBag[index].gender,
                    city: dataBag[index].city,
                    phone: dataBag[index].phone,
                    email: dataBag[index].email
                };
            }));
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = yield this.store.get(this.id);
            if (check || check !== undefined)
                throw new Error("User is already Exist!");
            let user = yield this.store.set(this.id, data);
            let getUser = yield this.store.get(this.id);
            return getUser;
        });
    }
    update(id, partialData) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkData = yield this.store.get(id);
            if (!checkData || checkData == null || checkData === undefined)
                throw new Error("User is not found");
            let updatedData = {
                id: partialData.id,
                name: partialData.name,
                gender: partialData.gender,
                city: partialData.city,
                phone: partialData.phone,
                email: partialData.email
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
exports.default = UserRepo;
//# sourceMappingURL=user_repo.js.map