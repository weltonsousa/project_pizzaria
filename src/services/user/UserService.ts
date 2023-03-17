import prismaClient from "../../prisma";
import { compare, hash } from 'bcryptjs'
//import { User } from "@prisma/client";
import { AuthUser, User } from "../../model/User";
import { sign } from 'jsonwebtoken';

// interface User {
//   name: string;
//   email: string;
//   password: string;
// }

class UserService {
  async execute({ name, email, password }: User) {
    if (!email) { throw new Error("Email incorrect") }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })
    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      }

    })
    return user;
  }

  async authUser({ email, password }: AuthUser) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new Error("User/Password incorrect")
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/Password incorrect")
    }

    //gerar um token jwt e devolver os dados do usuario com o id, name e senha
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }

  async detailUser(userId: string) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return { user }
  }

}
export { UserService }