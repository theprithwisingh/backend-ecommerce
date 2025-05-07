import { Request } from 'express';

export type UserRole = 'user' | 'admin' | 'seller' | 'deliveryAgent';

export interface AddressInput {
label?: string;
street: string;
city: string;
state: string;
postalCode: string;
country: string;
phoneNumber?: string;
isDefault?: boolean;
}

export interface UpdateUserInput {
name?: string;
email?: string;
password?: string;
avatarUrl?: string;
phoneNumber?: string;
isVerified?: boolean;
dateOfBirth?: string;
gender?: 'male' | 'female' | 'other';
role?: UserRole;
addressList?: AddressInput[];
}

export interface PublicUser {
id: string;
name: string;
email: string;
role: UserRole;
avatarUrl?: string;
phoneNumber?: string;
isVerified?: boolean;
createdAt: Date;
lastLoginAt?: Date;
addressList?: AddressInput[];
}

export interface AuthRequest extends Request {
user: {
id: string;
email: string;
role: UserRole;
};
}