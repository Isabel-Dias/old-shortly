import bcrypt from "bcrypt"
//import { signUpSchema } from "../schemas/auth.schema.js";

export async function signUp(req, res) {
    const user = req.body;

    //const validationSchema = signUpSchema.validate(user);

   // if(validationSchema.error){
        //return res.status(422).send("Todos os campos são obrigatórios")
   // }

    try {
        
        const {name, email, password} = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        return res.sendStatus(201)
        
    } catch (error) {
        return console.log(error)
    }
}