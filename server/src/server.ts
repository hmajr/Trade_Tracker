import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./route.ts"
import { env } from "./env.js"

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  host: env.API_SERVER_ADDRESS,
  port: Number(env.PORT) || 3333,
}).then((data) => {
  console.log("HTTP Server running: \n", data)
})