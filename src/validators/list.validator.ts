import { ValidatorError } from "errors/validator.error";
import { ListRequest } from "types/list.type";
import { z } from "zod";

export const listRequestValidator = async (request: ListRequest) => {
    try {
        const scheme = z.object({ date: z.string() }).strict();

        const validated = await scheme.parseAsync(scheme);

        return validated;
    } catch (error) {
        throw new ValidatorError("List Request Validator", "Validation Error")
    }
}