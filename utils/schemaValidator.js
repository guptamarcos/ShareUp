const Joi = require("joi");

const signupValidate = Joi.object({
    password: Joi.string().min(8).max(64).required(),
    email: Joi.string().email().required(),
    allPost: Joi.forbidden(),
});

const postValidate = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(5).required(),
    imageUrl: Joi.string().required(),
    owner: Joi.forbidden(),
    allComments: Joi.forbidden(),
});

const commentValidate = Joi.object({
    content: Joi.string().min(5).required(),
    owner: Joi.forbidden(),
})


module.exports = { signupValidate,postValidate, commentValidate};