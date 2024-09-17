import z from "zod"

export const messageSchemaValidation = z.object({
   content: z.string()
   .min(2,{message:"content must be atlest 2 characters"})
   .max(300,{message:"content must be no longer then 300 characters"})
})