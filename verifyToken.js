
const jsonwebtoken = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ message: 'Access denied' });
    }

    try {

    } catch(err) {
        return res.status(401).send({ message: 'Access denied' });
    }
}
