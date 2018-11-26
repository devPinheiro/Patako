import Joi from 'joi';
import Note from './notes.model';

export default {
    // Implement async func for create method
    async create (req, res){
        // let's try and catch for the async func in case the promise fail to resolve
        try {
             // let's use Joi dev to handle validations
             const schema = Joi.object().keys({
              title: Joi.string().required(),
              content: Joi.string().required()
             });
            // let's retrieve value or error from Joi.validate method
            const {value, error} = Joi.validate(req.body, schema);
            if(error && error.details){
                return res.status(400).json(error);
            }
            const note = await Note.create(Object.assign({}, value));
            return res.json(note);
            
        // catch any error if promise fail to resolve
        } 
        catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    },

    // Implement async func for get one method
    async getOne(req, res) {
        // let's try and catch for the async func in case the promise fail to resolve
        try {
            // let's get unique note id from user
            const { id } = req.params;
            // let's fetch note
            const note = await Note.findById({_id: id});
            if(!note){
               return res.status(404).json({err:"note not found"});
            }
            return res.status(200).send(note);
            
        }
        catch(error) {
            return res.status(500).send(error);
        }
    }
    
}