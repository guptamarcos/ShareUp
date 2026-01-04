const Joi = require("joi");

const signupValidate = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().required(),
});

const loginValidate = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const postValidate = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(5).required(),
    imageUrl: Joi.string().uri().required(),
    isOwner: Joi.forbidden(),
    allComments: Joi.forbidden(),
});




const commentValidate = Joi.object({
    content: Joi.string().min(5).required(),
})


module.exports = { signupValidate, loginValidate,postValidate, commentValidate};