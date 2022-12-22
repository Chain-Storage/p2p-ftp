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
        function mySplit(a, delimiter) {
            const result = [];
            let currentToken = [];
            for (let i = 0; i < a.length; i++) {
                if (a[i] === delimiter) {
                    if (currentToken.length !== 0)
                        result.push(currentToken);
                    currentToken = [];
                }
                else {
                    currentToken.push(a[i]);
                }
            }
            if (currentToken.length !== 0)
                result.push(currentToken);
            return result;
        }
        const fileData = mySplit(buffer, -1)[0];
        const fileDataLenght1 = Math.trunc(fileData.length / 6);
        const fileDataLenght2 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght1);
        const fileDataLenght3 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght2);
        const fileDataLenght4 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght3);
        const fileDataLenght5 = Math.trunc(fileData.length / 6) + Math.trunc(fileDataLenght4);
        const fileDataLenght6 = fileData.length;
        console.log(fileData);
        console.log(fileDataLenght1);
        console.log(fileDataLenght2);
        console.log(fileDataLenght3);
        console.log(fileDataLenght4);
        console.log(fileDataLenght5);
        console.log(fileDataLenght6);
    });
}
exports.readFiles = readFiles;
readFiles(__dirname + "/files/Notion Setup 2.0.38.exe");
