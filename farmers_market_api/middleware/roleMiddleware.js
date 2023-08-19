const jwt = require('jsonwebtoken');

const ensureRole = (roles) => {
    return (req, res, next) => {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const token = authHeader.split(' ')[1]; 

        try {
            const decoded = jwt.verify(token, "aaaa");
            req.user = decoded.user;

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ msg: 'Access denied' });
            }

            next();
        } catch (err) {
            console.error('something wrong with auth middleware', err);
            res.status(500).send('Server error');
        }
    };
};

module.exports = {
    ensureRole
};
