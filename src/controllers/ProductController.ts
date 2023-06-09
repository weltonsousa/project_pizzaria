import { Request, Response } from "express"
import { ProductService } from "../services/product/ProductService";

class ProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const service = new ProductService();

    if (!req.file) {
      throw new Error("error upload file");
    } else {

      const { originalname, filename: banner } = req.file;

      const product = await service.execute({ name, price, description, banner, category_id })

      return res.json(product)
    }
  }
}

export { ProductController }