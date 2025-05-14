import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(event) {
    try {
        const { username, streamername, isFollowing } = await event.request.json();
        console.log("Recieved post req to toggle follow: ");
        console.log(`username = ${username}, streamername = ${streamername}, isFollowing = ${isFollowing}`);

        let response;

        if(!isFollowing){
            response = await prisma.user.update({
                where: {
                    username: username,
                },
                data: {
                    following: {
                        connect: { username: streamername },
                    },
                },
            });
        }
        else{
            response = await prisma.user.update({
                where: {
                    username: username,
                },
                data: {
                    following: {
                        disconnect: { username: streamername },
                    },
                },
            });
        }

        if (!response) {
            return new Response(
                JSON.stringify({ message: "Some error occurred" }),
                { status: 500, headers: { 'Content-Type': 'applciation/json' } },
            );
        }

        console.log("response ok");

        return new Response(
            JSON.stringify({ message: "Success" }),
            { status: 200, headers: { 'Content-Type': 'applciation/json' } },
        );

    } catch (e) {
        console.log("/api/following: ", e);
        return new Response(
            JSON.stringify({ message: "Some error occurred" }),
            { status: 500, headers: { 'Content-Type': 'applciation/json' } },
        );
    }
}