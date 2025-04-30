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

    const token = generateToken(user);

    return { user: { name: user.name, email: user.email }, token };
  },

  login: async ({ email, password }: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await verifyPassword(user.password, password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken(user);

    return { user: { name: user.name, email: user.email }, token };
  }
};
