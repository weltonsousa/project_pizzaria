import { Product } from "../../model/Product";

class ProductService {
  async execute({ name, price, description, banner, category_id }: Product) {
    return { ok: true }
  }
}

export { ProductService }