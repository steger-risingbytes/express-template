export const JWT_CONFIG = {

    JWT_SECRET: String(process.env.JWT_SECRET || "ciscocisco")

}

export type JWT_BODY = {
    iat: number
    exp: number
    email: string
    roles: string[]
}