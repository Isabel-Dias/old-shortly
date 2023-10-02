import db from '../database/database.connection.js'

async function AuthSession (req, res, next){
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ","");

    if(!token ){
        return res.sendStatus(401);
    }
    try {
        //const session = await db.collection('sessions').findOne({token: token});

        if(!session){
            return res.sendStatus(401);
        }
        
        //const userId = await db.collection('users').findOne({_id: session.userId})

        if(!userId){
            return res.sendStatus(401);
        }
        res.locals.user = userId;
        next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export {AuthSession}; 