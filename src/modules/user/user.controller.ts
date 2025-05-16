import { Request, Response } from "express";
import { userService } from "./user.service";

// interface AuthRequest extends Request {
//     user?: { userId: number };
//   }
// interface Payload{
//     userId:number
// }
export const profileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    console.log(userId)
    //eearly return if user is not authenticated
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User not authenticated" });
      return;
    }
    
    //Fetch the user profile from the database using the authenticated user's ID

    const user = await userService.userprofile(userId);
    console.log("user",user)

    if (user===undefined||user===null) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    //Successful response
    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error in profileController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
