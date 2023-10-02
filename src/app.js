import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => console.log(`Running server on port 5000`));