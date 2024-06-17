import type { Guest } from '$lib/types';
import { z } from 'zod';

export const schema = z
	.object({
		full_name: z.string().min(1, "Please enter your full name."),
		is_coming: z.enum(['TRUE', 'FALSE']).default("TRUE"),
		plus_one: z.enum(['TRUE', 'FALSE']).default("FALSE"),
		guest_name: z.string().default(''),
		email_confirm: z.boolean().default(false),
		email: z.string().email().or(z.literal('')),
		notes: z.string(),
	})
	.refine((data) => !data.email_confirm || (data.email_confirm && data.email), {
		message: 'Please provide an email address to confirm your RSVP.',
		path: ['email']
	})
	.refine((data) => data.plus_one === "FALSE" || (data.plus_one === "TRUE" && data.guest_name), {
		message: 'Please enter the name of your guest.',
		path: ['guest_name']
	});

export type Message = {
	rsvp: Guest,
	guest?: Guest,
}
