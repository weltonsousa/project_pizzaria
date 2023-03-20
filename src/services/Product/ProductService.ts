import { Product } from "../../model/Product";
import prismaClient from "../../prisma";

class ProductService {
  async execute({ name, price, description, banner, category_id }: Product) {

    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: banner,
        category_id: category_id
      }
    })
    return { product }
  }
}
export { ProductService }