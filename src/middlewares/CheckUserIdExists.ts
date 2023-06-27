import { FastifyReply, FastifyRequest } from "fastify";

export const checkUserId = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.cookies.userId;

  if(!userId){
    reply.status(404).send({
      error: 'Unauthorized.'
    })
  }
};