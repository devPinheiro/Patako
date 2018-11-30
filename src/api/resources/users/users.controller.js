import jwt from 'jsonwebtoken';
import User from './users.model';
import userService  from "./users.service";


// 
export default {
    //creating a new user
    async signUp(req, res) {
       try {
        // uses service for validating req.body   
        const {value, error} = userService.validateSignUp(req.body)
        if(error){
            return res.status(400).send(error);
        }
        
        const encryptedPass = userService.encryptPassword(value.password);

        await User.create({
           firstname: value.firstname,
           lastname: value.lastname,
           email: value.email,
           password: encryptedPass 
        });

        return res.status(200).json({success: true});

       } catch (error) {
           if(error)
              return res.status(500).send(error);
       }
    },
    
    // signing user in
    async login(req, res){
      try {
          // uses service for validating req.body   
          const { value, error } = userService.validateLogin(req.body)
          if (error) {
              return res.status(400).send(error);
          }
          // fecth user with corresponding credentials
          const user = await User.findOne({email: value.email});
         
          if(!user){
              return res.status(404).json({err: "user not found"});
          }

          const authenticated = userService.comparePass(valuePassword, user.password);
          
          if(!authenticated){
              return res.status(401).json({err: "user is unauthorized"});
          }

          // issue token for the authoeized user
          const token = jwt.issue({id:user._id}, 'id');
          return res.json({token});

        } catch (error) {
         if(error)
            return res.status(500).send(error); 
      }
    },

    // Passport Strategy implementation
    authenticate(req, res){
        return res.json(req.user);
    }

}