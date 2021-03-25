import { Router } from "express";
import { auth_controller } from "../app/controllers/auth_controller";

type IRoutesConfig = {
    path: string
    controller: Router
}[]

export const ROUTES_CONFIG: IRoutesConfig = [
    {
        path: "/auth",
        controller: auth_controller
    }
]