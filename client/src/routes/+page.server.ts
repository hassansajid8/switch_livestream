import { SECRET_KEY } from "$env/static/private";
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"


const prisma = new PrismaClient();

export async function load({ cookies }) {
    try{
        const streams = await prisma.user.findMany({
            where: {
                isLive: true,
            }
        });

        const token = cookies.get("token") || ''; 
        if(token) {
            const verify = jwt.verify(token, SECRET_KEY) || null;
            if(verify){
                const user = await prisma.user.findUnique({
                    where: {
                        id: verify.id
                    },
                    include: {
                        following: true
                    }
                });

                return {
                    user: user,
                    streams: streams
                }
            }
        }

        return {
            streams: streams
        }

    }catch(e){
        console.log("Error in page load (/): ", e);
    }
}