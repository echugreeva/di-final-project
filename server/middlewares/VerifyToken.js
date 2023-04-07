import jwt from 'jsonwebtoken'

export const VerifyToken = (req,res,next) => {
    const accessToken = req.cookies.accessToken || req.headers['x-access-token'];
    if(!accessToken) return res.sendStatus(401)
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.sendStatus(403)
        console.log(decoded)
        const id = decoded.userId;
        const email = decoded.email;

        console.log('verify =>', decoded.userId, email);
        next()
    })
}