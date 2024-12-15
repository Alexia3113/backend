import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//funcion para generar un token de inicio de sesion
export function createAccessToken(payload) {
    return new Promise ((resolve, reject)=>{ //se puede resolver o rechazar 
        jwt.sign( 
            payload,
            TOKEN_SECRET, //llave secreta
            {
                expiresIn:"1d"
            },
            (err,token)=>{
                if(err){
                    reject(err);
                    console.log(err)
                }
                resolve(token)
            }
        )//fin de sign
    })//fin de promise   
}//fin de createAccessToken
