import bcrypt from "bcryptjs";
import { Jwt } from "jsonwebtoken";
import userModel from "../models/user";

const secret = "tourapp?123";

export const signup = async (req, resp) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const olderUser = await userModel.findOne({ email });
    if (olderUser) {
      return resp.status(400).json({ message: "User already exist" });
    }
    const hasedPassword = await bcrypt.hash(password, 12);
    const result = await userModel.create({
      email,
      password: hasedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    resp.status(201).json({ result, token });
  } catch (err) {
    resp.status(500).json({ message: "something went wrong" });
    console.log("error", err);
  }
};
