import Joi from 'joi';

class ValidationSchemas {
  get userDataSchema() {
    return Joi.object({
      name: Joi.string().trim().required(),
      birthDay: Joi.date(),
      email: Joi.string().email(),
    });
  }
}

export default new ValidationSchemas();
