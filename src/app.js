import express from 'express'
import morgan from 'morgan'
import TasksRoutes from './routes/tasks.routes'
import UserRoutes from './routes/user.routes'
import AuthRoutes from './routes/auth.routes'

const app = express()
app.disable('x-powered-by')

app.set('port', process.env.PORT || 8080);
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/tasks', TasksRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/auth', AuthRoutes)

export default app