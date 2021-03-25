import express from "express"
import { ROUTES_CONFIG } from "../config/routes_config"
import { SERVER_CONFIG } from "../config/server_config"

const app = express()

app.listen(SERVER_CONFIG.PORT)
app.use(SERVER_CONFIG.MIDDLEWARE)

ROUTES_CONFIG.forEach(value => {
    app.use(value.path, value.controller)
})