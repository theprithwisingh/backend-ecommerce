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

    const token = await generateToken(user);
    console.log(token)

    return { user: { name: user.name, email: user.email }, token };//imp
  },

  login: async ({ email, password }: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await verifyPassword(user.password, password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = await generateToken(user);
    console.log(token)
    return { user: { name: user.name, email: user.email }, token };//imp
  }
};
