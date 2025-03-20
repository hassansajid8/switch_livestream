import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const bcryptSaltRounds = 12;

export async function POST (event) {
    try {
        const { username, password } = await event.request.json();

        const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);

        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
            }
        });

        return new Response(
            JSON.stringify({ message: "Success" }),
            { status: 200, headers: { 'Content-Type': 'application/json' }}
        );
    } catch(e: any) {
        console.log("Some error occured: ", e);

        if(e.code == "P2002") {
            return new Response(
                JSON.stringify({ message: "Username already exists." }),
                { status: 403, headers: { 'Content-Type': 'application/json' }},
            );
        }

        return new Response(
            JSON.stringify({ message: "Some error occurred" }),
            { status: 501, headers: { 'Content-Type': 'application/json' }},
        );
    }
}