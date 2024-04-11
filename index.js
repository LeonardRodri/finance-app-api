import express from 'express'
import 'dotenv/config.js'
import { CreateUserController } from './src/controllers/create-user.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (request, response) => {
  const createUserController = new CreateUserController()

  const { statusCode, body } = await createUserController.execute(request)

  response.status(statusCode).json(body)
})

app.listen(3000, () => {
  console.log(`Listening on 3000`)
})
