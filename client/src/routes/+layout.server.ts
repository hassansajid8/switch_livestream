import { SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';

export async function load({ cookies }){
    const token = cookies.get('token') || '';

    if(token){
        const verify = jwt.verify(token, SECRET_KEY) || null;
    
        console.log(verify);
        
        if(verify) {
            return {
                user: {
                    id: verify.id,
                    username: verify.username,
                }
            }
        }
    } else {
        return;
    }

}