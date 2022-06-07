const db = require('../../data/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function authUser(credentials) {

    const user = db('users').where('email', credentials.email).first()
    if (!user) {
        return null
    } else {
        return user
    }

}

function findUser(email) {
    const user = db('users').where('email', email).first()
    if (!user) {
        return null
    } else {
        return user
    }
}

function updatePassword(email, password) {
    const user = db('user').where('email', email).first();
    let success = null
    if (!user) {
        success = false
        return success
    } else {
        const newPass = bcrypt.hashSync(password, process.env.HASH_ROUNDS)
        db('users').where('email', email).update('password', newPass)
        success = true
        return success
    }
}

function validateUser(req, res, next) {


    if (req.headers.authorization === undefined) {
        res.status(401).json({ message: 'Invalid Authorization 001' })
        return
    } else {
        try {
            if (!jwt.verify(req.headers.authorization, process.env.JWT_SECRET)) {
                res.status(401).json({ message: 'Invalid Authorization 002' })
                return
            }
        } catch (err) {
            res.status(401).json({ message: 'Invalid Authorization 003', error: err })
            return
        }
    }
    next();
}

module.exports = {
    authUser,
    findUser,
    updatePassword,
    validateUser
}