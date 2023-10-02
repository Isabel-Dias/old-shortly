import bcrypt from "bcrypt"
import { signUpSchema } from "../schemas/auth.schema.js";

async function signUp(req, res) {
    const user = req.body;

    const validationSchema = signUpSchema.validate(user);

    if(validationSchema.error){
        return res.status(422).send("Todos os campos são obrigatórios")
    }

    if(user.password !== user.confirmPassword) {
        return res.status(422).send("A senha digitada e sua confirmação não são iguais")
    }

    try {
        
        const {name, email, password} = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const userExists = await db.query(
            `SELECT * 
            FROM users 
            WHERE email = $1`, 
            [email]
        )

        if(userExists.rows.length > 0) {
            return res.sendStatus(409)
        }

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