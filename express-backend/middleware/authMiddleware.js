const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "доступ запрещен" });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "токен некорректный" });
  }
};

module.exports = authenticate;
