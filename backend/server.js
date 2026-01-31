import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js'
import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'


const app = express();
const port = process.env.PORT || 8080;

connectDB();


app.use(express.json())
app.use(cors());

app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`);
})