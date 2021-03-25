import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator";
import { JWT_BODY } from "../config/jwt_config";
import { VerifyToken } from "./JwtHelper";

interface IRequestOptions {
    private: boolean
    roles?: string[]
}

type IRequest = Request & {
    auth?: JWT_BODY
}

export function RouteHelper(options: IRequestOptions, response: (req: IRequest, res: Response, next: NextFunction) => void) {
    return (req: IRequest, res: Response, next: NextFunction) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if(options.private) {

            if(!req.headers["authorization"]) return res.status(401).json({
                status: false,
                message: "Unauthorized"
            })

            const token = String(req.headers["authorization"])

            if(!/Bearer.*/.test(token)) return res.status(401).json({
                status: false,
                message: "Malformed token"
            })

            try {
                req.auth = VerifyToken<JWT_BODY>(token.replace(/Bearer /, ""))
            }
            catch(err) {
                return res.json(401).json({
                    status: false,
                    message: "Invalid token"
                })
            }

            if(options.roles) {
                for(const role of options.roles) {
                    for(const tokenRole of req.auth.roles) {
                        if(role === tokenRole) return response(req, res, next)
                    }
                }

                return res.status(403).json({
                    status: false,
                    message: "Forbidden"
                })
            }

        }

        response(req, res, next)

    }
}