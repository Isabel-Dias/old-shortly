
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js"
import urlRoutes from "./routes/urls.routes.js"

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRoutes)
app.use(urlRoutes)


const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})