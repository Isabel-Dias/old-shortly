import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import joi from "joi";
import dayjs from "dayjs";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => console.log(`Running server on port 5000`));