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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function getFiles(fileHash) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileData = [];
        for (let index = 0; index < 6; index++) {
            fs_1.default.readFile(__dirname + `/files/${fileHash}-${index}`, {
                encoding: "utf-8",
            }, (err, data) => {
                console.log(data);
                fileData.push(data);
            });
        }
        console.log(fileData);
    });
}
getFiles("Ecb63dfc5f50b4e447d706a3e549df2ef15228cc80189b976b475a2beeb84904bb");
