const Joi = require("joi");

const signupValidate = Joi.object({
    username: Joi.string().min(5).max(64).required(),
    password: Joi.string().min(5).max(64).required(),
    email: Joi.string().email().required(),
    allPost: Joi.forbidden(),
});

const postValidate = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(5).required(),
    owner: Joi.forbidden(),
    allComments: Joi.forbidden(),
});

const commentValidate = Joi.object({
    content: Joi.string().min(5).required(),
    owner: Joi.forbidden(),
})


module.exports = { signupValidate,postValidate, commentValidate};