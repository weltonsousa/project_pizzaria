import { Router } from 'express';
import multer from 'multer';
import { CategoryController } from './controllers/CategoryController';
import { ProductController } from './controllers/ProductController';
import { UserController } from './controllers/UserController';
import { IsAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("../tmp"));

// router.get('/teste', (req: Request, res: Response) => {
//   return res.json({ ok: true });
// })

router.post('/users', new UserController().handle)
router.post('/session/', new UserController().authUser)
router.get('/me', IsAuthenticated, new UserController().detailUser)

//Categories
router.post('/category', IsAuthenticated, new CategoryController().handle)
router.get('/category', IsAuthenticated, new CategoryController().listCategory)

router.post('/product', IsAuthenticated, upload.single('file'), new ProductController().handle)

export { router };