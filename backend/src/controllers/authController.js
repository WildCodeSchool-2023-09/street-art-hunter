const argon2 = require("argon2");

const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.users.readByEmailWithPassword(req.body.email);

    if (!user || !user.password) {
      res.status(422).json({ error: "Email ou mot de passe incorrect" });
      return;
    }

    const verified = await argon2.verify(user.password, req.body.password);

    if (verified) {
      delete user.password;

      const token = jwt.sign(
        { sub: user.id, isAdmin: user.isAdmin },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("session_cookie", token, {
        httpOnly: true,
        sameSite: "strict",
      });
      res.json({ user });
    } else {
      res
        .status(422)
        .json({ error: "Incorrect e-mail or password. Try again !" });
    }
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie("session_cookie");
    res.json({ message: "Disconnection successful!" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  logout,
};
