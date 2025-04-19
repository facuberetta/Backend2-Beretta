import express from 'express';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import cors from 'cors';

import usersRouter from './routes/users.router.js';
import businessRouter from './routes/business.router.js';
import ordersRouter from './routes/orders.router.js';
import authRouter from './routes/auth.router.js';
import sessionRouter from './routes/sessions.router.js';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';


const app = express();


//Middlewares
app.use (express.json());
app. use (express.urlencoded ({extended: true}));


//CORS
app.use(cors());

app.use("api/users", usersRouter);
app.use("api/business", businessRouter);
app.use("api/orders", ordersRouter);
app.use('/api/auth', authRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


const SERVER_PORT = config.port 
app.listen(SERVER_PORT, () => {
    console.log (`Server is running on port ${SERVER_PORT}`);
})

const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error){
        console.log(error);
    } 
}