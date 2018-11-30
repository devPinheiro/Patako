import Joi from 'joi';
import bcrypt from 'bcrypt';

export default {
    // compare passwords
    comparePass(plainText, encrytedPass){
        return bcrypt.compareSync(plainText, encrytedPass);
    },
    // validate login credentials
    validateLogin(body) {
        const Schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required()
        });

        const { value, error } = Joi.validate(body, Schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    // encrypt password
    encryptPassword(plainText){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainText, salt);
    },
    // validate signup credentials
    validateSignUp(body){
        const Schema = Joi.object().keys({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required()
        });

        const { value, error } = Joi.validate(body, Schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    }
};