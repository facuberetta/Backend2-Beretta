import ProductModel from '../models/product.model.js';

export default class ProductsMongo {
    getAll = () => ProductModel.find();
    getById = (id) => ProductModel.findById(id);
    create = (data) => ProductModel.create(data);
    update = (id, data) => ProductModel.findByIdAndUpdate(id, data, { new: true });
    delete = (id) => ProductModel.findByIdAndDelete(id);
}
