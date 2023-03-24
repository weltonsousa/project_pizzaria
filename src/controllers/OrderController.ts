import { Request, Response } from "express";
import { OrderService } from "../services/orders/OrderService";

class OrderController {
  async createOrder(req: Request, res: Response) {
    const { table, name } = req.body;

    const createOrderService = new OrderService();

    const order = await createOrderService.createOrder({
      table,
      name
    });
    return res.json(order);
  }

  async orderRemove(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const service = new OrderService();

    const remove = await service.removeOrder({
      order_id
    });
    return res.json(remove);
  }

  async sendOrder(req: Request, res: Response) {
    const { order_id } = req.body;

    const service = new OrderService();

    const send = await service.sendOrder({
      order_id
    });
    return res.json(send);
  }

  async listOrder(req: Request, res: Response) {
    const listOrderService = new OrderService();

    const orders = await listOrderService.listOrder();

    return res.json(orders);
  }

  async detailOrder(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const detailOrderService = new OrderService();

    const orders = await detailOrderService.detailOder({
      order_id
    });
    return res.json(orders);
  }

  async finishOrder(req: Request, res: Response) {
    const { order_id } = req.body;

    const finishOrderService = new OrderService();

    const orders = await finishOrderService.finishOrder({
      order_id
    });
    return res.json(orders);
  }
}

export { OrderController }