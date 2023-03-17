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
}

export { CategoryService }