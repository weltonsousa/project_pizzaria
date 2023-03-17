import { Request, Response } from "express"
import { CategoryService } from "../services/category/CategoryService";

class CategoryController {
  async handle(req: Request, res: Response) {

    const { name } = req.body;

    const servico = new CategoryService();

    const category = await servico.execute({ name });

    return res.json(category);

  }

  async listCategory(req: Request, res: Response) {

    const service = new CategoryService();

    const listCategory = await service.listCategory();

    return res.json(listCategory);
  }
}

export { CategoryController }