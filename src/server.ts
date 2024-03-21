import fastify from 'fastify'
import { object, z } from 'zod'
import { sql } from './lib/postgres'
import postgres from 'postgres'
const app = fastify()

app.get('/teste', (request, reply) => {
      return 'Hello world'
})

app.post('/links', async (request, reply) => {
      const createLinkSchema = z.object({
            code: z.string().min(3),
            url: z.string().url(),
      })


      const { code, url } = createLinkSchema.parse(request.body)
try{
      const result = await sql /*sql*/`
      INSERT INTO short_links (code, original_url)
      VALUES (${code}, ${url})
      RETURNING id
      `
      const link = result[0]
      return reply.status(201).send({
            shortLinkId: link.id
      })
} catch (err) {
      if (err instanceof postgres.PostgresError) {
            if (err.code === '23505') {
                  return reply.status(400).send({ message: 'Duplicated key'})
            }
      }
      console.error(err)
      return reply.status(500).send( { message: 'Internal error. Contact the administrator'})
}

})


app.listen({
      port: 3333,
}).then(() => {
      console.log("HTTP server running!")
})