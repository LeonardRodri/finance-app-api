import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresCreateUserRepository {
  async execute(createdUserParams) {
    await PostgresHelper.query(
      'INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
      [
        createdUserParams.id,
        createdUserParams.first_name,
        createdUserParams.last_name,
        createdUserParams.email,
        createdUserParams.password,
      ],
    )

    const createdUser = await PostgresHelper.query(
      'SELECT * FROM users WHERE id = $1',
      [createdUserParams.id],
    )

    return createdUser[0]
  }
}
