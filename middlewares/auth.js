/*
Middleware conducting:

1. Validate token (term of use)
2. Extarct of token id and find user by it`s id, attach user to req.body
*/

/*
Tasks:
1. Extract out of headers Authorization content
2. Split into 2 words: 'bearer' and 'token'
3. Valiadate the 'Bearer' word
4. Validate the 'token'
5. If true - extract id out of token, find user by the id
6. If user exists - attach him to request (object req.)
*/

const { User } = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    // jwt - if false, throw error, that`s why we use try/catch
    const user = await User.findById(id);
    if (!user || !user.token) {
      res.status(401);
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      // then here we assign error code bcs jwt do not provide it
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
