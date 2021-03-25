import { Router } from "express"
import { SignToken } from "../../util/JwtHelper"
import { RouteHelper } from "../../util/RouteHelper"
const router = Router()

router.get("/login", RouteHelper({ private: true, roles: ["admin"] }, (req, res) => {

    return res.json({
        token: SignToken({
            email: "johndoe@acme.com",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600,
            roles: [ "admin" ]
        })
    })
    
}))

export const auth_controller = router