#! /usr/bin/env node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var node_fetch_1 = __importDefault(require("node-fetch"));
var handler_1 = require("./handler");
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("./utils");
var args = process.argv.slice(2);
var supportedCommands = ["-v", "--version", "-h", "--help"];
console.clear();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, res, _a, _b, _c, examples, exampleName, _d, answer, _e, setupCI, _f, err_1;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 11, , 12]);
                filePath = path_1.default.resolve(__dirname, "api.json");
                return [4 /*yield*/, (0, node_fetch_1.default)("https://create-anchor-app.vercel.app/api.json")];
            case 1:
                res = _g.sent();
                _b = (_a = fs_1.promises).writeFile;
                _c = [filePath];
                return [4 /*yield*/, res.text()];
            case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_g.sent()]))];
            case 3:
                _g.sent();
                examples = require(filePath);
                if (args.length) {
                    if (supportedCommands.includes(args[0])) {
                        (0, utils_1.flags)(args[0]);
                    }
                    if (!Object.keys(examples).includes(args[0])) {
                        (0, utils_1.flags)(args[0]);
                    }
                    if (args.length > 2 && args.filter(function (x) { return !supportedCommands.includes(x); }).length > 0) {
                        console.log(chalk_1.default.red("Unexpected flag(s) :", args.join(" ")));
                        process.exit(1);
                    }
                }
                _d = args[0];
                if (_d) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, utils_1.whatAreYouBuilding)(examples)];
            case 4:
                _d = (_g.sent());
                _g.label = 5;
            case 5:
                exampleName = _d;
                _e = args[1];
                if (_e) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, utils_1.chooseName)()];
            case 6:
                _e = (_g.sent());
                _g.label = 7;
            case 7:
                answer = _e;
                _f = args[2];
                if (_f) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, utils_1.shouldSetupCI)()];
            case 8:
                _f = (_g.sent());
                _g.label = 9;
            case 9:
                setupCI = _f;
                return [4 /*yield*/, (0, handler_1.handler)(exampleName, answer, setupCI)];
            case 10:
                _g.sent();
                return [3 /*break*/, 12];
            case 11:
                err_1 = _g.sent();
                console.log(chalk_1.default.red("Error fetching latest examples: ".concat(err_1.message)));
                process.exit(1);
                return [3 /*break*/, 12];
            case 12:
                ;
                return [2 /*return*/];
        }
    });
}); })();
