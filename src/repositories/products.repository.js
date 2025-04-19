import ProductsMongo from "../dao/mongo/products.mongo.js";

const productsDAO = new ProductsMongo();

export default class ProductsRepository {
    getAll = () => productsDAO.getAll();
    getById = (id) => productsDAO.getById(id);
    create = (data) => productsDAO.create(data);
    update = (id, data) => productsDAO.update(id, data);
    delete = (id) => productsDAO.delete(id);
}
