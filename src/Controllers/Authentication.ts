import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import database from "../database";
import EmailService from '../Services/Email_Service';
import template from '../Views/Templates/EmailTemplate';

import 'dotenv/config';

interface DataUser {
    id_user: number;
}

class Authentication {
    async sign(req: Request, res: Response) {
        try {
            const { emailUser, passwordUser } = await req.body;

            const results = await database("users")
                .select("password")
                .select("email")
                .select("id")
                .where("email", emailUser)
                .first()

            if(!results) {
                return res.status(401).send({ message: "authentication failure" });
            }

            const { email, id } = results;

            if(results) {
                bcrypt.compare(passwordUser, results.password, (err, results) => {
                    if(err) {
                        return res.status(401).send({ message: "authentication failure" });
                    }

                    if(results) {
                        const token = jwt.sign({
                            id_user: id,
                            email: email
                        }, process.env.JWT_ACESS,
                        {
                            expiresIn: "7d"
                        });

                        return res.status(201).send({
                            message: "successfully authenticated",
                            token: token
                        });
                    }
    
                    return res.status(401).send({ message: "authentication failure" });
                });
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    async forgot_password(request: Request, response: Response) {
        const emailService = new EmailService();

        const { email } = request.body;

        if (!(email.includes('@')) || !(email.includes('.com'))) {
            return response.status(400).json({ message: 'Email invalido'})
        }
        
        try {
            const results = await database.select("id")
                .from('users')
                .where("email", email)
                .select('id')
                .select('github')
                .first()
            
            const token = jwt.sign(
                {
                    id_user: results.id,
                },
                process.env.JWT_ACESS,
                {
                   expiresIn: '12h'
                }
            );

            if(!results) {
                return response.status(400).json({ message: 'este email não está cadastrado na base de dados'});
            }

            await emailService.index(email, template(process.env.SITE_BASE_URL, results.github, token), template(process.env.SITE_BASE_URL, results.github, token));

            return response.status(200).json({ message: 'Emviamos um email para você recuperar a sua senha'});

        } catch (error) {
            console.log(error.response.body);
            return response.status(400).json({ message: 'falha na recuperação de senha'})
        }
    }

    async password_recovery(request: Request, response: Response) {
        const authHeader = await request.headers.authorization;
        const { password, confirmPassword } = request.body;

        if(!(password === confirmPassword)) {
            return response.status(401).send({ error: 'comfirmação de senha inválida'})
        }

        if(!authHeader) {
            return response.status(401).send({ error: 'No token provided'})
        }
    
        const parts = authHeader.split(' ');

        if(!(parts.length === 2)) {
            return response.status(401).send({ error: 'corrupted token'})
        }

        const [ scheme, token ] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return response.status(401).send({ error: 'Token malformatted' })
        }

        await jwt.verify(token, process.env.JWT_ACESS, async(err, decode ) => {
            if(err) {
                response.status(401).json({ message: 'Token invalid'});
            }

            const {  id_user } = decode as DataUser;

            const salt = await bcrypt.genSaltSync(12)
            const hash = await bcrypt.hashSync(password, salt)

            try {
                await database('users')
                    .where('id', id_user)
                    .update({ password: hash })

                return response.status(200).json({ message: 'Sua senha foi redefinida'})
            } catch (error) {
                console.log(error)
            }
        });
    }
}

export default Authentication;