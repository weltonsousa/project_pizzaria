import prismaClient from "../../prisma";
import { Item } from "../../model/Item";

class ItemService {

  async addItem({ order_id, product_id, amount }: Item) {
    const add = await prismaClient.item.create({
      data: {
        order_id: order_id,
        product_id: product_id,
        amount
      }
    });

    return add;
  }

  async removeItem({ item_id }: Item) {
    const order = await prismaClient.item.delete({
      where: {
        id: item_id
      }
    })
    return order;
  }
}

export { ItemService }