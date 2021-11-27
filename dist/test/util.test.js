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
process.env.NODE_ENV = "test";
const chai_1 = require("chai");
const mocha_1 = require("mocha");
const user_1 = require("../models/user");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const serverStart_1 = require("../serverStart");
const util_1 = require("../util");
(0, mocha_1.describe)("Utils test", () => {
    before((done) => {
        serverStart_1.app ? done() : (0, index_1.initStart)()
            .then(() => {
            while (serverStart_1.app == null) {
                // empty
            }
            done();
        })
            .catch((err) => done(err));
    });
    after((done) => {
        serverStart_1.app ? done() : (0, serverStart_1.closeServer)()
            .then(() => done())
            .catch((err) => done(err));
    });
    (0, mocha_1.it)("OK, isWrongId when id does exist returns false", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/register")
            .send({
            first_name: "testUser",
            last_name: "testUser",
            email: "onetime@onetime.com",
            password: "onetime",
        })
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            const id = res.body.data._id;
            const result = yield (0, util_1.isWrongId)(user_1.User, id);
            chai_1.assert.equal(result, false);
        }));
    });
    (0, mocha_1.it)("OK, isWrongId when id doesn't exist returns true", () => {
        return (0, util_1.isWrongId)(user_1.User, "0").then(result => chai_1.assert.equal(result, true));
    });
    (0, mocha_1.it)("OK, constructResponse constructs Success response", () => {
        const res = (0, util_1.constructResponse)("Success", { user: "user" });
        chai_1.assert.containsAllKeys(res, ["status", "data"]);
        chai_1.assert.deepEqual(res.data, { user: "user" });
        chai_1.assert.equal(res.status, "Success");
    });
    (0, mocha_1.it)("OK, constructResponse constructs Failed response", () => {
        const res = (0, util_1.constructResponse)("Failed", {});
        chai_1.assert.containsAllKeys(res, ["status", "data"]);
        chai_1.assert.deepEqual(res.data, {});
        chai_1.assert.equal(res.status, "Failed");
    });
    (0, mocha_1.it)("OK, isBodyEmpty should return false when Request body is not empty", () => {
        const req = {
            body: {
                key1: "key1"
            }
        };
        const res = (0, util_1.isBodyEmpty)(req);
        (0, chai_1.expect)(res).to.be.a("boolean");
        chai_1.assert.equal(res, false);
    });
    (0, mocha_1.it)("OK, isBodyEmpty should return true when Request body is empty", () => {
        const req = {
            body: {}
        };
        const res = (0, util_1.isBodyEmpty)(req);
        (0, chai_1.expect)(res).to.be.a("boolean");
        chai_1.assert.equal(res, true);
    });
    const isNumberPositiveTests = [
        { arg: 1, expected: true },
        { arg: -1, expected: false },
        { arg: 0, expected: false }
    ];
    isNumberPositiveTests.forEach((test) => {
        (0, mocha_1.it)(`OK, isNumberPositive should return ${test.expected} when number is ${test.arg}`, () => {
            const res = (0, util_1.isNumberPositive)(test.arg);
            (0, chai_1.expect)(res).to.be.a("boolean");
            chai_1.assert.equal(res, test.expected);
        });
    });
});
//# sourceMappingURL=util.test.js.map