const { celebrate, Joi } = require('celebrate');

module.exports = {
    get: celebrate({
        params: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),

    post: celebrate({
        body: Joi.object().keys({
            name: Joi.string().required().min(2).max(30),
            link: Joi.string().required().uri(),
            userId: Joi.string().alphanum().length(24),
        }),
    }),
};
