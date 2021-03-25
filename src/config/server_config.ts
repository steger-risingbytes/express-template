import express from "express";

export const SERVER_CONFIG = {

    // define tcp port express listens on
    PORT: Number(process.env.PORT || 8080),

    // set middleware to use with express    
    MIDDLEWARE: [
        express.json()
    ]
}