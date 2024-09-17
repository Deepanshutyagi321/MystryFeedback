import z from "zod"

export const AcceptingMessageSchemaValidation = z.object({
    acceptmessage: z.boolean()
})