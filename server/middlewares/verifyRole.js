let = verifyRole = (req, res, next) => {

    let user = req.user;
    
    if (user.role === 'ADMIN_ROLE') {
        next()
    } else {
        return res.status(400).json({
            success: false,
            error: {
                message: 'No tienes permisos'
            }
        })
    }
}

module.exports = { verifyRole }