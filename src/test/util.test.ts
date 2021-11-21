process.env.NODE_ENV = "test";

import { assert } from "chai";
import { describe, Done, it } from "mocha";
import { User } from "../models/user";
import request from "supertest";
import { initStart } from "../index";
import { app, closeServer } from "../serverStart";
import { constructResponse, isBodyEmpty, isNumberPositive, isWrongId } from "../util";
import { Request } from "express";

describe("Utils test", () => {
  
  before((done: Done) => {
    app ? done() : initStart()
      .then(() => {
        while (app == null) {
          // empty
        }
        
        done();
      })
      .catch((err) => done(err));
  });

  after((done: Done) => {
    app ? done() : closeServer()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, isWrongId when id does exist returns false", () => {
    return request(app)
      .post("/api/register")
      .send(
        {
          first_name: "testUser",
          last_name: "testUser",
          email: "onetime@onetime.com",
          password: "onetime",
        }
      )
      .then(async (res: request.Response) => {
        const id = res.body.data._id;
        const result = await isWrongId(User, id);
        assert.equal(result, false);
      });
  });

  it("OK, isWrongId when id doesn't exist returns true", () => {
    return isWrongId(User, "0").then(result => assert.equal(result, true));
  });

  it("OK, constructResponse constructs Success response", () => {
    const res = constructResponse("Success", {user: "user"});
    assert.containsAllKeys(res, ["status", "data"]);
    assert.deepEqual(res.data, {user: "user"});
    assert.equal(res.status, "Success");
  });

  it("OK, constructResponse constructs Failed response", () => {
    const res = constructResponse("Failed", {});
    assert.containsAllKeys(res, ["status", "data"]);
    assert.deepEqual(res.data, {});
    assert.equal(res.status, "Failed");
  });

  it("OK, isBodyEmpty should return false when Request body is not empty", () => {
    const req = {
      body: {
        key1: "key1"
      }
    } as Request;

    const res = isBodyEmpty(req);
    assert.equal(res, false);
  });

  it("OK, isBodyEmpty should return true when Request body is empty", () => {
    const req = {
      body: {}
    } as Request;

    const res = isBodyEmpty(req);
    assert.equal(res, true);
  });

  it("OK, isNumberPositive should return true when number is positive", () => {
    const res = isNumberPositive(1);
    assert.equal(res, true);
  });

  it("OK, isNumberPositive should return false when number is negative", () => {
    const res = isNumberPositive(-1);
    assert.equal(res, false);
  });

  it("OK, isNumberPositive should return false when number is 0", () => {
    const res = isNumberPositive(0);
    assert.equal(res, false);
  });

});