import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Todo, User } from "../db/model";
import { Request, Response } from "express";

const signInSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string().min(6, { message: "Enter atleast 6 character" }),
});
type signInInput = z.infer<typeof signInSchema>;

export const signin = async (req: Request, res: Response) => {
  const { success } = signInSchema.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      message: "Can't Parse",
    });
    return;
  }

  const signInBody: signInInput = req.body;
  try {
    const user = await User.findOne({
      email: signInBody.email,
    });

    if (!user) {
      res.status(404).json({
        message: "No user found",
      });
      return;
    }

    const decodedPassword = await bcrypt.compare(
      signInBody.password,
      user.password
    );

    if (!decodedPassword) {
      res.status(401).json({
        message: "Wrong Password",
      });
      return;
    }

    const token = jwt.sign(String(user._id), process.env.JWT_SECRET as string);

    if (!token) {
      res.status(402).json({
        message: "Error while genarating token",
      });
      return;
    }

    res.status(200).json({
      user,
      token,
      message: "Signed in Successfully",
    });
  } catch (err) {
    res.status(403).json({
      message: "Something went wrong",
    });
  }
};

const signUpSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().email({ message: "Enter valid email" }),
  password: z.string().min(6, { message: "Enter atleast 6 character" }),
});
type signUpInput = z.infer<typeof signUpSchema>;

export const signup = async (req: Request, res: Response) => {
  const { success } = signUpSchema.safeParse(req.body);

  if (!success) {
    res.status(403).json({
      message: "Can't parse",
    });
    return;
  }
  const signUpBody: signUpInput = req.body;
  try {
    const existingUser = await User.findOne({
      email: signUpBody.email,
    });
    if (existingUser) {
      res.status(403).json({
        message: "User already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(signUpBody.password, 10);
    try {
      const newUser = await User.create({
        name: signUpBody.name,
        email: signUpBody.email,
        password: hashedPassword,
      });
      const demoTodo = await Todo.create({
        user_id: newUser._id,
        title: "Welcome to Donezo! 🎉",
        description:
          "Get started by adding your first task. Stay organized and boost your productivity with Donezo!",
        priority: 1,
        tags: ["Welcome", "Getting Started"],
        deadline: null,
        completed: false,
      });

      await User.findByIdAndUpdate(newUser._id, {
        $push: { todo: demoTodo._id },
      });

      const token = jwt.sign(
        String(newUser._id),
        process.env.JWT_SECRET as string
      );

      if (!token) {
        res.status(402).json({
          message: "Error while genarating token",
        });
        return;
      }

      res.status(200).json({
        newUser,
        token,
        message: "Signed un Successfully",
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    res.status(403).json({
      message: "Something went w",
    });
  }
};
