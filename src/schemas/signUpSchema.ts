import z from "zod"

export const usernameValidation = z.string()
.min(2,"username must be atleast have 2 chracters")
.max(20,"username must be no more 20 chracters")
.regex(/^[a-zA-Z0-9]+$/,"user name must not contain special characters")

export const signUpSchemaValidation = z.object({
    username : usernameValidation,
    email: z.string().email({message:"Invalid email"}),
    password: z.string().min(6,{message:"password must be atlest 6 characters"})
})