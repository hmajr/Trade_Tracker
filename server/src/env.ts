import z from "zod";

const envSchema = z.object({
  // API_DATABASE_URL_SQLITE: z.string().url(),
  API_DATABASE_URL_POSTGRES: z.string().url(),
  API_MYSQL_ROOT_PASSWORD: z.string(),
  API_SERVER_ADDRESS: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)