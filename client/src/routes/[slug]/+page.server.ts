import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import jwt from "jsonwebtoken";
import { SECRET_KEY } from '$env/static/private';


const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params, cookies }) => {

    const token = cookies.get('token') || '';
    let user;

    if(token){
        const verify = jwt.verify(token, SECRET_KEY) || null;
    
        console.log(verify);
        
        if(verify) {
            user = await prisma.user.findUnique({
                where: {
                    id: verify.id
                },
                include: {
                    following: true
                }
            })
        }
    }

    let isLive = false;

    try {
        const streamer = await prisma.user.findUnique({
            where: {
                username: params.slug
            }
        });

        if(!streamer){
            console.log(`Streamer ${params.slug} not found`);
        } else{

            if(streamer?.isLive){
                isLive = true;
            }
        }

    } catch(e) {
        console.log("error fetching streamer", e)
    }

	return {
        user, 
        username: params.slug,
        isLive
    }
};