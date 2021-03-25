export const JWT_CONFIG = {

    JWT_SECRET: String(process.env.JWT_SECRET || "ciscocisco"),

    EXPIRATION_TIME: 3600
}

export type JWT_BODY = {
    iat?: number
    exp?: number
    user_id: string
    email: string
    roles: string[]
}