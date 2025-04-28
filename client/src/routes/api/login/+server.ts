import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { SECRET_KEY } from "$env/static/private";

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

        const payload = {
            id: user.id,
            username: user.username,
        };

        const token = jwt.sign(payload, SECRET_KEY);

        event.cookies.set('token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7
        });

        return new Response(
            JSON.stringify({ message: "Logged in" }),
            {status: 200, headers: { 
                'Content-Type': 'application/json',
             }},
        );
    } catch (e: any) {
        console.log("Some error occurred: ", e);

        return new Response(
            JSON.stringify({ message: "Some error occurred" }),
            {status: 500, headers: { 'Content-Type': 'application/json' }},
        );
    }
}