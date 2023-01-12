import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const secret = "tourapp?123";

export const signin = async (req, res) => {
  const { email, password } = req?.body;
  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser?.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: oldUser?.email, id: oldUser?._id },
      secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    console.log("error", err);
  }
};

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
