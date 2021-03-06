import { sign, verify } from "jsonwebtoken"
import { JWT_BODY, JWT_CONFIG } from "../config/jwt_config"

export function SignToken(payload: JWT_BODY) {
    return sign({
        exp: Math.floor(Date.now()/1000) + JWT_CONFIG.EXPIRATION_TIME,
        iat: Math.floor(Date.now()/1000),
        ...payload
    }, JWT_CONFIG.JWT_SECRET)
}

export function VerifyToken<T>(token: string) {
    const verifiedToken: any = verify(token, JWT_CONFIG.JWT_SECRET)
    return <T>verifiedToken
}