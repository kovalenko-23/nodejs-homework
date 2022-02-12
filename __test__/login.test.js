const express = require("express");
const app = express();
const { login } = require("../controllers/auth");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { mockRequest, mockResponse } = require("./util/interceptors");
jest.mock("../controllers/auth/login.js");

app.get("/users", login);
jest.setTimeout(50000);

describe("Auth service Login test", () => {
  test("should create token and add token to res object", async () => {
    let req = mockRequest();
    req.body.email = "mockemail@email.com";
    req.body.password = "mockpassword";
    const res = mockResponse();

    const user = {
      id: "1",
      email: "mockemail@mail.com",
      password: "mockpassword",
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);

    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(() => user);

    jest.spyOn(login);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
