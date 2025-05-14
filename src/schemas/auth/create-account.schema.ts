import { z } from 'zod'

export const createAccountSchema = z.object({
	email: z.string().email(),
	username: z
		.string()
		.min(1)
		.regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
	password: z.string().min(8)
})


export type TypeCreateAccountSchema = z.infer<typeof createAccountSchema>