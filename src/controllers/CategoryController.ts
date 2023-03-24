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

  async listByCategory(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const listByCategory = new CategoryService();

    const products = await listByCategory.listCategoryId({
      category_id
    });

    // const products = await this.srv.listCategoryId({
    //   category_id
    // });

    return res.json(products);

  }
}

export { CategoryController }