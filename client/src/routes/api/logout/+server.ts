

export async function GET(event){
    try{
        event.cookies.delete("token", {
            path: "/",
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })

        return new Response(
            JSON.stringify({ message: "Logged out successfully" }),
            { status: 200, headers: {
                'Set-Cookie': "token=expired;Path=/;HttpOnly;Expires="
            } }
        );
    } catch(e){
        console.log("error in logout: ", e);

        return new Response(
            JSON.stringify({ message: "Some error occurred" }),
            { status: 500 }
        );

    }

    return new Response(
        JSON.stringify({ message: "LOL" }),
        { status: 500 }
    )
}