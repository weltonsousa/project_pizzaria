import { Router } from 'express';
import multer from 'multer';
import { CategoryController } from './controllers/CategoryController';
import { ProductController } from './controllers/ProductController';
import { UserController } from './controllers/UserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';
import { OrderController } from './controllers/OrderController';
import { ItemConroller } from './controllers/ItemController';

const router = Router();

const upload = multer(uploadConfig.upload("../tmp"));

// -- ROTAS USER --
router.post('/users', new UserController().handle)
router.post('/session/', new UserController().authUser)
router.get('/me', isAuthenticated, new UserController().detailUser)

// -- ROTAS CATEGORIAS --
router.post('/category', isAuthenticated, new CategoryController().handle)
router.get('/category', isAuthenticated, new CategoryController().listCategory)

// -- ROTAS PRODUTOS --
router.post('/product', isAuthenticated, upload.single('file'), new ProductController().handle)
router.get('/category/product', isAuthenticated, new CategoryController().listByCategory)

// -- ROTAS PEDIDOS --
router.post('/order', isAuthenticated, new OrderController().createOrder)
router.delete('/order', isAuthenticated, new OrderController().orderRemove);

router.post('/order/add', isAuthenticated, new ItemConroller().addItem)
router.delete('/order/remove', isAuthenticated, new ItemConroller().removeItem)

router.put('/order/send', isAuthenticated, new OrderController().sendOrder)

router.get('/orders', isAuthenticated, new OrderController().listOrder)
router.get('/order/detail', isAuthenticated, new OrderController().detailOrder)
router.put('/order/finish', isAuthenticated, new OrderController().finishOrder)

export { router };