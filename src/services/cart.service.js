import CartRepository from "../repository/carts.repository.js";
import CartsMongo from "../dao/mongo/carts.mongo.js";

const cartsDao = new CartsMongo();
const cartRepository = new CartRepository(cartsDao);

export default class CartService {
  getCartById = async (cid) => await cartRepository.getCartById(cid);

  createCart = async () => await cartRepository.createCart();

  addProductToCart = async (cid, pid) => await cartRepository.addProductToCart(cid, pid);

  clearCart = async (cid) => await cartRepository.clearCart(cid);
}
