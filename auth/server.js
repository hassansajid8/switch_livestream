const express = require('express');
const { createServer } = require('http');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { Server } = require('socket.io');

// server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// db client init
const prisma = new PrismaClient();

app.use(express.urlencoded());
app.use(cors());

// Socket conf for chat service
io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    const streamer = socket.handshake.query.streamer;
    socket.join(streamer);

    socket.on("chatmsg", (arg) => {
        console.log(arg);
        io.to(streamer).emit("chatbroadcast", arg);
    });
});

// auth service for rtmp server
app.get("/", function (req, res) {
    res.status(200).send("This is the backend API for Switch livestreaming service.");
})

app.post("/auth", async function (req, res) {
    const streamkey = req.body.key;
    const streamname = req.body.name;
    console.log(streamname);

    try{
        const user = await prisma.user.findUnique({ where: { username: streamname }});

        if(!user){
            console.log("User does not exist");
            res.status(404).send();
        }

        if(user.streamkey == streamkey){
            console.log("Correct stream key");

            const update = await prisma.user.update({
                data: {
                    isLive: true,
                },
                where: {
                    username: streamname,
                }
            });

            console.log(update.isLive);

            res.status(200).send();
        } else {
            console.log("Streamkey does not match");
            res.status(403).send();
        }


    } catch(e){
        console.log("Auth Server: Some error occurred\n", e);

        res.status(500).send();
    }

});

app.post("/stop", async function (req, res) {
    const streamname = req.body.name;
    console.log(`${streamname} has stopped streaming`);

    try{
        const update = await prisma.user.update({
            data: {
                isLive: false,
            },
            where: {
                username: streamname,
            }
        });
    }catch(e) {
        console.log("Auth Server /stop error: ", e);
    }

    res.status(200).send();
})

httpServer.listen(8000, '0.0.0.0', function() {
    console.log("Listening on port 8000");
})

process.on('SIGTERM', async () => {
    console.log("");
    console.log("Server terminated. Initiating clean-up");
    await cleanup();

    httpServer.close(async () => {
        console.log("Closing server and connections");
        await prisma.$disconnect();

        await io.$disconnect();

        process.exit(0);
    })
})

process.on("SIGINT", async () => {
    console.log("");
    console.log("Server terminated. Initiating clean-up");
    await cleanup();

    httpServer.close(() => {
        console.log("Closing server and connections");
        prisma.$disconnect();

        process.exit(0);
    })
})


async function cleanup(){
    console.log("Performing clean-up before shutdown");

    try{
        const response = await prisma.user.updateMany({
            where: {
                isLive: true,
            },
            data: {
                isLive: false
            }
        });

        if(response.count > 0) console.log(`${response.count} rows updated to | isLive: false |`);
    }catch(e){
        console.log("Error performing clean-up", e);
    }

}
