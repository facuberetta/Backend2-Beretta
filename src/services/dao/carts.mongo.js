
import cartModel from '../../models/cart.model.js';

export default class CartsMongo {
    async getCartById(cid) {
        return await cartModel.findById(cid).populate('products.product');
    }

    async createCart() {
        return await cartModel.create({ products: [] });
    }

    async addProductToCart(cid, pid) {
        const cart = await cartModel.findById(cid);
        const index = cart.products.findIndex(p => p.product.toString() === pid);
        if (index !== -1) {
            cart.products[index].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        return await cart.save();
    }

    async updateCart(cid, newCart) {
        return await cartModel.findByIdAndUpdate(cid, newCart, { new: true });
    }

    async clearCart(cid) {
        return await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
    }
}
