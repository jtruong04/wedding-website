import {z} from "zod";

export const PASSCODE_LENGTH = 4;

export const schema = z.object({
    passcode: z.array(z.string().length(1)).length(PASSCODE_LENGTH),
})
