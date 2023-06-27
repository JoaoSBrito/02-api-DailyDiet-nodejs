import fastify from "fastify";
import cookie from "@fastify/cookie";
import { userRoute } from "./routes/user";

export const app = fastify()

app.register(cookie)

// app.register(mealsRoute, {
//   prefix: 'meals',
// })

app.register(userRoute, {
  prefix: 'user',
})