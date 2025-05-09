import { PrismaClient } from "@prisma/client"
import type { Actions } from "@sveltejs/kit";


const prisma = new PrismaClient();

export async function load() {
    try{
        const streams = await prisma.user.findMany({
            where: {
                isLive: true,
            }
        });

        return {
            streams: streams
        }

    }catch(e){
        console.log("Error in page load (/): ", e);
    }
}