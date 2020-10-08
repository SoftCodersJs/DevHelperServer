import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class Skills {
    createSkills(req: Request, res: Response) {
        return res.send({userID: req.userId})
    }

    showSKills() {

    }
}

export default Skills