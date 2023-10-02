import db from "../database/database.connection.js";
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { signInSchema } from "../schemas/auth.schema.js";

export async function signIn(req, res) {
    const { email, password } = req.body;

    const validationSchema = signInSchema.validate(req.body);

        if(validationSchema.error){
            return res.status(422).send("Todos os campos são obrigatórios")
        }
        

    //const user = await db.collection('users').findOne({ email });

    if(!user) {
        return res.sendStatus(404)
    }
        
    if(user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        
        //await db.collection("sessions").insertOne({userId: user._id,token})
        
        return res.status(200).send({token});
    } else {
        return res.sendStatus(401);
    }
};