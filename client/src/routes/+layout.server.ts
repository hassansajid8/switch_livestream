import { SECRET_KEY } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function load({ cookies }){
    const token = cookies.get('token') || '';

    if(token){
        const verify = jwt.verify(token, SECRET_KEY) || null;
    
        console.log(verify);
        
        if(verify) {

            const user = await prisma.user.findUnique({
                where: {
                    id: verify.id
                },
                include: {
                    followers: true,
                    following: true
                }
            });

            const followinfo = {
                followers: user?.followers,
                following: user?.following                
            }

            return {
                user: {
                    id: verify.id,
                    username: verify.username,
                    followinfo
                }
            }
        }
    } else {
        return;
    }

}