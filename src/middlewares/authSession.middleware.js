import db from '../database/database.connection.js'

async function AuthSession (req, res, next){
    const { authorization } = req.headers;
    const { id } = req.params
    const token = authorization?.replace("Bearer ","");

    if(!token){
        return res.sendStatus(401);
    }
    try {
        const session = await db.query(
            `SELECT * 
            FROM sessions
            WHERE token = $1`, [token]
        )

        if(session.rows.length == 0){
            return res.sendStatus(401);
        }
        
        const { user_id } = session.rows[0]
        const userIdExists = await db.query(
            `SELECT * 
            FROM users
            WHERE id = $1` , [user_id]
        )

        if(userIdExists.rows.length == 0){
            return res.sendStatus(401);
        }
        res.locals.user = {user_id, id}
        next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export {AuthSession}; 