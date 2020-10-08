import { json, Request, Response, NextFunction } from "express";
import { config }from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import database from "../database";

config();

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
                        }, String(process.env.JWT_KEY),
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
}

export default Authentication;