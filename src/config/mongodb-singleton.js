import config from "./config.js";
import mongoose from "mongoose";



export default class MongoSingleton{
    static #instance;

    constructor() {
        this.#connectMongoDB();
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Ya se ha abierto una conexión a MongoDB.");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    }
    #connectMongoDB = async() => {
        try {
            await mongoose.connect(config.mongoUrl)
            console.log("Conectado a MongoDB");            
        } catch (error) {
            console.error("No se se pudo conectar a la BD usando mongoose: " + error);
            process.exit(1);
        }
        }
        
}