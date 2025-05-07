// src/modules/users /user.validation.ts
import { z } from 'zod';

export const AddressSchema = z.object({
label: z.string().optional(),
street: z.string().min(1, 'Street is required'),
city: z.string().min(1, 'City is required'),
state: z.string().min(1, 'State is required'),
postalCode: z.string().min(1, 'Postal code is required'),
country: z.string().min(1, 'Country is required'),
phoneNumber: z.string().optional(),
isDefault: z.boolean().optional(),
});

export const UpdateUserSchema = z.object({
name: z.string().min(1, 'Name is required').optional(),
email: z.string().email('Invalid email').optional(),
password: z.string().min(6, 'Password must be at least 6 characters').optional(),
avatarUrl: z.string().url('Invalid URL').optional(),
phoneNumber: z.string().optional(),
isVerified: z.boolean().optional(),
dateOfBirth: z.string().optional(), 
gender: z.enum(['male', 'female', 'other']).optional(),
role: z.enum(['user', 'admin', 'seller', 'deliveryAgent']).optional(),
addressList: z.array(AddressSchema).optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;


