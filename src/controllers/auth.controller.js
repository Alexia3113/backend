import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//funcion para registrar usuarios
export const register = async (req,res) =>{
    const {username,email,password} = req.body; 
    try{
        //validamos que email no este en la bd
        const userFound = await User.findOne({email});
        if(userFound){
            return res.status(400).json({message: ["El email ya esta en uso"]})
        }
        const passwordHash = await bcryptjs.hash(password,10);
        const newUser= new User({
            username,
            email,
            password: passwordHash
         });
    
    const userSaved = await newUser.save();
    const token = await createAccessToken({id: userSaved._id});
    res.cookie('token',token,{
        sameSite:'none', //para indicar que el back y el front estan en distintos servidores
        //httpOnly: true
        secure:true
        });
    res.json({
        id:userSaved._id,
        username: userSaved.username,
        email:userSaved.email
    });
    //console.log(username,email,password)
    }catch(error){
            console.log(error)
        }
}

//funcion para iniciar sesion 
export const login = async (req, res) =>{
    const {email,password} = req.body
    try{
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(400).json({message:["Usuario no encontrado"]})
        }
        const isMatch = await bcryptjs.compare(password,userFound.password);
        if(!isMatch){
            return res.status(400).json({message:['Password no coincide']})
        }
        const token = await createAccessToken({id:userFound._id});
        res.cookie('token',token,{
            sameSite:'none',
            //httpOnly: true
            secure:true
            });
        res.json({
        id:userFound._id,
        username: userFound.username,
        email:userFound.email
    });
    }catch(error)
    {console.log(error)}

}

export const logout = (req,res) => {
    res.clearCookie("token");
    return res.sendStatus(200);
}//fin de logout

//funcion para perfil del cliente
export const profile =async (req, res) =>{
    const userFound=await User.findById(req.user.id);
    
}//fin de profile

//funcion para avlidar el token de inicio de sesion
export const verifyToken = async (req, res) =>{
    const {token} =req.cookies;

    if(!token)
        return res.status(401).json({message: ["No autorizado"]});

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if(err) //si hay un error al validar el token
        return res.status(401).json({message:["No autorizado"]});

        const userFound = await User.findById(user.id);
        if(!userFound) //si no encuentra el usuario que viene en el token
        return res.status(401).json({message: ["No autorizado"]});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })//fin del return res.json
    })//fin del jwt.verify
}//fin de verifyToken