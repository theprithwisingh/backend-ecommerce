import jwt from "jsonwebtoken";
export async function generateToken(user:string) {
    return jwt.sign(
        {id:user.email,name:user.name},
        process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET is not defined in environment variables"); })(),
        {expiresIn:"1d"}
    )
}