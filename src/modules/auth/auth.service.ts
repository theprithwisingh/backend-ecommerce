import { SignupInput, LoginInput } from './auth.types';
import { prisma } from '../config/prisma';
import { hashPassword, verifyPassword } from '../utils/password';
import { generateToken } from '../utils/token';

export const AuthService = {
  signup: async ({ name, email, password }: SignupInput) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email already registered");

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  //user return this type object -> {
  //"id": 2,
  //"name": "John Doe",
  //"email": "john.doe@example.com",
  //"password": "hashedPassword123456",
  //"createdAt": "2025-05-09T10:00:00Z",
  //"updatedAt": "2025-05-09T10:00:00Z" }


    const token = await generateToken(user);
    console.log(token)

    return { user: { id: user.id,name:user.name, email: user.email }, token };
  },

  login: async ({ email, password }: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await verifyPassword(user.password, password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = await generateToken(user);
    
    return { user: { id: user.id,name:user.name, email: user.email }, token };//imp
  }
};
