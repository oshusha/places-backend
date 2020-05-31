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
            link: Joi.string().required().regex(
                /^https?:\/\/(www\.)?([a-zA-Z-]{1,61}\.)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/,
            ),
        }),
    }),
};
