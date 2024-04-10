import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserCase {
  async execute(createdUserParams) {
    // gerar id do usuario
    const userId = uuid.v4()

    // criptografar senha do usuario
    const hashedPassword = await bcrypt.hash(createdUserParams.password, 10)

    // inserir usuario no banco de dados
    const user = {
      ...createdUserParams,
      id: userId,
      password: hashedPassword,
    }
    const postgresCreateUserRepository = new PostgresCreateUserRepository()

    const createdUser = await postgresCreateUserRepository.execute(user)

    return createdUser
  }
}
