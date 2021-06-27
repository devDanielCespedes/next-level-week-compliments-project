import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAtuthenticateRequest {
  email: string,
  password: string,
}

class AuthenticateUserService {
  async execute({ email, password }: IAtuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({
      email,
    })


    if(!user) {
      throw new Error("Email/Password incorrect");
    }
    const passwordMath = await compare(password, user.password)

    if(!passwordMath) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      email: user.email,
    }, "fa32719b8cb18e934d02339e08237003", {
      subject: user.id,
      expiresIn: "1d"
    })
    return token;
  }
}

export { AuthenticateUserService }
