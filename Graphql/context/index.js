import jwt from "jsonwebtoken";
export const getMe = req => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0]) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "123456");
    return decoded;
  }
  return null;
};
