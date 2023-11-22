import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/account.js";
import AccountModal from "../models/account.js";

const secret = "test";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AccountModal.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ name: user.name, email: user.email, token });
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await AccountModal.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await AccountModal.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ name: result.name, email: result.email, token });
  } catch (error) {
    console.log(`${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};
