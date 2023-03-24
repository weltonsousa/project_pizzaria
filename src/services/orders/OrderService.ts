import { Order } from "../../model/Order";
import prismaClient from "../../prisma";

class OrderService {
  async createOrder({ table, name }: Order) {
    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name
      }
    })
    return order;
  }

  async removeOrder({ order_id }: Order) {
    const order = await prismaClient.order.delete({
      where: {
        id: order_id,
      }
    });
    return order;
  }

  async sendOrder({ order_id }: Order) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        draft: false
      }
    });
    return order;
  }

  async listOrder() {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    return orders;
  }

  async detailOder({ order_id }: Order) {
    const order = await prismaClient.item.findMany({
      where: {
        order_id: order_id
      },
      include: {
        product: true,
        order: true
      }
    });
    return order;
  }

  async finishOrder({ order_id }: Order) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        status: true
      }
    });
    return order;
  }
}

export { OrderService }