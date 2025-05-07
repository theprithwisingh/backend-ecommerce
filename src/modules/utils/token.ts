import jwt from "jsonwebtoken";
interface User {
    email: string;
    name: string;
}

export async function generateToken(user: User) {
    return jwt.sign(
        {id:user.email,name:user.name},
        process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is not defined in environment variables"); })(),
        {expiresIn:"1d"}
    )
}