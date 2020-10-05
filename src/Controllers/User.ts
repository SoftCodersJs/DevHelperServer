import { Request, Response } from "express";
import database from "../database";

import bcrypt from 'bcryptjs';

export default {
  async create(req:Request, res:Response){
    const {cpf, description, location, email, password, phone, github} = req.body;

    if(!cpf || ! email || !password){
      return res.status(400).json({error:'Faltam dados'})
    }

    const salt = await bcrypt.genSaltSync(12)
    const hash = await bcrypt.hashSync(password, salt)
    
    const user = await database('users').insert({
      cpf, description, location, email, password:hash, phone, github,score:0.00
    }).catch(err => {
      if(err.code === 'ER_DUP_ENTRY'){
        return res.status(403).json({error:'Usuário já cadastrado', email})
      }
      return res.status(500).json({error:'Aconteceu um erro inesperado no servidor. \nPor favor, retorne mais tarde. '})
    })

    return res.json({cpf, description, location, email, phone, github})
  }
}