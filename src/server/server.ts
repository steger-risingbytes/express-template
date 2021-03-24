import express from "express"
import { SERVER_CONFIG } from "../config/server_config"

const app = express()

app.listen(SERVER_CONFIG.PORT)
app.use(SERVER_CONFIG.MIDDLEWARE)