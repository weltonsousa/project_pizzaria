import { Request, Response } from "express";
import { ItemService } from "../services/orders/ItemService";

class ItemConroller {
  async addItem(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const addItem = new ItemService();

    const order = await addItem.addItem({
      order_id,
      product_id,
      amount
    });
    return res.json(order);
  }

  async removeItem(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    const removeItemService = new ItemService();

    const order = await removeItemService.removeItem({
      item_id
    });

    return res.json(order);
  }

}

export { ItemConroller }