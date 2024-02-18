import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_secret_key'; //or process.env.JWT_SECRET;

const authenticateToken = (req,res,next)=>{
    const token = req.header('authorization');
    if(!token){
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token,JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

export default authenticateToken;