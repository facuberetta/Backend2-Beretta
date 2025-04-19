import ProductsRepository from "../repository/products.repository.js";
import ProductDTO from "../dtos/product.dto.js";

const productsService = new ProductsRepository();

export const getAllProducts = async (req, res) => {
    const products = await productsService.getAll();
    const dto = products.map(p => new ProductDTO(p));
    res.json(dto);
};

export const getProductById = async (req, res) => {
    const product = await productsService.getById(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(new ProductDTO(product));
};

export const createProduct = async (req, res) => {
    const product = await productsService.create(req.body);
    res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
    const updated = await productsService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updated);
};

export const deleteProduct = async (req, res) => {
    const deleted = await productsService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto eliminado" });
};
