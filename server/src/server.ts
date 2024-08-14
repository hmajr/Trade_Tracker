import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./route"

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  host: '192.168.3.95',
  port: 3333,
}).then((data) => {
  console.log("HTTP Server running: \n", data)
})