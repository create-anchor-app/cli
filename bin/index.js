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
var inquirer_1 = __importDefault(require("inquirer"));
var fs_1 = __importDefault(require("fs"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var handler_1 = require("./handler");
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var generate = require("project-name-generator");
var args = process.argv.slice(2);
var supportedCommands = ["-v", "--version", "-h", "--help"];
console.clear();
var examples = {};
(0, node_fetch_1.default)("https://gist.githubusercontent.com/anoushk1234/9854cf8e306524b7fe39b3835013d315/raw/9d9f2e39df620693696cb163f3240d12e0ede69a/api.json")
    .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _b = (_a = fs_1.default).writeFile;
                _c = [path_1.default.resolve(__dirname, "api.json")];
                return [4 /*yield*/, res.text()];
            case 1:
                _b.apply(_a, _c.concat([_d.sent(), function (err) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, exampleName_1, name_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    examples = require(path_1.default.resolve(__dirname, "api.json"));
                                    _a = args.length;
                                    switch (_a) {
                                        case 0: return [3 /*break*/, 1];
                                        case 1: return [3 /*break*/, 2];
                                        case 2: return [3 /*break*/, 3];
                                    }
                                    return [3 /*break*/, 7];
                                case 1:
                                    inquirer_1.default
                                        .prompt([
                                        {
                                            type: "list",
                                            name: "example",
                                            message: "What are you building today?",
                                            choices: Object.keys(examples),
                                        },
                                    ])
                                        .then(function (answer) {
                                        exampleName_1 = answer.example;
                                        chooseName()
                                            .then(function (answer) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, (0, handler_1.handler)(exampleName_1, answer)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })
                                            .catch(function (err) {
                                            console.clear();
                                            if (err.command) {
                                                console.log("".concat(chalk_1.default.cyan(err.command), " has failed."));
                                            }
                                            else {
                                                console.log(chalk_1.default.red("Unexpected error. Please report it as a bug:"));
                                                console.log(err.message);
                                            }
                                        });
                                    })
                                        .catch(function (err) {
                                        console.clear();
                                        console.log(chalk_1.default.red("Unexpected error. Please report it as a bug:"));
                                        console.log(err.message);
                                    });
                                    return [3 /*break*/, 8];
                                case 2:
                                    if (Object.keys(examples).includes(args[0])) {
                                        chooseName()
                                            .then(function (answer) { return __awaiter(void 0, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, (0, handler_1.handler)(args[0], answer)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })
                                            .catch(function (err) {
                                            console.clear();
                                            if (err.command) {
                                                console.log("".concat(chalk_1.default.cyan(err.command), " has failed."));
                                            }
                                            console.log(chalk_1.default.red("Unexpected error. Please report it as a bug:"));
                                            console.log(err.message);
                                        });
                                    }
                                    else {
                                        flags(args[0]);
                                    }
                                    return [3 /*break*/, 8];
                                case 3:
                                    if (!Object.keys(examples).includes(args[0])) return [3 /*break*/, 5];
                                    return [4 /*yield*/, (0, handler_1.handler)(args[0], args[1])];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 6];
                                case 5:
                                    flags(args[0]);
                                    _b.label = 6;
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    if (args.filter(function (x) { return !supportedCommands.includes(x); }).length > 0) {
                                        console.log(chalk_1.default.red("Unexpected flag(s) :", args.join(" ")));
                                        process.exit(1);
                                    }
                                    if (args.includes("-v") || args.includes("--version")) {
                                        flags("-v");
                                    }
                                    _b.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); }]));
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (err) {
    console.log(chalk_1.default.red("Error fetching latest examples: ".concat(err.message)));
    process.exit(1);
});
function flags(flag) {
    switch (flag) {
        case "-h" || "--help":
            console.log("Please visit  ".concat(chalk_1.default.cyan("https://github.com/create-anchor-app/cli#readme"), " to know more about the usage of this CLI."));
            break;
        case "-v" || "--version":
            console.log("".concat(chalk_1.default.cyan("create-anchor-app"), " ").concat(chalk_1.default.green(require(path_1.default.resolve(__dirname, "../package.json")).version)));
            break;
        default:
            console.log(chalk_1.default.red("Unexpected flag:", flag));
            process.exit(1);
    }
}
function chooseName() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default
                        .prompt([
                        {
                            type: "input",
                            name: "name",
                            message: "Name of the app?",
                            default: generate().dashed,
                        },
                    ])
                        .then(function (answer) {
                        return answer.name;
                    })
                        .catch(function (err) {
                        console.log(chalk_1.default.red("Unexpected error:", err));
                        process.exit(1);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
