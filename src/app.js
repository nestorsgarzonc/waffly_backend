import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import ServiceRoutes from './routes/service.routes'
import UserRoutes from './routes/user.routes'
import FreelancerRoutes from './routes/freelancer.routes'
import AuthRoutes from './routes/auth.routes'

const app = express()
app.disable('x-powered-by')

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/service', ServiceRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/freelancer', FreelancerRoutes)
app.use('/api/auth', AuthRoutes)

export default app