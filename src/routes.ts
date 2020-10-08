import { Router } from 'express';
import User from './Controllers/User';

import Authentication from './Controllers/Authentication';
import Skills from './Controllers/Skills';
import Auth from './Middlewares/Auth';

const routes = Router();
const authentication = new Authentication();
const skills = new Skills();
const auth = new Auth();

routes.post('/user', User.create);
routes.get('/sign', authentication.sign);
routes.get('/create_skills', auth.index, skills.createSkills);

export default routes;