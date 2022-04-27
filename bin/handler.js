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
exports.handler = void 0;
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var node_stream_zip_1 = __importDefault(require("node-stream-zip"));
function handler(template, name) {
    return __awaiter(this, void 0, void 0, function () {
        var examples;
        var _this = this;
        return __generator(this, function (_a) {
            console.clear();
            examples = require(path_1.default.resolve(__dirname, "api.json"));
            console.log(chalk_1.default.gray("Template: "), chalk_1.default.green(template));
            console.log(chalk_1.default.gray("App name: "), chalk_1.default.green(name));
            inquirer_1.default
                .prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "Proceed?",
                    default: true,
                },
            ])
                .then(function (answers) { return __awaiter(_this, void 0, void 0, function () {
                var start, pathname, ex, startCommand;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!answers.confirm) return [3 /*break*/, 4];
                            console.clear();
                            start = new Date();
                            pathname = "".concat(path_1.default.resolve("./"), "/").concat(name);
                            if (!fs_1.default.existsSync(pathname)) return [3 /*break*/, 2];
                            console.log(chalk_1.default.gray("Directory already exists: ".concat(pathname)));
                            return [4 /*yield*/, inquirer_1.default
                                    .prompt([
                                    {
                                        type: "confirm",
                                        name: "confirm",
                                        message: "Overwrite?",
                                        default: false,
                                    },
                                ])
                                    .then(function (answers) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (!answers.confirm) {
                                            process.exit(1);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            ex = examples[template];
                            console.log(chalk_1.default.gray("Setting up..."));
                            console.log(chalk_1.default.gray("Cloning repo..."));
                            return [4 /*yield*/, download(ex.repo, pathname, name)];
                        case 3:
                            _a.sent();
                            console.clear();
                            console.log(chalk_1.default.gray("Setting up..."));
                            console.log(chalk_1.default.gray("Installing Dependencies..."));
                            (0, child_process_1.execSync)("cd ".concat(pathname, " && ").concat(ex.install, " --force && git init"), {
                                stdio: [1],
                            });
                            console.clear();
                            console.log("Done in ".concat((new Date().getTime() - start.getTime()) / 1000, "s \u2728 "));
                            startCommand = ex.run;
                            if (ex.guide !== undefined && ex.guide !== "") {
                                console.log("Find accompanying tutorial at ".concat(chalk_1.default.green(ex.guide)));
                            }
                            if (ex.docs !== undefined && ex.docs !== "") {
                                console.log("Check out docs at ".concat(chalk_1.default.green(ex.docs)));
                            }
                            if (startCommand !== undefined && startCommand !== "") {
                                console.log("run `" +
                                    chalk_1.default.green("cd ".concat(name).concat(startCommand ? " && " + startCommand : "")) +
                                    "` to get started");
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            console.log(chalk_1.default.red("Operation cancelled by user"));
                            _a.label = 5;
                        case 5: return [2 /*return*/];
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
            return [2 /*return*/];
        });
    });
}
exports.handler = handler;
function download(repo, path, name) {
    return __awaiter(this, void 0, void 0, function () {
        var branch, res, fileStream, zip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    branch = "master";
                    return [4 /*yield*/, (0, node_fetch_1.default)("https://codeload.github.com/create-anchor-app/".concat(repo, "/zip/refs/heads/master"))];
                case 1:
                    res = (_a.sent());
                    if (!(res.status !== 200)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, node_fetch_1.default)("https://codeload.github.com/create-anchor-app/".concat(repo, "/zip/refs/heads/main"))];
                case 2:
                    res = (_a.sent());
                    branch = "main";
                    _a.label = 3;
                case 3:
                    console.log(chalk_1.default.gray(res.statusText));
                    fileStream = fs_1.default.createWriteStream("".concat(__dirname, "/").concat(name, ".zip"));
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            res.body.pipe(fileStream);
                            res.body.on("error", reject);
                            fileStream.on("finish", resolve);
                        })];
                case 4:
                    _a.sent();
                    fs_1.default.mkdirSync(path);
                    zip = new node_stream_zip_1.default.async({ file: "".concat(__dirname, "/").concat(name, ".zip") });
                    return [4 /*yield*/, zip.extract("".concat(repo, "-").concat(branch), path)];
                case 5:
                    _a.sent();
                    console.log(chalk_1.default.gray("Done"));
                    return [4 /*yield*/, zip.close()];
                case 6:
                    _a.sent();
                    fs_1.default.unlinkSync("".concat(__dirname, "/").concat(name, ".zip"));
                    return [2 /*return*/];
            }
        });
    });
}
