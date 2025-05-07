//src/user/user.services.ts

import { prisma } from "../config/prisma"; // Make sure to import prisma instance
import { UpdateUserInput, UserRole } from "./user.types"; // Import types for the update function

export const UserService = {
  // 1. Get the profile of the current user (me) or a user by ID
  getProfile: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        avatarUrl: true,
        isVerified: true,
        dateOfBirth: true,
        gender: true,
        addressList: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new Error("User not found");
    return user;
  },

  // 2. Update user profile (name, address, avatar)
  updateProfile: async (userId: string, updates: UpdateUserInput) => {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });
    return user;
  },

  // 3. Update user password (handle password hashing separately)
  updatePassword: async (userId: string, newPassword: string) => {
    const hashedPassword = await hashPassword(newPassword); // Assuming hashPassword is a function to hash passwords
    const user = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return user;
  },

  // 4. Delete user account (can be done by admin or user themselves)
  deleteUser: async (userId: string, requestingUserId: string, isAdmin: boolean) => {
    if (userId !== requestingUserId && !isAdmin) {
      throw new Error("Unauthorized to delete another user's account");
    }

    await prisma.user.delete({
      where: { id: userId },
    });
    return { message: "User deleted successfully" };
  },

  // 5. List all users for the admin panel (optional: add pagination)
  listUsers: async (isAdmin: boolean) => {
    if (!isAdmin) throw new Error("Admin privileges required to list users");
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        createdAt: true,
      },
    });
    return users;
  },

  // 6. Change user role (admin can promote or demote users)
  changeUserRole: async (userId: string, newRole: UserRole) => {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    return updatedUser;
  },
};

// Helper function for password hashing (bcrypt or argon2)
const hashPassword = async (password: string) => {
  // Implement password hashing logic, e.g., bcrypt.hash(password, saltRounds)
  return password; // Replace this with actual password hashing logic
};
