"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const serverStart_1 = require("../serverStart");
(0, mocha_1.describe)("User registers and logins", () => {
    before((done) => {
        serverStart_1.app ? done() : (0, index_1.initStart)()
            .then(() => {
            while (serverStart_1.app == null) {
                //empty
            }
            done();
        })
            .catch((err) => done(err));
    });
    after((done) => {
        serverStart_1.app ? (0, serverStart_1.closeServer)()
            .then(() => done())
            .catch((err) => done(err)) : done();
    });
    (0, mocha_1.it)("OK, register", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/register")
            .send({
            first_name: "test",
            last_name: "test",
            email: "test@test.com",
            password: "test",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 201);
            const status = body.status;
            chai_1.assert.equal(status, "Success");
            const data = body.data;
            chai_1.assert.containsAllKeys(data, ["first_name", "last_name", "email", "password", "role", "_id", "__v", "token"]);
        });
    });
    (0, mocha_1.it)("FAIL, register with existing email", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/register")
            .send({
            first_name: "test",
            last_name: "test",
            email: "test@test.com",
            password: "test",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 409);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "User Already Exist. Please Login");
        });
    });
    (0, mocha_1.it)("FAIL, register without an first_name", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/register")
            .send({
            first_name: "",
            last_name: "test",
            email: "fail@fail.com",
            password: "test",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 400);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "All input is required");
        });
    });
    (0, mocha_1.it)("FAIL, register without an last_name", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/register")
            .send({
            first_name: "test",
            last_name: "",
            email: "fail@fail.com",
            password: "test",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 400);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "All input is required");
        });
    });
    (0, mocha_1.it)("FAIL, register without an email", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/register")
            .send({
            first_name: "test",
            last_name: "test",
            email: "",
            password: "test",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 400);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "All input is required");
        });
    });
    (0, mocha_1.it)("FAIL, register without a password", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/register")
            .send({
            first_name: "test",
            last_name: "test",
            email: "fail@fail.com",
            password: "",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 400);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "All input is required");
        });
    });
    (0, mocha_1.it)("OK, login", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/login")
            .send({
            email: "test@test.com",
            password: "test",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 200);
            const status = body.status;
            chai_1.assert.equal(status, "Success");
            const data = body.data;
            chai_1.assert.containsAllKeys(data, ["first_name", "last_name", "email", "password", "role", "_id", "__v", "token"]);
        });
    });
    (0, mocha_1.it)("FAIL, login without an email", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/login")
            .send({
            email: "",
            password: "test",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 400);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "All input is required");
        });
    });
    (0, mocha_1.it)("FAIL, login without an password", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/login")
            .send({
            email: "test@gmail.com",
            password: "",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 400);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "All input is required");
        });
    });
    (0, mocha_1.it)("FAIL, login with invalid credentials", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .post("/api/login")
            .send({
            email: "wrong@gmail.com",
            password: "wrong",
        })
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 400);
            const status = body.status;
            chai_1.assert.equal(status, "Failed");
            const data = body.data;
            chai_1.assert.equal(data, "Invalid Credentials");
        });
    });
    (0, mocha_1.it)("OK, getSellers", () => {
        return (0, supertest_1.default)(serverStart_1.app)
            .get("/api/sellers")
            .then((res) => {
            const { body, statusCode } = res;
            chai_1.assert.equal(statusCode, 200);
            const status = body.status;
            chai_1.assert.equal(status, "Success");
            const data = body.data;
            chai_1.assert.equal(data.length, 0);
        });
    });
});
//# sourceMappingURL=user.test.js.map