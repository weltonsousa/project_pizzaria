import { Category } from "../../model/Category"
import prismaClient from "../../prisma"

class CategoryService {
  async execute({ name }: Category) {

    if (name === '') {
      throw new Error('Name invalid')
    }

    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true
      }
    })
    return category;
  }

  async listCategory() {
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      }
    })

    return categories;
  }

  async listCategoryId({ category_id }) {
    const findByCategory = await prismaClient.product.findMany({
      where: {
        category_id: category_id
      }
    })
    return findByCategory;
  }
}

export { CategoryService }