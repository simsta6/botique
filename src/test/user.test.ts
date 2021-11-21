process.env.NODE_ENV = "test";

import { describe, Done, it } from "mocha";
import { assert } from "chai";
import request from "supertest";
import { initStart } from "../index";
import { app, closeServer } from "../serverStart";

describe("User registers and logins", () => {

  before((done: Done) => {
    app ? done() : initStart()
      .then(() => {
        while (app == null) {
          //empty
        }
        
        done();
      })
      .catch((err) => done(err));
  });

  after((done: Done) => {
    app ? closeServer()
      .then(() => done())
      .catch((err) => done(err)) : done();
  });

  it("OK, register", () => {
    return request(app)
      .post("/api/register")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        password: "test",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 201);

        const status = body.status;
        assert.equal(status, "Success");

        const data = body.data;
        assert.containsAllKeys(data, ["first_name", "last_name", "email", "password", "role", "_id", "__v", "token"]);
      });
  });

  it("FAIL, register with existing email", () => {
    return request(app)
      .post("/api/register")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        password: "test",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 409);

        const status = body.status;
        assert.equal(status, "Failed");

        const data = body.data;
        assert.equal(data, "User Already Exist. Please Login");
      });
  });

  it("FAIL, register without an first_name", () => {
    return request(app)
      .post("/api/register")
      .send({
        first_name: "",
        last_name: "test",
        email: "fail@fail.com",
        password: "test",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 400);

        const status = body.status;
        assert.equal(status, "Failed");

        const data = body.data;
        assert.equal(data, "All input is required");
      });
  });

  it("FAIL, register without an last_name", () => {
    return request(app)
      .post("/api/register")
      .send({
        first_name: "test",
        last_name: "",
        email: "fail@fail.com",
        password: "test",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 400);

        const status = body.status;
        assert.equal(status, "Failed");

        const data = body.data;
        assert.equal(data, "All input is required");
      });
  });

  it("FAIL, register without an email", () => {
    return request(app)
      .post("/api/register")
      .send({
        first_name: "test",
        last_name: "test",
        email: "",
        password: "test",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 400);

        const status = body.status;
        assert.equal(status, "Failed");

        const data = body.data;
        assert.equal(data, "All input is required");
      });
  });

  it("FAIL, register without a password", () => {
    return request(app)
      .post("/api/register")
      .send({
        first_name: "test",
        last_name: "test",
        email: "fail@fail.com",
        password: "",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 400);

        const status = body.status;
        assert.equal(status, "Failed");

        const data = body.data;
        assert.equal(data, "All input is required");
      });
  });

  it("OK, login", () => {
    return request(app)
      .post("/api/login")
      .send({
        email: "test@test.com",
        password: "test",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 200);

        const status = body.status;
        assert.equal(status, "Success");

        const data = body.data;
        assert.containsAllKeys(data, ["first_name", "last_name", "email", "password", "role", "_id", "__v", "token"]);
      });
  });

  it("FAIL, login without an email", () => {
    return request(app)
      .post("/api/login")
      .send({
        email: "",
        password: "test",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 400);

        const status = body.status;
        assert.equal(status, "Failed");

        const data = body.data;
        assert.equal(data, "All input is required");
      });
  });

  it("FAIL, login without an password", () => {
    return request(app)
      .post("/api/login")
      .send({
        email: "test@gmail.com",
        password: "",
      })
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 400);

        const status = body.status;
        assert.equal(status, "Failed");

        const data = body.data;
        assert.equal(data, "All input is required");
      });
  });

  it("OK, getSellers", () => {
    return request(app)
      .get("/api/sellers")
      .then((res: request.Response) => {
        const { body, statusCode } = res;
        assert.equal(statusCode, 200);

        const status = body.status;
        assert.equal(status, "Success");

        const data = body.data;
        assert.equal(data.length, 0);
      });
  });

});
