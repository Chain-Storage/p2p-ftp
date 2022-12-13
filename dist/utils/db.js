"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createDb = void 0;
const level_1 = require("level");
function createDb(dbInput, typeInput, key, valueInput, get) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a database
        const db = new level_1.Level(dbInput, { valueEncoding: "json" });
        // Add multiple entries
        yield db.batch([{ type: typeInput, key: key, value: valueInput }]);
        // Get value of key 'a': 1
        const value = yield db.get(get);
        console.log(value);
    });
}
exports.createDb = createDb;
function getUser(dbInput, valueInput) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a database
        const db = new level_1.Level(dbInput, { valueEncoding: "json" });
        // Get value of key 'a': 1
        const value = yield db.get(valueInput);
        console.log(value);
    });
}
exports.getUser = getUser;
getUser("userAccount", "userIp");
