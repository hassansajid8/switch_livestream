import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST (event) {
    try{
        const { username, password } = await event.request.json();

        const user = await prisma.user.findUnique({ where: { username }});

        if(!user) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                {status: 404, headers: { 'Content-Type': 'applciation/json' }},
            );
        }

        const isAuth = await bcrypt.compare(password, user.password);

        if(!isAuth){
            return new Response(
                JSON.stringify({ message: "Incorrect Password" }),
                {status: 401, headers: { 'Content-Type': 'applciation/json' }},
            );
        }

        return new Response(
            JSON.stringify({ message: "Logged in" }),
            {status: 200, headers: { 'Content-Type': 'application/json' }},
        );
    } catch (e: any) {
        console.log("Some error occurred: ", e);

        return new Response(
            JSON.stringify({ message: "Some error occurred" }),
            {status: 500, headers: { 'Content-Type': 'application/json' }},
        );
    }
}