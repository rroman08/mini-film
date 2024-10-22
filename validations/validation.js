
const joi = require('joi');

const registerValidation = (data) => {
    const schemaValidation = joi.object({
        user_name: joi.string().required().min(3).max(256),
        email: joi.string().required().min(6).max(256).email(),
        password: joi.string().min(6).max(1024)
    });
    
    return schemaValidation.validate(data);
};

module.exports.registerValidation = registerValidation;
