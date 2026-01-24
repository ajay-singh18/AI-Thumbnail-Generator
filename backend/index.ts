import express, { Request, Response } from 'express';
import cors from 'cors'
const app = express();
import 'dotenv/config'
import connectDB from './configs/db.js';

await connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});