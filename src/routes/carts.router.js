import { Router } from 'express';
import CartsMongo from '../dao/mongo/carts.mongo.js';
import CartRepository from '../repository/carts.repository.js';
import ProductsMongo from '../dao/mongo/products.mongo.js';
import Ticket from '../models/ticket.model.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
    getCartById,
    createCart,
    addProductToCart,
    clearCart
} from '../controllers/cart.controller.js';
import { isUser } from '../middlewares/authorization.middleware.js';


const router = Router();
router.get('/:cid', authToken, getCartById);
router.post('/', authToken, createCart);
router.post('/:cid/products/:pid', authToken, addProductToCart);
router.delete('/:cid', authToken, clearCart);
router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', isUser, addProductToCart);
router.delete('/:cid', isUser, clearCart);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid', clearCart);
const cartsService = new CartRepository(new CartsMongo());
const productsDao = new ProductsMongo();

router.post('/:cid/purchase', authMiddleware(['user']), async (req, res) => {
    const { cid } = req.params;
    const user = req.user;

    const cart = await cartsService.getCartById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    let amount = 0;
    const purchased = [];
    const rejected = [];

    for (const item of cart.products) {
        const dbProduct = await productsDao.getById(item.product._id);
        if (dbProduct.stock >= item.quantity) {
            dbProduct.stock -= item.quantity;
            await productsDao.updateProduct(item.product._id, dbProduct);
            amount += item.product.price * item.quantity;
            purchased.push(item);
        } else {
            rejected.push(item.product._id);
        }
    }

    if (purchased.length > 0) {
        const ticket = await Ticket.create({
            code: Math.random().toString(36).substring(2, 10),
            purchase_datetime: new Date(),
            amount,
            purchaser: user.email
        });

        const updatedProducts = cart.products.filter(p => rejected.includes(p.product._id.toString()));
        await cartsService.updateCart(cid, { products: updatedProducts });

        return res.json({
            status: 'success',
            message: 'Compra realizada',
            ticket,
            productosRechazados: rejected
        });
    } else {
        return res.json({
            status: 'error',
            message: 'No se pudo realizar la compra por falta de stock',
            productosRechazados: rejected
        });
    }
});

export default router;
