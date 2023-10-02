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
        
    
    const user = await db.query(`SELECT * 
        FROM users
        WHERE email = $1`, [email]
    )

    if(user.rows.length == 0) {
        return res.sendStatus(404)
    }
        
    if(bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        const{ id } = user.rows[0]

        await db.query(
            `INSERT INTO sessions
            (token, user_id)
            VALUES ($1, $2)`, [token, id]
        )
        
        return res.status(200).send({token});
    } else {
        return res.sendStatus(401);
    }
};