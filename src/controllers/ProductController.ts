import { Request, Response } from "express"
import { ProductService } from "../services/Product/ProductService";

class ProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    let banner = '';

    const service = new ProductService();

    const product = await service.execute({ name, price, description, banner, category_id })

    return res.json(product)
  }
}

export { ProductController }