import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config()

//obtenemos el nombre del archivo actual de la variable de entorno meta.url
//y posteriormente el nombre de la carpeta actual de la app que en este caso es
//src
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

//importamos la ruta para usuarios
import authRoutes from './routes/auth.routes.js';
//importamos las rutas para productos
import productRoutes from'./routes/products.routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173',process.env.URL, process.env.URL_FRONTEND],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use('/img/', express.static(path.join(_dirname,'/public/img/')))

//indicamos que el servidor utilice el objeto authRoutes
app.use('/api/', authRoutes);
app.use('/api',productRoutes);

export default app;