import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserDataInfomation {
    id_user: number;
    email: string;
}

class Auth {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = await req.headers.authorization;
            if(!authHeader) {
                return res.status(401).send({ error: 'No token provided'})
            }

            const parts = authHeader.split(' ');

            if(!(parts.length === 2)) {
                return res.status(401).send({ error: 'Token error'})
            }

            const [ scheme, token ] = parts;

            if (!/^Bearer$/i.test(scheme)) {
                return res.status(401).send({ error: 'Token malformatted' })
            }

            jwt.verify(token, process.env.JWT_ACESS, (err, decode ) => {
                if(err) {
                    return res.status(401).send({ error: "Token invalid"})
                }

                const {  id_user, email } = decode as UserDataInfomation; 
                req.userId = id_user;
                req.email = email;

                next();
            });
            

        } catch (err) {
            console.error(err);
            return res.status(401).send({ message: 'authentication failure' });
        }
    }
}

export default Auth;