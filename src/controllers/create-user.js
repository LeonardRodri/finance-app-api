import { CreateUserCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body

      const requiredFields = ['first_name', 'last_name', 'email', 'password']

      for (const field of requiredFields) {
        if (!params[field] || params[field].length === 0) {
          return badRequest({ message: `Campo ${field} obrigatório` })
        }
      }

      const passwordIsValid = params.password.length < 6

      if (passwordIsValid) {
        return badRequest({
          message: `A senha deve conter no mínimo 6 caracteres`,
        })
      }

      const emailIsValid = validator.isEmail(params.email)

      if (!emailIsValid) {
        return badRequest({ message: `O e-mail ${params.email} é inválido` })
      }

      // chamar use case
      const createUserCase = new CreateUserCase()

      const createdUser = await createUserCase.execute(params)

      return created(createdUser)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
