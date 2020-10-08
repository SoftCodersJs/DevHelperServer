import { Router } from 'express';
import User from './Controllers/User';

import Auth from './Middlewares/Auth';

import Authentication from './Controllers/Authentication';
import Skills from './Controllers/Skills';
import Questions from './Controllers/Questions';

const routes = Router();
const authentication = new Authentication();
const skills = new Skills();
const auth = new Auth();
const questions = new Questions()


// User
routes.post('/user', User.create);
routes.post('/sign', authentication.sign);

// skills
routes.get('/create_skills', auth.index, skills.createSkills);

// questions
routes.post('/questions', auth.index, questions.create);
routes.get('/questions/filter-skill', auth.index, questions.readFilterSkill);
routes.get('/questions', auth.index, questions.read);

export default routes;