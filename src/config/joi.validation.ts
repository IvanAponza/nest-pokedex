

import * as Joi from 'joi'

export const JoiValidationSchema = Joi.object({
    PORT: Joi.number().default(3001),
    MONGODB: Joi.required(),
    DEFAULT_LIMIT: Joi.number().default(7)
})