import bcrypt from "bcrypt"
import db from "../database/database.connection.js";
import { signUpSchema } from "../schemas/auth.schema.js";

async function signUp(req, res) {
    user = req.body;

    try {

        const userExists = await db.query(
            `SELECT * 
            FROM users 
            WHERE email = $1`, 
           [email]
       )

        const validationSchema = signUpSchema.validate(user);

       if(validationSchema.error){
            return res.status(422).send("Todos os campos são obrigatórios")
        }
     
        if(user.password !== user.confirmPassword) {
        return res.status(422).send("A senha digitada e sua confirmação não são iguais")
        } 

        const {name, email, password} = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);
 
        if(userExists.rows.length > 0) {
            return res.sendStatus(409)
        }
 
        await db.query(
            `
            INSERT INTO users
            (name, email, password)
            VALUES
            ($1, $2, $3)
            `, [name, email, passwordHash]
        )
 
        return res.sendStatus(201)
        
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function userPage (req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function getRankings (req, res) {
    try {
        
    } catch (error) {
        
    }
}

export { signUp, userPage, getRankings }