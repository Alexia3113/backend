import { Router } from "express";
import {login, logout, register,profile,verifyToken} from '../controllers/auth.controller.js';
import { authRequired } from "../middlewares/validateToken.js";

//importamos el validatorSchema
import { validateSchema } from "../middlewares/validator.middleware.js";
//importar esquemas de validacion
import { registerSchema,loginSchema } from "../schemas/auth.schemas.js";

const router = Router();

router.get('/verify', verifyToken);
//ruta para registrarse
router.post('/register',validateSchema(registerSchema),register);
//ruta iniciar sesion
router.post('/login', validateSchema(loginSchema),login);
router.post('/logout',logout);//post peticiones al servidor

//ruta para perfil del usuario
router.get('/profile',authRequired,profile);//get obtener datos del usuario

export default router;