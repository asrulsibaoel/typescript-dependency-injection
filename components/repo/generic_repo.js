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
class GenericRepo {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let partialData = yield this.store.get(id);
            delete partialData.store;
            return partialData;
        });
    }
    list(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataBag = [];
            let data = [];
            let keys = yield this.store.keys();
            keys.forEach((element, index) => __awaiter(this, void 0, void 0, function* () {
                dataBag = yield this.store.get(element);
                data[index] = Object.assign(dataBag);
                delete data[index].store;
            }));
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = yield this.store.get(this.id);
            if (check || check !== undefined)
                throw new Error("object is already Exist!");
            let object = yield this.store.set(this.id, data);
            return object;
        });
    }
    update(id, partialData) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkData = yield this.store.get(id);
            if (!checkData || checkData == null || checkData === undefined)
                throw new Error("object is not found");
            let updatedData = Object.assign(partialData);
            delete updatedData.store;
            let data = yield this.store.set(id, updatedData);
            return data;
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
exports.default = GenericRepo;
//# sourceMappingURL=generic_repo.js.map