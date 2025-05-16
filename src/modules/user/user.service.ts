import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const userService = {
  userprofile:async(userId:number)=>{
      try {
        const user =  await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatarUrl: true,
            phoneNumber: true,
            dateOfBirth: true,
            gender: true,
            lastLoginAt: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        if(!user){
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch user profile: ${error.message}`);
          }
          throw new Error('Failed to fetch user profile: An unknown error occurred');
      }
  }
}
