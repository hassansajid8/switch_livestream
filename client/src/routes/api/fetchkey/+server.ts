import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST (event) {
    try{
        const { username } = await event.request.json();

        const user = await prisma.user.findUnique({ where: { username }});

        if(!user) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                {status: 404, headers: { 'Content-Type': 'application/json' }},
            );
        }
        
        return new Response(
            JSON.stringify({ message: "Success", streamkey: user.streamkey}),
            {status: 200, headers: { 'Content-Type': 'application/json' }}
        )

    }catch(e) {
        console.log("/api/fetchkey error:", e);

        return new Response(
            JSON.stringify({ message: "Some error occurred" }),
            {status: 500, headers: { 'Content-Type': 'application/json' }},
        );
    }
}