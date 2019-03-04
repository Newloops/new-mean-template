const jwt = require('jsonwebtoken');

let = authentication = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'No tienes acceso'
            }
        })
    }

    var token = req.headers.authorization
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'El token no es valido'
                }
            })
        }

        req.user = decoded.user;
        next();
        
    })

}

module.exports = { authentication }