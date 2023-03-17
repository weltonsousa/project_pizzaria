import { Router } from 'express';
import { CategoryController } from './controllers/CategoryController';
import { ProductController } from './controllers/ProductController';
import { UserController } from './controllers/UserController';
import { IsAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// router.get('/teste', (req: Request, res: Response) => {
//   return res.json({ ok: true });
// })

router.post('/users', new UserController().handle)
router.post('/session/', new UserController().authUser)
router.get('/me', IsAuthenticated, new UserController().detailUser)

//Categories
router.post('/category', IsAuthenticated, new CategoryController().handle)
router.get('/category', IsAuthenticated, new CategoryController().listCategory)

router.post('/product', IsAuthenticated, new ProductController().handle)

export { router };