import { PostgresHelper } from '../../db/postgres/helper'

export class PostgresCreateUserRepository {
  async execute(createdUserParams) {
    const results = await PostgresHelper.query(
      'INSERT INTO user (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
      [
        createdUserParams.ID,
        createdUserParams.first_name,
        createdUserParams.last_name,
        createdUserParams.email,
        createdUserParams.password,
      ],
    )
    return results[0]
  }
}
