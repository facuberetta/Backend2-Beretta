// repository/carts.repository.js
export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCartById = (cid) => this.dao.getCartById(cid);
    createCart = () => this.dao.createCart();
    addProductToCart = (cid, pid) => this.dao.addProductToCart(cid, pid);
    clearCart = (cid) => this.dao.clearCart(cid);
}
