import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function (request, response, next) {
  const authorization = request.get("authorization");

  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_WORD);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "Invalid token or missing" });
    }

    const { id: userId } = decodedToken;

    request.userId = userId;

    next();
  } catch (error) {
    return response.status(401).json({ error: "Invalid token" });
  }
}
