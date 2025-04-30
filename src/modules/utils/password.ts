import argon2 from 'argon2';

export const hashPassword = async (plainPassword: string) => {
  return await argon2.hash(plainPassword);
};

export const verifyPassword = async (
  hashedPassword: string,  // <-- fixed name
  plainPassword: string
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, plainPassword);
};
