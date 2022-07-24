import { Request, Response } from "express";
import { Users } from "../../models/users";

export const getUser = async (req: Request, res: Response) => {
  try {
    const decodedUser = req.user;
    const user = await Users.findByUsername(decodedUser.username);
    if (!user) {
      res.status(404).json({
        user: null,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      message: "user retrieved",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "an error occurred ",
    });
  }
};
