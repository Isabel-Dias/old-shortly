async function postUrl (req, res) {
    //const { user_id } = res.locals.user
    const { url } = req.body
    
    try {
        return res.sendStatus(201)
    } catch (error) {
        return res.sendStatus(500)
    }
}

async function getOneUrl(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function openUrl(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function deleteUrl(req, res) {
    try {
        
    } catch (error) {
        
    }
}

export { postUrl, getOneUrl, openUrl, deleteUrl }