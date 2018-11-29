import User from './users.model';
import { required, string } from 'joi';

// 
export default {
    //creating a new user
    async create(req, res) {
       
       //use Joi for validation
       const Schema = Joi.object().keys({
          firstname: Joi.string().required(),
          lastname: Joi.string().required(),
          email: Joi.string()
                    .email()
                    .required(),
          password: Joi.string().required
       });

       const {value, error } = Joi.validate(Schema);
       if(error & error.details) {
           
       }
       return await res.json('started');
    }

}