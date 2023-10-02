
import { nanoid } from 'nanoid'

import db from '../database/database.connection.js'

async function postUrl (req, res) {
    const { user_id } = res.locals.user
    const { url } = req.body

    const shortUrl = nanoid(8)
    
    try {
        await db.query(`
        INSERT INTO urls
        (user_id, url_link, short_url)
        VALUES
        ($1, $2)`, [user_id, url, shortUrl]
        )
        
        urlData = await db.query(`
        SELECT * 
        FROM urls
        WHERE url_link = $1`, [url]
        )

        const urlRes = {
            id: urlData.id,
            shortUrl: urlData.short_url
        }
        
        return res.status(201).send(urlRes)
    } catch (error) {
        return res.sendStatus(500)
    }
}

async function getOneUrl(req, res) {
    try {
        const { id } = req.params;
        
        const urlById = await db.query(`
        SELECT * 
        FROM urls
        WHERE id = $1`, [id]
        )

        if(urlById.rows.length == 0) {
            return res.sendStatus(404)
        }
        
        const urlData = {
            id: id,
	        shortUrl: urlById.rows[0].shortUrl,
	        url_link: urlById.rows[0].url_link
        }

        return res.status(200).send(urlData)
    } catch (error) {
        return res.sendStatus(500)
    }
}

async function openUrl(req, res) {
    try {
       const { shortUrl }  = req.params;

       const urlData = await db.query(`
       SELECT *
       FROM urls
       WHERE short_url = $1`, [shortUrl]
       )

       if(urlData.rows.length == 0) {
        return res.sendStatus(404)
       }

       const increasedCount = Number(urlData.rows[0].views_count) + 1 
       const { id, url_link } = urlData.rows[0]

       await db.query(
        `UPDATE urls 
        SET views_count = $1
        WHERE id = $2`, [increasedCount, id]
       )

       return res.redirect(url_link)

    } catch (error) {
        return res.sendStatus(500)
    }
}

async function deleteUrl(req, res) {
    try {
        const { user_id, id } = res.locals.user
        
        urlBelongstoUser = await db.query(
            `SELECT *
            FROM urls
            WHERE id = $1`, [id]
        )

        if(urlBelongstoUser.rows.length == 0){
            return res.sendStatus(404)
        }
        const urlUser = urlBelongstoUser.rows[0].user_id

        if(urlUser != user_id){
            return res.sendStatus(401)
        }

        await db.query(
            `DELETE 
            FROM urls
            WHERE id = $1`, [id]
        )

        return res.sendStatus(204)

    } catch (error) {
        return res.sendStatus(500)
    }
}

export { postUrl, getOneUrl, openUrl, deleteUrl }