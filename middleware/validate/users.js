const { celebrate, Joi } = require('celebrate');

module.exports = {
    get: celebrate({
        params: Joi.object().keys({
            id: Joi.string().alphanum().length(24),
        }),
    }),

    posts: celebrate({
        body: Joi.object().keys({
            name: Joi.string().required().min(2).max(30),
            password: Joi.string().required().min(8),
            email: Joi.string().required().email(),
            about: Joi.string().required().min(2).max(30),
            avatar: Joi.string().required().regex(
                /^https?:\/\/(www\.)?([a-zA-Z-]{1,61}\.)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/,
            ),
        }),
    }),

    update: celebrate({
        body: Joi.object().keys({
            name: Joi.string().required().min(2).max(30),
            about: Joi.string().required().min(2).max(30),
        }),
    }),

    updateAvatar: celebrate({
        body: Joi.object().keys({
            avatar: Joi.string().required().regex(
                /^https?:\/\/(www\.)?([a-zA-Z-]{1,61}\.)?([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/,
            ),
        }),
    }),

    sign: celebrate({
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8),
        }),
    }),

};
