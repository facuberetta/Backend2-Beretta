import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js';

import { authenticateJWT } from '../middlewares/jwt.middleware.js'; // si usás JWT
import { authorizeRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Solo admins
router.post('/', authenticateJWT, authorizeRole('admin'), createProduct);
router.put('/:id', authenticateJWT, authorizeRole('admin'), updateProduct);
router.delete('/:id', authenticateJWT, authorizeRole('admin'), deleteProduct);

export default router;
