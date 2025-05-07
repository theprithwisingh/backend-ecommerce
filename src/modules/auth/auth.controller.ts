// import { Request, Response } from 'express';
// import { hashPassword, verifyPassword } from '../utils/password';
// import { prisma } from '../config/prisma';
// import { generateToken } from '../utils/token';

// async function signinController(req: Request, res: Response){
//     const{name,email,password}=req.body;
//     if(!name||!email||!password){
//         return res.status(400).json({message:"Missing some inputs"})
//     }
    
//     try {
//         const hashedPassword = await hashPassword(password);
//         const newUser = prisma.user.create({
//             data:{
//                 name,
//                 email,
//                 password:hashedPassword
//             }
//         })
//         return res.status(201).json({
//             message:"new user create successfully",
//             newUser
//         })

//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({message:"internal error or server error"})
//     }
// }

// async function loginController(req: Request, res: Response){
//     const{email,password}=req.body;
//     //check input feild
//     if (!email || !password){
//        return res.status(400).json({message:"Missing some inputs"})
//     }

//     //retrive user data 
//     const user = await prisma.user.findFirst({
//         where:{email}
//     })

//     //check user exist or not
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     const isPasswordValid  = await verifyPassword(user.password,password)
//     if (!isPasswordValid ) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = await generateToken(user)
//     return res.status(200).json({ 
//         message: 'Login successful', 
//         token, 
//         user: { 
//               email: user.email, 
//               name: user.name 
//               }});
// }
// export { signinController, loginController };



import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupInput, LoginInput } from './auth.types';



export const signinController = async (req: Request, res: Response) => {
  const data: SignupInput = req.body;//this data  come from auth.types.ts
  try {
    const result = await AuthService.signup(data);
    res.status(201).json({ message: 'Signup successful', ...result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};



export const loginController = async (req: Request, res: Response) => {
  const data: LoginInput = req.body;
  try {
    const result = await AuthService.login(data);
    res.status(200).json({ message: 'Login successful', ...result });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};