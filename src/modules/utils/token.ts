import jwt from "jsonwebtoken";
interface User {
    id: number;
}

export async function generateToken(user: User) {
    return jwt.sign(
        {
            userId:user.id,
        },
        process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is not defined in environment variables"); })(),
        {expiresIn:"1d"}
    )
}