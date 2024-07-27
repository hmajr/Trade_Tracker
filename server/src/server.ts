import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./route"

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  host: '192.168.3.80',
  port: 3333,
}).then((data) => {
  console.log("HTTP Server running: \n", data)
})