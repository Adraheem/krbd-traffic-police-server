const jwt = require("jsonwebtoken");
const secretOrKey = process.env.secretOrKey;

const verifyAuthToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, secretOrKey);

    req.userId = decoded.id;
    req.userEmail = decoded.email;

    next();
  } catch (e) {
    return res.status(401).json({ error: "Authentication Problem!" });
  }
};

module.exports = { verifyAuthToken };
