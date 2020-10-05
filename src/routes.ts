import { Router } from 'express';
import User from './Controllers/User';
import Authentication from './Controllers/Authentication';

const routes = Router();
const authentication = new Authentication();

routes.post('/user', User.create);
routes.post('/', authentication.sign);

export default routes;