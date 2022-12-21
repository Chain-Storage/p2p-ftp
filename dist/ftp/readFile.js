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
exports.readFiles = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function readFiles(pathName) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(pathName);
        const buffer = (0, fs_1.readFileSync)(filePath);
        console.log(buffer);
    });
}
exports.readFiles = readFiles;
readFiles(__dirname + "/files/text.txt");
