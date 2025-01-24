import Joi from 'joi';

export const validateInitializePayment = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'A valid email address is required.',
      'any.required': 'Email is required.',
    }),
    amount: Joi.number().integer().positive().required().messages({
      'number.base': 'Amount must be a number.',
      'number.positive': 'Amount must be greater than zero.',
      'any.required': 'Amount is required.',
    }),
    callback_url: Joi.string().uri().required().messages({
        'string.empty': 'Callback URL is required.',
        'string.uri': 'Invalid callback URL format.',
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message , success: false});
  }

  next();
};
