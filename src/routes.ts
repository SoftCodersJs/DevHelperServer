import {Router} from 'express'
import User from './Controllers/User'

const routes = Router()

routes.post('/user', User.create)

export default routes