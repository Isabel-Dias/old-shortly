import bcrypt from "bcrypt"
import db from "../database/database.connection.js";
import { signUpSchema } from "../schemas/auth.schema.js";

async function signUp(req, res) {

    try {
        const {name, email, password, confirmPassword} = req.body;

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
     
        if(password !== confirmPassword) {
        return res.status(422).send("A senha digitada e sua confirmação não são iguais")
        } 

        const passwordHash = bcrypt.hashSync(password, 10);
 
        if(userExists.rows.length == 0) {
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
        const { user_id } = res.locals.user
        userData = await db.query(
            `SELECT users.name, urls.*
            FROM users
            JOIN urls 
            ON users.id = urls.user_id
            WHERE users.id = $1`, [user_id]
        )

        const urlsList = userData.rows.map(url => {
            return (
                {
                    id: url.id,
			        shortUrl: url.short_url,
			        url: url.url_link,
			        visitCount: url.views_count
                }
            )
        })

        const viewsSum = await db.query(
            `SELECT SUM(views_count) AS "sum" 
            FROM urls
            WHERE id = $1`, [user_id]
        )

        const { name } = userData.rows[0]

        const resData = {
            id: user.user_id,
	        name: name,
	        visitCount: viewsSum.sum,
	        shortenedUrls: urlsList
        } 

        return res.status(200).send(resData)

    } catch (error) {
        return res.sendStatus(500)
    }
}

async function getRankings (req, res) {
    try {
        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export { signUp, userPage, getRankings }