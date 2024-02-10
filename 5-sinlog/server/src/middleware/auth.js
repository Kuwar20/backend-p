/* 
When we do - 
export const auth= () => {} ; we are exporting a named function.
so to import this fn in other file we need to do - import {auth} from 'path'
example - import {authenticateToken} from '../middleware/auth.js'; 
*/

/*
and 2 way is to export default function , which we used here.
so to import this fn in other file we need to do - import auth from 'path'
example - import authenticateToken from '../middleware/auth.js'; 
*/

// Middleware to verify JWT token
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;