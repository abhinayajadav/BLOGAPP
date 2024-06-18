const jwt = require('jsonwebtoken');
require('dotenv').config();

function TokenVerify(req, res, next) {
    // Get bearer token from headers
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).send({ message: "Unauthorized access. Please login" });
    }

    const token = bearerToken.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Attach decoded token to request object
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).send({ message: "Unauthorized access. Invalid token" });
    }
}

module.exports = TokenVerify;
