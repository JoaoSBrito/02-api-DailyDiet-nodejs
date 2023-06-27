import bcrypt  from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import knex from 'knex'
import { z } from 'zod'

export async function userRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
    })
    const { name, email } = createUserBodySchema.parse(request.body)


    const user = await knex('user').where({ email }).first()

    if(!user) {
      const userId = randomUUID()

      await knex('user').insert({
        id: userId,
        name, 
        email,
      })
      reply.cookie('userId', userId, {
        path: '/',
        maxAge: 1000 * 60 * 24 * 7, // 7 Days
      })
    } else {
      const userId = user.id

      reply.cookie('userId', userId, {
        path: '/',
        maxAge: 1000 * 60 * 24 * 7, // 7 Days
      })
    }
    
    return reply.status(201).send()
  })

}
