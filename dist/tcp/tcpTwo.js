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
// Import the package
const ws_1 = __importDefault(require("ws"));
// Create a server
const server = new ws_1.default.Server({ port: 9000 });
// Listens for connections
server.on("connection", (socket, req) => __awaiter(void 0, void 0, void 0, function* () {
    // This event handler will be triggered every time somebody send us connections
}));
// Get the socket from an address
const socket = new ws_1.default("ws://localhost:9000");
// Open a connection
socket.on("open", () => {
    // This event handler will be triggered when a connection is opened
    console.log("Hello world");
});
// Close a connection
socket.on("close", () => {
    // This event handler will be triggered when the connection is closed
    console.log("by by world");
});
// Listens for messages
socket.on("message", (message) => {
    // "message" is message, yes
    console.log("by by world " + message);
});
