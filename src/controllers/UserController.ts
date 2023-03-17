import { Request, Response } from "express"
import { UserService } from "../services/user/UserService";

class UserController {

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userService = new UserService();

    const user = await userService.execute({
      name,
      email,
      password
    });
    return res.json(user)
  }

  async authUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const userService = new UserService();

    const auth = await userService.authUser({
      email,
      password,
    })

    return res.json(auth);
  }

  async detailUser(req: Request, res: Response) {
    const userId = req.user_id;

    const detailUser = new UserService();

    const user = await detailUser.detailUser(userId);

    return res.json(user);
  }

}

export { UserController }